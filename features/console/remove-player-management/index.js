// [better-falix] Remove Player Management: Script loading
console.log('[better-falix] Remove Player Management: Script loading');

chrome.storage.sync.get({ removePlayerManagement: false, enabled: true }, (data) => {
  if (!data.enabled || !data.removePlayerManagement) {
    console.log('[better-falix] Remove Player Management: Script disabled');
    return;
  }
  console.log('[better-falix] Remove Player Management: Script enabled');

  // --------- START FEATURE ----------

  function removePlayerManagementCard() {
    // Find all compact info cards
    const infoCards = document.querySelectorAll('.compact-info-card');
    console.log('[better-falix] Remove Player Management: Found', infoCards.length, 'compact info cards');
    
    // Look through all cards to find the one with "Player Management" header
    infoCards.forEach((card, index) => {
      const headerText = card.querySelector('.compact-info-header');
      
      if (headerText && headerText.textContent.trim().toLowerCase().includes('Player Management')) {
        console.log('[better-falix] Remove Player Management: Found Player Management card at index', index);
        card.remove();
        console.log('[better-falix] Remove Player Management: Successfully removed Player Management card');
      }
    });
  }

  // Wait for the page to load and then remove the Player Management card
  function waitForElements() {
    const checkInterval = setInterval(() => {
      const infoCards = document.querySelectorAll('.compact-info-card');
      
      if (infoCards.length > 0) {
        clearInterval(checkInterval);
        removePlayerManagementCard();
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

  console.log('[better-falix] Remove Player Management: Script loaded successfully');
});