// [better-falix] remove-premium-row: Script loading
console.log('[better-falix] remove-premium-row: Script loading');

chrome.storage.sync.get({ removePremiumRow: false, enabled: true }, (data) => {
  if (!data.enabled || !data.removePremiumRow) {
    console.log('[better-falix] remove-premium-row: Script disabled');
    return;
  }
  console.log('[better-falix] remove-premium-row: Script enabled');

  //  --------- START FEATURE ----------

  function removePremiumRowClass() {
    // Find all table rows with the premium-row class
    const premiumRows = document.querySelectorAll('tr.premium-row');
    
    if (premiumRows.length > 0) {
      premiumRows.forEach(row => {
        // Remove the premium-row class
        row.classList.remove('premium-row');
        console.log('[better-falix] remove-premium-row: Removed premium-row class from a table row');
      });
    }
  }

  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removePremiumRowClass);
  } else {
    removePremiumRowClass();
  }

  // Monitor for changes to catch dynamically added elements
  const observer = new MutationObserver(() => {
    removePremiumRowClass();
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] remove-premium-row: Script loaded successfully');
  }, 10);
});