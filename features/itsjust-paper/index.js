chrome.storage.sync.get({ enabled: true, itsjustPaper: false }, (data) => {
  if (!data.enabled || !data.itsjustPaper) return;

  function updatePaperOption() {
    document.querySelectorAll('option[value="paperspigot"]').forEach(opt => {
      if (opt.textContent.trim() === "Craftbukkit / Spigot / PaperSpigot") {
        opt.textContent = "Paper";
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updatePaperOption);
  } else {
    updatePaperOption();
  }
});
