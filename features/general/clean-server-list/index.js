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

    // 2. Add padding: 8px !important to all .server-row-link elements
    const serverRowLinks = document.querySelectorAll('.server-row-link');
    if (serverRowLinks && serverRowLinks.length > 0) {
      serverRowLinks.forEach(link => {
        link.style.setProperty('padding', '8px', 'important');
      });
      console.log('[better-falix] clean-server-list: Added padding to', serverRowLinks.length, '.server-row-link elements');
    }

    // 3. Remove style elements from .servers-container and add them to each .server-row-link individually
    const serversContainer = document.querySelector('.servers-container');
    if (serversContainer) {
      // Get the inline style attribute from servers-container
      const containerStyle = serversContainer.getAttribute('style');
      
      // Apply the style to each .server-row-link
      const serverRowLinks = serversContainer.querySelectorAll('.server-row-link');
      serverRowLinks.forEach(link => {
        if (containerStyle) {
          link.setAttribute('style', (link.getAttribute('style') || '') + '; ' + containerStyle);
        }
      });

      // Remove inline styles from servers-container
      serversContainer.removeAttribute('style');

      console.log('[better-falix] clean-server-list: Moved styles from .servers-container to', serverRowLinks.length, '.server-row-link elements');
    }
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
