// [better-falix] remove-external-start-nav: Script loading
console.log('[better-falix] remove-external-start-nav: Script loading');

chrome.storage.sync.get({ enabled: true, ARCHIVED_removeExternalStartNav: false }, (data) => {
  if (!data.enabled || !data.ARCHIVED_removeExternalStartNav) {
    console.log('[better-falix] remove-external-start-nav: Script disabled');
    return;
  }
  console.log('[better-falix] remove-external-start-nav: Script enabled');

  //  --------- START FEATURE ----------

  function hideExternalStartNav() {
    //console.log('[better-falix] hideExternalStartNav called');
    // Find all nav-link spans and look for "Remote Startup"
    const spans = Array.from(document.querySelectorAll('.nav-item .nav-link span'));
    //console.log('[better-falix] Found nav-link spans:', spans.map(s => s.textContent.trim()));
    const remoteStartupItem = spans.find(span =>
      span.textContent.trim().toLowerCase() === 'remote startup'
    )?.closest('.nav-item');
    if (remoteStartupItem) {
      remoteStartupItem.style.display = 'none';
      console.log('[better-falix] Remote Startup nav item hidden');
    } else {
      console.log('[better-falix] Remote Startup nav item NOT found');
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[better-falix] DOMContentLoaded event fired');
      hideExternalStartNav();
    });
  } else {
    hideExternalStartNav();
  }

  setTimeout(() => {
    console.log('[better-falix] remove-external-start-nav: Script loaded successfully');
  }, 10);
});
