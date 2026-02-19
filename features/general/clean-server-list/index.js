// [better-falix] clean-server-list: Script loading
console.log('[better-falix] clean-server-list: Script loading');

chrome.storage.sync.get({ 
  cleanServerList: false, 
  cleanServerList_padding: 8, 
  cleanServerList_folderIndent: 16,
  cleanServerList_statusBorders: true,
  cleanServerList_borderThickness: 4,
  cleanServerList_runningColor: 'rgb(16, 185, 129)',
  cleanServerList_stoppedColor: 'rgb(239, 68, 68)',
  cleanServerList_startingColor: 'rgb(245, 158, 11)',
  cleanServerList_stoppingColor: 'rgb(245, 158, 11)',
  enabled: true 
}, (data) => {
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
      const folderIndent = data.cleanServerList_folderIndent ?? 16;
      let hiddenCount = 0;
      // Add spacing between server-row-link elements and apply container styles
      serverRowLinks.forEach((link, index) => {
        // Check if the child .server-row has search-hidden class
        const serverRow = link.querySelector('.server-row');
        const isHidden = serverRow && serverRow.classList.contains('search-hidden');
        
        // Check if this server is inside a folder
        const isInFolder = link.closest('.server-folder') !== null;
        
        if (isHidden) {
          hiddenCount++;
          console.log('[better-falix] clean-server-list: Found hidden server:', serverRow.querySelector('.server-name')?.textContent.trim());
        }
        
        if (!isHidden) {
          link.style.setProperty('padding', '0px', 'important');
          link.style.removeProperty('display');
          // Add margin-bottom to all except the last one
          if (index < serverRowLinks.length - 1) {
            link.style.setProperty('margin-bottom', spacing + 'px', 'important');
          }
          // Add servers-container class to each server-row-link
          if (!link.classList.contains('servers-container')) {
            link.classList.add('servers-container');
          }
          
          // Apply folder indentation if server is inside a folder and indent is enabled
          if (isInFolder && folderIndent > 0) {
            link.style.setProperty('padding-left', folderIndent + 'px', 'important');
          } else {
            link.style.removeProperty('padding-left');
          }
          
          // Add colored left border based on server status
          if (data.cleanServerList_statusBorders) {
            const borderThickness = data.cleanServerList_borderThickness || 4;
            let borderColor = null;
            
            if (serverRow) {
              if (serverRow.classList.contains('status-running')) {
                borderColor = data.cleanServerList_runningColor || 'rgb(16, 185, 129)';
              } else if (serverRow.classList.contains('status-stopped')) {
                borderColor = data.cleanServerList_stoppedColor || 'rgb(239, 68, 68)';
              } else if (serverRow.classList.contains('status-starting')) {
                borderColor = data.cleanServerList_startingColor || 'rgb(245, 158, 11)';
              } else if (serverRow.classList.contains('status-stopping')) {
                borderColor = data.cleanServerList_stoppingColor || 'rgb(245, 158, 11)';
              }
            }
            
            if (borderColor) {
              link.style.setProperty('border-left-color', borderColor, 'important');
              link.style.setProperty('border-left-width', borderThickness + 'px', 'important');
            } else {
              link.style.removeProperty('border-left-color');
              link.style.removeProperty('border-left-width');
            }
          } else {
            // Remove border styling if status borders are disabled
            link.style.removeProperty('border-left-color');
            link.style.removeProperty('border-left-width');
          }
        } else {
          // Hide the entire link when the server is filtered
          link.style.setProperty('display', 'none', 'important');
          // Remove servers-container class from hidden elements
          if (link.classList.contains('servers-container')) {
            link.classList.remove('servers-container');
          }
          link.style.removeProperty('margin-bottom');
          link.style.removeProperty('padding');
        }
      });
      if (hiddenCount > 0) {
        console.log('[better-falix] clean-server-list: Hidden', hiddenCount, 'server(s) with search-hidden class');
      }
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

  // Watch for dynamic changes continuously to catch search filtering
  const observer = new MutationObserver((mutations) => {
    applyCleanServerList();
  });

  // Observe the body for changes
  if (document.body) {
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  console.log('[better-falix] clean-server-list: Observing DOM changes for search filtering');

  //  --------- END FEATURE ----------

  console.log('[better-falix] clean-server-list: Script loaded successfully');
});
