chrome.storage.sync.get('removeExternalStartNav', ({ removeExternalStartNav }) => {
  if (!removeExternalStartNav) {
    console.log('[better-falix] Remove External Start Nav: feature disabled');
    return;
  }
  function hideExternalStartNav() {
    // Find all nav-link spans and look for "Remote Startup"
    const spans = Array.from(document.querySelectorAll('.nav-item .nav-link span'));
    console.log('[better-falix] Found nav-link spans:', spans.map(s => s.textContent.trim()));
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
    document.addEventListener('DOMContentLoaded', hideExternalStartNav);
  } else {
    hideExternalStartNav();
  }
});
