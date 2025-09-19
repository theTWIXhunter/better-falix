// [better-falix] move-Monitoring-nav: Script loading
console.log('[better-falix] move-Monitoring-nav: Script loading');

chrome.storage.sync.get({ moveMonitoringNav: false, enabled: true }, (data) => {
  if (!data.enabled || !data.moveMonitoringNav) {
    console.log('[better-falix] move-Monitoring-nav: Script disabled');
    return;
  }
  console.log('[better-falix] move-Monitoring-nav: Script enabled');

  //  --------- START FEATURE ----------

  function moveMonitoring() {
    const MonitoringItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim() === 'Monitoring'
    )?.closest('.nav-item');
    if (MonitoringItem) {
      const serverSettingsSection = document.querySelector('#settingsSection .navbar-nav');
      if (serverSettingsSection) {
        serverSettingsSection.insertBefore(MonitoringItem, serverSettingsSection.firstChild);
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', moveMonitoring);
  } else {
    moveMonitoring();
  }

  setTimeout(() => {
    console.log('[better-falix] move-Monitoring-nav: Script loaded successfully');
  }, 10);
});