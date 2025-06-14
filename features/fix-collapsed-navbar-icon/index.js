// [better-falix] Fix-collapesed-navbar-icon: Script loading
console.log('[better-falix] Fix-collapesed-navbar-icon: Script loading');

chrome.storage.sync.get({ fixcollapesnavbaricon: false, enabled: true }, (data) => {
  if (!data.enabled || !data.fixcollapesnavbaricon) {
    console.log('[better-falix] Fix-collapesed-navbar-icon: Script disabled');
    return;
  }
  console.log('[better-falix] Fix-collapesed-navbar-icon: Script enabled');

  // --------- START FEATURE ----------
  function isSidebarCollapsed(sidebar) {
    return sidebar.classList.contains('collapsed');
  }
  function isSidebarMobileOpen(sidebar) {
    return sidebar.classList.contains('show');
  }
  function updateBrandVisibility() {
    const sidebar = document.getElementById('mainSidebar');
    if (!sidebar) return;
    const brand = sidebar.querySelector('.navbar-brand');
    if (!brand) return;
    // Only care about desktop/collapsed state, ignore mobile "show"
    if (window.innerWidth >= 1200) {
      brand.style.display = isSidebarCollapsed(sidebar) ? 'none' : '';
    } else {
      brand.style.display = '';
    }
  }

  // Initial check
  updateBrandVisibility();

  // Listen for sidebar class changes (collapse/expand)
  const sidebar = document.getElementById('mainSidebar');
  if (sidebar) {
    const observer = new MutationObserver(updateBrandVisibility);
    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
  }
  // Also update on window resize (desktop/mobile switch)
  window.addEventListener('resize', updateBrandVisibility);

  // [better-falix] Fix-collapesed-navbar-icon: Script loaded sucsessfully
  setTimeout(() => {
    console.log('[better-falix] Fix-collapesed-navbar-icon: Script loaded sucsessfully');
  }, 10);
});