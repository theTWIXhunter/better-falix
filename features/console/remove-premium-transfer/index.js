// [better-falix] remove-premium-transfer: Script loading
console.log('[better-falix] remove-premium-transfer: Script loading');

chrome.storage.sync.get({ removePremiumTransfer: false, enabled: true }, (data) => {
  if (!data.enabled || !data.removePremiumTransfer) {
    console.log('[better-falix] remove-premium-transfer: Script disabled');
    return;
  }
  console.log('[better-falix] remove-premium-transfer: Script enabled');

  //  --------- START FEATURE ----------

  let hasRunOnLoad = false;

  function removePremiumTransferBanner() {
    try {
      // Find all alert divs that contain the "Welcome to Premium" text
      const alerts = Array.from(document.querySelectorAll('.alert.alert-info'));
      alerts.forEach(alert => {
        const strongText = alert.querySelector('strong');
        if (strongText && strongText.textContent.includes('Welcome to Premium')) {
          alert.remove();
        }
      });
    } catch (e) {
      console.error('[better-falix] remove-premium-transfer: Error removing banner', e);
    }
  }

  // Remove immediately
  removePremiumTransferBanner();
  
  // Rerun at document_idle for consistency (only once)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!hasRunOnLoad) {
        hasRunOnLoad = true;
        removePremiumTransferBanner();
      }
    });
  } else if (document.readyState === 'interactive') {
    // Wait for complete
    window.addEventListener('load', () => {
      if (!hasRunOnLoad) {
        hasRunOnLoad = true;
        removePremiumTransferBanner();
      }
    });
  }

  // Observe for dynamic content
  const observer = new MutationObserver(() => {
    removePremiumTransferBanner();
  });
  
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  setTimeout(() => {
    try {
      observer.disconnect();
      console.log('[better-falix] remove-premium-transfer: Script loaded successfully');
    } catch (e) {}
  }, 3000);
});
