// [better-falix] add-versions-nav: Script loading
console.log('[better-falix] add-versions-nav: Script loading');

chrome.storage.sync.get({ addVersionsNav: false, enabled: true }, (data) => {
  if (!data.enabled || !data.addVersionsNav) {
    console.log('[better-falix] add-versions-nav: Script disabled');
    return;
  }
  console.log('[better-falix] add-versions-nav: Script enabled');

  //  --------- START FEATURE ----------

  function addVersionsNavItem() {
    // Find the Minecraft category
    const minecraftCategory = Array.from(document.querySelectorAll('.nav-category-label')).find(
      el => el.textContent.trim() === 'Minecraft'
    );

    if (!minecraftCategory) {
      console.log('[better-falix] add-versions-nav: Minecraft category not found');
      return;
    }

    const minecraftSection = minecraftCategory.closest('.nav-category');
    if (!minecraftSection) {
      console.log('[better-falix] add-versions-nav: Minecraft section not found');
      return;
    }

    // Check if Versions link already exists
    const existingVersionsLink = minecraftSection.querySelector('a[href="/server/versions"]');
    if (existingVersionsLink) {
      console.log('[better-falix] add-versions-nav: Versions link already exists');
      return;
    }

    // Create the Versions nav item
    const versionsNavItem = document.createElement('a');
    versionsNavItem.className = 'nav-link';
    versionsNavItem.href = '/server/versions';
    versionsNavItem.setAttribute('aria-label', 'Server Versions');
    versionsNavItem.innerHTML = `
      <svg class="svg-inline--fa fa-code-branch" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="code-branch" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3l0 38.7c0 17.7 14.3 32 32 32l160 0c17.7 0 32-14.3 32-32l0-38.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 38.7c0 53-43 96-96 96l-48 0 0 70.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3l0-70.7-48 0c-53 0-96-43-96-96l0-38.7C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm208 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM248 432a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"></path></svg>
      <span>Versions</span>
    `;

    // Find the nav-items container within the Minecraft section
    const navItems = minecraftSection.querySelector('.nav-items');
    if (navItems) {
      // Add it as the first item in the Minecraft section
      navItems.insertBefore(versionsNavItem, navItems.firstChild);
      console.log('[better-falix] add-versions-nav: Versions nav item added successfully');
    } else {
      console.log('[better-falix] add-versions-nav: Nav items container not found');
    }
  }

  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addVersionsNavItem);
  } else {
    addVersionsNavItem();
  }

  setTimeout(() => {
    console.log('[better-falix] add-versions-nav: Script loaded successfully');
  }, 10);
});
