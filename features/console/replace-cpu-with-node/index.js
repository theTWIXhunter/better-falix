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
    const supportInfoSpans = document.querySelectorAll('span.support-info-text');
    console.log('[better-falix] Replace CPU with Node: Found', supportInfoSpans.length, 'support info spans');
    
    if (supportInfoSpans.length < 3) {
      console.log('[better-falix] Replace-CPU-with-Node: Not enough support info spans found');
      return;
    }

    const nodeInfo = supportInfoSpans[2].textContent.trim();
    console.log('[better-falix] Replace CPU with Node: Found node info:', nodeInfo);

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
      
      if (cpuCard && supportInfoSpans.length >= 3) {
        clearInterval(checkInterval);
        replaceCpuWithNode();
      }
    });

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