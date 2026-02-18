// [better-falix] remove-state-overlays: Script loading
console.log('[better-falix] remove-state-overlays: Script loading');

chrome.storage.sync.get({ ARCHIVED_removeStateOverlays: false, enabled: true }, (data) => {
  if (!data.enabled || !data.ARCHIVED_removeStateOverlays) {
    console.log('[better-falix] remove-state-overlays: Script disabled');
    return;
  }
  console.log('[better-falix] remove-state-overlays: Script enabled');

  //  --------- START FEATURE ----------

  // Load config options
  chrome.storage.sync.get({
    removeStartingOverlay: true,
    removeOfflineOverlay: false
  }, (config) => {
    console.log('[better-falix] remove-state-overlays: Config - Starting:', config.removeStartingOverlay, 'Offline:', config.removeOfflineOverlay);
    ARCHIVED_removeStateOverlays(config.removeStartingOverlay, config.removeOfflineOverlay);
  });
});

function ARCHIVED_removeStateOverlays(removeStarting, removeOffline) {
  function checkAndRemoveOverlay() {
    const overlay = document.getElementById('console-state-overlay');
    
    if (!overlay) {
      return;
    }

    const hexagon = document.getElementById('console-state-hexagon');
    const title = document.getElementById('console-state-title');
    
    if (!hexagon) {
      return;
    }

    // Check for starting state
    if (removeStarting && (
      hexagon.classList.contains('state-starting') ||
      (title && title.textContent.trim().includes('Starting'))
    )) {
      console.log('[better-falix] remove-state-overlays: Removing starting overlay');
      overlay.style.display = 'none';
      return;
    }

    // Check for offline state
    if (removeOffline && (
      hexagon.classList.contains('state-offline') ||
      (title && title.textContent.trim().includes('Offline'))
    )) {
      console.log('[better-falix] remove-state-overlays: Removing offline overlay');
      overlay.style.display = 'none';
      return;
    }

    // If overlay should be visible, ensure it is
    if (overlay.style.display === 'none') {
      // Check if current state should be hidden
      const shouldHide = (removeStarting && hexagon.classList.contains('state-starting')) ||
                        (removeOffline && hexagon.classList.contains('state-offline'));
      if (!shouldHide) {
        overlay.style.display = '';
      }
    }
  }

  // Initial check
  if (document.body) {
    checkAndRemoveOverlay();
  }

  // Watch for changes to the overlay
  const observer = new MutationObserver(() => {
    checkAndRemoveOverlay();
  });

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  console.log('[better-falix] remove-state-overlays: Script loaded successfully');
}
