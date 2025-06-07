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
      const advancedSection = document.querySelector('#advancedSection .navbar-nav');
      if (advancedSection) {
        advancedSection.insertBefore(monitoringItem, advancedSection.firstChild);
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', moveMonitoring);
  } else {
    moveMonitoring();
  }

  setTimeout(() => {
    console.log('[better-falix] move-monitoring-nav: Script loaded sucsessfully');
  }, 10);
});
