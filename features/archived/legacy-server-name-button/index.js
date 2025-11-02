// [better-falix] server-name-button: Script loading
console.log('[better-falix] server-name-button: Script loading');

chrome.storage.sync.get({ enabled: true, ARCHIVED_serverNameButton: false }, (data) => {
  if (!data.enabled || !data.ARCHIVED_serverNameButton) {
    console.log('[better-falix] server-name-button: Script disabled');
    return;
  }
  console.log('[better-falix] server-name-button: Script enabled');

  //  --------- START FEATURE ----------

  const attached = new WeakSet();

  function makeServerNameClickable() {
    const el = document.querySelector('.current-server-info');
    if (el && !attached.has(el)) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        window.location.href = 'https://client.falixnodes.net/';
      });
      attached.add(el);
    }
  }

  // Initial run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', makeServerNameClickable);
  } else {
    makeServerNameClickable();
  }

  // Observe DOM changes to re-apply if needed
  const observer = new MutationObserver(() => {
    makeServerNameClickable();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] server-name-button: Script loaded successfully');
  }, 10);
});

