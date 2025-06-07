// [itsjust-paper] Make sure this script is loaded and runs on the correct page!
console.log('[itsjust-paper] Script loaded');

// DEBUG: Check if running on the correct URL
console.log('[itsjust-paper] location.href:', window.location.href);

chrome.storage.sync.get({ enabled: true, itsjustPaper: false }, (data) => {
  console.log('[itsjust-paper] chrome.storage.sync.get', data);
  if (!data.enabled || !data.itsjustPaper) {
    console.log('[itsjust-paper] Feature or extension disabled');
    return;
  }

  function updatePaperOption() {
    console.log('[itsjust-paper] Running updatePaperOption');
    const options = document.querySelectorAll('option[value="paperspigot"]');
    if (options.length === 0) {
      console.log('[itsjust-paper] No options found with value="paperspigot"');
    }
    options.forEach(opt => {
      console.log('[itsjust-paper] Changing option:', opt);
      opt.textContent = "Paper";
    });
  }

  // Try running after DOMContentLoaded and again after a short delay in case the options are loaded dynamically
  function runWithRetry() {
    updatePaperOption();
    setTimeout(updatePaperOption, 500);
    setTimeout(updatePaperOption, 1500);
    setTimeout(updatePaperOption, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runWithRetry);
  } else {
    runWithRetry();
  }
});
