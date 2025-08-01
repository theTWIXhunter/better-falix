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
  
  // Apply mobile detection override IMMEDIATELY before any other scripts run
  console.log('[better-falix] Force-mobile-navbar: Applying immediate mobile detection override');
  
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
  
  // Function to trick the site into thinking it's mobile
  function trickSiteIntoMobileMode() {
    console.log('[better-falix] Force-mobile-navbar: Executing mobile detection override');
    
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
      
      /* Force show navbar when hovering left edge */
      .show-navbar-trigger {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 20px !important;
        height: 100vh !important;
        z-index: 1051 !important;
        background: transparent !important;
        pointer-events: auto !important;
      }
    `;
    
    document.head.appendChild(style);
    console.log('[better-falix] Force-mobile-navbar: Mobile navbar CSS injected');
    
    // Create a trigger area to show navbar
    console.log('[better-falix] Force-mobile-navbar: Creating navbar trigger area');
    const triggerArea = document.createElement('div');
    triggerArea.className = 'show-navbar-trigger';
    triggerArea.title = 'Hover to show navbar';
    document.body.appendChild(triggerArea);
    
    // Add hover listener to trigger area
    triggerArea.addEventListener('mouseenter', () => {
      console.log('[better-falix] Force-mobile-navbar: Trigger area hovered, showing navbar');
      const sidebar = document.getElementById('mainSidebar');
      if (sidebar) {
        sidebar.classList.add('show');
        console.log('[better-falix] Force-mobile-navbar: Navbar shown via trigger');
      }
    });
    
    console.log('[better-falix] Force-mobile-navbar: Trigger area created');
    
    // Wait for the NavbarManager to initialize, then enhance it
    console.log('[better-falix] Force-mobile-navbar: Waiting for navbar initialization');
    const checkForNavbarManager = () => {
      const sidebar = document.getElementById('mainSidebar');
      if (sidebar) {
        console.log('[better-falix] Force-mobile-navbar: Sidebar found, enhancing with auto-hide');
        enhanceMobileNavbar(sidebar);
      } else {
        console.log('[better-falix] Force-mobile-navbar: Sidebar not ready, retrying...');
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
    
    let hideTimeout;
    
    // Auto-hide timer function
    function startAutoHideTimer() {
      console.log('[better-falix] Force-mobile-navbar: Starting auto-hide timer');
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        if (sidebar.classList.contains('show')) {
          console.log('[better-falix] Force-mobile-navbar: Auto-hiding navbar');
          sidebar.classList.remove('show');
          // Update hamburger icon if it exists
          const topNavToggle = document.getElementById('topNavbarToggle');
          if (topNavToggle) {
            const icon = topNavToggle.querySelector('i');
            if (icon) {
              icon.className = 'fa-solid fa-bars';
            }
          }
        }
      }, 3000); // Hide after 3 seconds
    }
    
    // Reset timer when hovering navbar
    sidebar.addEventListener('mouseenter', () => {
      console.log('[better-falix] Force-mobile-navbar: Mouse entered navbar - pausing auto-hide');
      clearTimeout(hideTimeout);
    });
    
    // Start timer when leaving navbar
    sidebar.addEventListener('mouseleave', () => {
      console.log('[better-falix] Force-mobile-navbar: Mouse left navbar - resuming auto-hide');
      if (sidebar.classList.contains('show')) {
        startAutoHideTimer();
      }
    });
    
    // Click inside navbar - reset auto-hide timer
    sidebar.addEventListener('click', (e) => {
      console.log('[better-falix] Force-mobile-navbar: Navbar clicked');
      sidebar.classList.add('keep-visible');
      clearTimeout(hideTimeout);
      startAutoHideTimer();
    });
    
    // Handle topNavToggle button (mobile menu button)
    const topNavToggle = document.getElementById('topNavbarToggle');
    if (topNavToggle) {
      console.log('[better-falix] Force-mobile-navbar: Adding auto-hide to hamburger button');
      topNavToggle.addEventListener('click', () => {
        setTimeout(() => {
          if (sidebar.classList.contains('show')) {
            console.log('[better-falix] Force-mobile-navbar: Navbar shown via hamburger - starting auto-hide timer');
            startAutoHideTimer();
          }
        }, 100);
      });
    }
    
    // Start with navbar hidden initially
    console.log('[better-falix] Force-mobile-navbar: Starting with navbar hidden');
    sidebar.classList.remove('show');
    
    console.log('[better-falix] Force-mobile-navbar: Mobile navbar enhancement complete');
  }
  
  // Start the mobile detection override immediately
  console.log('[better-falix] Force-mobile-navbar: Starting immediately');
  trickSiteIntoMobileMode();

});
