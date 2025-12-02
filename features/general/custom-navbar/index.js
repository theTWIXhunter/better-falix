// [better-falix] custom-navbar: Script loading
console.log('[better-falix] custom-navbar: Script loading');

chrome.storage.sync.get({ customNavbar: false, enabled: true, navbarConfig: null }, (data) => {
  if (!data.enabled || !data.customNavbar || !data.navbarConfig) {
    console.log('[better-falix] custom-navbar: Script disabled or no config');
    return;
  }
  console.log('[better-falix] custom-navbar: Script enabled');

  // Determine which config to use based on current URL
  const isServerPage = window.location.pathname.startsWith('/server/');
  const config = isServerPage ? data.navbarConfig.serverPages : data.navbarConfig.otherPages;

  if (!config || !config.sections || config.sections.length === 0) {
    console.log('[better-falix] custom-navbar: No configuration for this page type');
    return;
  }

  function customizeNavbar() {
    const navContainer = document.querySelector('.navbar-nav-container');
    if (!navContainer) {
      console.log('[better-falix] custom-navbar: Navigation container not found');
      return;
    }

    // Remove all existing nav sections except the account section (last one)
    const sections = Array.from(navContainer.querySelectorAll('.nav-section'));
    sections.forEach((section, index) => {
      // Keep the last section (account section)
      if (index < sections.length - 1) {
        section.remove();
      }
    });

    // Create custom sections based on configuration
    const accountSection = navContainer.querySelector('.nav-section:last-child');
    
    config.sections.forEach((section, sectionIndex) => {
      const navSection = createNavSection(section, sectionIndex);
      if (accountSection) {
        navContainer.insertBefore(navSection, accountSection);
      } else {
        navContainer.appendChild(navSection);
      }
    });

    console.log('[better-falix] custom-navbar: Navbar customized successfully');
  }

  function createNavSection(sectionConfig, sectionIndex) {
    const sectionId = `customSection${sectionIndex}`;
    const isExpanded = sectionConfig.expanded !== false;
    const hideHeader = sectionConfig.hideHeader || false;

    const section = document.createElement('div');
    section.className = 'nav-section';
    
    // If hideHeader is true, skip creating the category button and just add items directly
    if (hideHeader) {
      const navList = document.createElement('ul');
      navList.className = 'navbar-nav';
      navList.setAttribute('role', 'list');

      // Add items directly without collapse wrapper
      sectionConfig.items.forEach(item => {
        const navItem = createNavItem(item);
        navList.appendChild(navItem);
      });

      section.appendChild(navList);
      return section;
    }
    
    // Original behavior: show category header
    const categoryButton = document.createElement('button');
    categoryButton.className = 'nav-category';
    categoryButton.setAttribute('data-bs-toggle', 'collapse');
    categoryButton.setAttribute('data-bs-target', `#${sectionId}`);
    categoryButton.setAttribute('aria-expanded', isExpanded.toString());
    categoryButton.setAttribute('aria-controls', sectionId);
    categoryButton.setAttribute('data-category', sectionConfig.name.toUpperCase());

    // Create icon
    const icon = document.createElement('svg');
    icon.className = 'svg-inline--fa category-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');
    icon.setAttribute('role', 'img');
    icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    icon.setAttribute('viewBox', sectionConfig.iconViewBox || '0 0 512 512');
    const iconPath = document.createElement('path');
    iconPath.setAttribute('fill', 'currentColor');
    iconPath.setAttribute('d', sectionConfig.iconPath);
    icon.appendChild(iconPath);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = sectionConfig.name;

    const toggleIcon = document.createElement('svg');
    toggleIcon.className = 'svg-inline--fa fa-chevron-down toggle-icon';
    toggleIcon.setAttribute('aria-hidden', 'true');
    toggleIcon.setAttribute('focusable', 'false');
    toggleIcon.setAttribute('role', 'img');
    toggleIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    toggleIcon.setAttribute('viewBox', '0 0 512 512');
    const togglePath = document.createElement('path');
    togglePath.setAttribute('fill', 'currentColor');
    togglePath.setAttribute('d', 'M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z');
    toggleIcon.appendChild(togglePath);

    categoryButton.appendChild(icon);
    categoryButton.appendChild(nameSpan);
    categoryButton.appendChild(toggleIcon);

    const collapseDiv = document.createElement('div');
    collapseDiv.className = isExpanded ? 'collapse show' : 'collapse';
    collapseDiv.id = sectionId;

    const navList = document.createElement('ul');
    navList.className = 'navbar-nav';
    navList.setAttribute('role', 'list');

    // Add items
    sectionConfig.items.forEach(item => {
      const navItem = createNavItem(item);
      navList.appendChild(navItem);
    });

    collapseDiv.appendChild(navList);
    section.appendChild(categoryButton);
    section.appendChild(collapseDiv);

    return section;
  }

  function createNavItem(itemConfig) {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.setAttribute('role', 'listitem');

    const link = document.createElement('a');
    link.className = 'nav-link';
    link.href = itemConfig.url;
    link.setAttribute('aria-label', itemConfig.name);
    
    if (itemConfig.target) {
      link.setAttribute('target', itemConfig.target);
    }

    // Check if this is the current page
    if (window.location.pathname === itemConfig.url) {
      link.classList.add('active');
    }

    // Create icon
    const icon = document.createElement('svg');
    icon.className = 'svg-inline--fa';
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');
    icon.setAttribute('role', 'img');
    icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    icon.setAttribute('viewBox', itemConfig.iconViewBox || '0 0 512 512');
    const iconPath = document.createElement('path');
    iconPath.setAttribute('fill', 'currentColor');
    iconPath.setAttribute('d', itemConfig.iconPath);
    icon.appendChild(iconPath);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = itemConfig.name;

    link.appendChild(icon);
    link.appendChild(nameSpan);
    li.appendChild(link);

    return li;
  }

  function waitForNavbar() {
    const checkInterval = setInterval(() => {
      const navContainer = document.querySelector('.navbar-nav-container');
      
      if (navContainer) {
        clearInterval(checkInterval);
        customizeNavbar();
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForNavbar);
  } else {
    waitForNavbar();
  }

  console.log('[better-falix] custom-navbar: Script loaded successfully');
});
