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
});
