chrome.storage.sync.get('moveMonitoringNav', ({ moveMonitoringNav }) => {
  if (!moveMonitoringNav) return;
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
});
