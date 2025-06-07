// [better-falix] hide-console-tabs: Script loading
console.log('[better-falix] hide-console-tabs: Script loading');

chrome.storage.sync.get({ hideConsoleTabs: false, enabled: true }, (data) => {
  if (!data.enabled || !data.hideConsoleTabs) {
    console.log('[better-falix] hide-console-tabs: Script disabled');
    return;
  }
  console.log('[better-falix] hide-console-tabs: Script enabled');

  //  --------- START FEATURE ----------

  const hideTabs = () => {
    const el = document.querySelector('.console-tabs');
    if (el) el.style.display = 'none';
  };
  hideTabs();
  const observer = new MutationObserver(hideTabs);
  observer.observe(document.body, { childList: true, subtree: true });

  // [better-falix] hide-console-tabs: Script loaded sucsessfully
  setTimeout(() => {
    console.log('[better-falix] hide-console-tabs: Script loaded sucsessfully');
  }, 10);
});
