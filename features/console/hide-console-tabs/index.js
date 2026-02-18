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
        const dropdownHTML = `
          <div class="dropdown">
            <button class="console-btn" data-bs-toggle="dropdown" aria-expanded="false">
              <svg class="svg-inline--fa" viewBox="0 0 128 512" width="0.25em" height="1em" fill="currentColor" aria-hidden="true"><path d="M64 144a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0 224c30.9 0 56 25.1 56 56s-25.1 56-56 56-56-25.1-56-56 25.1-56 56-56zm56-112c0 30.9-25.1 56-56 56s-56-25.1-56-56 25.1-56 56-56 56 25.1 56 56z"></path></svg>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-end">
              <li>
                <button class="dropdown-item" id="popupConsoleBtnAlt">
                  <svg class="svg-inline--fa" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path class="fa-secondary" opacity="0.4" d="M0 176c0-44.2 35.8-80 80-80l80 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-80 0c-8.8 0-16 7.2-16 16l0 256c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-80c0-17.7 14.3-32 32-32s32 14.3 32 32l0 80c0 44.2-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80L0 176z"></path><path class="fa-primary" d="M288 32c0-17.7 14.3-32 32-32L480 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-82.7-201.4 201.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L402.7 64 320 64c-17.7 0-32-14.3-32-32z"></path></svg>
                  Popup
                </button>
              </li>
              <li>
                <button class="dropdown-item" id="shareConsoleBtnAlt">
                  <svg class="svg-inline--fa" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M307.8 18.4c-12 5-19.8 16.6-19.8 29.6l0 80-112 0c-97.2 0-176 78.8-176 176 0 113.3 81.5 163.9 100.2 174.1 2.5 1.4 5.3 1.9 8.1 1.9 10.9 0 19.7-8.9 19.7-19.7 0-7.5-4.3-14.4-9.8-19.5-9.4-8.8-22.2-26.4-22.2-56.7 0-53 43-96 96-96l96 0 0 80c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-9.2-9.2-22.9-11.9-34.9-6.9z"></path></svg>
                  Share
                </button>
              </li>
              <li>
                <button class="dropdown-item" id="viewModeToggleAlt">
                  <span id="viewModeIconAlt"><svg class="svg-inline--fa" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M232.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 149.8C5.4 145.8 0 137.3 0 128s5.4-17.9 13.9-21.8L232.5 5.2zM48.1 218.4l164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 277.8C5.4 273.8 0 265.3 0 256s5.4-17.9 13.9-21.8l34.1-15.8zM13.9 362.2l34.1-15.8 164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 405.8C5.4 401.8 0 393.3 0 384s5.4-17.9 13.9-21.8z"></path></svg></span>
                  <span id="viewModeTextAlt">Simple</span>
                </button>
              </li>
            </ul>
          </div>
        `;
        
        consoleActions.insertAdjacentHTML('beforeend', dropdownHTML);
        dropdownAdded = true;
        
        // Clone event listeners from original buttons
        const newPopupBtn = document.getElementById('popupConsoleBtnAlt');
        const newShareBtn = document.getElementById('shareConsoleBtnAlt');
        const newViewModeToggle = document.getElementById('viewModeToggleAlt');
        
        if (originalPopupBtn && newPopupBtn) {
          newPopupBtn.addEventListener('click', () => {
            originalPopupBtn.click();
          });
        }
        
        if (originalShareBtn && newShareBtn) {
          newShareBtn.addEventListener('click', () => {
            originalShareBtn.click();
          });
        }
        
        if (originalViewModeToggle && newViewModeToggle) {
          // For view mode toggle, we need to observe changes to the original and sync them
          const syncViewModeState = () => {
            const originalIcon = document.getElementById('viewModeIcon');
            const originalText = document.getElementById('viewModeText');
            const newIcon = document.getElementById('viewModeIconAlt');
            const newText = document.getElementById('viewModeTextAlt');
            
            if (originalIcon && newIcon) {
              newIcon.innerHTML = originalIcon.innerHTML;
            }
            if (originalText && newText) {
              newText.textContent = originalText.textContent;
            }
          };
          
          // Initial sync
          syncViewModeState();
          
          // Sync on click
          newViewModeToggle.addEventListener('click', () => {
            originalViewModeToggle.click();
            // Wait a bit for the DOM to update
            setTimeout(syncViewModeState, 100);
          });
          
          // Observe changes to the original button to keep in sync
          const observer = new MutationObserver(syncViewModeState);
          const originalIcon = document.getElementById('viewModeIcon');
          const originalText = document.getElementById('viewModeText');
          
          if (originalIcon) {
            observer.observe(originalIcon, { childList: true, subtree: true });
          }
          if (originalText) {
            observer.observe(originalText, { childList: true, characterData: true, subtree: true });
          }
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
