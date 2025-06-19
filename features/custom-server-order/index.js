// [better-falix] custom-server-order: Script loading
console.log('[Better-Falix] custom-server-order: Script loading');

chrome.storage.sync.get({ customServerOrder: true, enabled: true }, (data) => {
  if (!data.enabled || !data.customServerOrder) {
    console.log('[Better-Falix] custom-server-order: Script disabled');
    return;
  }
  console.log('[Better-Falix] custom-server-order: Script enabled');

  // --------- START FEATURE ----------
  function reorderServers(predefinedOrder) {
    const serverContainer = document.querySelector('.servers-container');
    if (!serverContainer) return;

    // Fetch server data from API
    fetch('/user-servers.php')
      .then(response => response.json())
      .then(data => {
        if (!data.success || !data.data.servers) {
          console.error('[Better-Falix] Failed to fetch server data');
          return;
        }

        const servers = data.data.servers;
        const serverMap = new Map(servers.map(server => [server.id, server]));

        // Create a new order based on predefinedOrder
        const orderedServers = predefinedOrder.map(id => serverMap.get(id)).filter(Boolean);

        // Clear existing server rows
        serverContainer.innerHTML = '';

        // Append servers in the new order
        orderedServers.forEach(server => {
          const serverRow = document.querySelector(`.server-row[data-server-id="${server.id}"]`);
          if (serverRow) {
            serverContainer.appendChild(serverRow);
          }
        });

        console.log('[Better-Falix] Servers reordered successfully');
      })
      .catch(error => {
        console.error('[Better-Falix] Error fetching server data:', error);
      });
  }

  // Predefined order (can be updated dynamically later)
  const predefinedOrder = [6, 2, 0, 7, 2, 5, 4, 3];

  // Reorder servers on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    reorderServers(predefinedOrder);
  });

  // --------- END FEATURE ----------
  console.log('[Better-Falix] custom-server-order: Script loaded successfully');
});
