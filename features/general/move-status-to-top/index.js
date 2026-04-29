// [better-falix] move-status-to-top: Script loading
console.log('[better-falix] move-status-to-top: Script loading');

chrome.storage.sync.get({ 
  moveStatusToTop: false,
  enabled: true 
}, (data) => {
  if (!data.enabled || !data.moveStatusToTop) {
    console.log('[better-falix] move-status-to-top: Script disabled');
    return;
  }
  console.log('[better-falix] move-status-to-top: Script enabled');

  //  --------- START FEATURE ----------

  function moveStatusToTop() {
    // Find the serverStatusContainer element
    const serverStatusContainer = document.getElementById('serverStatusContainer');
    if (!serverStatusContainer) {
      console.log('[better-falix] move-status-to-top: serverStatusContainer not found');
      return;
    }

    // Find the mainSidebar element
    const mainSidebar = document.getElementById('mainSidebar');
    if (!mainSidebar) {
      console.log('[better-falix] move-status-to-top: mainSidebar not found');
      return;
    }

    // Find the navbar-brand-container header inside mainSidebar
    const navbarBrandContainer = mainSidebar.querySelector('.navbar-brand-container');
    if (!navbarBrandContainer) {
      console.log('[better-falix] move-status-to-top: navbar-brand-container not found');
      return;
    }

    // Insert serverStatusContainer right after navbar-brand-container
    navbarBrandContainer.insertAdjacentElement('afterend', serverStatusContainer);
    console.log('[better-falix] move-status-to-top: Moved serverStatusContainer into mainSidebar after navbar-brand-container');
  }

  //  --------- END FEATURE ----------

  // Run the feature after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', moveStatusToTop);
  } else {
    moveStatusToTop();
  }

  // Also observe for dynamically added elements
  const observer = new MutationObserver((mutations) => {
    // Check if serverStatusContainer exists but isn't in the right place
    const serverStatusContainer = document.getElementById('serverStatusContainer');
    const mainSidebar = document.getElementById('mainSidebar');
    
    if (serverStatusContainer && mainSidebar) {
      // Check if serverStatusContainer is actually inside mainSidebar
      if (!mainSidebar.contains(serverStatusContainer)) {
        moveStatusToTop();
      }
    }
  });

  // Start observing the document for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
