// [better-falix] splitAddonsTabs: Script loading
console.log('[better-falix] split-Addons-Tabs: Script loading');

chrome.storage.sync.get({ splitAddonsTabs: false, enabled: true }, (data) => {
  if (!data.enabled || !data.splitAddonsTabs) {
    console.log('[better-falix] split-Addons-Tabs: Script disabled');
    return;
  }
  console.log('[better-falix] split-Addons-Tabs: Script enabled');

  //  --------- START FEATURE ----------

  // Check if we're on a server page
  if (!window.location.pathname.includes('/server/')) {
    return;
  }

  // Hide content-type-nav on addon pages
  function hideContentTypeNav() {
    const contentTypeNav = document.querySelector('.content-type-nav');
    if (contentTypeNav) {
      contentTypeNav.style.display = 'none';
      //console.log('[Better-Falix] split-Addons-Tabs: Hidden content-type-nav');
    }
  }

  // Check if we're on an addon page and hide the nav
  const addonPages = ['/server/plugins', '/server/mods', '/server/modpacks', '/server/datapacks'];
  if (addonPages.some(page => window.location.pathname.includes(page))) {
    hideContentTypeNav();
    // Also watch for dynamically loaded content
    const observer = new MutationObserver(() => {
      hideContentTypeNav();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Function to add the split tabs
  function addSplitTabs() {
    // Find the addons tab in the navigation
    const navItems = document.querySelectorAll('.nav-item');
    let addonsTab = null;
    
    for (const item of navItems) {
      const link = item.querySelector('a');
      if (link && (link.textContent.trim().toLowerCase().includes('addon') || link.textContent.trim().toLowerCase() === 'mods')) {
        addonsTab = item;
        break;
      }
    }

    if (!addonsTab) {
      //console.log('[Better-Falix] split-Addons-Tabs: Addons tab not found');
      return;
    }

    // Check if tabs already exist to prevent duplicates
    const existingSplitTab = addonsTab.parentNode.querySelector('a[href*="/server/plugins"]');
    if (existingSplitTab && existingSplitTab.closest('.nav-item') !== addonsTab) {
      //console.log('[Better-Falix] split-Addons-Tabs: Tabs already exist');
      return;
    }

    // Hide the original addons tab
    addonsTab.style.display = 'none';

    // Get the server ID from the current URL
    const urlParts = window.location.pathname.split('/');
    const serverIndex = urlParts.indexOf('server');
    const serverId = serverIndex >= 0 && urlParts[serverIndex + 1] ? urlParts[serverIndex + 1] : '';

    // Create the new split tabs with dynamic server ID
    const tabsData = [
      { name: 'Plugins', path: `/server/${serverId}/plugins`, icon: 'fa-puzzle-piece' },
      { name: 'Mods', path: `/server/${serverId}/mods`, icon: 'fa-wrench' },
      { name: 'Modpacks', path: `/server/${serverId}/modpacks`, icon: 'fa-box' },
      { name: 'Datapacks', path: `/server/${serverId}/datapacks`, icon: 'fa-database' }
    ];

    // Insert the new tabs after the addons tab
    let insertAfter = addonsTab;
    
    tabsData.forEach(tabData => {
      const newTab = document.createElement('li');
      newTab.className = 'nav-item';
      newTab.setAttribute('data-better-falix-split-tab', 'true');
      
      const link = document.createElement('a');
      link.className = 'nav-link';
      link.href = tabData.path;
      
      // Check if this is the current page to add active class
      if (window.location.pathname.includes(tabData.path)) {
        link.classList.add('active');
      }
      
      link.innerHTML = `<i class="fa-solid ${tabData.icon}"></i> ${tabData.name}`;
      
      newTab.appendChild(link);
      
      // Insert after the previous element
      insertAfter.parentNode.insertBefore(newTab, insertAfter.nextSibling);
      insertAfter = newTab;
    });

    console.log('[Better-Falix] split-Addons-Tabs: Split addons tabs added successfully');
  }

  // Try to add the tabs immediately
  addSplitTabs();

  // Also watch for navigation changes
  const navObserver = new MutationObserver(() => {
    // Check if we're still on a server page and the tabs aren't already added
    if (window.location.pathname.includes('/server/')) {
      const existingSplitTab = document.querySelector('[data-better-falix-split-tab="true"]');
      if (!existingSplitTab) {
        addSplitTabs();
      }
    }
  });

  navObserver.observe(document.body, { childList: true, subtree: true });

  console.log('[Better-Falix] splitAddonsTabs: Script loaded successfully');
});