// [better-falix] itsjust-Geyser: Script loading
console.log('[better-falix] itsjust-Geyser: Script loading');

chrome.storage.sync.get({ enabled: true, itsJustGeyser: false }, (data) => {
  if (!data.enabled || !data.itsJustGeyser) {
    console.log('[better-falix] itsjust-Geyser: Script disabled');
    return;
  }
  console.log('[better-falix] itsjust-Geyser: Script enabled');

  //  --------- START FEATURE ----------

  function updateGeyserOption() {
    const options = document.querySelectorAll('option[value="Java + Bedrock Support (Geyser)"]');
    options.forEach(opt => {
      opt.textContent = "Geyser";
    });
  }

  function runWithRetry() {
    updateGeyserOption();
    setTimeout(updateGeyserOption, 500);
    setTimeout(updateGeyserOption, 1500);
    setTimeout(updateGeyserOption, 3000);
    setTimeout(() => {
      console.log('[better-falix] itsjust-Geyser: Script loaded successfully');
    }, 10);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runWithRetry);
  } else {
    runWithRetry();
  }
});
