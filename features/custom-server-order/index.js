// [better-falix] custom-server-order: Script loading
console.log('[better-falix] custom-server-order: Script loading');

chrome.storage.sync.get({ customServerOrder: false, customServerOrder_list: '', enabled: true }, (data) => {
  if (!data.enabled || !data.customServerOrder) {
    console.log('[better-falix] custom-server-order: Script disabled');
    return;
  }
  console.log('[better-falix] custom-server-order: Script enabled');

  //  --------- START FEATURE ----------

  function reorderServers() {
    const orderList = (data.customServerOrder_list || '')
      .split(',')
      .map(x => x.trim())
      .filter(Boolean);

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
    orderList.forEach(name => {
      if (nameToRow[name]) {
        serversContainer.appendChild(nameToRow[name]);
      }
    });

    // Append any remaining servers not in the list (keep their original order)
    serverRows.forEach(row => {
      const name = row.querySelector('.server-name')?.textContent.trim();
      if (name && !orderList.includes(name)) {
        serversContainer.appendChild(row);
      }
    });
  }

  // Wait for servers to be loaded (MutationObserver on .servers-container)
  function observeAndReorder() {
    reorderServers();

    const serversList = document.getElementById('serverslist');
    if (!serversList) return;

    const serversContainer = serversList.querySelector('.servers-container');
    if (!serversContainer) return;

    const observer = new MutationObserver(reorderServers);
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
