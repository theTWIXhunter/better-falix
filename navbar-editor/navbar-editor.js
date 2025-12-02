// Default configurations
const DEFAULT_CONFIGS = {
  server: {
    sections: [
      {
        name: 'Servers',
        expanded: true,
        items: [
          { name: 'Servers', url: '/', iconPath: 'M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z' },
          { name: 'Create Server', url: '/create', iconPath: 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z' }
        ]
      },
      {
        name: 'Account',
        expanded: false,
        items: [
          { name: 'Settings', url: '/profile/settings', iconPath: 'M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z' },
          { name: 'Logout', url: '/logout', iconPath: 'M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z' }
        ]
      }
    ]
  },
  other: {
    sections: [
      {
        name: 'Servers',
        expanded: true,
        items: [
          { name: 'Servers', url: '/', iconPath: 'M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z' },
          { name: 'Create Server', url: '/create', iconPath: 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z' }
        ]
      }
    ]
  }
};

let currentPageType = 'server';
let currentConfig = null;
let editingSection = null;
let editingItem = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadConfigs();
  setupEventListeners();
});

function loadConfigs() {
  chrome.storage.sync.get(['navbarConfigServer', 'navbarConfigOther'], (result) => {
    if (!result.navbarConfigServer) {
      chrome.storage.sync.set({ navbarConfigServer: DEFAULT_CONFIGS.server });
    }
    if (!result.navbarConfigOther) {
      chrome.storage.sync.set({ navbarConfigOther: DEFAULT_CONFIGS.other });
    }
    
    renderSections(currentPageType);
  });
}

function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabName = e.target.dataset.tab;
      switchTab(tabName);
    });
  });

  // Action buttons
  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (!action) return;

    switch (action) {
      case 'add-section':
        addSection(e.target.dataset.pageType);
        break;
      case 'edit-section':
        editSection(e.target.dataset.sectionIndex);
        break;
      case 'delete-section':
        deleteSection(e.target.dataset.sectionIndex);
        break;
      case 'add-item':
        addItem(e.target.dataset.sectionIndex);
        break;
      case 'edit-item':
        editItem(e.target.dataset.sectionIndex, e.target.dataset.itemIndex);
        break;
      case 'delete-item':
        deleteItem(e.target.dataset.sectionIndex, e.target.dataset.itemIndex);
        break;
      case 'close-section-modal':
        closeSectionModal();
        break;
      case 'save-section-modal':
        saveSectionModal();
        break;
      case 'close-item-modal':
        closeItemModal();
        break;
      case 'save-item-modal':
        saveItemModal();
        break;
      case 'reset':
        resetToDefault();
        break;
    }
  });
}

function switchTab(tabName) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  document.getElementById(tabName).classList.add('active');
  
  currentPageType = tabName === 'server-pages' ? 'server' : 'other';
  renderSections(currentPageType);
}

function renderSections(pageType) {
  const configKey = `navbarConfig${pageType === 'server' ? 'Server' : 'Other'}`;
  
  chrome.storage.sync.get([configKey], (result) => {
    currentConfig = result[configKey] || DEFAULT_CONFIGS[pageType];
    const container = document.getElementById(`${pageType === 'server' ? 'server' : 'other'}-sections`);
    container.innerHTML = '';
    
    currentConfig.sections.forEach((section, sIndex) => {
      container.appendChild(createSectionElement(section, sIndex));
    });
  });
}

function createSectionElement(section, sIndex) {
  const div = document.createElement('div');
  div.className = 'section';
  div.innerHTML = `
    <div class="section-header">
      <span class="drag-handle">☰</span>
      <span class="section-title">${section.name}</span>
      <div class="section-actions">
        <button class="btn btn-sm btn-secondary" data-action="add-item" data-section-index="${sIndex}">+ Item</button>
        <button class="btn btn-sm btn-secondary" data-action="edit-section" data-section-index="${sIndex}">Edit</button>
        <button class="btn btn-sm btn-danger" data-action="delete-section" data-section-index="${sIndex}">Delete</button>
      </div>
    </div>
    <div class="items">
      ${section.items.map((item, iIndex) => `
        <div class="item">
          <span class="drag-handle">☰</span>
          <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-url">${item.url}</div>
          </div>
          <button class="btn btn-sm btn-secondary" data-action="edit-item" data-section-index="${sIndex}" data-item-index="${iIndex}">Edit</button>
          <button class="btn btn-sm btn-danger" data-action="delete-item" data-section-index="${sIndex}" data-item-index="${iIndex}">Delete</button>
        </div>
      `).join('')}
    </div>
  `;
  return div;
}

function addSection(pageType) {
  editingSection = { index: -1, pageType };
  document.getElementById('sectionModalTitle').textContent = 'Add Category';
  document.getElementById('sectionName').value = '';
  document.getElementById('sectionExpanded').checked = true;
  document.getElementById('sectionModal').classList.add('active');
}

function editSection(index) {
  editingSection = { index: parseInt(index), pageType: currentPageType };
  const section = currentConfig.sections[index];
  document.getElementById('sectionModalTitle').textContent = 'Edit Category';
  document.getElementById('sectionName').value = section.name;
  document.getElementById('sectionExpanded').checked = section.expanded;
  document.getElementById('sectionModal').classList.add('active');
}

function deleteSection(index) {
  if (!confirm('Delete this category?')) return;
  currentConfig.sections.splice(parseInt(index), 1);
  saveConfig();
}

function saveSectionModal() {
  const name = document.getElementById('sectionName').value.trim();
  const expanded = document.getElementById('sectionExpanded').checked;
  
  if (!name) return;
  
  if (editingSection.index === -1) {
    currentConfig.sections.push({ name, expanded, items: [] });
  } else {
    currentConfig.sections[editingSection.index].name = name;
    currentConfig.sections[editingSection.index].expanded = expanded;
  }
  
  saveConfig();
  closeSectionModal();
}

function closeSectionModal() {
  document.getElementById('sectionModal').classList.remove('active');
  editingSection = null;
}

function addItem(sectionIndex) {
  editingItem = { sectionIndex: parseInt(sectionIndex), itemIndex: -1 };
  document.getElementById('itemModalTitle').textContent = 'Add Item';
  document.getElementById('itemName').value = '';
  document.getElementById('itemUrl').value = '';
  document.getElementById('itemIconPath').value = '';
  document.getElementById('itemIconViewBox').value = '0 0 512 512';
  document.getElementById('itemTarget').value = '';
  document.getElementById('itemModal').classList.add('active');
}

function editItem(sectionIndex, itemIndex) {
  editingItem = { sectionIndex: parseInt(sectionIndex), itemIndex: parseInt(itemIndex) };
  const item = currentConfig.sections[sectionIndex].items[itemIndex];
  document.getElementById('itemModalTitle').textContent = 'Edit Item';
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemUrl').value = item.url;
  document.getElementById('itemIconPath').value = item.iconPath;
  document.getElementById('itemIconViewBox').value = item.iconViewBox || '0 0 512 512';
  document.getElementById('itemTarget').value = item.target || '';
  document.getElementById('itemModal').classList.add('active');
}

function deleteItem(sectionIndex, itemIndex) {
  if (!confirm('Delete this item?')) return;
  currentConfig.sections[sectionIndex].items.splice(parseInt(itemIndex), 1);
  saveConfig();
}

function saveItemModal() {
  const name = document.getElementById('itemName').value.trim();
  const url = document.getElementById('itemUrl').value.trim();
  const iconPath = document.getElementById('itemIconPath').value.trim();
  const iconViewBox = document.getElementById('itemIconViewBox').value.trim();
  const target = document.getElementById('itemTarget').value.trim();
  
  if (!name || !url || !iconPath) return;
  
  const item = { name, url, iconPath };
  if (iconViewBox && iconViewBox !== '0 0 512 512') item.iconViewBox = iconViewBox;
  if (target) item.target = target;
  
  if (editingItem.itemIndex === -1) {
    currentConfig.sections[editingItem.sectionIndex].items.push(item);
  } else {
    currentConfig.sections[editingItem.sectionIndex].items[editingItem.itemIndex] = item;
  }
  
  saveConfig();
  closeItemModal();
}

function closeItemModal() {
  document.getElementById('itemModal').classList.remove('active');
  editingItem = null;
}

function saveConfig() {
  const configKey = `navbarConfig${currentPageType === 'server' ? 'Server' : 'Other'}`;
  chrome.storage.sync.set({ [configKey]: currentConfig }, () => {
    renderSections(currentPageType);
  });
}

function resetToDefault() {
  if (!confirm('Reset to default navbar configuration?')) return;
  chrome.storage.sync.set({
    navbarConfigServer: DEFAULT_CONFIGS.server,
    navbarConfigOther: DEFAULT_CONFIGS.other
  }, () => {
    loadConfigs();
  });
}
