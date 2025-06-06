(function hideConsoleFilesCategory() {
  function run() {
    const btn = document.querySelector('button.nav-category[data-category="CONSOLE & FILES"]');
    if (btn) btn.style.display = 'none';
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
