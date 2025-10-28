// [better-falix] replace-connect-tab: Script loading
console.log('[better-falix] replace-connect-tab: Script loading');

chrome.storage.sync.get({ enabled: true, replaceConnectTab: false }, (data) => {
  if (!data.enabled || !data.replaceConnectTab) {
    console.log('[better-falix] replace-connect-tab: Script disabled');
    return;
  }
  console.log('[better-falix] replace-connect-tab: Script enabled');

  //  --------- START FEATURE ----------

  function replaceConnectTabSections() {
    // Remove all connect steps
    document.querySelectorAll('.connect-step').forEach(el => el.remove());
    // Remove remote startup section
    document.querySelectorAll('.remote-startup-section').forEach(el => el.remove());
    // Remove edition tabs
    document.querySelectorAll('.connect-edition-tabs').forEach(el => el.remove());

    const javaSteps = document.getElementById('javaSteps');
    const bedrockSteps = document.getElementById('bedrockSteps');
    
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
    
    // Extract NODE (dynamic IP) from support info
    let dynamicIp = '';
    const supportInfoElements = document.querySelectorAll('.support-info-value');
    for (const element of supportInfoElements) {
      const text = element.textContent || '';
      // Check if it contains "NODE:" text
      if (text.includes('NODE:')) {
        // Try to get from .support-info-text (with replace-support-modal enabled)
        const supportInfoText = element.querySelector('.support-info-text');
        let nodeText = '';
        if (supportInfoText) {
          nodeText = supportInfoText.textContent.trim();
        } else {
          // Fallback: extract from the full text (without replace-support-modal)
          // Text format: "NODE: node123 - CPU: 4 vCores"
          const match = text.match(/NODE:\s*([^\s-]+)/);
          if (match) {
            nodeText = match[1];
          }
        }
        // Extract just the NODE part (before " - CPU" if it exists)
        dynamicIp = nodeText.split(' - ')[0].trim();
        break;
      }
    }
    
    console.log('[better-falix] replace-connect-tab: IP:', ip, 'Port:', port, 'Full:', fullAddress, 'Dynamic IP:', dynamicIp);

    // Remove bedrock steps after extracting info
    if (bedrockSteps) {
      bedrockSteps.remove();
    }

    // Remove any existing address boxes in javaSteps
    javaSteps.querySelectorAll('.connect-address-box').forEach(el => el.remove());

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
      const fullDynamicIp = `${dynamicIp}.falixserver.net`;
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
