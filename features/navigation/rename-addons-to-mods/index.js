// [better-falix] rename-addons-to-mods: Script loading
console.log('[better-falix] rename-addons-to-mods: Script loading');

chrome.storage.sync.get({ renameAddonsToMods: false, enabled: true }, (data) => {
  console.log('[better-falix] rename-addons-to-mods: Storage data:', data);
  if (!data.enabled || !data.renameAddonsToMods) {
    console.log('[better-falix] rename-addons-to-mods: Script disabled', 'enabled:', data.enabled, 'renameAddonsToMods:', data.renameAddonsToMods);
    return;
  }
  console.log('[better-falix] rename-addons-to-mods: Script enabled');

  //  --------- START FEATURE ----------

  function renameAddonsToMods() {
    console.log('[Better-Falix] rename-addons-to-mods: Running renameAddonsToMods function');
    // Find navigation items in the Minecraft category
    const navItems = document.querySelectorAll('.nav-item');
    console.log('[Better-Falix] rename-addons-to-mods: Found', navItems.length, 'nav items');
    
    for (const item of navItems) {
      const link = item.querySelector('a');
      if (link) {
        const linkText = link.textContent.trim().toLowerCase();
        console.log('[Better-Falix] rename-addons-to-mods: Checking nav item:', linkText);
        if (linkText.includes('addon')) {
          console.log('[Better-Falix] rename-addons-to-mods: Found addons link:', linkText);
          // Find the icon element (usually an <i> tag)
          const icon = link.querySelector('i');
          
          if (icon) {
            // Keep the icon and update the text content
            link.innerHTML = '';
            link.appendChild(icon);
            link.appendChild(document.createTextNode(' Mods'));
          } else {
            // No icon found, just change text
            link.textContent = 'Mods';
          }
          
          console.log('[Better-Falix] rename-addons-to-mods: Renamed Addons to Mods');
          break;
        }
      }
    }

    // Also check for any other elements that might contain "addons" text
    const allLinks = document.querySelectorAll('a');
    for (const link of allLinks) {
      if (link.textContent.trim().toLowerCase().includes('addon') && 
          link.href && link.href.includes('/server/') && link.href.includes('/plugins')) {
        
        // Find the icon element (usually an <i> tag)
        const icon = link.querySelector('i');
        
        if (icon) {
          // Keep the icon and update the text content
          link.innerHTML = '';
          link.appendChild(icon);
          link.appendChild(document.createTextNode(' Mods'));
        } else {
          // No icon found, just change text
          link.textContent = 'Mods';
        }
        
        console.log('[Better-Falix] rename-addons-to-mods: Renamed additional Addons link to Mods');
      }
    }
  }

  // Run the function immediately
  renameAddonsToMods();

  // Also watch for dynamically loaded content
  const observer = new MutationObserver(() => {
    renameAddonsToMods();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  console.log('[Better-Falix] rename-addons-to-mods: Script loaded successfully');
});