// Hide the .console-tabs div if the feature is enabled
chrome.storage.sync.get({ hideConsoleTabs: false, enabled: true }, (data) => {
  if (!data.enabled || !data.hideConsoleTabs) return;
  const hideTabs = () => {
    const el = document.querySelector('.console-tabs');
    if (el) el.style.display = 'none';
  };
  // Try immediately and also after DOM changes
  hideTabs();
  const observer = new MutationObserver(hideTabs);
  observer.observe(document.body, { childList: true, subtree: true });
});
