// [better-falix] itsjust-geyser: Script loading
console.log('[better-falix] itsjust-geyser: Script loading');

chrome.storage.sync.get({ enabled: true, itsjustGeyser: false }, (data) => {
  if (!data.enabled || !data.itsjustgeyser) {
    console.log('[better-falix] itsjust-geyser: Script disabled');
    return;
  }
  console.log('[better-falix] itsjust-geyser: Script enabled');

  //  --------- START FEATURE ----------

  function updatePaperOption() {
    const options = document.querySelectorAll('option[value="Java + Bedrock Support (Geyser)"]');
    options.forEach(opt => {
      opt.textContent = "geyser";
    });
  }

  function runWithRetry() {
    updatePaperOption();
    setTimeout(updatePaperOption, 500);
    setTimeout(updatePaperOption, 1500);
    setTimeout(updatePaperOption, 3000);
    setTimeout(() => {
      console.log('[better-falix] itsjust-geyser: Script loaded successfully');
    }, 10);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runWithRetry);
  } else {
    runWithRetry();
  }
});
