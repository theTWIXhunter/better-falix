// [better-falix] server-name-button: Script loading
console.log('[better-falix] server-name-button: Script loading');

chrome.storage.sync.get({ enabled: true, serverNameButton: false }, (data) => {
  if (!data.enabled || !data.serverNameButton) {
    console.log('[better-falix] server-name-button: Script disabled');
    return;
  }
  console.log('[better-falix] server-name-button: Script enabled');

  //  --------- START FEATURE ----------

  function makeServerNameClickable() {
    const el = document.querySelector('.current-server-info');
    if (el && !el.dataset.betterFalixClickable) {
      el.style.cursor = 'pointer';
      // Remove any previous click handler by cloning
      const newEl = el.cloneNode(true);
      newEl.style.cursor = 'pointer';
      newEl.addEventListener('click', () => {
        window.location.href = 'https://client.falixnodes.net/';
      });
      newEl.dataset.betterFalixClickable = 'true';
      el.replaceWith(newEl);
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
    console.log('[better-falix] server-name-button: Script loaded sucsessfully');
  }, 10);
});

