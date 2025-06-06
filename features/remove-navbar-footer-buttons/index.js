(function removeNavbarFooterButtons() {
  const remove = () => {
    const el = document.querySelector('.navbar-user-profile');
    if (el) el.remove();
  };
  remove();
  // In case it's dynamically added
  const observer = new MutationObserver(remove);
  observer.observe(document.body, { childList: true, subtree: true });
})();
