chrome.storage.sync.get('hideExternalStartPage', ({ hideExternalStartPage }) => {
  if (!hideExternalStartPage) return;
  function hideExternalStartPageNav() {
    const externalStartPageItem = Array.from(document.querySelectorAll('.nav-item .nav-link')).find(link =>
      link.textContent.trim().toLowerCase().includes('external start page')
    )?.closest('.nav-item');
    if (externalStartPageItem) {
      externalStartPageItem.style.display = 'none';
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideExternalStartPageNav);
  } else {
    hideExternalStartPageNav();
  }
});
