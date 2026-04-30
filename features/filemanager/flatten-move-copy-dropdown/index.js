// [better-falix] flatten-move-copy-dropdown: Script loading
console.log('[better-falix] flatten-move-copy-dropdown: Script loading');

chrome.storage.sync.get({ enabled: true, flattenMoveCopyDropdown: false }, (data) => {
  if (!data.enabled || !data.flattenMoveCopyDropdown) {
    console.log('[better-falix] flatten-move-copy-dropdown: Script disabled');
    return;
  }
  console.log('[better-falix] flatten-move-copy-dropdown: Script enabled');

  //  --------- START FEATURE ----------

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.classList.contains('custom-dropdown-menu') || node.querySelector('.custom-dropdown-menu')) {
            const dropdowns = node.classList.contains('custom-dropdown-menu') 
              ? [node] 
              : node.querySelectorAll('.custom-dropdown-menu');
              
            dropdowns.forEach(dropdown => {
              const moveCopyWrapper = Array.from(dropdown.querySelectorAll('.custom-dropdown-submenu-wrapper')).find(wrapper => {
                const trigger = wrapper.querySelector('[data-submenu-trigger]');
                return trigger && trigger.getAttribute('data-submenu-trigger').endsWith('-movecopy');
              });

              let lastMoveCopyItem = null;
              if (moveCopyWrapper) {
                const submenu = moveCopyWrapper.querySelector('.custom-dropdown-submenu');
                if (submenu) {
                  const items = Array.from(submenu.querySelectorAll('.custom-dropdown-item'));
                  items.forEach(item => {
                    dropdown.insertBefore(item, moveCopyWrapper);
                    lastMoveCopyItem = item;
                  });
                }
                moveCopyWrapper.remove();
              }

              const clipboardWrapper = Array.from(dropdown.querySelectorAll('.custom-dropdown-submenu-wrapper')).find(wrapper => {
                const trigger = wrapper.querySelector('[data-submenu-trigger]');
                return trigger && trigger.getAttribute('data-submenu-trigger').endsWith('-clipboard');
              });

              if (clipboardWrapper) {
                const submenu = clipboardWrapper.querySelector('.custom-dropdown-submenu');
                let duplicateBtn = null;
                
                if (submenu) {
                  const items = Array.from(submenu.querySelectorAll('.custom-dropdown-item'));
                  duplicateBtn = items.find(item => item.textContent.toLowerCase().includes('duplicate') || (item.id && item.id.startsWith('duplicate')));
                }
                
                if (duplicateBtn) {
                  if (lastMoveCopyItem && lastMoveCopyItem.nextSibling) {
                    dropdown.insertBefore(duplicateBtn, lastMoveCopyItem.nextSibling);
                  } else {
                    const transferBtn = Array.from(dropdown.querySelectorAll('.custom-dropdown-item')).find(item => 
                      item.textContent.toLowerCase().includes('transfer') || (item.id && item.id.includes('transfer-'))
                    );
                    
                    if (transferBtn && transferBtn.parentNode === dropdown && transferBtn.nextSibling) {
                      dropdown.insertBefore(duplicateBtn, transferBtn.nextSibling);
                    } else {
                      dropdown.appendChild(duplicateBtn);
                    }
                  }
                }
                
                clipboardWrapper.remove();
              }
            });
          }
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});