// [better-falix] itsjust-paper: Script loading
console.log('[better-falix] itsjust-paper: Script loading');

chrome.storage.sync.get({ enabled: true, itsjustPaper: false }, (data) => {
  if (!data.enabled || !data.itsjustPaper) {
    console.log('[better-falix] itsjust-paper: Script disabled');
    return;
  }
  console.log('[better-falix] itsjust-paper: Script enabled');

  //  --------- START FEATURE ----------

  function updatePaperOption() {
    const options = document.querySelectorAll('option[value="paperspigot"]');
    options.forEach(opt => {
      opt.textContent = "Paper";
    });
  }

  function runWithRetry() {
    updatePaperOption();
    setTimeout(updatePaperOption, 500);
    setTimeout(updatePaperOption, 1500);
    setTimeout(updatePaperOption, 3000);
    setTimeout(() => {
      console.log('[better-falix] itsjust-paper: Script loaded successfully');
    }, 10);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runWithRetry);
  } else {
    runWithRetry();
  }
});
