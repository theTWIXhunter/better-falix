// [better-falix] Fix-collapesed-navbar-icon: Script loading
console.log('[better-falix] Fix-collapesed-navbar-icon: Script loading');

chrome.storage.sync.get({ fixcollapesnavbaricon: false, enabled: true }, (data) => {
  if (!data.enabled || !data.fixcollapesnavbaricon) {
    console.log('[better-falix] Fix-collapesed-navbar-icon: Script disabled');
    return;
  }
  console.log('[better-falix] Fix-collapesed-navbar-icon: Script enabled');

  // --------- START FEATURE ----------
  function hideImageWhenCollapes() {
    const sidebar = document.getElementById('mainSidebar');
    if (!sidebar) return;
    const brand = sidebar.querySelector('.navbar-brand');
    if (!brand) return;
    if (sidebar.classList.contains('collapsed')) {
      brand.style.display = 'none';
    } else {
      brand.style.display = '';
    }
  }

  // Initial check
  hideImageWhenCollapes();

  // Listen for sidebar class changes (collapse/expand)
  const sidebar = document.getElementById('mainSidebar');
  if (sidebar) {
    const observer = new MutationObserver(updateBrandVisibility);
    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
  }

  // [better-falix] Fix-collapesed-navbar-icon: Script loaded sucsessfully
  setTimeout(() => {
    console.log('[better-falix] Fix-collapesed-navbar-icon: Script loaded sucsessfully');
  }, 10);
});