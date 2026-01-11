// [better-falix] remove-cpu-card: Script loading
console.log('[better-falix] remove-cpu-card: Script loading');

chrome.storage.sync.get({ removeCpuCard: false, enabled: true }, (data) => {
  if (!data.enabled || !data.removeCpuCard) {
    console.log('[better-falix] remove-cpu-card: Script disabled');
    return;
  }
  console.log('[better-falix] remove-cpu-card: Script enabled');

  // --------- START FEATURE ----------

  function removeCpuCard() {
    // Find all info cards
    const cards = document.querySelectorAll('.compact-info-card');
    console.log('[better-falix] remove-cpu-card: Found', cards.length, 'compact info cards');
    
    let removed = false;
    
    // Look through all cards to find the one with "CPU" header
    cards.forEach((card, index) => {
      const headerText = card.querySelector('.compact-info-header');
      
      if (headerText && headerText.textContent.trim().toUpperCase().includes('CPU')) {
        card.remove();
        removed = true;
        console.log('[better-falix] remove-cpu-card: Removed CPU card at index', index);
      }
    });

    if (removed) {
      // Inject CSS to fix grid layout and prevent card expansion
      const style = document.createElement('style');
      style.textContent = `
        .server-info-container {
          grid-auto-rows: min-content !important;
          height: auto !important;
          min-height: unset !important;
        }
        .compact-info-card {
          height: auto !important;
          min-height: unset !important;
        }
      `;
      document.head.appendChild(style);
    }

    if (!removed) {
      console.log('[better-falix] remove-cpu-card: CPU card not found');
    }
  }

  // Wait for the page to load and then remove the CPU card
  function waitForElements() {
    const checkInterval = setInterval(() => {
      const cards = document.querySelectorAll('.compact-info-card');
      
      if (cards.length > 0) {
        clearInterval(checkInterval);
        removeCpuCard();
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

  console.log('[better-falix] remove-cpu-card: Script loaded successfully');
});
