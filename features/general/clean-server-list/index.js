// [better-falix] clean-server-list: Script loading
console.log('[better-falix] clean-server-list: Script loading');

chrome.storage.sync.get({ cleanServerList: false, enabled: true }, (data) => {
  if (!data.enabled || !data.cleanServerList) {
    console.log('[better-falix] clean-server-list: Script disabled');
    return;
  }
  console.log('[better-falix] clean-server-list: Script enabled');

  //  --------- START FEATURE ----------

  function applyCleanServerList() {
    // 1. Remove the div with class="server-table-header"
    const serverTableHeader = document.querySelector('.server-table-header');
    if (serverTableHeader) {
      serverTableHeader.remove();
      console.log('[better-falix] clean-server-list: Removed .server-table-header');
    }

    // 2. Find all server-row-link elements
    const serverRowLinks = document.querySelectorAll('.server-row-link');
    
    if (serverRowLinks && serverRowLinks.length > 0) {
      // Add padding to all server-row-link elements
      serverRowLinks.forEach(link => {
        link.style.setProperty('padding', '8px', 'important');
        // Add servers-container class to each server-row-link
        if (!link.classList.contains('servers-container')) {
          link.classList.add('servers-container');
        }
      });
      console.log('[better-falix] clean-server-list: Applied styles to', serverRowLinks.length, '.server-row-link elements');
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
