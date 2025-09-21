// [better-falix] move-AdminPanel-nav: Script loading
console.log('[better-falix] move-AdminPanel-nav: Script loading');

chrome.storage.sync.get({ moveAdminPanelNav: false, enabled: true }, (data) => {
  if (!data.enabled || !data.moveAdminPanelNav) {
    console.log('[better-falix] move-AdminPanel-nav: Script disabled');
    return;
  }
  console.log('[better-falix] move-AdminPanel-nav: Script enabled');

  //  --------- START FEATURE ----------

  function moveAdminPanel() {
    const AdminPanelItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim() === 'Admin Panel'
    )?.closest('.nav-item');
    if (AdminPanelItem) {
      const serverSettingsSection = document.querySelector('#serversSection .navbar-nav');
      if (serverSettingsSection) {
        // Insert at the end of the servers section instead of beginning
        serverSettingsSection.appendChild(AdminPanelItem);
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', moveAdminPanel);
  } else {
    moveAdminPanel();
  }

  setTimeout(() => {
    console.log('[better-falix] move-AdminPanel-nav: Script loaded successfully');
  }, 10);
});