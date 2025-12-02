console.log('[better-falix] navbar-editor: Script loading');

chrome.storage.sync.get({ enabled: true, navbarEditorEnabled: false }, (data) => {
  if (!data.enabled || !data.navbarEditorEnabled) {
    console.log('[better-falix] navbar-editor: Script disabled');
    return;
  }
  console.log('[better-falix] navbar-editor: Script enabled');

  const isServerPage = window.location.pathname.startsWith('/server/');
  const configKey = isServerPage ? 'navbarConfigServer' : 'navbarConfigOther';
  console.log('[better-falix] navbar-editor: Looking for config key:', configKey, 'isServerPage:', isServerPage);

  chrome.storage.sync.get([configKey], (result) => {
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
  const navContainer = document.querySelector('.navbar-nav-container');
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
    sectionDiv.innerHTML = section.items.map(item => createNavItem(item)).join('');
    return sectionDiv;
  }

  const sectionId = section.name.toLowerCase().replace(/\s+/g, '') + 'Section';
  const expandedClass = section.expanded ? 'show' : '';

  sectionDiv.innerHTML = `
    <button class="nav-category" data-bs-toggle="collapse" data-bs-target="#${sectionId}" 
            aria-expanded="${section.expanded}" aria-controls="${sectionId}" 
            data-category="${section.name.toUpperCase()}">
      <svg class="svg-inline--fa fa-cube category-icon" aria-hidden="true" focusable="false" 
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6l0 242.9c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4L0 134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1 0-188L288 246.6l0 188z"></path>
      </svg>
      <span>${section.name}</span>
      <svg class="svg-inline--fa fa-chevron-down toggle-icon" aria-hidden="true" focusable="false" 
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
      </svg>
    </button>
    <div class="collapse ${expandedClass}" id="${sectionId}">
      <ul class="navbar-nav" role="list">
        ${section.items.map(item => createNavItem(item)).join('')}
      </ul>
    </div>
  `;

  return sectionDiv;
}

function createNavItem(item) {
  const targetAttr = item.target ? `target="${item.target}"` : '';
  const viewBox = item.iconViewBox || '0 0 512 512';
  
  return `
    <li class="nav-item" role="listitem">
      <a class="nav-link" href="${item.url}" aria-label="${item.name}" ${targetAttr}>
        <svg class="svg-inline--fa" aria-hidden="true" focusable="false" 
             xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">
          <path fill="currentColor" d="${item.iconPath}"></path>
        </svg>
        <span>${item.name}</span>
      </a>
    </li>
  `;
}
