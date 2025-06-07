chrome.storage.sync.get({ enabled: true, itsjustPaper: false }, (data) => {
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updatePaperOption);
  } else {
    updatePaperOption();
  }
});
