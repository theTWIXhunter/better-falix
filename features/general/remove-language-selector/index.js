// [better-falix] remove-language-selector: Script loading
console.log('[better-falix] remove-language-selector: Script loading');

chrome.storage.sync.get({ removeLanguageSelector: false, enabled: true }, (data) => {
  if (!data.enabled || !data.removeLanguageSelector) {
    console.log('[better-falix] remove-language-selector: Script disabled');
    return;
  }
  console.log('[better-falix] remove-language-selector: Script enabled');

  // --------- START FEATURE ----------

  function removeLanguageSelectors() {
    const els = document.querySelectorAll('.navbar-language-selector');
    if (!els || els.length === 0) return;
    els.forEach(el => {
      try {
        el.remove();
      } catch (e) {
        // ignore removal errors
      }
    });
    console.log('[Better-Falix] remove-language-selector: Removed', els.length, 'navbar-language-selector elements');
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

  console.log('[better-falix] remove-language-selector: Script loaded successfully');
});