// [better-falix] clean-server-list: Script loading
console.log('[better-falix] clean-server-list: Script loading');

chrome.storage.sync.get({ cleanServerList: false, cleanServerList_padding: 8, enabled: true }, (data) => {
  if (!data.enabled || !data.cleanServerList) {
    console.log('[better-falix] clean-server-list: Script disabled');
    return;
  }
  console.log('[better-falix] clean-server-list: Script enabled');

  //  --------- START FEATURE ----------

  function applyCleanServerList() {
    // 1. Extract header-controls from server-table-header and move to page-header-modern
    const serverTableHeader = document.querySelector('.server-table-header');
    if (serverTableHeader) {
      const headerControls = serverTableHeader.querySelector('.header-controls');
      if (headerControls) {
        const pageHeaderModern = document.querySelector('.page-header-modern');
        if (pageHeaderModern) {
          // Ensure page-header-modern displays flex and aligns items properly
          pageHeaderModern.style.display = 'flex';
          pageHeaderModern.style.alignItems = 'center';
          pageHeaderModern.style.justifyContent = 'space-between';
          pageHeaderModern.style.gap = '16px';
          
          // Ensure header-title doesn't take full width
          const headerTitle = pageHeaderModern.querySelector('.header-title');
          if (headerTitle) {
            headerTitle.style.flex = '0 1 auto';
          }
          
          // Clone or move the header-controls element
          const controlsClone = headerControls.cloneNode(true);
          controlsClone.style.flex = '0 0 auto';
          pageHeaderModern.appendChild(controlsClone);
          console.log('[better-falix] clean-server-list: Moved .header-controls to .page-header-modern');
        }
      }
      // Remove the server-table-header
      serverTableHeader.remove();
      console.log('[better-falix] clean-server-list: Removed .server-table-header');
    }

    // 2. Find all server-row-link elements
    const serverRowLinks = document.querySelectorAll('.server-row-link');
    
    if (serverRowLinks && serverRowLinks.length > 0) {
      const spacing = data.cleanServerList_padding || 8;
      // Add spacing between server-row-link elements and apply container styles
      serverRowLinks.forEach((link, index) => {
        // Check if the child .server-row has search-hidden class
        const serverRow = link.querySelector('.server-row');
        const isHidden = serverRow && serverRow.classList.contains('search-hidden');
        
        if (!isHidden) {
          link.style.setProperty('padding', '0px', 'important');
          // Add margin-bottom to all except the last one
          if (index < serverRowLinks.length - 1) {
            link.style.setProperty('margin-bottom', spacing + 'px', 'important');
          }
          // Add servers-container class to each server-row-link
          if (!link.classList.contains('servers-container')) {
            link.classList.add('servers-container');
          }
        } else {
          // Remove servers-container class from hidden elements
          link.classList.remove('servers-container');
          link.style.removeProperty('margin-bottom');
        }
      });
      console.log('[better-falix] clean-server-list: Applied styles to', serverRowLinks.length, '.server-row-link elements with', spacing + 'px spacing');
    }

    // 3. Remove servers-container class from the original parent container
    const allContainers = document.querySelectorAll('.servers-container');
    allContainers.forEach(container => {
      // Only remove from elements that are NOT server-row-link
      if (!container.classList.contains('server-row-link')) {
        container.classList.remove('servers-container');
        console.log('[better-falix] clean-server-list: Removed .servers-container class from parent');
      }
    });
  }

  // Run immediately
  applyCleanServerList();

  // Watch for dynamic changes for a short period to catch SPA loads
  const observer = new MutationObserver((mutations) => {
    applyCleanServerList();
  });

  // Observe the body for changes
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Stop observing after 5 seconds to reduce overhead
  setTimeout(() => {
    observer.disconnect();
    console.log('[better-falix] clean-server-list: Stopped observing mutations');
  }, 5000);

  //  --------- END FEATURE ----------

  console.log('[better-falix] clean-server-list: Script loaded successfully');
});
