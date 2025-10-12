// Split Addons Tabs Feature
// Splits the addons tab back into separate plugins, mods, modpacks, and datapacks tabs
// and hides the content-type-nav on those pages

function addSplitAddonsTabs() {
  console.log('[Better Falix] Split Addons Tabs feature loaded');

  // Check if we're on a server page
  if (!window.location.pathname.includes('/server/')) {
    return;
  }

  // Hide content-type-nav on addon pages
  function hideContentTypeNav() {
    const contentTypeNav = document.querySelector('.content-type-nav');
    if (contentTypeNav) {
      contentTypeNav.style.display = 'none';
      console.log('[Better Falix] Hidden content-type-nav');
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
      console.log('[Better Falix] Addons tab not found');
      return;
    }

    // Get the server ID from the current URL
    const serverIdMatch = window.location.pathname.match(/\/server\/([^\/]+)/);
    if (!serverIdMatch) {
      console.log('[Better Falix] Could not extract server ID');
      return;
    }
    const serverId = serverIdMatch[1];

    // Hide the original addons tab
    addonsTab.style.display = 'none';

    // Create the new split tabs
    const tabsData = [
      { name: 'Plugins', url: `/server/${serverId}/plugins`, icon: 'fa-puzzle-piece' },
      { name: 'Mods', url: `/server/${serverId}/mods`, icon: 'fa-wrench' },
      { name: 'Modpacks', url: `/server/${serverId}/modpacks`, icon: 'fa-box' },
      { name: 'Datapacks', url: `/server/${serverId}/datapacks`, icon: 'fa-database' }
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
      if (window.location.pathname.includes(tabData.url)) {
        link.classList.add('active');
      }
      
      link.innerHTML = `<i class="fa-solid ${tabData.icon}"></i> ${tabData.name}`;
      
      newTab.appendChild(link);
      
      // Insert after the previous element
      insertAfter.parentNode.insertBefore(newTab, insertAfter.nextSibling);
      insertAfter = newTab;
    });

    console.log('[Better Falix] Split addons tabs added successfully');
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
}

// Check if the feature is enabled
chrome.storage.sync.get(['splitAddonsTabs'], (result) => {
  if (result.splitAddonsTabs) {
    addSplitAddonsTabs();
  }
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.splitAddonsTabs) {
    if (changes.splitAddonsTabs.newValue) {
      addSplitAddonsTabs();
    } else {
      // Reload page to remove the feature
      location.reload();
    }
  }
});