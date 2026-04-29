// [better-falix] hide-console-tabs: Script loading
console.log('[better-falix] hide-console-tabs: Script loading');

chrome.storage.sync.get({ hideConsoleTabs: false, enabled: true }, (data) => {
  if (!data.enabled || !data.hideConsoleTabs) {
    console.log('[better-falix] hide-console-tabs: Script disabled');
    return;
  }
  console.log('[better-falix] hide-console-tabs: Script enabled');

  //  --------- START FEATURE ----------

  let hasRunOnLoad = false;
  let dropdownAdded = false;

  const hideTabs = () => {
    const el = document.querySelector('.console-tabs');
    if (el) el.style.display = 'none';
    
    const titlebarCenter = document.querySelector('.titlebar-center');
    if (titlebarCenter) titlebarCenter.style.display = 'none';
    
    const titlebarActions = document.querySelector('.titlebar-actions');
    if (titlebarActions) titlebarActions.style.display = 'none';
    
    document.querySelectorAll('.titlebar-divider').forEach(divider => {
      divider.style.display = 'none';
    });
    
    // Un-truncate the server name
    const serverName = document.querySelector('.server-name');
    if (serverName) {
      serverName.style.overflow = 'visible';
      serverName.style.textOverflow = 'unset';
      serverName.style.whiteSpace = 'normal';
      serverName.style.maxWidth = 'none';
    }
    
    // Add dropdown menu after successful hide
    if (!dropdownAdded && el) {
      const consoleActions = document.querySelector('.console-actions');
      const connectBtn = consoleActions?.querySelector('.console-btn.connect');
      
      // Find original buttons to clone their event listeners
      const originalPopupBtn = document.getElementById('popupConsoleBtn');
      const originalShareBtn = document.getElementById('shareConsoleBtn');
      const originalViewModeToggle = document.getElementById('viewModeToggle');
      
      if (consoleActions && connectBtn && !document.getElementById('popupConsoleBtnAlt')) {
        // Create dropdown elements programmatically for security
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        
        const dropdownBtn = document.createElement('button');
        dropdownBtn.className = 'console-btn';
        dropdownBtn.setAttribute('data-bs-toggle', 'dropdown');
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownBtn.innerHTML = '<svg class="svg-inline--fa" viewBox="0 0 128 512" width="0.25em" height="1em" fill="currentColor" aria-hidden="true"><path d="M64 144a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0 224c30.9 0 56 25.1 56 56s-25.1 56-56 56-56-25.1-56-56 25.1-56 56-56zm56-112c0 30.9-25.1 56-56 56s-56-25.1-56-56 25.1-56 56-56 56 25.1 56 56z"></path></svg>';
        
        const dropdownMenu = document.createElement('ul');
        dropdownMenu.className = 'dropdown-menu dropdown-menu-end';
        dropdownMenu.setAttribute('data-popper-placement', 'bottom-end');
        
        // Create popup button item
        const popupLi = document.createElement('li');
        const popupBtn = document.createElement('button');
        popupBtn.className = 'dropdown-item';
        popupBtn.id = 'popupConsoleBtnAlt';
        popupBtn.innerHTML = '<svg class="svg-inline--fa" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path class="fa-secondary" opacity="0.4" d="M0 176c0-44.2 35.8-80 80-80l80 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-80 0c-8.8 0-16 7.2-16 16l0 256c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-80c0-17.7 14.3-32 32-32s32 14.3 32 32l0 80c0 44.2-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80L0 176z"></path><path class="fa-primary" d="M288 32c0-17.7 14.3-32 32-32L480 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-82.7-201.4 201.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L402.7 64 320 64c-17.7 0-32-14.3-32-32z"></path></svg> Popup';
        popupLi.appendChild(popupBtn);
        
        // Create share button item
        const shareLi = document.createElement('li');
        const shareBtn = document.createElement('button');
        shareBtn.className = 'dropdown-item';
        shareBtn.id = 'shareConsoleBtnAlt';
        shareBtn.innerHTML = '<svg class="svg-inline--fa" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M307.8 18.4c-12 5-19.8 16.6-19.8 29.6l0 80-112 0c-97.2 0-176 78.8-176 176 0 113.3 81.5 163.9 100.2 174.1 2.5 1.4 5.3 1.9 8.1 1.9 10.9 0 19.7-8.9 19.7-19.7 0-7.5-4.3-14.4-9.8-19.5-9.4-8.8-22.2-26.4-22.2-56.7 0-53 43-96 96-96l96 0 0 80c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-9.2-9.2-22.9-11.9-34.9-6.9z"></path></svg> Share';
        shareLi.appendChild(shareBtn);
        
        // Create support button item
        const supportLi = document.createElement('li');
        const supportBtn = document.createElement('button');
        supportBtn.className = 'dropdown-item';
        supportBtn.setAttribute('data-bs-toggle', 'modal');
        supportBtn.setAttribute('data-bs-target', '#supportInfoModal');
        supportBtn.innerHTML = '<svg class="svg-inline--fa" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M367.2 412.5C335.9 434.9 297.5 448 256 448s-79.9-13.1-111.2-35.5l58-58c15.8 8.6 34 13.5 53.3 13.5s37.4-4.9 53.3-13.5l58 58zm90.7 .8c33.8-43.4 54-98 54-157.3S491.8 142.1 458 98.7c9-12.5 7.9-30.1-3.4-41.3S425.8 45 413.3 54C369.9 20.2 315.3 0 256 0S142.1 20.2 98.7 54c-12.5-9-30.1-7.9-41.3 3.4S45 86.2 54 98.7C20.2 142.1 0 196.7 0 256S20.2 369.9 54 413.3c-9 12.5-7.9 30.1 3.4 41.3S86.2 467 98.7 458c43.4 33.8 98 54 157.3 54s113.9-20.2 157.3-54c12.5 9 30.1 7.9 41.3-3.4s12.4-28.8 3.4-41.3zm-45.5-46.1l-58-58c8.6-15.8 13.5-34 13.5-53.3s-4.9-37.4-13.5-53.3l58-58C434.9 176.1 448 214.5 448 256s-13.1 79.9-35.5 111.2zM367.2 99.5l-58 58c-15.8-8.6-34-13.5-53.3-13.5s-37.4 4.9-53.3 13.5l-58-58C176.1 77.1 214.5 64 256 64s79.9 13.1 111.2 35.5zM157.5 309.3l-58 58C77.1 335.9 64 297.5 64 256s13.1-79.9 35.5-111.2l58 58c-8.6 15.8-13.5 34-13.5 53.3s4.9 37.4 13.5 53.3zM208 256a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"></path></svg> Support';
        supportLi.appendChild(supportBtn);
        
        // Assemble dropdown
        dropdownMenu.appendChild(popupLi);
        dropdownMenu.appendChild(shareLi);
        dropdownMenu.appendChild(supportLi);
        dropdown.appendChild(dropdownBtn);
        dropdown.appendChild(dropdownMenu);
        
        consoleActions.appendChild(dropdown);
        dropdownAdded = true;
        
        console.log('[better-falix] hide-console-tabs: Dropdown added. Original buttons:', {
          popup: !!originalPopupBtn,
          share: !!originalShareBtn,
          viewMode: !!originalViewModeToggle
        });
        
        // Helper function to click hidden buttons
        const clickHiddenButton = (button) => {
          console.log('[better-falix] hide-console-tabs: Attempting to click hidden button:', button);
          const titlebarActions = document.querySelector('.titlebar-actions');
          if (titlebarActions && button) {
            // Temporarily show to allow click to work
            const originalDisplay = titlebarActions.style.display;
            titlebarActions.style.display = '';
            button.click();
            console.log('[better-falix] hide-console-tabs: Button clicked');
            // Hide again immediately
            titlebarActions.style.display = originalDisplay;
          } else {
            console.log('[better-falix] hide-console-tabs: Failed to click - titlebarActions or button not found');
          }
        };
        
        // Attach event listeners using direct button references
        if (originalPopupBtn) {
          popupBtn.addEventListener('click', (e) => {
            console.log('[better-falix] hide-console-tabs: Popup button clicked');
            e.preventDefault();
            e.stopPropagation();
            clickHiddenButton(originalPopupBtn);
          });
          console.log('[better-falix] hide-console-tabs: Popup button listener attached');
        } else {
          console.log('[better-falix] hide-console-tabs: Original popup button not found, will retry');
          // Retry finding the button after a delay
          setTimeout(() => {
            const retryOriginalPopupBtn = document.getElementById('popupConsoleBtn');
            if (retryOriginalPopupBtn) {
              console.log('[better-falix] hide-console-tabs: Found original popup button on retry');
              popupBtn.addEventListener('click', (e) => {
                console.log('[better-falix] hide-console-tabs: Popup button clicked (retry)');
                e.preventDefault();
                e.stopPropagation();
                clickHiddenButton(retryOriginalPopupBtn);
              });
            }
          }, 1000);
        }
        
        if (originalShareBtn) {
          shareBtn.addEventListener('click', (e) => {
            console.log('[better-falix] hide-console-tabs: Share button clicked');
            e.preventDefault();
            e.stopPropagation();
            clickHiddenButton(originalShareBtn);
          });
        } else {
          // Retry finding the button after a delay
          setTimeout(() => {
            const retryOriginalShareBtn = document.getElementById('shareConsoleBtn');
            if (retryOriginalShareBtn) {
              shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                clickHiddenButton(retryOriginalShareBtn);
              });
            }
          }, 1000);
        }
      }
    }
  };
  
  hideTabs();
  
  // Rerun at document_idle for consistency (only once)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!hasRunOnLoad) {
        hasRunOnLoad = true;
        hideTabs();
      }
    });
  } else if (document.readyState === 'interactive') {
    // Wait for complete
    window.addEventListener('load', () => {
      if (!hasRunOnLoad) {
        hasRunOnLoad = true;
        hideTabs();
      }
    });
  }
  
  const observer = new MutationObserver(hideTabs);
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // [better-falix] hide-console-tabs: Script loaded sucsessfully
  setTimeout(() => {
    console.log('[better-falix] hide-console-tabs: Script loaded successfully');
  }, 10);
});
