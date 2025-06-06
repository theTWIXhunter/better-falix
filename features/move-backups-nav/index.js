chrome.storage.sync.get({ enabled: true, moveBackupsNav: false }, (data) => {
  if (!data.enabled || !data.moveBackupsNav) return;
  function moveBackups() {
    const backupsItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim() === 'Backups'
    )?.closest('.nav-item');
    if (backupsItem) {
      const serverSettingsSection = document.querySelector('#settingsSection .navbar-nav');
      if (serverSettingsSection) {
        serverSettingsSection.insertBefore(backupsItem, serverSettingsSection.firstChild);
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', moveBackups);
  } else {
    moveBackups();
  }
});