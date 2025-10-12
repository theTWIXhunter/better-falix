// [better-falix] renameConfigToProperties: Script loading
console.log('[better-falix] rename-Config-To-Properties: Script loading');

chrome.storage.sync.get({ renameConfigToProperties: false, enabled: true }, (data) => {
  if (!data.enabled || !data.renameConfigToProperties) {
    console.log('[better-falix] rename-Config-To-Properties: Script disabled');
    return;
  }
  console.log('[better-falix] rename-Config-To-Properties: Script enabled');

  //  --------- START FEATURE ----------

  function renameConfigToProperties() {
    // Find navigation items in the Minecraft category
    const navItems = document.querySelectorAll('.nav-item');
    
    for (const item of navItems) {
      const link = item.querySelector('a');
      if (link && link.textContent.trim().toLowerCase() === 'config') {
        // Change the text content to "Properties"
        link.textContent = 'Properties';
        console.log('[Better-Falix] rename-Config-To-Properties: Renamed Config to Properties');
        break;
      }
    }

    // Also check for any other elements that might contain "config" text
    const allLinks = document.querySelectorAll('a');
    for (const link of allLinks) {
      if (link.textContent.trim().toLowerCase() === 'config' && 
          link.href && link.href.includes('/server/') && link.href.includes('/properties')) {
        link.textContent = 'Properties';
        console.log('[Better-Falix] rename-Config-To-Properties: Renamed additional Config link to Properties');
      }
    }
  }

  // Run the function immediately
  renameConfigToProperties();

  // Also watch for dynamically loaded content
  const observer = new MutationObserver(() => {
    renameConfigToProperties();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  console.log('[Better-Falix] rename-Config-To-Properties: Script loaded successfully');
});