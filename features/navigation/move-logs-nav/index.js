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

  setTimeout(() => {
    console.log('[better-falix] move-logs-nav: Script loaded successfully');
  }, 10);
});
