// [better-falix] Remove Player Management: Script loading
console.log('[better-falix] Remove Player Management: Script loading');

chrome.storage.sync.get({ ARCHIVED_removePlayerManagement: false, enabled: true }, (data) => {
  if (!data.enabled || !data.ARCHIVED_removePlayerManagement) {
    console.log('[better-falix] Remove Player Management: Script disabled');
    return;
  }
  console.log('[better-falix] Remove Player Management: Script enabled');

  // --------- START FEATURE ----------

  function removePlayerManagementCard() {
    // Find all compact info cards
    const infoCards = document.querySelectorAll('.compact-info-card');
    //console.log('[better-falix] Remove Player Management: Found', infoCards.length, 'compact info cards');
    
    let removed = false;
    
    // Look through all cards to find the one with "Player Management" header or modal target
    infoCards.forEach((card, index) => {
      const headerText = card.querySelector('.compact-info-header');
      const modalTarget = card.getAttribute('data-bs-target');

      // Check for Player Management text in header or playerManagementModal target
      const hasPlayerManagementText = headerText && headerText.textContent.trim().toLowerCase().includes('player management');
      const hasPlayerManagementModal = modalTarget === '#playerManagementModal';
      
      if (hasPlayerManagementText || hasPlayerManagementModal) {
        //console.log('[better-falix] Remove Player Management: Found Player Management card at index', index);
        card.remove();
        removed = true;
        //console.log('[better-falix] Remove Player Management: Successfully removed Player Management card');
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