// [better-falix] move-monitoring-nav: Script loading
console.log('[better-falix] move-monitoring-nav: Script loading');

chrome.storage.sync.get({ moveMonitoringNav: false, enabled: true }, (data) => {
  if (!data.enabled || !data.moveMonitoringNav) {
    console.log('[better-falix] move-monitoring-nav: Script disabled');
    return;
  }
  console.log('[better-falix] move-monitoring-nav: Script enabled');

  //  --------- START FEATURE ----------

  function moveMonitoring() {
    const monitoringItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim() === 'Monitoring'
    )?.closest('.nav-item');
    if (monitoringItem) {
      // Look for the Server Settings section instead of Advanced
      const serverSettingsSection = document.querySelector('#serverSettingsSection .navbar-nav');
      if (serverSettingsSection) {
        serverSettingsSection.insertBefore(monitoringItem, serverSettingsSection.firstChild);
        console.log('[better-falix] move-monitoring-nav: Moved Monitoring to Server Settings section');
      } else {
        console.log('[better-falix] move-monitoring-nav: Server Settings section not found');
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', moveMonitoring);
  } else {
    moveMonitoring();
  }

  setTimeout(() => {
    console.log('[better-falix] move-monitoring-nav: Script loaded successfully');
  }, 10);
});
