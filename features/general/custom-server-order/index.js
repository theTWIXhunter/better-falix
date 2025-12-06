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

    console.log('[better-falix] custom-server-order: Order list:', orderList);

    const serversList = document.getElementById('serverslist');
    if (!serversList) {
      console.log('[better-falix] custom-server-order: #serverslist not found');
      return;
    }

    const serversContainer = serversList.querySelector('.servers-container');
    if (!serversContainer) {
      console.log('[better-falix] custom-server-order: .servers-container not found');
      return;
    }

    const serverRows = Array.from(serversContainer.querySelectorAll('.server-row'));
    if (!serverRows.length) {
      console.log('[better-falix] custom-server-order: No .server-row elements found');
      return;
    }

    console.log('[better-falix] custom-server-order: Found', serverRows.length, 'server rows');

    // Map: server name -> server-row element
    const nameToRow = {};
    const foundNames = [];
    serverRows.forEach(row => {
      const nameEl = row.querySelector('.server-name');
      if (nameEl) {
        const name = nameEl.textContent.trim();
        nameToRow[name] = row;
        foundNames.push(name);
      }
    });

    console.log('[better-falix] custom-server-order: Found server names:', foundNames);
    console.log('[better-falix] custom-server-order: Looking for:', orderList);

    // Check which names from order list are actually found
    const matchedNames = orderList.filter(name => nameToRow[name]);
    const unmatchedNames = orderList.filter(name => !nameToRow[name]);
    
    console.log('[better-falix] custom-server-order: Matched names:', matchedNames);
    if (unmatchedNames.length > 0) {
      console.log('[better-falix] custom-server-order: Unmatched names (check spelling/case):', unmatchedNames);
    }

    if (matchedNames.length === 0) {
      console.log('[better-falix] custom-server-order: No server names matched - aborting reorder');
      return;
    }

    // Remove all server rows from the DOM
    serverRows.forEach(row => {
      if (row.parentNode === serversContainer) {
        serversContainer.removeChild(row);
      }
    });

    // Re-insert in desired order
    orderList.forEach(name => {
      if (nameToRow[name]) {
        serversContainer.appendChild(nameToRow[name]);
        console.log('[better-falix] custom-server-order: Moved', name, 'to position');
      }
    });

    // Append any remaining servers not in the list (keep their original order)
    serverRows.forEach(row => {
      const name = row.querySelector('.server-name')?.textContent.trim();
      if (name && !orderList.includes(name)) {
        serversContainer.appendChild(row);
        console.log('[better-falix] custom-server-order: Appended unordered server:', name);
      }
    });

    console.log('[better-falix] custom-server-order: Reordering complete');
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
    if (serversList) {
      const serversContainer = serversList.querySelector('.servers-container');
      if (serversContainer) {
        const serverRows = serversContainer.querySelectorAll('.server-row');
        if (serverRows.length > 0) {
          console.log('[better-falix] custom-server-order: Found servers list with', serverRows.length, 'servers');
          observeAndReorder();
          return;
        } else {
          console.log('[better-falix] custom-server-order: Found servers container but no server rows yet');
        }
      } else {
        console.log('[better-falix] custom-server-order: Found #serverslist but no .servers-container yet');
      }
    } else {
      console.log('[better-falix] custom-server-order: #serverslist not found yet');
    }
    setTimeout(waitForServersList, 200);
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
