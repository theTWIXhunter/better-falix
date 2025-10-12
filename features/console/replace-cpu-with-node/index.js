// [better-falix] Replace-CPU-with-Node: Script loading
console.log('[better-falix] Replace-CPU-with-Node: Script loading');

chrome.storage.sync.get({ replaceCpuWithNode: false, enabled: true }, (data) => {
  if (!data.enabled || !data.replaceCpuWithNode) {
    console.log('[better-falix] Replace-CPU-with-Node: Script disabled');
    return;
  }
  console.log('[better-falix] Replace-CPU-with-Node: Script enabled');

  // --------- START FEATURE ----------

  function replaceCpuWithNode() {
    // Find all CPU info cards
    const cpuCards = document.querySelectorAll('.compact-info-card');
    console.log('[better-falix] Replace CPU with Node: Found', cpuCards.length, 'compact info cards');
    
    let targetCard = null;
    
    // Look through all cards to find the one with "CPU" header
    cpuCards.forEach((card, index) => {
      const headerText = card.querySelector('.compact-info-header');
      
      if (headerText && headerText.textContent.trim().toUpperCase() === 'CPU') {
        targetCard = card;
        console.log('[better-falix] Replace-CPU-with-Node: Found CPU card at index', index);
      }
    });

    if (!targetCard) {
      console.log('[better-falix] Replace-CPU-with-Node: CPU card not found');
      return;
    }

    // Find the node information from the third span with class="support-info-text"
    // Also check the new modal structure created by replace-support-modal feature
    const supportInfoSpans = document.querySelectorAll('span.support-info-text');
    const bedrockValues = document.querySelectorAll('.bedrock-value');
    
    console.log('[better-falix] Replace CPU with Node: Found', supportInfoSpans.length, 'support info spans');
    console.log('[better-falix] Replace CPU with Node: Found', bedrockValues.length, 'bedrock values');
    
    let nodeInfo = null;
    
    // Try to get node info from original structure first
    if (supportInfoSpans.length >= 3) {
      nodeInfo = supportInfoSpans[2].textContent.trim();
      console.log('[better-falix] Replace CPU with Node: Found node info from original structure:', nodeInfo);
    }
    // If that fails, try to get it from the new modal structure (replace-support-modal)
    // Look specifically for the bedrock-value that has node information (should contain node name)
    else if (bedrockValues.length >= 3) {
      // Check each bedrock-value to find the one that looks like a node name
      for (let i = 0; i < bedrockValues.length; i++) {
        const value = bedrockValues[i].textContent.trim();
        console.log('[better-falix] Replace CPU with Node: Checking bedrock-value', i, ':', value);
        // Node names typically contain letters and numbers, not just numbers
        if (value && value.length > 2 && /[a-zA-Z]/.test(value) && !value.includes('@') && !value.includes('.')) {
          nodeInfo = value;
          console.log('[better-falix] Replace CPU with Node: Found node info from new modal structure:', nodeInfo);
          break;
        }
      }
      
      // If no suitable node name found, fall back to the third element
      if (!nodeInfo && bedrockValues.length >= 3) {
        nodeInfo = bedrockValues[2].textContent.trim();
        console.log('[better-falix] Replace CPU with Node: Using fallback - third bedrock-value:', nodeInfo);
      }
    }
    
    if (!nodeInfo) {
      console.log('[better-falix] Replace-CPU-with-Node: Node information not found in either structure');
      return;
    }

    // Replace the header text (keep the original CPU icon)
    const headerElement = targetCard.querySelector('.compact-info-header');
    if (headerElement) {
      headerElement.textContent = 'Server Node';
    }

    // Replace the value with node information
    const valueElement = targetCard.querySelector('.compact-info-value span');
    if (valueElement) {
      valueElement.textContent = nodeInfo;
    }

    console.log('[better-falix] Replace-CPU-with-Node: Successfully replaced CPU info with node info');
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

  console.log('[better-falix] Replace-CPU-with-Node: Script loaded successfully');
});