// [better-falix] file-history: Script loading
console.log('[better-falix] file-history: Script loading');

chrome.storage.sync.get({ fileHistory: false, enabled: true }, (data) => {
  if (!data.enabled || !data.fileHistory) {
    console.log('[better-falix] file-history: Script disabled');
    return;
  }
  console.log('[better-falix] file-history: Script enabled');

  //  --------- START FEATURE ----------

},)