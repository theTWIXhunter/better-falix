// [better-falix] navbarhover: Script loading
console.log('[Better-Falix] navbarhover: Script loading');

chrome.storage.sync.get({ navbarHover: false, navbarHoverZoneWidth: 30, enabled: true }, (data) => {
  if (!data.enabled || !data.navbarHover) {
    console.log('[Better-Falix] navbarhover: Script disabled');
    return;
  }
  console.log('[Better-Falix] navbarhover: Script enabled');

  // --------- START FEATURE ----------

  function getSidebar() {
    return document.getElementById('mainSidebar');
  }

  // Create a hover zone at the left edge of the screen
  const hoverZone = document.createElement('div');
  hoverZone.style.position = 'fixed';
  hoverZone.style.left = '0';
  hoverZone.style.top = '0';
  hoverZone.style.width = (parseInt(data.navbarHoverZoneWidth, 10) || 30) + 'px';
  hoverZone.style.height = '100vh';
  hoverZone.style.zIndex = '9999';
  hoverZone.style.background = 'transparent';
  hoverZone.style.pointerEvents = 'auto';

  document.body.appendChild(hoverZone);

  let navOpenedByFeature = false;
  let closeTimeout = null;

  function isSidebarCollapsed(sidebar) {
    return sidebar.classList.contains('collapsed');
  }

  function isSidebarMobileOpen(sidebar) {
    return sidebar.classList.contains('show');
  }

  function openSidebar() {
    const sidebar = getSidebar();
    if (!sidebar) return;
    // Desktop: remove 'collapsed'
    if (window.innerWidth >= 1200) {
      if (isSidebarCollapsed(sidebar)) {
        sidebar.classList.remove('collapsed');
        navOpenedByFeature = true;
        console.log('[Better-Falix] open navigation hover: Sidebar opened (desktop)');
      }
    } else {
      // Mobile: add 'show'
      if (!isSidebarMobileOpen(sidebar)) {
        sidebar.classList.add('show');
        navOpenedByFeature = true;
        console.log('[Better-Falix] open navigation hover: Sidebar opened (mobile)');
      }
    }
  }

  function closeSidebar() {
    const sidebar = getSidebar();
    if (!sidebar) return;
    if (!navOpenedByFeature) return;
    // Desktop: add 'collapsed'
    if (window.innerWidth >= 1200) {
      if (!isSidebarCollapsed(sidebar)) {
        sidebar.classList.add('collapsed');
        navOpenedByFeature = false;
        console.log('[Better-Falix] open navigation hover: Sidebar closed (desktop)');
      }
    } else {
      // Mobile: remove 'show'
      if (isSidebarMobileOpen(sidebar)) {
        sidebar.classList.remove('show');
        navOpenedByFeature = false;
        console.log('[Better-Falix] open navigation hover: Sidebar closed (mobile)');
      }
    }
  }

  hoverZone.addEventListener('mouseenter', () => {
    openSidebar();
    if (closeTimeout) clearTimeout(closeTimeout);
  });

  hoverZone.addEventListener('mouseleave', () => {
    // Only close if mouse is not over sidebar
    closeTimeout = setTimeout(() => {
      const sidebar = getSidebar();
      if (!sidebar) return;
      // If mouse is not over sidebar, close
      if (!sidebar.matches(':hover')) {
        closeSidebar();
      }
    }, 300);
  });

  function attachSidebarListeners() {
    const sidebar = getSidebar();
    if (!sidebar) return;
    // Remove previous listeners if any (by cloning)
    const newSidebar = sidebar.cloneNode(true);
    sidebar.parentNode.replaceChild(newSidebar, sidebar);

    newSidebar.addEventListener('mouseleave', () => {
      closeTimeout = setTimeout(() => {
        // If mouse is not over hoverZone, close
        if (!hoverZone.matches(':hover')) {
          closeSidebar();
        }
      }, 300);
    });
    newSidebar.addEventListener('mouseenter', () => {
      if (closeTimeout) clearTimeout(closeTimeout);
    });
  }

  // Attach listeners now and on DOMContentLoaded in case sidebar is loaded later
  attachSidebarListeners();
  document.addEventListener('DOMContentLoaded', attachSidebarListeners);

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    hoverZone.remove();
  });

  console.log('[Better-Falix] open navigation hover: Script loaded successfully');
});
