chrome.storage.sync.get({ enabled: true, removeNavbarSupportLinks: false }, (data) => {
  if (!data.enabled || !data.removeNavbarSupportLinks) return;
  const remove = () => {
    const el = document.querySelector('.navbar-support-links');
    if (el) el.remove();
  };
  remove();
  // In case it's dynamically added
  const observer = new MutationObserver(remove);
  observer.observe(document.body, { childList: true, subtree: true });
});
