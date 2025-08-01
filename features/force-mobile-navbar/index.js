// [better-falix] Force-mobile-navbar: Script loading
console.log('[better-falix] Force-mobile-navbar: Script loading');

chrome.storage.sync.get({ forcemobilenavbar: false, enabled: true }, (data) => {
  if (!data.enabled || !data.forcemobilenavbar) {
    console.log('[better-falix] Force-mobile-navbar: Script disabled');
    return;
  }
  console.log('[better-falix] Force-mobile-navbar: Script enabled');

  //  --------- START FEATURE ----------

  console.log('[better-falix] Force-mobile-navbar: Starting navbar modification process');
  
  // Function to force mobile navbar behavior
  function forceMobileNavbar() {
    console.log('[better-falix] Force-mobile-navbar: Executing forceMobileNavbar function');
    
    // Find the main sidebar element
    const sidebar = document.getElementById('mainSidebar');
    console.log('[better-falix] Force-mobile-navbar: Found sidebar element:', sidebar);
    
    if (!sidebar) {
      console.warn('[better-falix] Force-mobile-navbar: Main sidebar not found!');
      return false;
    }
    
    console.log('[better-falix] Force-mobile-navbar: Current sidebar classes:', sidebar.className);
    
    // Add mobile-specific classes to force mobile behavior
    console.log('[better-falix] Force-mobile-navbar: Adding mobile-force class');
    sidebar.classList.add('mobile-force');
    
    // Create and inject CSS to force mobile navbar styling
    console.log('[better-falix] Force-mobile-navbar: Creating CSS injection');
    const style = document.createElement('style');
    style.id = 'force-mobile-navbar-styles';
    style.textContent = `
      /* Force mobile navbar behavior - Better Falix Extension */
      #mainSidebar.mobile-force {
        /* Force mobile navbar width and behavior */
        width: 280px !important;
        min-width: 280px !important;
        max-width: 280px !important;
        
        /* Ensure mobile-style positioning */
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        height: 100vh !important;
        z-index: 1050 !important;
        
        /* Mobile navbar background and styling */
        background: var(--navbar-bg, #1a1a1a) !important;
        border-right: 1px solid var(--border-color, #333) !important;
        
        /* Enable auto-hide behavior on mobile */
        transition: transform 0.3s ease-in-out !important;
      }
      
      /* Force mobile navbar content styling */
      #mainSidebar.mobile-force .navbar-content-wrapper {
        height: 100% !important;
        overflow-y: auto !important;
        padding: 0 !important;
      }
      
      /* Force mobile navbar brand header styling */
      #mainSidebar.mobile-force .navbar-brand-container {
        padding: 1rem !important;
        border-bottom: 1px solid var(--border-color, #333) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
      }
      
      /* Force mobile toggle button behavior */
      #mainSidebar.mobile-force .toggle-sidebar {
        display: block !important;
        background: none !important;
        border: none !important;
        color: var(--text-color, #fff) !important;
        font-size: 1.2rem !important;
        cursor: pointer !important;
        padding: 0.5rem !important;
        border-radius: 4px !important;
        transition: background-color 0.2s ease !important;
      }
      
      #mainSidebar.mobile-force .toggle-sidebar:hover {
        background-color: var(--hover-bg, rgba(255,255,255,0.1)) !important;
      }
      
      /* Force mobile navigation sections styling */
      #mainSidebar.mobile-force .nav-section {
        margin-bottom: 0 !important;
      }
      
      #mainSidebar.mobile-force .nav-category {
        width: 100% !important;
        padding: 1rem !important;
        background: none !important;
        border: none !important;
        color: var(--text-color, #fff) !important;
        text-align: left !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        font-size: 0.75rem !important;
        letter-spacing: 0.05em !important;
        cursor: pointer !important;
        transition: background-color 0.2s ease !important;
      }
      
      #mainSidebar.mobile-force .nav-category:hover {
        background-color: var(--hover-bg, rgba(255,255,255,0.05)) !important;
      }
      
      /* Force mobile navigation items styling */
      #mainSidebar.mobile-force .navbar-nav .nav-item .nav-link {
        padding: 0.75rem 1rem 0.75rem 2rem !important;
        color: var(--text-color, #fff) !important;
        text-decoration: none !important;
        display: flex !important;
        align-items: center !important;
        transition: all 0.2s ease !important;
        border-left: 3px solid transparent !important;
      }
      
      #mainSidebar.mobile-force .navbar-nav .nav-item .nav-link:hover {
        background-color: var(--hover-bg, rgba(255,255,255,0.05)) !important;
        border-left-color: var(--accent-color, #007bff) !important;
      }
      
      #mainSidebar.mobile-force .navbar-nav .nav-item .nav-link.active {
        background-color: var(--active-bg, rgba(0,123,255,0.1)) !important;
        border-left-color: var(--accent-color, #007bff) !important;
        color: var(--accent-color, #007bff) !important;
      }
      
      #mainSidebar.mobile-force .navbar-nav .nav-item .nav-link svg {
        margin-right: 0.75rem !important;
        width: 1rem !important;
        height: 1rem !important;
        flex-shrink: 0 !important;
      }
      
      /* Force mobile footer styling */
      #mainSidebar.mobile-force .navbar-footer {
        padding: 1rem !important;
        border-top: 1px solid var(--border-color, #333) !important;
        margin-top: auto !important;
      }
      
      /* Force mobile user profile styling */
      #mainSidebar.mobile-force .navbar-user-profile {
        cursor: pointer !important;
      }
      
      #mainSidebar.mobile-force .profile-container {
        display: flex !important;
        align-items: center !important;
        padding: 0.75rem !important;
        border-radius: 8px !important;
        transition: background-color 0.2s ease !important;
      }
      
      #mainSidebar.mobile-force .profile-container:hover {
        background-color: var(--hover-bg, rgba(255,255,255,0.05)) !important;
      }
      
      /* Force mobile current server info styling */
      #mainSidebar.mobile-force .current-server-info {
        padding: 1rem !important;
        margin-bottom: 1rem !important;
        background-color: var(--server-bg, rgba(0,123,255,0.1)) !important;
        border-radius: 8px !important;
        margin-left: 1rem !important;
        margin-right: 1rem !important;
      }
      
      #mainSidebar.mobile-force .current-server-name {
        font-weight: 600 !important;
        color: var(--accent-color, #007bff) !important;
        font-size: 0.9rem !important;
      }
      
      /* Auto-hide behavior - collapsed state */
      #mainSidebar.mobile-force.collapsed {
        transform: translateX(-100%) !important;
      }
      
      /* Show sidebar when hovering over left edge */
      #mainSidebar.mobile-force.collapsed:hover {
        transform: translateX(0) !important;
      }
      
      /* Overlay for mobile navbar */
      .mobile-navbar-overlay {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background-color: rgba(0, 0, 0, 0.5) !important;
        z-index: 1049 !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transition: opacity 0.3s ease !important;
      }
      
      .mobile-navbar-overlay.active {
        opacity: 1 !important;
        pointer-events: all !important;
      }
      
      /* Adjust main content when navbar is forced to mobile */
      body.mobile-navbar-forced {
        padding-left: 0 !important;
      }
      
      /* Responsive behavior - hide on very small screens */
      @media (max-width: 768px) {
        #mainSidebar.mobile-force {
          transform: translateX(-100%) !important;
        }
        
        #mainSidebar.mobile-force.show {
          transform: translateX(0) !important;
        }
      }
    `;
    
    console.log('[better-falix] Force-mobile-navbar: Injecting CSS styles');
    document.head.appendChild(style);
    
    // Add body class to adjust layout
    console.log('[better-falix] Force-mobile-navbar: Adding body class for layout adjustment');
    document.body.classList.add('mobile-navbar-forced');
    
    // Setup auto-hide behavior
    console.log('[better-falix] Force-mobile-navbar: Setting up auto-hide behavior');
    setupAutoHideBehavior(sidebar);
    
    // Setup toggle button functionality
    console.log('[better-falix] Force-mobile-navbar: Setting up toggle button functionality');
    setupToggleButton(sidebar);
    
    // Create overlay for mobile interactions
    console.log('[better-falix] Force-mobile-navbar: Creating mobile overlay');
    createMobileOverlay(sidebar);
    
    console.log('[better-falix] Force-mobile-navbar: Mobile navbar forced successfully!');
    return true;
  }
  
  // Function to setup auto-hide behavior
  function setupAutoHideBehavior(sidebar) {
    console.log('[better-falix] Force-mobile-navbar: Setting up auto-hide behavior');
    
    let hideTimeout;
    let isHovering = false;
    
    // Auto-hide after inactivity
    function startHideTimer() {
      console.log('[better-falix] Force-mobile-navbar: Starting hide timer');
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        if (!isHovering) {
          console.log('[better-falix] Force-mobile-navbar: Auto-hiding navbar due to inactivity');
          sidebar.classList.add('collapsed');
        }
      }, 3000); // Hide after 3 seconds of inactivity
    }
    
    // Show navbar when mouse enters
    sidebar.addEventListener('mouseenter', () => {
      console.log('[better-falix] Force-mobile-navbar: Mouse entered navbar - showing');
      isHovering = true;
      sidebar.classList.remove('collapsed');
      clearTimeout(hideTimeout);
    });
    
    // Start hide timer when mouse leaves
    sidebar.addEventListener('mouseleave', () => {
      console.log('[better-falix] Force-mobile-navbar: Mouse left navbar - starting hide timer');
      isHovering = false;
      startHideTimer();
    });
    
    // Show navbar when clicking anywhere in the navbar area
    sidebar.addEventListener('click', (e) => {
      console.log('[better-falix] Force-mobile-navbar: Navbar clicked - showing and resetting timer');
      sidebar.classList.remove('collapsed');
      clearTimeout(hideTimeout);
      startHideTimer();
    });
    
    // Initial hide timer
    startHideTimer();
    
    console.log('[better-falix] Force-mobile-navbar: Auto-hide behavior setup complete');
  }
  
  // Function to setup toggle button functionality
  function setupToggleButton(sidebar) {
    console.log('[better-falix] Force-mobile-navbar: Setting up toggle button functionality');
    
    const toggleButton = sidebar.querySelector('.toggle-sidebar');
    console.log('[better-falix] Force-mobile-navbar: Found toggle button:', toggleButton);
    
    if (toggleButton) {
      // Remove existing event listeners by cloning the element
      const newToggleButton = toggleButton.cloneNode(true);
      toggleButton.parentNode.replaceChild(newToggleButton, toggleButton);
      
      newToggleButton.addEventListener('click', (e) => {
        console.log('[better-falix] Force-mobile-navbar: Toggle button clicked');
        e.preventDefault();
        e.stopPropagation();
        
        if (sidebar.classList.contains('collapsed')) {
          console.log('[better-falix] Force-mobile-navbar: Showing navbar via toggle');
          sidebar.classList.remove('collapsed');
        } else {
          console.log('[better-falix] Force-mobile-navbar: Hiding navbar via toggle');
          sidebar.classList.add('collapsed');
        }
      });
      
      console.log('[better-falix] Force-mobile-navbar: Toggle button functionality setup complete');
    } else {
      console.warn('[better-falix] Force-mobile-navbar: Toggle button not found');
    }
  }
  
  // Function to create mobile overlay
  function createMobileOverlay(sidebar) {
    console.log('[better-falix] Force-mobile-navbar: Creating mobile overlay');
    
    // Remove existing overlay if it exists
    const existingOverlay = document.querySelector('.mobile-navbar-overlay');
    if (existingOverlay) {
      console.log('[better-falix] Force-mobile-navbar: Removing existing overlay');
      existingOverlay.remove();
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'mobile-navbar-overlay';
    document.body.appendChild(overlay);
    
    // Show overlay when sidebar is visible on mobile
    function updateOverlay() {
      const isCollapsed = sidebar.classList.contains('collapsed');
      console.log('[better-falix] Force-mobile-navbar: Updating overlay - collapsed:', isCollapsed);
      
      if (window.innerWidth <= 768) {
        if (!isCollapsed) {
          console.log('[better-falix] Force-mobile-navbar: Showing overlay');
          overlay.classList.add('active');
        } else {
          console.log('[better-falix] Force-mobile-navbar: Hiding overlay');
          overlay.classList.remove('active');
        }
      } else {
        console.log('[better-falix] Force-mobile-navbar: Desktop view - hiding overlay');
        overlay.classList.remove('active');
      }
    }
    
    // Click overlay to hide sidebar
    overlay.addEventListener('click', () => {
      console.log('[better-falix] Force-mobile-navbar: Overlay clicked - hiding navbar');
      sidebar.classList.add('collapsed');
      updateOverlay();
    });
    
    // Watch for sidebar class changes
    const observer = new MutationObserver(() => {
      updateOverlay();
    });
    
    observer.observe(sidebar, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // Watch for window resize
    window.addEventListener('resize', updateOverlay);
    
    // Initial update
    updateOverlay();
    
    console.log('[better-falix] Force-mobile-navbar: Mobile overlay created successfully');
  }
  
  // Function to wait for element and retry
  function waitForSidebar(retryCount = 0) {
    console.log(`[better-falix] Force-mobile-navbar: Waiting for sidebar (attempt ${retryCount + 1})`);
    
    const sidebar = document.getElementById('mainSidebar');
    if (sidebar) {
      console.log('[better-falix] Force-mobile-navbar: Sidebar found! Proceeding with modification');
      return forceMobileNavbar();
    }
    
    if (retryCount < 20) { // Max 10 seconds (20 * 500ms)
      console.log('[better-falix] Force-mobile-navbar: Sidebar not found, retrying in 500ms');
      setTimeout(() => waitForSidebar(retryCount + 1), 500);
    } else {
      console.error('[better-falix] Force-mobile-navbar: Failed to find sidebar after maximum retries');
    }
  }
  
  // Start the process
  if (document.readyState === 'loading') {
    console.log('[better-falix] Force-mobile-navbar: Document still loading, waiting for DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[better-falix] Force-mobile-navbar: DOMContentLoaded fired, starting process');
      waitForSidebar();
    });
  } else {
    console.log('[better-falix] Force-mobile-navbar: Document already loaded, starting immediately');
    waitForSidebar();
  }

});
