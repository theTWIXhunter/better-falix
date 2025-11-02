// [better-falix] move-backups-nav: ARCHIVED
// This feature has been implemented in normal Falix and is no longer needed.
// Kept here for reference.

// [better-falix] move-backups-nav: Script loading
console.log('[better-falix] move-backups-nav: Script loading');

chrome.storage.sync.get({ ARCHIVED_moveBackupsNav: false, enabled: true }, (data) => {
  if (!data.enabled || !data.ARCHIVED_moveBackupsNav) {
    console.log('[better-falix] move-backups-nav: Script disabled');
    return;
  }
  console.log('[better-falix] move-backups-nav: Script enabled');

  //  --------- START FEATURE ----------

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

  setTimeout(() => {
    console.log('[better-falix] move-backups-nav: Script loaded successfully');
  }, 10);
});
