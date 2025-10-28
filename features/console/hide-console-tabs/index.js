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
  
  // Rerun at document_idle for consistency
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideTabs);
  } else if (document.readyState === 'interactive') {
    // Wait for complete
    window.addEventListener('load', hideTabs);
  }
  
  const observer = new MutationObserver(hideTabs);
  observer.observe(document.body, { childList: true, subtree: true });

  // [better-falix] hide-console-tabs: Script loaded sucsessfully
  setTimeout(() => {
    console.log('[better-falix] hide-console-tabs: Script loaded successfully');
  }, 10);
});
