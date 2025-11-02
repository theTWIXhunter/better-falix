// [better-falix] move-logs-nav: ARCHIVED
// This feature has been implemented in normal Falix and is no longer needed.
// Kept here for reference.

// [better-falix] move-Logs-nav: Script loading
console.log('[better-falix] move-Logs-nav: Script loading');

chrome.storage.sync.get({ ARCHIVED_moveLogsNav: false, enabled: true }, (data) => {
  if (!data.enabled || !data.ARCHIVED_moveLogsNav) {
    console.log('[better-falix] move-Logs-nav: Script disabled');
    return;
  }
  console.log('[better-falix] move-Logs-nav: Script enabled');

  //  --------- START FEATURE ----------

  function moveLogs() {
    const LogsItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim() === 'Logs'
    )?.closest('.nav-item');
    if (LogsItem) {
      const serverSettingsSection = document.querySelector('#settingsSection .navbar-nav');
      if (serverSettingsSection) {
        serverSettingsSection.insertBefore(LogsItem, serverSettingsSection.firstChild);
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', moveLogs);
  } else {
    moveLogs();
  }

  setTimeout(() => {
    console.log('[better-falix] move-Logs-nav: Script loaded successfully');
  }, 10);
});
