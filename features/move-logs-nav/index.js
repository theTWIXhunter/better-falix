chrome.storage.sync.get('moveLogsNav', ({ moveLogsNav }) => {
  if (!moveLogsNav) return;
  function moveLogs() {
    const logsItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim() === 'Logs'
    )?.closest('.nav-item');
    if (logsItem) {
      const advancedSection = document.querySelector('#advancedSection .navbar-nav');
      if (advancedSection) {
        advancedSection.insertBefore(logsItem, advancedSection.firstChild);
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', moveLogs);
  } else {
    moveLogs();
  }
});
