console.log('[better-falix] navbar-editor: Script loading');

chrome.storage.sync.get({ enabled: true, navbarEditorV2Enabled: false }, (data) => {
  if (!data.enabled || !data.navbarEditorV2Enabled) {
    console.log('[better-falix] navbar-editor: Script disabled');
    return;
  }
  console.log('[better-falix] navbar-editor: Script enabled');

  // Inject CSS to ensure custom navbar items match the new thicker navbar style
  const style = document.createElement('style');
  style.id = 'custom-navbar-sizing';
  style.textContent = `
    /* Match the thicker navbar style for custom navbar items */
    .navbar-nav-container .nav-link {
      padding: 14px 20px !important;
      min-height: 48px !important;
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      font-size: 15px !important;
    }
    
    .navbar-nav-container .nav-item {
      margin-bottom: 2px !important;
    }
    
    .navbar-nav-container .nav-link svg {
      width: 18px !important;
      height: 18px !important;
      flex-shrink: 0 !important;
    }
    
    .navbar-nav-container .nav-category {
      padding: 14px 20px !important;
      min-height: 48px !important;
      font-size: 13px !important;
    }
  `;
  document.head.appendChild(style);

  const isServerPage = window.location.pathname.startsWith('/server/');
  const configKey = isServerPage ? 'navbarConfigServer' : 'navbarConfigOther';
  console.log('[better-falix] navbar-editor: Looking for config key:', configKey, 'isServerPage:', isServerPage);

  chrome.storage.local.get([configKey], (result) => {
    console.log('[better-falix] navbar-editor: Storage result:', result);
    const config = result[configKey];
    if (!config || !config.sections || config.sections.length === 0) {
      console.log('[better-falix] navbar-editor: No custom navbar config found or empty config', 'config:', config);
      return;
    }

    console.log('[better-falix] navbar-editor: Config loaded:', config);
    applyNavbarConfig(config);
  });
});

function applyNavbarConfig(config) {
  const navContainer = document.querySelector('.navbar-nav-container') || document.querySelector('.menu-scroll-container');
  if (!navContainer) {
    console.log('[better-falix] navbar-editor: Navbar container not found, retrying...');
    setTimeout(() => applyNavbarConfig(config), 500);
    return;
  }

  console.log('[better-falix] navbar-editor: Applying config with', config.sections.length, 'sections');

  // Clear existing sections
  navContainer.innerHTML = '';

  // Build new navbar from config
  config.sections.forEach((section, index) => {
    console.log('[better-falix] navbar-editor: Creating section', index + 1, ':', section.name);
    const sectionEl = createNavSection(section);
    navContainer.appendChild(sectionEl);
  });

  console.log('[better-falix] navbar-editor: Custom navbar applied successfully');
}

function createNavSection(section) {
  const sectionDiv = document.createElement('div');
  sectionDiv.className = 'nav-section';

  // If hideHeader is true, just add items directly without header
  if (section.hideHeader) {
    section.items.forEach(item => {
      sectionDiv.appendChild(createNavItem(item));
    });
    return sectionDiv;
  }

  const sectionId = section.name.toLowerCase().replace(/\s+/g, '') + 'Section';
  const expandedClass = section.expanded ? 'show' : '';

  const button = document.createElement('button');
  button.className = 'nav-category';
  button.setAttribute('data-bs-toggle', 'collapse');
  button.setAttribute('data-bs-target', '#' + sectionId);
  button.setAttribute('aria-expanded', section.expanded.toString());
  button.setAttribute('aria-controls', sectionId);
  button.setAttribute('data-category', section.name.toUpperCase());
  
  const catSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  catSvg.setAttribute('class', 'svg-inline--fa fa-cube category-icon');
  catSvg.setAttribute('aria-hidden', 'true');
  catSvg.setAttribute('focusable', 'false');
  catSvg.setAttribute('viewBox', '0 0 512 512');
  
  const catPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  catPath.setAttribute('fill', 'currentColor');
  catPath.setAttribute('d', 'M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6l0 242.9c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4L0 134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1 0-188L288 246.6l0 188z');
  catSvg.appendChild(catPath);
  button.appendChild(catSvg);
  
  const nameSpan = document.createElement('span');
  nameSpan.textContent = section.name;
  button.appendChild(nameSpan);
  
  const chevSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  chevSvg.setAttribute('class', 'svg-inline--fa fa-chevron-down toggle-icon');
  chevSvg.setAttribute('aria-hidden', 'true');
  chevSvg.setAttribute('focusable', 'false');
  chevSvg.setAttribute('viewBox', '0 0 512 512');
  
  const chevPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  chevPath.setAttribute('fill', 'currentColor');
  chevPath.setAttribute('d', 'M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z');
  chevSvg.appendChild(chevPath);
  button.appendChild(chevSvg);
  
  sectionDiv.appendChild(button);
  
  const collapseDiv = document.createElement('div');
  collapseDiv.className = 'collapse ' + expandedClass;
  collapseDiv.id = sectionId;
  
  const ul = document.createElement('ul');
  ul.className = 'navbar-nav';
  ul.setAttribute('role', 'list');
  
  section.items.forEach(item => {
    ul.appendChild(createNavItem(item));
  });
  
  collapseDiv.appendChild(ul);
  sectionDiv.appendChild(collapseDiv);

  return sectionDiv;
}

function createNavItem(item) {
  const viewBox = item.iconViewBox || '0 0 512 512';
  
  // Check if the current page matches this nav item
  const currentPath = window.location.pathname;
  let isActive = false;
  
  // Handle server pages with ID in URL (e.g., /server/12345/console)
  if (item.url.startsWith('/server/') && currentPath.startsWith('/server/')) {
    // Extract the page name from item URL (e.g., "console" from "/server/console")
    const itemPage = item.url.replace('/server/', '');
    // Check if current path ends with the same page (e.g., "/server/12345/console" ends with "console")
    isActive = currentPath.endsWith('/' + itemPage) || currentPath.includes('/server/' + itemPage);
  } else {
    // For non-server pages, use exact or prefix match
    isActive = currentPath === item.url || currentPath.startsWith(item.url + '/');
  }
  
  const li = document.createElement('li');
  li.className = 'nav-item';
  li.setAttribute('role', 'listitem');
  
  const a = document.createElement('a');
  a.className = 'nav-link' + (isActive ? ' active' : '');
  a.href = item.url;
  a.setAttribute('aria-label', item.name);
  if (item.target) {
    a.target = item.target;
  }
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'svg-inline--fa');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('viewBox', viewBox);
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'currentColor');
  path.setAttribute('d', item.iconPath);
  svg.appendChild(path);
  a.appendChild(svg);
  
  const span = document.createElement('span');
  span.textContent = item.name;
  a.appendChild(span);
  
  li.appendChild(a);
  return li;
}
