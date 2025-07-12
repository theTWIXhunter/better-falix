// [better-falix] remove-server-search: Script loading
console.log('[better-falix] remove-server-search: Script loading');

chrome.storage.sync.get({ enabled: true, removeServerSearch: false }, (data) => {
  if (!data.enabled || !data.removeServerSearch) {
    console.log('[better-falix] remove-server-search: Script disabled');
    return;
  }
  console.log('[better-falix] remove-server-search: Script enabled');

  //  --------- START FEATURE ----------

  const remove = () => {
    const el = document.querySelector('.server-search-container mb-4');
    if (el) el.remove();
  };
  remove();

  setTimeout(() => {
    console.log('[better-falix] remove-navbar-support-links: Script loaded successfully');
  }, 10);
});
