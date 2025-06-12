// [better-falix] Fix-checkbox-icon: Script loading
console.log('[better-falix] Fix-checkbox-icon: Script loading');

chrome.storage.sync.get({ fixcheckboxicon: false, enabled: true }, (data) => {
  if (!data.enabled || !data.fixcheckboxicon) {
    console.log('[better-falix] Fix-checkbox-icon: Script disabled');
    return;
  }
  console.log('[better-falix] Fix-checkbox-icon: Script enabled');

  // --------- START FEATURE ----------

  // Helper to copy checkbox styles
  function copyCheckboxStyles(src, dest) {
    // Copy classes from src to dest, except for unique ones
    const srcClasses = Array.from(src.classList);
    dest.classList.forEach(cls => {
      if (!srcClasses.includes(cls) && cls !== 'mass-action-check') dest.classList.remove(cls);
    });
    srcClasses.forEach(cls => {
      if (cls !== 'mass-action-check') dest.classList.add(cls);
    });
    // Copy inline styles if any (rare for checkboxes)
    dest.style.cssText = src.style.cssText;
  }

  function fixMassActionCheckboxes() {
    const main = document.getElementById('checkAllCheckBox');
    if (!main) return;
    const massChecks = document.querySelectorAll('.mass-action-check.form-check-input');
    massChecks.forEach(cb => {
      copyCheckboxStyles(main, cb);
    });
  }

  // Initial fix
  fixMassActionCheckboxes();

  // Observe DOM for new checkboxes (filemanager is dynamic)
  const observer = new MutationObserver(() => {
    fixMassActionCheckboxes();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Also fix on change of main checkbox (in case style changes)
  const main = document.getElementById('checkAllCheckBox');
  if (main) {
    main.addEventListener('change', fixMassActionCheckboxes);
  }

  // [better-falix] Fix-checkbox-icon: Script loaded sucsessfully
  setTimeout(() => {
    console.log('[better-falix] Fix-checkbox-icon: Script loaded sucsessfully');
  }, 10);
});