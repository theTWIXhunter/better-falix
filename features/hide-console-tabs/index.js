chrome.storage.sync.get('hideConsoleTabs', ({ hideConsoleTabs }) => {
  if (!hideConsoleTabs) return;
  function hideTabs() {
    // Example: Hide elements with class 'console-card'
    document.querySelectorAll('.console-card').forEach(el => el.style.display = 'none');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideTabs);
  } else {
    hideTabs();
  }
});
