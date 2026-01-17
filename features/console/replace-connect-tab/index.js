// [better-falix] replace-connect-tab: Script loading
console.log('[better-falix] replace-connect-tab: Script loading');

chrome.storage.sync.get({ enabled: true, replaceConnectTab: false }, (data) => {
  if (!data.enabled || !data.replaceConnectTab) {
    console.log('[better-falix] replace-connect-tab: Script disabled');
    return;
  }
  console.log('[better-falix] replace-connect-tab: Script enabled');

  //  --------- START FEATURE ----------

  // Helper function to create address box
  function createAddressBox(label, value, copyValue) {
    const box = document.createElement('div');
    box.className = 'connect-address-box';
    box.style.cssText = 'display: flex; align-items: center; white-space: nowrap;';
    box.innerHTML = `
      ${label} <span class="connect-address-text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 1; min-width: 0;">${value}</span>
      <button class="btn connect-inline-copy" onclick="copyConnectionInfo('${copyValue}', this)" title="Copy to clipboard" style="flex-shrink: 0;">
        <svg class="svg-inline--fa fa-copy" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"></path></svg>
      </button>
    `;
    return box;
  }

  // Handle alternate modal structure (modal-body with direct connection info)
  function handleAlternateModalStructure(modalBody) {
    console.log('[better-falix] replace-connect-tab: Processing alternate modal structure');
    
    // Extract connection info from the alternate structure
    const addressBoxes = modalBody.querySelectorAll('.connect-address-box');
    const connections = [];
    
    addressBoxes.forEach(box => {
      const addressText = box.querySelector('.connect-address-text');
      if (addressText) {
        const value = addressText.textContent.trim();
        // Look for the label in the previous sibling or parent
        const labelElement = box.previousElementSibling?.querySelector('.connect-label');
        let label = labelElement ? labelElement.textContent.trim() : '';
        
        // Determine the type based on label or content
        if (label.includes('Domain Address') || value.includes('.falixsrv.me')) {
          connections.push({ type: 'domain', value: value, label: 'DYNAMIC IP:' });
        } else if (label.includes('Direct Connection') || value.includes('host.falixserver.net')) {
          connections.push({ type: 'direct', value: value, label: 'IP WITH PORT:' });
        }
      }
    });
    
    // Clear the modal body
    modalBody.innerHTML = '';
    
    // Create a container similar to javaSteps
    const container = document.createElement('div');
    container.id = 'javaSteps';
    
    // Add extracted connections in our custom format
    connections.forEach(conn => {
      // Parse IP and port if available
      const parts = conn.value.split(':');
      const hasPort = parts.length === 2;
      const baseAddress = parts[0];
      const port = hasPort ? parts[1] : '';
      
      // Add the main connection info
      container.appendChild(createAddressBox(conn.label, conn.value, conn.value));
      
      // If it's a domain address and we have port, add individual components
      if (conn.type === 'domain' && hasPort) {
        // Extract just the IP part (before port)
        container.appendChild(createAddressBox('SERVER IP:', baseAddress, baseAddress));
        container.appendChild(createAddressBox('PORT:', port, port));
      }
      
      // If it's direct connection, also add as SERVER IP
      if (conn.type === 'direct') {
        container.appendChild(createAddressBox('SERVER IP:', baseAddress, baseAddress));
        if (hasPort) {
          container.appendChild(createAddressBox('PORT:', port, port));
        }
      }
    });
    
    modalBody.appendChild(container);
    console.log('[better-falix] replace-connect-tab: Alternate modal processed successfully');
  }

  function replaceConnectTabSections() {
    // Fix aria-hidden accessibility warning by removing it from the modal
    const connectModal = document.getElementById('connectgui');
    if (connectModal && connectModal.hasAttribute('aria-hidden')) {
      connectModal.removeAttribute('aria-hidden');
    }

    // Remove all connect steps
    document.querySelectorAll('.connect-step').forEach(el => el.remove());
    // Remove remote startup section
    document.querySelectorAll('.remote-startup-section').forEach(el => el.remove());
    // Remove edition tabs
    document.querySelectorAll('.connect-edition-tabs').forEach(el => el.remove());

    const javaSteps = document.getElementById('javaSteps');
    const bedrockSteps = document.getElementById('bedrockSteps');
    
    // Check for alternate modal structure (modal-body with direct connection info)
    const modalBody = connectModal?.querySelector('.modal-body');
    if (modalBody && !javaSteps) {
      console.log('[better-falix] replace-connect-tab: Found alternate modal-body structure');
      handleAlternateModalStructure(modalBody);
      return;
    }
    
    if (!javaSteps) {
      console.log('[better-falix] replace-connect-tab: Java steps not found');
      return;
    }

    // Extract IP and port from the Bedrock section's minecraft:// link
    let ip = '';
    let port = '';
    let fullAddress = '';
    
    if (bedrockSteps) {
      const minecraftLink = bedrockSteps.querySelector('a[href^="minecraft://?addExternalServer="]');
      if (minecraftLink) {
        const href = minecraftLink.getAttribute('href');
        // Extract from: minecraft://?addExternalServer=NAME|IP:PORT
        const match = href.match(/addExternalServer=[^|]+\|([^:]+):(\d+)/);
        if (match) {
          ip = match[1];
          port = match[2];
          fullAddress = `${ip}:${port}`;
        }
      }
    }
    
    // Fallback: try to get IP from Java address box if it exists
    if (!ip) {
      const addressBox = document.querySelector('#javaSteps .connect-address-box');
      if (addressBox) {
        ip = addressBox.querySelector('.connect-address-text')?.textContent?.trim() || '';
      }
    }
    
    // Extract dynamic IP from the connect modal itself
    let dynamicIp = '';
    
    // First, try to get it from Java Edition's "Dynamic IP:" section
    const javaAltBox = javaSteps.querySelector('.connect-address-box.connect-address-alt .connect-address-text');
    if (javaAltBox) {
      dynamicIp = javaAltBox.textContent.trim();
    }
    
    // If not found in Java, try Bedrock Edition's dynamic IP section
    if (!dynamicIp && bedrockSteps) {
      const bedrockAddress = bedrockSteps.querySelector('.bedrock-detail-row .bedrock-detail-label');
      if (bedrockAddress && bedrockAddress.textContent.includes('Address:')) {
        const addressValue = bedrockAddress.closest('.bedrock-detail-row').querySelector('.bedrock-detail-value span');
        const portLabel = Array.from(bedrockSteps.querySelectorAll('.bedrock-detail-label')).find(el => el.textContent.includes('Port:'));
        const portValue = portLabel?.closest('.bedrock-detail-row').querySelector('.bedrock-detail-value span');
        
        if (addressValue && portValue) {
          dynamicIp = `${addressValue.textContent.trim()}:${portValue.textContent.trim()}`;
        }
      }
    }
    
    console.log('[better-falix] replace-connect-tab: IP:', ip, 'Port:', port, 'Full:', fullAddress, 'Dynamic IP:', dynamicIp);

    // Remove bedrock steps after extracting info
    if (bedrockSteps) {
      bedrockSteps.remove();
    }

    // Remove any existing address boxes in javaSteps
    javaSteps.querySelectorAll('.connect-address-box').forEach(el => el.remove());

    // Add IP box
    javaSteps.appendChild(createAddressBox('SERVER IP:', ip, ip));
    
    // Add IP with port box
    if (fullAddress) {
      javaSteps.appendChild(createAddressBox('IP WITH PORT:', fullAddress, fullAddress));
    }
    
    // Add Port box
    if (port) {
      javaSteps.appendChild(createAddressBox('PORT:', port, port));
    }
    
    // Add Dynamic IP box
    if (dynamicIp) {
      // If dynamicIp already contains a colon, it already has the port included
      const alreadyHasPort = dynamicIp.includes(':');
      
      let fullDynamicIp;
      if (alreadyHasPort) {
        // Use as-is if it already includes the port
        fullDynamicIp = dynamicIp;
      } else if (port) {
        // Only append port if dynamicIp doesn't already have one
        // Check if node is an IPv4 address (format: xxx.xxx.xxx.xxx)
        const isIPv4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(dynamicIp);
        // Check if node matches EUX-O pattern (e.g., EU4-O, EU5-O)
        const isEUXONode = /^EU\d+-O$/i.test(dynamicIp);
        
        if (isIPv4) {
          // If it's an IPv4 address, use it directly with the port
          fullDynamicIp = `${dynamicIp}:${port}`;
        } else if (isEUXONode) {
          // If it's an EUX-O node, use host.falixserver.net
          fullDynamicIp = `host.falixserver.net:${port}`;
        } else {
          // Otherwise, append .falixserver.net
          fullDynamicIp = `${dynamicIp}.falixserver.net:${port}`;
        }
      } else {
        // No port available, use dynamicIp as-is
        fullDynamicIp = dynamicIp;
      }
      
      javaSteps.appendChild(createAddressBox('DYNAMIC IP:', fullDynamicIp, fullDynamicIp));
    }
  }

  // Fix: always run after DOMContentLoaded to ensure all elements exist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceConnectTabSections);
  } else {
    setTimeout(replaceConnectTabSections, 0);
  }

  setTimeout(() => {
    console.log('[better-falix] replace-connect-tab: Script loaded successfully');
  }, 10);
});
