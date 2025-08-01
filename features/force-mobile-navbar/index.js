// [better-falix] Force-mobile-navbar: Script loading
console.log('[better-falix] Force-mobile-navbar: Script loading');

chrome.storage.sync.get({ forcemobilenavbar: false, enabled: true }, (data) => {
  if (!data.enabled || !data.forcemobilenavbar) {
    console.log('[better-falix] Force-mobile-navbar: Script disabled');
    return;
  }
  console.log('[better-falix] Force-mobile-navbar: Script enabled');

  //  --------- START FEATURE ----------

});
