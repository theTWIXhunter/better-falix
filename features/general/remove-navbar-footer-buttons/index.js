// [better-falix] remove-navbar-footer-buttons: Script loading
console.log('[better-falix] remove-navbar-footer-buttons: Script loading');

chrome.storage.sync.get({ removeLanguageSelector: false, enabled: true }, (data) => {
  if (!data.enabled || !data.removeLanguageSelector) {
    console.log('[better-falix] remove-navbar-footer-buttons: Script disabled');
    return;
  }
  console.log('[better-falix] remove-navbar-footer-buttons: Script enabled');

  // --------- START FEATURE ----------

  function removeLanguageSelectors() {
    const els = document.querySelectorAll('.navbar-language-selector');
    const customizeBtn = document.getElementById('navbarCustomizeBtn');
    
    let removedCount = 0;
    
    if (els && els.length > 0) {
      els.forEach(el => {
        try {
          el.remove();
          removedCount++;
        } catch (e) {
          // ignore removal errors
        }
      });
    }
    
    if (customizeBtn) {
      try {
        customizeBtn.remove();
        removedCount++;
      } catch (e) {
        // ignore removal errors
      }
    }
    
    if (removedCount > 0) {
      console.log('[Better-Falix] remove-navbar-footer-buttons: Removed', removedCount, 'footer button elements');
    }
  }

  // Run immediately
  removeLanguageSelectors();

  // Watch for dynamic changes for a short period (3s) to catch SPA loads, then disconnect
  const observer = new MutationObserver((mutations, obs) => {
    removeLanguageSelectors();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Stop observing after 3s to avoid continuous overhead
  setTimeout(() => {
    try { observer.disconnect(); } catch (e) {}
  }, 3000);

  console.log('[better-falix] remove-navbar-footer-buttons: Script loaded successfully');
});