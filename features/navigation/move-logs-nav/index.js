// [better-falix] move-logs-nav: Script loading
console.log('[better-falix] move-logs-nav: Script loading');

chrome.storage.sync.get({ moveLogsNav: false, enabled: true }, (data) => {
  if (!data.enabled || !data.moveLogsNav) {
    console.log('[better-falix] move-logs-nav: Script disabled');
    return;
  }
  console.log('[better-falix] move-logs-nav: Script enabled');

  //  --------- START FEATURE ----------

  function moveLogs() {
    const logsItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim() === 'Logs'
    )?.closest('.nav-item');
    if (logsItem) {
      // Look for the Server Settings section instead of Advanced
      const serverSettingsSection = document.querySelector('#serverSettingsSection .navbar-nav');
      if (serverSettingsSection) {
        serverSettingsSection.insertBefore(logsItem, serverSettingsSection.firstChild);
        console.log('[better-falix] move-logs-nav: Moved Logs to Server Settings section');
      } else {
        console.log('[better-falix] move-logs-nav: Server Settings section not found');
      }
    }
    // Hide the "External Start Page" nav item if it exists
    const externalStartPageItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim().toLowerCase().includes('external start page')
    )?.closest('.nav-item');
    if (externalStartPageItem) {
      externalStartPageItem.style.display = 'none';
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', moveLogs);
  } else {
    moveLogs();
  }

  setTimeout(() => {
    console.log('[better-falix] move-logs-nav: Script loaded successfully');
  }, 10);
});
