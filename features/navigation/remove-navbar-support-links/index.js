// [better-falix] remove-navbar-support-links: Script loading
console.log('[better-falix] remove-navbar-support-links: Script loading');

chrome.storage.sync.get({ enabled: true, removeNavbarSupportLinks: false }, (data) => {
  if (!data.enabled || !data.removeNavbarSupportLinks) {
    console.log('[better-falix] remove-navbar-support-links: Script disabled');
    return;
  }
  console.log('[better-falix] remove-navbar-support-links: Script enabled');

  //  --------- START FEATURE ----------

  const remove = () => {
    const el = document.querySelector('.navbar-support-links');
    if (el) el.remove();
  };
  remove();
  // In case it's dynamically added
  const observer = new MutationObserver(remove);
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] remove-navbar-support-links: Script loaded successfully');
  }, 10);
});
