// [better-falix] custom-server-order: Script loading
console.log('[Better-Falix] custom-server-order: Script loading');

chrome.storage.sync.get({ customServerOrder: [2046597, 1234567, 7654321], enabled: true }, (data) => {
  console.log('[Better-Falix] chrome.storage.sync.get result:', data);

  if (!data.enabled) {
    console.log('[Better-Falix] custom-server-order: Script disabled');
    return;
  }

  const predefinedOrder = Array.isArray(data.customServerOrder) ? data.customServerOrder : [2046597, 1234567, 7654321];
  console.log('[Better-Falix] Using predefinedOrder:', predefinedOrder);

  function reorderServers(predefinedOrder) {
    console.log('[Better-Falix] reorderServers called with predefinedOrder:', predefinedOrder);

    const serversContainer = document.querySelector('.servers-container');
    if (!serversContainer) {
      console.error('[Better-Falix] Servers container not found');
      return;
    }
    console.log('[Better-Falix] Servers container found:', serversContainer);

    const serverRows = Array.from(serversContainer.querySelectorAll('.server-row'));
    console.log('[Better-Falix] Found server rows:', serverRows);

    if (serverRows.length === 0) {
      console.warn('[Better-Falix] No server rows found yet');
      return;
    }

    // Map server rows by their data-server-id
    const serverMap = new Map(
      serverRows.map(row => [parseInt(row.dataset.serverId, 10), row])
    );
    console.log('[Better-Falix] Server map created:', serverMap);

    // Clear existing server rows
    serversContainer.innerHTML = '';
    console.log('[Better-Falix] Servers container cleared');

    // Append servers in the new order
    predefinedOrder.forEach(id => {
      const serverRow = serverMap.get(id);
      if (serverRow) {
        serversContainer.appendChild(serverRow);
        console.log(`[Better-Falix] Server row appended for ID: ${id}`);
      } else {
        console.warn(`[Better-Falix] Server row not found for ID: ${id}`);
      }
    });

    console.log('[Better-Falix] Servers reordered successfully');
  }

  function observeServerContainer(predefinedOrder) {
    console.log('[Better-Falix] observeServerContainer called with predefinedOrder:', predefinedOrder);

    const serversContainer = document.querySelector('.servers-container');
    if (!serversContainer) {
      console.error('[Better-Falix] Servers container not found');
      return;
    }
    console.log('[Better-Falix] Servers container found:', serversContainer);

    const observer = new MutationObserver(() => {
      console.log('[Better-Falix] MutationObserver triggered');
      reorderServers(predefinedOrder);
    });

    observer.observe(serversContainer, { childList: true });
    console.log('[Better-Falix] MutationObserver attached to servers container');
  }

  function waitForServersContainer(predefinedOrder) {
    console.log('[Better-Falix] waitForServersContainer called');

    const checkInterval = setInterval(() => {
      const serversContainer = document.querySelector('.servers-container');
      if (serversContainer) {
        console.log('[Better-Falix] Servers container detected');
        clearInterval(checkInterval);
        observeServerContainer(predefinedOrder);
        reorderServers(predefinedOrder);
      } else {
        console.log('[Better-Falix] Waiting for servers container...');
      }
    }, 500);
  }

  // Attach MutationObserver and reorder servers on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[Better-Falix] DOMContentLoaded event triggered');
    waitForServersContainer(predefinedOrder);
  });

  console.log('[Better-Falix] custom-server-order: Script loaded successfully');
});
