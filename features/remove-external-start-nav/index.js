chrome.storage.sync.get('removeExternalStartNav', ({ removeExternalStartNav }) => {
  if (!removeExternalStartNav) return;
  function hideExternalStartNav() {
    const remoteStartupItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim().toLowerCase().includes('remote startup')
    )?.closest('.nav-item');
    if (remoteStartupItem) {
      remoteStartupItem.style.display = 'none';
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideExternalStartNav);
  } else {
    hideExternalStartNav();
  }
});
