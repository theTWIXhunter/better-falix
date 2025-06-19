// [better-falix] custom-server-order: Script loading
console.log('[better-falix] custom-server-order: Script loading');

chrome.storage.sync.get({ customServerOrder: false, enabled: true }, (data) => {
  if (!data.enabled || !data.customServerOrder) {
    console.log('[better-falix] custom-server-order: Script disabled');
    return;
  }
  console.log('[better-falix] custom-server-order: Script enabled');

  //  --------- START FEATURE ----------

  // List of server names in desired order (easy to change)
  const serverOrder = [
    '[PROD] Minecraft Bimsem',
    '[PROD] Modded bimsem',
    '[PROD] ModBot host',
    'rodepandaserver',
    'arne en phineas',
    '[free test] twixtest1',
    '[free test] twixtest2',
    '[free test] twixtest3'
  ];

  function reorderServers() {
    const serversList = document.getElementById('serverslist');
    if (!serversList) return;

    const serversContainer = serversList.querySelector('.servers-container');
    if (!serversContainer) return;

    const serverRows = Array.from(serversContainer.querySelectorAll('.server-row'));
    if (!serverRows.length) return;

    // Map: server name -> server-row element
    const nameToRow = {};
    serverRows.forEach(row => {
      const nameEl = row.querySelector('.server-name');
      if (nameEl) {
        const name = nameEl.textContent.trim();
        nameToRow[name] = row;
      }
    });

    // Remove all server rows from the DOM
    serverRows.forEach(row => serversContainer.removeChild(row));

    // Re-insert in desired order
    serverOrder.forEach(name => {
      if (nameToRow[name]) {
        serversContainer.appendChild(nameToRow[name]);
      }
    });

    // Append any remaining servers not in the list (keep their original order)
    serverRows.forEach(row => {
      const name = row.querySelector('.server-name')?.textContent.trim();
      if (name && !serverOrder.includes(name)) {
        serversContainer.appendChild(row);
      }
    });
  }

  // Wait for servers to be loaded (MutationObserver on .servers-container)
  function observeAndReorder() {
    const serversList = document.getElementById('serverslist');
    if (!serversList) return;

    const serversContainer = serversList.querySelector('.servers-container');
    if (!serversContainer) return;

    // Initial try
    reorderServers();

    // Observe for changes (servers loaded/changed)
    const observer = new MutationObserver(() => {
      reorderServers();
    });
    observer.observe(serversContainer, { childList: true, subtree: false });
  }

  // Wait for DOM and for #serverslist to exist
  function waitForServersList() {
    const serversList = document.getElementById('serverslist');
    if (serversList && serversList.querySelector('.servers-container')) {
      observeAndReorder();
    } else {
      setTimeout(waitForServersList, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForServersList);
  } else {
    waitForServersList();
  }

  setTimeout(() => {
    console.log('[better-falix] custom-server-order: Script loaded sucsessfully');
  }, 10);
});
