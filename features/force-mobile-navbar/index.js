// [better-falix] Force-mobile-navbar: Script loading
console.log('[better-falix] Force-mobile-navbar: Script loading');

chrome.storage.sync.get({ forcemobilenavbar: false, enabled: true }, (data) => {
  if (!data.enabled || !data.forcemobilenavbar) {
    console.log('[better-falix] Force-mobile-navbar: Script disabled');
    return;
  }
  console.log('[better-falix] Force-mobile-navbar: Script enabled');

  //  --------- START FEATURE ----------

  console.log('[better-falix] Force-mobile-navbar: Starting mobile detection override');
  
  // Function to trick the site into thinking it's mobile
  function trickSiteIntoMobileMode() {
    console.log('[better-falix] Force-mobile-navbar: Executing mobile detection override');
    
    // Override window.innerWidth to always report mobile size for navbar logic
    console.log('[better-falix] Force-mobile-navbar: Original window.innerWidth:', window.innerWidth);
    
    // Store the original descriptor
    const originalDescriptor = Object.getOwnPropertyDescriptor(Window.prototype, 'innerWidth') || 
                             Object.getOwnPropertyDescriptor(window, 'innerWidth');
    
    console.log('[better-falix] Force-mobile-navbar: Original descriptor found:', !!originalDescriptor);
    
    // Override innerWidth to return mobile size (under 1200px threshold)
    Object.defineProperty(window, 'innerWidth', {
      get: function() {
        console.log('[better-falix] Force-mobile-navbar: innerWidth accessed, returning mobile size');
        return 1199; // Just under the 1200px threshold for mobile
      },
      configurable: true
    });
    
    console.log('[better-falix] Force-mobile-navbar: window.innerWidth override applied');
    console.log('[better-falix] Force-mobile-navbar: New window.innerWidth:', window.innerWidth);
    
    // Also override screen.width for extra safety
    if (window.screen && window.screen.width) {
      console.log('[better-falix] Force-mobile-navbar: Original screen.width:', window.screen.width);
      
      Object.defineProperty(window.screen, 'width', {
        get: function() {
          console.log('[better-falix] Force-mobile-navbar: screen.width accessed, returning mobile size');
          return 1199;
        },
        configurable: true
      });
      
      console.log('[better-falix] Force-mobile-navbar: screen.width override applied');
    }
    
    // Force mobile navbar CSS to ensure proper styling
    console.log('[better-falix] Force-mobile-navbar: Injecting mobile navbar CSS');
    const style = document.createElement('style');
    style.id = 'force-mobile-navbar-styles';
    style.textContent = `
      /* Force mobile navbar behavior - Better Falix Extension */
      
      /* Ensure navbar is always in mobile mode */
      #mainSidebar {
        /* Mobile navbar positioning and behavior */
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 280px !important;
        height: 100vh !important;
        z-index: 1050 !important;
        transform: translateX(-100%) !important;
        transition: transform 0.3s ease-in-out !important;
      }
      
      /* Show navbar when it has the 'show' class (mobile behavior) */
      #mainSidebar.show {
        transform: translateX(0) !important;
      }
      
      /* Ensure main content doesn't have left margin (mobile behavior) */
      .content {
        margin-left: 0 !important;
        padding-left: 0 !important;
      }
      
      /* Override any desktop collapse behavior */
      #mainSidebar.collapsed {
        /* Don't use desktop collapsed styles, use mobile hidden instead */
        width: 280px !important;
        transform: translateX(-100%) !important;
      }
      
      /* Ensure desktop collapse doesn't apply */
      .collapsed-content {
        margin-left: 0 !important;
      }
      
      /* Mobile navbar overlay */
      .navbar-overlay {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background-color: rgba(0, 0, 0, 0.5) !important;
        z-index: 1049 !important;
        opacity: 0 !important;
        visibility: hidden !important;
        transition: opacity 0.3s ease, visibility 0.3s ease !important;
      }
      
      .navbar-overlay.show {
        opacity: 1 !important;
        visibility: visible !important;
      }
      
      /* Auto-hide functionality */
      #mainSidebar.auto-hide {
        /* Add smooth transitions for auto-hide */
        transition: transform 0.3s ease-in-out !important;
      }
      
      #mainSidebar.auto-hide:not(:hover):not(.keep-visible) {
        /* Auto-hide after delay */
        transform: translateX(-100%) !important;
      }
      
      /* Keep visible when user is interacting */
      #mainSidebar.keep-visible {
        transform: translateX(0) !important;
      }
    `;
    
    document.head.appendChild(style);
    console.log('[better-falix] Force-mobile-navbar: Mobile navbar CSS injected');
    
    // Wait for the NavbarManager to initialize, then enhance it
    console.log('[better-falix] Force-mobile-navbar: Waiting for navbar initialization');
    const checkForNavbarManager = () => {
      const sidebar = document.getElementById('mainSidebar');
      if (sidebar && sidebar.classList.contains('initialized')) {
        console.log('[better-falix] Force-mobile-navbar: Navbar initialized, enhancing with auto-hide');
        enhanceMobileNavbar(sidebar);
      } else {
        console.log('[better-falix] Force-mobile-navbar: Navbar not ready, retrying...');
        setTimeout(checkForNavbarManager, 100);
      }
    };
    
    checkForNavbarManager();
    
    console.log('[better-falix] Force-mobile-navbar: Mobile detection override complete');
    return true;
  }
  
  // Function to enhance the mobile navbar with auto-hide behavior
  function enhanceMobileNavbar(sidebar) {
    console.log('[better-falix] Force-mobile-navbar: Enhancing mobile navbar with auto-hide');
    
    // Add auto-hide class
    sidebar.classList.add('auto-hide');
    
    let hideTimeout;
    let isInteracting = false;
    
    // Auto-hide timer function
    function startAutoHideTimer() {
      console.log('[better-falix] Force-mobile-navbar: Starting auto-hide timer');
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        if (!isInteracting && sidebar.classList.contains('show')) {
          console.log('[better-falix] Force-mobile-navbar: Auto-hiding navbar');
          sidebar.classList.remove('show', 'keep-visible');
          // Also hide the overlay if it exists
          const overlay = document.querySelector('.navbar-overlay');
          if (overlay) overlay.classList.remove('show');
        }
      }, 3000); // Hide after 3 seconds
    }
    
    // Mouse enter - show and stop auto-hide
    sidebar.addEventListener('mouseenter', () => {
      console.log('[better-falix] Force-mobile-navbar: Mouse entered navbar');
      isInteracting = true;
      sidebar.classList.add('show', 'keep-visible');
      clearTimeout(hideTimeout);
    });
    
    // Mouse leave - start auto-hide timer
    sidebar.addEventListener('mouseleave', () => {
      console.log('[better-falix] Force-mobile-navbar: Mouse left navbar');
      isInteracting = false;
      sidebar.classList.remove('keep-visible');
      startAutoHideTimer();
    });
    
    // Click inside navbar - reset auto-hide timer
    sidebar.addEventListener('click', (e) => {
      console.log('[better-falix] Force-mobile-navbar: Navbar clicked');
      sidebar.classList.add('keep-visible');
      clearTimeout(hideTimeout);
      startAutoHideTimer();
    });
    
    // Show navbar when hovering near left edge of screen
    document.addEventListener('mousemove', (e) => {
      if (e.clientX <= 10 && !sidebar.classList.contains('show')) {
        console.log('[better-falix] Force-mobile-navbar: Mouse near left edge, showing navbar');
        sidebar.classList.add('show');
        startAutoHideTimer();
      }
    });
    
    // Handle topNavToggle button (mobile menu button)
    const topNavToggle = document.getElementById('topNavbarToggle');
    if (topNavToggle) {
      console.log('[better-falix] Force-mobile-navbar: Enhancing mobile toggle button');
      
      // Override the existing click handler
      topNavToggle.addEventListener('click', (e) => {
        console.log('[better-falix] Force-mobile-navbar: Mobile toggle clicked');
        if (sidebar.classList.contains('show')) {
          startAutoHideTimer();
        }
      });
    }
    
    // Start initial auto-hide timer if sidebar is showing
    if (sidebar.classList.contains('show')) {
      startAutoHideTimer();
    }
    
    console.log('[better-falix] Force-mobile-navbar: Mobile navbar enhancement complete');
  }
  
  // Start the mobile detection override immediately
  console.log('[better-falix] Force-mobile-navbar: Starting immediately');
  trickSiteIntoMobileMode();

});
