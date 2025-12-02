let config = {
  serverPages: { sections: [] },
  otherPages: { sections: [] }
};

let currentTab = 'server';
let currentSectionIndex = -1;
let currentItemIndex = -1;
let currentPageType = 'server';

// Default configuration
const defaultConfig = {
  serverPages: {
    sections: [
      {
        name: 'Server Management',
        iconPath: 'M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6l0 242.9c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4L0 134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1 0-188L288 246.6l0 188z',
        iconViewBox: '0 0 512 512',
        expanded: true,
        items: [
          {
            name: 'Console',
            url: '/server/console',
            iconPath: 'M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM48 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 112l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16L64 96c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM160 128l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32L192 96c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0z',
            iconViewBox: '0 0 512 512'
          },
          {
            name: 'File Manager',
            url: '/server/filemanager',
            iconPath: 'M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z',
            iconViewBox: '0 0 512 512'
          }
        ]
      }
    ]
  },
  otherPages: {
    sections: [
      {
        name: 'Servers',
        iconPath: 'M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6l0 242.9c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4L0 134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1 0-188L288 246.6l0 188z',
        iconViewBox: '0 0 512 512',
        expanded: true,
        items: [
          {
            name: 'Servers',
            url: '/',
            iconPath: 'M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z',
            iconViewBox: '0 0 512 512'
          },
          {
            name: 'Create Server',
            url: '/create',
            iconPath: 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z',
            iconViewBox: '0 0 448 512'
          }
        ]
      }
    ]
  }
};

// Load configuration
chrome.storage.sync.get(['navbarConfig'], (result) => {
  if (result.navbarConfig) {
    config = result.navbarConfig;
  } else {
    config = JSON.parse(JSON.stringify(defaultConfig));
  }
  renderSections();
});

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.dataset.tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    currentTab = tabName === 'server-pages' ? 'server' : 'other';
  });
});

function renderSections() {
  renderPageSections('server', 'server-sections');
  renderPageSections('other', 'other-sections');
}

function renderPageSections(pageType, containerId) {
  const container = document.getElementById(containerId);
  const sections = pageType === 'server' ? config.serverPages.sections : config.otherPages.sections;
  
  container.innerHTML = '';
  
  sections.forEach((section, sectionIndex) => {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'section';
    sectionEl.innerHTML = `
      <div class="section-header">
        <span class="drag-handle">⋮⋮</span>
        <span class="section-title">${section.name}</span>
        <div class="section-actions">
          <button class="btn btn-sm btn-secondary" onclick="editSection('${pageType}', ${sectionIndex})">Edit</button>
          <button class="btn btn-sm btn-primary" onclick="addItem('${pageType}', ${sectionIndex})">+ Add Item</button>
          <button class="btn btn-sm btn-secondary" onclick="moveSection('${pageType}', ${sectionIndex}, -1)" ${sectionIndex === 0 ? 'disabled' : ''}>↑</button>
          <button class="btn btn-sm btn-secondary" onclick="moveSection('${pageType}', ${sectionIndex}, 1)" ${sectionIndex === sections.length - 1 ? 'disabled' : ''}>↓</button>
          <button class="btn btn-sm btn-danger" onclick="deleteSection('${pageType}', ${sectionIndex})">×</button>
        </div>
      </div>
      <div class="items" id="${pageType}-items-${sectionIndex}"></div>
    `;
    container.appendChild(sectionEl);
    
    // Render items
    renderItems(pageType, sectionIndex);
  });
}

function renderItems(pageType, sectionIndex) {
  const container = document.getElementById(`${pageType}-items-${sectionIndex}`);
  const sections = pageType === 'server' ? config.serverPages.sections : config.otherPages.sections;
  const items = sections[sectionIndex].items;
  
  container.innerHTML = '';
  
  items.forEach((item, itemIndex) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'item';
    itemEl.innerHTML = `
      <span class="drag-handle">⋮⋮</span>
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-url">${item.url}</div>
      </div>
      <div class="section-actions">
        <button class="btn btn-sm btn-secondary" onclick="editItem('${pageType}', ${sectionIndex}, ${itemIndex})">Edit</button>
        <button class="btn btn-sm btn-secondary" onclick="moveItem('${pageType}', ${sectionIndex}, ${itemIndex}, -1)" ${itemIndex === 0 ? 'disabled' : ''}>↑</button>
        <button class="btn btn-sm btn-secondary" onclick="moveItem('${pageType}', ${sectionIndex}, ${itemIndex}, 1)" ${itemIndex === items.length - 1 ? 'disabled' : ''}>↓</button>
        <button class="btn btn-sm btn-danger" onclick="deleteItem('${pageType}', ${sectionIndex}, ${itemIndex})">×</button>
      </div>
    `;
    container.appendChild(itemEl);
  });
}

function addSection(pageType) {
  currentPageType = pageType;
  currentSectionIndex = -1;
  document.getElementById('sectionModalTitle').textContent = 'Add Category';
  document.getElementById('sectionName').value = '';
  document.getElementById('sectionIconPath').value = '';
  document.getElementById('sectionIconViewBox').value = '0 0 512 512';
  document.getElementById('sectionExpanded').checked = true;
  document.getElementById('sectionModal').classList.add('active');
}

function editSection(pageType, sectionIndex) {
  currentPageType = pageType;
  currentSectionIndex = sectionIndex;
  const sections = pageType === 'server' ? config.serverPages.sections : config.otherPages.sections;
  const section = sections[sectionIndex];
  
  document.getElementById('sectionModalTitle').textContent = 'Edit Category';
  document.getElementById('sectionName').value = section.name;
  document.getElementById('sectionIconPath').value = section.iconPath;
  document.getElementById('sectionIconViewBox').value = section.iconViewBox || '0 0 512 512';
  document.getElementById('sectionExpanded').checked = section.expanded !== false;
  document.getElementById('sectionModal').classList.add('active');
}

function closeSectionModal() {
  document.getElementById('sectionModal').classList.remove('active');
}

function saveSectionModal() {
  const name = document.getElementById('sectionName').value;
  const iconPath = document.getElementById('sectionIconPath').value;
  const iconViewBox = document.getElementById('sectionIconViewBox').value;
  const expanded = document.getElementById('sectionExpanded').checked;
  
  if (!name || !iconPath) {
    alert('Please fill in all required fields');
    return;
  }
  
  const sectionData = {
    name,
    iconPath,
    iconViewBox,
    expanded,
    items: []
  };
  
  const sections = currentPageType === 'server' ? config.serverPages.sections : config.otherPages.sections;
  
  if (currentSectionIndex === -1) {
    sections.push(sectionData);
  } else {
    sectionData.items = sections[currentSectionIndex].items;
    sections[currentSectionIndex] = sectionData;
  }
  
  renderSections();
  closeSectionModal();
}

function deleteSection(pageType, sectionIndex) {
  if (!confirm('Are you sure you want to delete this category and all its items?')) return;
  
  const sections = pageType === 'server' ? config.serverPages.sections : config.otherPages.sections;
  sections.splice(sectionIndex, 1);
  renderSections();
}

function moveSection(pageType, sectionIndex, direction) {
  const sections = pageType === 'server' ? config.serverPages.sections : config.otherPages.sections;
  const newIndex = sectionIndex + direction;
  
  if (newIndex < 0 || newIndex >= sections.length) return;
  
  [sections[sectionIndex], sections[newIndex]] = [sections[newIndex], sections[sectionIndex]];
  renderSections();
}

function addItem(pageType, sectionIndex) {
  currentPageType = pageType;
  currentSectionIndex = sectionIndex;
  currentItemIndex = -1;
  
  document.getElementById('itemModalTitle').textContent = 'Add Item';
  document.getElementById('itemName').value = '';
  document.getElementById('itemUrl').value = '';
  document.getElementById('itemIconPath').value = '';
  document.getElementById('itemIconViewBox').value = '0 0 512 512';
  document.getElementById('itemTarget').value = '';
  document.getElementById('itemModal').classList.add('active');
}

function editItem(pageType, sectionIndex, itemIndex) {
  currentPageType = pageType;
  currentSectionIndex = sectionIndex;
  currentItemIndex = itemIndex;
  
  const sections = pageType === 'server' ? config.serverPages.sections : config.otherPages.sections;
  const item = sections[sectionIndex].items[itemIndex];
  
  document.getElementById('itemModalTitle').textContent = 'Edit Item';
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemUrl').value = item.url;
  document.getElementById('itemIconPath').value = item.iconPath;
  document.getElementById('itemIconViewBox').value = item.iconViewBox || '0 0 512 512';
  document.getElementById('itemTarget').value = item.target || '';
  document.getElementById('itemModal').classList.add('active');
}

function closeItemModal() {
  document.getElementById('itemModal').classList.remove('active');
}

function saveItemModal() {
  const name = document.getElementById('itemName').value;
  const url = document.getElementById('itemUrl').value;
  const iconPath = document.getElementById('itemIconPath').value;
  const iconViewBox = document.getElementById('itemIconViewBox').value;
  const target = document.getElementById('itemTarget').value;
  
  if (!name || !url || !iconPath) {
    alert('Please fill in all required fields');
    return;
  }
  
  const itemData = {
    name,
    url,
    iconPath,
    iconViewBox
  };
  
  if (target) {
    itemData.target = target;
  }
  
  const sections = currentPageType === 'server' ? config.serverPages.sections : config.otherPages.sections;
  
  if (currentItemIndex === -1) {
    sections[currentSectionIndex].items.push(itemData);
  } else {
    sections[currentSectionIndex].items[currentItemIndex] = itemData;
  }
  
  renderSections();
  closeItemModal();
}

function deleteItem(pageType, sectionIndex, itemIndex) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  
  const sections = pageType === 'server' ? config.serverPages.sections : config.otherPages.sections;
  sections[sectionIndex].items.splice(itemIndex, 1);
  renderSections();
}

function moveItem(pageType, sectionIndex, itemIndex, direction) {
  const sections = pageType === 'server' ? config.serverPages.sections : config.otherPages.sections;
  const items = sections[sectionIndex].items;
  const newIndex = itemIndex + direction;
  
  if (newIndex < 0 || newIndex >= items.length) return;
  
  [items[itemIndex], items[newIndex]] = [items[newIndex], items[itemIndex]];
  renderSections();
}

function saveConfig() {
  chrome.storage.sync.set({ navbarConfig: config }, () => {
    alert('Configuration saved! Reload the page to see changes.');
  });
}

function resetToDefault() {
  if (!confirm('Are you sure you want to reset to default configuration? This cannot be undone.')) return;
  
  config = JSON.parse(JSON.stringify(defaultConfig));
  renderSections();
  saveConfig();
}
