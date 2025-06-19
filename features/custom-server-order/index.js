// [better-falix] custom-server-order: Script loading
console.log('[Better-Falix] custom-server-order: Script loading');

chrome.storage.sync.get({ customServerOrder: [2046597, 1234567, 7654321], enabled: true }, (data) => {
  console.log('[Better-Falix] chrome.storage.sync.get result:', data);

  if (!data.enabled || !data.customServerOrder) {
    console.log('[Better-Falix] custom-server-order: Script disabled');
    return;
  }
  console.log('[Better-Falix] custom-server-order: Script enabled');

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

  // Attach MutationObserver on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[Better-Falix] DOMContentLoaded event triggered');
    observeServerContainer(data.customServerOrder);
  });

  console.log('[Better-Falix] custom-server-order: Script loaded successfully');
});
