(function removeNavbarSupportLinks() {
  const remove = () => {
    const el = document.querySelector('.navbar-support-links');
    if (el) el.remove();
  };
  remove();
  // In case it's dynamically added
  const observer = new MutationObserver(remove);
  observer.observe(document.body, { childList: true, subtree: true });
})();
