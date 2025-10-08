// [better-falix] Replace CPU with Node: Script loading
console.log('[better-falix] Replace CPU with Node: Script loading');

chrome.storage.sync.get({ replaceCpuWithNode: false, enabled: true }, (data) => {
  if (!data.enabled || !data.replaceCpuWithNode) {
    console.log('[better-falix] Replace CPU with Node: Script disabled');
    return;
  }
  console.log('[better-falix] Replace CPU with Node: Script enabled');

  // --------- START FEATURE ----------

  function replaceCpuWithNode() {
    // Find the CPU info card
    const cpuCard = document.querySelector('.compact-info-card');
    if (!cpuCard) {
      console.log('[better-falix] Replace CPU with Node: CPU card not found');
      return;
    }

    // Check if this is the CPU card by looking for the microchip icon
    const cpuIcon = cpuCard.querySelector('.fa-microchip');
    if (!cpuIcon) {
      console.log('[better-falix] Replace CPU with Node: CPU icon not found');
      return;
    }

    // Find the node information from the third span with class="support-info-text"
    const supportInfoSpans = document.querySelectorAll('span.support-info-text');
    if (supportInfoSpans.length < 3) {
      console.log('[better-falix] Replace CPU with Node: Not enough support info spans found');
      return;
    }

    const nodeInfo = supportInfoSpans[2].textContent.trim();
    console.log('[better-falix] Replace CPU with Node: Found node info:', nodeInfo);

    // Replace the CPU icon with a server/node icon
    const iconContainer = cpuCard.querySelector('.compact-info-icon');
    if (iconContainer) {
      iconContainer.innerHTML = `
        <svg class="svg-inline--fa fa-server" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="server" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <g class="fa-duotone-group">
            <path class="fa-secondary" fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96l0 64c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-64c0-35.3-28.7-64-64-64L64 32zm0 256c-35.3 0-64 28.7-64 64l0 64c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-64c0-35.3-28.7-64-64-64L64 288z"></path>
            <path class="fa-primary" fill="currentColor" d="M448 96l0 64L64 160l0-64 384 0zm0 256l0 64L64 416l0-64 384 0z"></path>
          </g>
        </svg>
      `;
    }

    // Replace the header text
    const headerElement = cpuCard.querySelector('.compact-info-header');
    if (headerElement) {
      headerElement.textContent = 'Node';
    }

    // Replace the value with node information
    const valueElement = cpuCard.querySelector('.compact-info-value span');
    if (valueElement) {
      valueElement.textContent = nodeInfo;
    }

    console.log('[better-falix] Replace CPU with Node: Successfully replaced CPU info with node info');
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

  console.log('[better-falix] Replace CPU with Node: Script loaded successfully');
});