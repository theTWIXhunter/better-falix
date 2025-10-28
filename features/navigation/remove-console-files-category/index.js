// [better-falix] remove-console-files-category: Script loading
console.log('[better-falix] remove-console-files-category: Script loading');

chrome.storage.sync.get({ enabled: true, removeConsoleFilesCategory: false }, (data) => {
  if (!data.enabled || !data.removeConsoleFilesCategory) {
    console.log('[better-falix] remove-console-files-category: Script disabled');
    return;
  }
  console.log('[better-falix] remove-console-files-category: Script enabled');

  //  --------- START FEATURE ----------

  (function hideConsoleFilesCategory() {
    let hasRunOnLoad = false;
    
    function run() {
      const btn = document.querySelector('button.nav-category[data-category="CONSOLE & FILES"]');
      if (btn) btn.style.display = 'none';
    }
    
    // Run immediately
    run();
    
    // Rerun at document_idle for consistency (only once)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        if (!hasRunOnLoad) {
          hasRunOnLoad = true;
          run();
        }
      });
    } else if (document.readyState === 'interactive') {
      // Wait for complete
      window.addEventListener('load', () => {
        if (!hasRunOnLoad) {
          hasRunOnLoad = true;
          run();
        }
      });
    }
  })();

  setTimeout(() => {
    console.log('[better-falix] remove-console-files-category: Script loaded successfully');
  }, 10);
});
