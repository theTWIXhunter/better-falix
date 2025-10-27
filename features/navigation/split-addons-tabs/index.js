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
      if (link && link.textContent.trim().toLowerCase().includes('addon')) {
        addonsTab = item;
        break;
      }
    }

    if (!addonsTab) {
      //console.log('[Better-Falix] split-Addons-Tabs: Addons tab not found');
      return;
    }

    // Hide the original addons tab
    addonsTab.style.display = 'none';

    // Create the new split tabs
    const tabsData = [
      { name: 'Plugins', url: 'https://client.falixnodes.net/server/plugins', icon: 'fa-puzzle-piece' },
      { name: 'Mods', url: 'https://client.falixnodes.net/server/mods', icon: 'fa-wrench' },
      { name: 'Modpacks', url: 'https://client.falixnodes.net/server/modpacks', icon: 'fa-box' },
      { name: 'Datapacks', url: 'https://client.falixnodes.net/server/datapacks', icon: 'fa-database' }
    ];

    // Insert the new tabs after the addons tab
    let insertAfter = addonsTab;
    
    tabsData.forEach(tabData => {
      const newTab = document.createElement('li');
      newTab.className = 'nav-item';
      
      const link = document.createElement('a');
      link.className = 'nav-link';
      link.href = tabData.url;
      
      // Check if this is the current page to add active class
      if (window.location.href === tabData.url) {
        link.classList.add('active');
      }
      
      link.innerHTML = `<i class="fa-solid ${tabData.icon}"></i> ${tabData.name}`;
      
      newTab.appendChild(link);
      
      // Insert after the previous element
      insertAfter.parentNode.insertBefore(newTab, insertAfter.nextSibling);
      insertAfter = newTab;
    });

    //console.log('[Better-Falix] split-Addons-Tabs: Split addons tabs added successfully');
  }

  // Try to add the tabs immediately
  addSplitTabs();

  // Also watch for navigation changes
  const observer = new MutationObserver(() => {
    // Check if we're still on a server page and the tabs aren't already added
    if (window.location.pathname.includes('/server/')) {
      const existingCustomTabs = document.querySelector('a[href*="/server/"][href*="/plugins"]');
      if (!existingCustomTabs) {
        addSplitTabs();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  console.log('[Better-Falix] splitAddonsTabs: Script loaded successfully');
});