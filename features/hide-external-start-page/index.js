chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && 'hideExternalStartPage' in changes) {
    updateExternalStartPageVisibility(changes.hideExternalStartPage.newValue);
  }
});

// Always run the logic and update visibility on storage change, no reload needed.
function updateExternalStartPageVisibility(hide) {
  const externalStartPageItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
    link.textContent.trim().toLowerCase().includes('external start page')
  )?.closest('.nav-item');
  if (externalStartPageItem) {
    externalStartPageItem.style.display = hide ? 'none' : '';
  }
}

chrome.storage.sync.get('hideExternalStartPage', ({ hideExternalStartPage }) => {
  function apply() {
    updateExternalStartPageVisibility(hideExternalStartPage);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
});
