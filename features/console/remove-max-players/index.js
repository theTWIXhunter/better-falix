// [better-falix] Remove Max Players: Script loading
console.log('[better-falix] Remove Max Players: Script loading');

chrome.storage.sync.get({ removeMaxPlayers: false, enabled: true }, (data) => {
  if (!data.enabled || !data.removeMaxPlayers) {
    console.log('[better-falix] Remove Max Players: Script disabled');
    return;
  }
  console.log('[better-falix] Remove Max Players: Script enabled');

  // --------- START FEATURE ----------

  function removeMaxPlayersCard() {
    // Find all compact info cards
    const infoCards = document.querySelectorAll('.compact-info-card');
    //console.log('[better-falix] Remove Max Players: Found', infoCards.length, 'compact info cards');
    
    // Look through all cards to find the one with "Max Players" header
    infoCards.forEach((card, index) => {
      const headerText = card.querySelector('.compact-info-header');
      
      if (headerText && headerText.textContent && headerText.textContent.trim().toLowerCase().includes('max players')) {
        //console.log('[better-falix] Remove Max Players: Found Max Players card at index', index);
        card.remove();
        //console.log('[better-falix] Remove Max Players: Successfully removed Max Players card');
      }
    });
  }

  // Wait for the page to load and then remove the Max Players card
  function waitForElements() {
    const checkInterval = setInterval(() => {
      const infoCards = document.querySelectorAll('.compact-info-card');
      
      if (infoCards.length > 0) {
        clearInterval(checkInterval);
        removeMaxPlayersCard();
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

  console.log('[better-falix] Remove Max Players: Script loaded successfully');
});