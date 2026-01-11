// [better-falix] Replace-location-with-Node: Script loading
console.log('[better-falix] Replace-location-with-Node: Script loading');

chrome.storage.sync.get({ replaceCpuWithNode: false, enabled: true }, (data) => {
  if (!data.enabled || !data.replaceCpuWithNode) {
    console.log('[better-falix] Replace-location-with-Node: Script disabled');
    return;
  }
  console.log('[better-falix] Replace-location-with-Node: Script enabled');

  // --------- START FEATURE ----------

  function replaceCpuWithNode() {
    // Find all info cards
    const cpuCards = document.querySelectorAll('.compact-info-card');
    console.log('[better-falix] Replace-location-with-Node: Found', cpuCards.length, 'compact info cards');
    
    let targetCard = null;
    
    // Look through all cards to find the one with "LOCATION" header
    cpuCards.forEach((card, index) => {
      const headerText = card.querySelector('.compact-info-header');
      
      if (headerText && headerText.textContent.trim().toUpperCase() === 'LOCATION') {
        targetCard = card;
        console.log('[better-falix] Replace-location-with-Node: Found LOCATION card at index', index);
      }
    });

    if (!targetCard) {
      console.log('[better-falix] Replace-location-with-Node: LOCATION card not found');
      return;
    }

    // Find the node information from the third span with class="support-info-text"
    // Also check the new modal structure created by replace-support-modal feature
    const supportInfoSpans = document.querySelectorAll('span.support-info-text');
    const bedrockValues = document.querySelectorAll('.bedrock-value');
    
    console.log('[better-falix] Replace-location-with-Node: Found', supportInfoSpans.length, 'support info spans');
    console.log('[better-falix] Replace-location-with-Node: Found', bedrockValues.length, 'bedrock values');
    
    let nodeInfo = null;
    
    // Try to get node info from original structure first
    if (supportInfoSpans.length >= 3) {
      const fullText = supportInfoSpans[2].textContent.trim();
      // Extract just the node name (before " - CPU" part)
      nodeInfo = fullText.split(' - ')[0].trim();
      console.log('[better-falix] Replace-location-with-Node: Found node info from original structure:', nodeInfo);
    }
    // If that fails, try to get it from the new modal structure (replace-support-modal)
    // Look specifically for the bedrock-value that has node information (should contain node name)
    else if (bedrockValues.length >= 3) {
      // Check each bedrock-value to find the one that looks like a node name
      for (let i = 0; i < bedrockValues.length; i++) {
        const value = bedrockValues[i].textContent.trim();
        console.log('[better-falix] Replace-location-with-Node: Checking bedrock-value', i, ':', value);
        // Node names typically contain letters and numbers, not just numbers
        if (value && value.length > 2 && /[a-zA-Z]/.test(value) && !value.includes('@') && !value.includes('.')) {
          // Extract just the node name (before " - CPU" part if present)
          nodeInfo = value.split(' - ')[0].trim();
          console.log('[better-falix] Replace-location-with-Node: Found node info from new modal structure:', nodeInfo);
          break;
        }
      }
      
      // If no suitable node name found, fall back to the third element
      if (!nodeInfo && bedrockValues.length >= 3) {
        const fallbackText = bedrockValues[2].textContent.trim();
        // Extract just the node name (before " - CPU" part)
        nodeInfo = fallbackText.split(' - ')[0].trim();
        console.log('[better-falix] Replace-location-with-Node: Using fallback - third bedrock-value:', nodeInfo);
      }
    }
    
    if (!nodeInfo) {
      console.log('[better-falix] Replace-location-with-Node: Node information not found in either structure');
      return;
    }

    // Replace the header text and icon
    const headerElement = targetCard.querySelector('.compact-info-header');
    if (headerElement) {
      // Clear the header and add new text with server icon
      headerElement.innerHTML = 'Server Node <svg class="svg-inline--fa" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"></path></svg>';
    }

    // Replace the value with node information
    const valueElement = targetCard.querySelector('.compact-info-value span');
    if (valueElement) {
      valueElement.textContent = nodeInfo;
    }

    console.log('[better-falix] Replace-location-with-Node: Successfully replaced CPU info with node info');
  }

  // Wait for the page to load and then replace the CPU info
  function waitForElements() {
    const checkInterval = setInterval(() => {
      const cpuCard = document.querySelector('.compact-info-card');
      const supportInfoSpans = document.querySelectorAll('span.support-info-text');
      const bedrockValues = document.querySelectorAll('.bedrock-value');
      
      // Check if we have either the original structure or the new modal structure
      const hasOriginalStructure = cpuCard && supportInfoSpans.length >= 3;
      const hasNewStructure = cpuCard && bedrockValues.length >= 3;
      
      if (hasOriginalStructure || hasNewStructure) {
        clearInterval(checkInterval);
        replaceCpuWithNode();
      }
    }, 100);

    // Stop checking after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);
  }

  // Start the process
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForElements);
  } else {
    waitForElements();
  }

  console.log('[better-falix] Replace-location-with-Node: Script loaded successfully');
});