chrome.storage.sync.get('moveBackupsNav', ({ moveBackupsNav }) => {
  if (!moveBackupsNav) return;
  function moveBackups() {
    const backupsItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim() === 'Backups'
    )?.closest('.nav-item');
    if (!backupsItem) return;
    const serverSettingsSection = document.querySelector('#settingsSection .navbar-nav');
    if (!serverSettingsSection) return;
    serverSettingsSection.appendChild(backupsItem);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', moveBackups);
  } else {
    moveBackups();
  }
});
