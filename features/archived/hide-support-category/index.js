// [better-falix] hide-support-category: Script loading
console.log('[better-falix] hide-support-category: Script loading');

chrome.storage.sync.get({ ARCHIVED_hideSupportCategory: false, enabled: true }, (data) => {
  if (!data.enabled || !data.ARCHIVED_hideSupportCategory) {
    console.log('[better-falix] hide-support-category: Script disabled');
    return;
  }
  console.log('[better-falix] hide-support-category: Script enabled');

  //  --------- START FEATURE ----------
  
  // Function to hide the support section
  function hideSupportCategory() {
    // Add CSS to hide the support section and its trigger
    const styleEl = document.createElement('style');
    styleEl.id = 'better-falix-hide-support-category-style';
    styleEl.textContent = `
      /* Hide the Support category toggle */
      [data-bs-target="#supportSection"] {
        display: none !important;
      }
      
      /* Hide the Support section content */
      #supportSection {
        display: none !important;
      }
    `;
    
    // Append the style to the document head
    document.head.appendChild(styleEl);
    console.log('[better-falix] hide-support-category: Support Category hidden');
  }
  
  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideSupportCategory);
  } else {
    hideSupportCategory();
  }
  
  setTimeout(() => {
    console.log('[better-falix] hide-support-category: Script loaded successfully');
  }, 10);
});