// [better-falix] admin-panel-index-redirect: Script loading
console.log('[better-falix] admin-panel-index-redirect: Script loading');

chrome.storage.sync.get({ adminPanelIndexRedirect: false, enabled: true }, (data) => {
  if (!data.enabled || !data.adminPanelIndexRedirect) {
    console.log('[better-falix] admin-panel-index-redirect: Script disabled');
    return;
  }
  console.log('[better-falix] admin-panel-index-redirect: Script enabled');

  //  --------- START FEATURE ----------

  function redirectAdminPanelLink() {
    const adminPanelLink = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim() === 'Admin Panel'
    );
    
    if (adminPanelLink) {
      // Change the href from "/admin" to "/admin/index"
      if (adminPanelLink.getAttribute('href') === '/admin') {
        adminPanelLink.setAttribute('href', '/admin/index');
        console.log('[better-falix] admin-panel-index-redirect: Changed Admin Panel link to /admin/index');
      }
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', redirectAdminPanelLink);
  } else {
    redirectAdminPanelLink();
  }

  // Monitor for changes to catch dynamically loaded elements
  const observer = new MutationObserver(() => {
    redirectAdminPanelLink();
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] admin-panel-index-redirect: Script loaded successfully');
  }, 10);
});