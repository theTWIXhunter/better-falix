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
    if (el) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        window.location.href = 'https://client.falixnodes.net/';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', makeServerNameClickable);
  } else {
    makeServerNameClickable();
  }

  setTimeout(() => {
    console.log('[better-falix] server-name-button: Script loaded sucsessfully');
  }, 10);
});

