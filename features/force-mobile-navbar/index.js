// [better-falix] force-mobile-navbar: Script loading
console.log('[better-falix] Force-mobile-navbar: Script loading');

chrome.storage.sync.get({ forcemobilenavbar: false, enabled: true }, (data) => {
  if (!data.enabled || !data.forcemobilenavbar) {
    console.log('[better-falix] Force-mobile-navbar: Script disabled');
    return;
  }
  console.log('[better-falix] force mobile navbar: Script enabled');

  //  --------- START FEATURE ----------
  function forceMobileNavbar() {
    // Remove the desktop sidebar if present
    const sidebar = document.querySelector('.navbar-vertical');
    if (sidebar) {
      sidebar.remove();
      console.log('[better-falix] force-mobile-navbar: Removed desktop sidebar');
    }

    // Show the mobile navbar if hidden
    const topNavbar = document.querySelector('.top-navbar');
    if (topNavbar) {
      topNavbar.style.display = '';
      topNavbar.classList.remove('d-none');
      console.log('[better-falix] force-mobile-navbar: Mobile navbar shown');
    }

    // Optionally add a class to <body> for mobile tweaks
    document.body.classList.add('bf-force-mobile-navbar');
  }

  // Wait for DOMContentLoaded if needed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceMobileNavbar);
  } else {
    forceMobileNavbar();
  }

  console.log('[better-falix] force-mobile-navbar: Script loaded successfully');
});

