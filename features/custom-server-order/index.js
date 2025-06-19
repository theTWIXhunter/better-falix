// [better-falix] custom-server-order: Script loading
console.log('[Better-Falix] custom-server-order: Script loading');

chrome.storage.sync.get({ customServerOrder: [6, 2, 0, 7, 2, 5, 4, 3], enabled: true }, (data) => {
  if (!data.enabled || !data.customServerOrder) {
    console.log('[Better-Falix] custom-server-order: Script disabled');
    return;
  }
  console.log('[Better-Falix] custom-server-order: Script enabled');

  function reorderServers(predefinedOrder) {
    const serverContainer = document.querySelector('.servers-container');
    if (!serverContainer) {
      console.error('[Better-Falix] Server container not found');
      return;
    }

    const serverRows = Array.from(serverContainer.querySelectorAll('.server-row'));
    if (serverRows.length === 0) {
      console.warn('[Better-Falix] No server rows found yet');
      return;
    }

    // Map server rows by their data-server-id
    const serverMap = new Map(
      serverRows.map(row => [parseInt(row.dataset.serverId, 10), row])
    );

    // Clear existing server rows
    serverContainer.innerHTML = '';

    // Append servers in the new order
    predefinedOrder.forEach(id => {
      const serverRow = serverMap.get(id);
      if (serverRow) {
        serverContainer.appendChild(serverRow);
      } else {
        console.warn(`[Better-Falix] Server row not found for ID: ${id}`);
      }
    });

    console.log('[Better-Falix] Servers reordered successfully');
  }

  function observeServerContainer(predefinedOrder) {
    const serverContainer = document.querySelector('.servers-container');
    if (!serverContainer) {
      console.error('[Better-Falix] Server container not found');
      return;
    }

    const observer = new MutationObserver(() => {
      reorderServers(predefinedOrder);
    });

    observer.observe(serverContainer, { childList: true });
    console.log('[Better-Falix] MutationObserver attached to server container');
  }

  // Attach MutationObserver on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    observeServerContainer(data.customServerOrder);
  });

  console.log('[Better-Falix] custom-server-order: Script loaded successfully');
});
