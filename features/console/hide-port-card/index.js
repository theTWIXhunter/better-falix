// [better-falix] hide-port-card: Script loading
console.log('[better-falix] hide-port-card: Script loading');

chrome.storage.sync.get({ hidePortCard: false, enabled: true }, (data) => {
  if (!data.enabled || !data.hidePortCard) {
    console.log('[better-falix] hide-port-card: Script disabled');
    return;
  }
  console.log('[better-falix] hide-port-card: Script enabled');

  // --------- START FEATURE ----------

  function hidePortCard() {
    // Find all info cards
    const cards = document.querySelectorAll('.compact-info-card');
    console.log('[better-falix] hide-port-card: Found', cards.length, 'compact info cards');
    
    let hidden = false;
    
    // Look through all cards to find the one with "PORT" header
    cards.forEach((card, index) => {
      const headerText = card.querySelector('.compact-info-header');
      
      if (headerText && headerText.textContent.trim().toUpperCase().includes('PORT')) {
        card.style.display = 'none';
        hidden = true;
        console.log('[better-falix] hide-port-card: Hidden PORT card at index', index);
      }
    });

    if (hidden) {
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

    if (!hidden) {
      console.log('[better-falix] hide-port-card: PORT card not found');
    }
  }

  // Wait for the page to load and then hide the PORT card
  function waitForElements() {
    const checkInterval = setInterval(() => {
      const cards = document.querySelectorAll('.compact-info-card');
      
      if (cards.length > 0) {
        clearInterval(checkInterval);
        hidePortCard();
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

  console.log('[better-falix] hide-port-card: Script loaded successfully');
});
