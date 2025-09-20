// [better-falix] remove-premium-row: Script loading
console.log('[better-falix] remove-premium-row: Script loading');

chrome.storage.sync.get({ removePremiumRow: false, enabled: true }, (data) => {
  if (!data.enabled || !data.removePremiumRow) {
    console.log('[better-falix] remove-premium-row: Script disabled');
    return;
  }
  console.log('[better-falix] remove-premium-row: Script enabled');

  //  --------- START FEATURE ----------

  function removePremiumRowStyles() {
    // Create a style element to override the premium row styling
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Remove all styling from premium rows */
      .premium-row {
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
        color: inherit !important;
        position: static !important;
        margin: inherit !important;
        padding: inherit !important;
        transform: none !important;
        transition: none !important;
        animation: none !important;
        z-index: auto !important;
      }
      
      /* Remove any badge or indicator within premium rows */
      .premium-row .badge,
      .premium-row [class*="premium"],
      .premium-row [class*="star"],
      .premium-row [class*="highlight"] {
        display: none !important;
      }
    `;
    
    document.head.appendChild(styleElement);
    console.log('[better-falix] remove-premium-row: Premium row styles removed');
  }

  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removePremiumRowStyles);
  } else {
    removePremiumRowStyles();
  }

  setTimeout(() => {
    console.log('[better-falix] remove-premium-row: Script loaded successfully');
  }, 10);
});