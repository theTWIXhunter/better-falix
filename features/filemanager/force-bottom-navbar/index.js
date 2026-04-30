// [better-falix] Force Bottom Navbar: Script loading
console.log('[better-falix] Force Bottom Navbar: Script loading');

chrome.storage.sync.get({ forceBottomNavbar: false, enabled: true }, (data) => {
  if (!data.enabled || !data.forceBottomNavbar) {
    console.log('[better-falix] Force Bottom Navbar: Script disabled');
    return;
  }
  console.log('[better-falix] Force Bottom Navbar: Script enabled');

  // --------- START FEATURE ----------
  const styleId = 'bf-force-bottom-navbar-style';
  
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      #floatingBottomNavbar {
        display: flex !important;
      }
    `;
    document.head.appendChild(style);
    console.log('[better-falix] Force Bottom Navbar: Applied CSS');
  }

  // Enforce "show" class
  function enforceShowClass() {
    const navbar = document.getElementById('floatingBottomNavbar');
    if (!navbar) return;

    if (!navbar.classList.contains('show')) {
      navbar.classList.add('show');
    }

    if (!navbar.dataset.bfObserverAttached) {
      navbar.dataset.bfObserverAttached = 'true';
      const classObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class' && !navbar.classList.contains('show')) {
            navbar.classList.add('show');
          }
        });
      });
      classObserver.observe(navbar, { attributes: true, attributeFilter: ['class'] });
    }
  }

  enforceShowClass();

  // Watch for the element to be added to the DOM if it's not there yet
  const domObserver = new MutationObserver(() => {
    if (document.getElementById('floatingBottomNavbar')) {
      enforceShowClass();
    }
  });
  domObserver.observe(document.documentElement, { childList: true, subtree: true });
  // --------- END FEATURE ----------
});
