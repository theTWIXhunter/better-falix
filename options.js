// [better-falix] options: Script loading
console.log('[better-falix] options: Script loading');

// Proof of concept: feature toggles and settings
function setToggleState(btn, state) {
  if (!btn) return;
  btn.setAttribute('aria-pressed', state ? 'true' : 'false');
  btn.classList.toggle('on', state);
}

function saveSetting(key, value) {
  const obj = {};
  obj[key] = value;
  chrome.storage.sync.set(obj);
}

// Load settings and update UI
chrome.storage.sync.get(null, data => {
  // Only set toggle states for elements that exist
  const enabledToggle = document.getElementById('enabled');
  if (enabledToggle) setToggleState(enabledToggle, !!data.enabled);
  
  const themeSelect = document.getElementById('theme');
  if (themeSelect) themeSelect.value = data.theme || 'auto';
  
  const customServerOrderToggle = document.getElementById('customServerOrder');
  if (customServerOrderToggle) setToggleState(customServerOrderToggle, !!data.customServerOrder);
  
  const customServerOrderList = document.getElementById('customServerOrder_list');
  if (customServerOrderList) customServerOrderList.value = data.customServerOrder_list || '';
  
  const editorWrapperHeightToggle = document.getElementById('editorWrapperHeight');
  if (editorWrapperHeightToggle) setToggleState(editorWrapperHeightToggle, !!data.editorWrapperHeight);
  
  const editorWrapperHeightValue = document.getElementById('editorWrapperHeight_value');
  if (editorWrapperHeightValue) editorWrapperHeightValue.value = data.editorWrapperHeight_value || 600;
  
  const navbarHoverToggle = document.getElementById('navbarHover');
  if (navbarHoverToggle) setToggleState(navbarHoverToggle, !!data.navbarHover);
  
  const navbarHoverZoneWidth = document.getElementById('navbarHoverZoneWidth');
  if (navbarHoverZoneWidth) navbarHoverZoneWidth.value = data.navbarHoverZoneWidth || 30;
  
  const uploadCreateHoverToggle = document.getElementById('uploadCreateHover');
  if (uploadCreateHoverToggle) setToggleState(uploadCreateHoverToggle, !!data.uploadCreateHover);
  
  const uploadCreateHoverCreateDelay = document.getElementById('uploadCreateHover_createDelay');
  if (uploadCreateHoverCreateDelay) uploadCreateHoverCreateDelay.value = data.uploadCreateHover_createDelay ?? 500;
  
  const uploadCreateHoverUploadDelay = document.getElementById('uploadCreateHover_uploadDelay');
  if (uploadCreateHoverUploadDelay) uploadCreateHoverUploadDelay.value = data.uploadCreateHover_uploadDelay ?? 0;
  
  const replaceSupportModalToggle = document.getElementById('replaceSupportModal');
  if (replaceSupportModalToggle) setToggleState(replaceSupportModalToggle, !!data.replaceSupportModal);
  
  const replaceFalixLogoToggle = document.getElementById('replaceFalixLogo');
  if (replaceFalixLogoToggle) setToggleState(replaceFalixLogoToggle, !!data.replaceFalixLogo);
  
  const replaceFalixLogoChoice = document.getElementById('replaceFalixLogoChoice');
  if (replaceFalixLogoChoice) replaceFalixLogoChoice.value = data.replaceFalixLogoChoice || 'better-falix_normal_logo';
  
  const navbarEditorV2Toggle = document.getElementById('navbarEditorV2Enabled');
  if (navbarEditorV2Toggle) setToggleState(navbarEditorV2Toggle, !!data.navbarEditorV2Enabled);
  
  // Screenshot mode settings
  const screenshotModeConfig = data.screenshotModeConfig || {};
  
  const serverNameInput = document.getElementById('screenshotMode_serverName');
  if (serverNameInput) serverNameInput.value = screenshotModeConfig.serverName?.replacement || 'Example Server';
  const serverNameToggle = document.getElementById('screenshotMode_serverName_enabled');
  if (serverNameToggle) setToggleState(serverNameToggle, screenshotModeConfig.serverName?.enabled !== false);
  
  const serverIPInput = document.getElementById('screenshotMode_serverIP');
  if (serverIPInput) serverIPInput.value = screenshotModeConfig.serverIP?.replacement || 'serverIPhere.falixsrv.me';
  const serverIPToggle = document.getElementById('screenshotMode_serverIP_enabled');
  if (serverIPToggle) setToggleState(serverIPToggle, screenshotModeConfig.serverIP?.enabled !== false);
  
  const serverPortInput = document.getElementById('screenshotMode_serverPort');
  if (serverPortInput) serverPortInput.value = screenshotModeConfig.serverPort?.replacement || '12345';
  const serverPortToggle = document.getElementById('screenshotMode_serverPort_enabled');
  if (serverPortToggle) setToggleState(serverPortToggle, screenshotModeConfig.serverPort?.enabled !== false);
  
  const serverDynamicIPInput = document.getElementById('screenshotMode_serverDynamicIP');
  if (serverDynamicIPInput) serverDynamicIPInput.value = screenshotModeConfig.serverDynamicIP?.replacement || '127.0.0.1';
  const serverDynamicIPToggle = document.getElementById('screenshotMode_serverDynamicIP_enabled');
  if (serverDynamicIPToggle) setToggleState(serverDynamicIPToggle, screenshotModeConfig.serverDynamicIP?.enabled !== false);
  
  const profileUsernameInput = document.getElementById('screenshotMode_profileUsername');
  if (profileUsernameInput) profileUsernameInput.value = screenshotModeConfig.profileUsername?.replacement || 'Example User';
  const profileUsernameToggle = document.getElementById('screenshotMode_profileUsername_enabled');
  if (profileUsernameToggle) setToggleState(profileUsernameToggle, screenshotModeConfig.profileUsername?.enabled !== false);
  
  const profileTagInput = document.getElementById('screenshotMode_profileTag');
  if (profileTagInput) profileTagInput.value = screenshotModeConfig.profileTag?.replacement || 'example';
  const profileTagToggle = document.getElementById('screenshotMode_profileTag_enabled');
  if (profileTagToggle) setToggleState(profileTagToggle, screenshotModeConfig.profileTag?.enabled !== false);
  
  const profilePictureInput = document.getElementById('screenshotMode_profilePicture');
  if (profilePictureInput) profilePictureInput.value = screenshotModeConfig.profilePicture?.replacement || 'https://ui-avatars.com/api/?name=User';
  const profilePictureToggle = document.getElementById('screenshotMode_profilePicture_enabled');
  if (profilePictureToggle) setToggleState(profilePictureToggle, screenshotModeConfig.profilePicture?.enabled !== false);
  
  const consolePlayerInput = document.getElementById('screenshotMode_consolePlayer');
  if (consolePlayerInput) consolePlayerInput.value = screenshotModeConfig.consolePlayer?.replacement || 'Player';
  const consolePlayerToggle = document.getElementById('screenshotMode_consolePlayer_enabled');
  if (consolePlayerToggle) setToggleState(consolePlayerToggle, screenshotModeConfig.consolePlayer?.enabled !== false);
  
  const consoleUUIDInput = document.getElementById('screenshotMode_consoleUUID');
  if (consoleUUIDInput) consoleUUIDInput.value = screenshotModeConfig.consoleUUID?.replacement || '00000000-0000-0000-0000-000000000000';
  const consoleUUIDToggle = document.getElementById('screenshotMode_consoleUUID_enabled');
  if (consoleUUIDToggle) setToggleState(consoleUUIDToggle, screenshotModeConfig.consoleUUID?.enabled !== false);
  
  const consoleConnectionIPInput = document.getElementById('screenshotMode_consoleConnectionIP');
  if (consoleConnectionIPInput) consoleConnectionIPInput.value = screenshotModeConfig.consoleConnectionIP?.replacement || '0.0.0.0:00000';
  const consoleConnectionIPToggle = document.getElementById('screenshotMode_consoleConnectionIP_enabled');
  if (consoleConnectionIPToggle) setToggleState(consoleConnectionIPToggle, screenshotModeConfig.consoleConnectionIP?.enabled !== false);
  
  const adminBadgeToggle = document.getElementById('screenshotMode_adminBadge_enabled');
  if (adminBadgeToggle) setToggleState(adminBadgeToggle, screenshotModeConfig.adminBadge?.enabled !== false);
  
  // Remove State Overlays settings
  const removeStateOverlaysToggle = document.getElementById('removeStateOverlays');
  if (removeStateOverlaysToggle) setToggleState(removeStateOverlaysToggle, !!data.removeStateOverlays);
  
  const removeStartingOverlay = document.getElementById('removeStartingOverlay');
  if (removeStartingOverlay) removeStartingOverlay.checked = data.removeStartingOverlay !== false;
  
  const removeOfflineOverlay = document.getElementById('removeOfflineOverlay');
  if (removeOfflineOverlay) removeOfflineOverlay.checked = !!data.removeOfflineOverlay;
});

// General toggles - only add listeners if elements exist
const enabledToggle = document.getElementById('enabled');
if (enabledToggle) {
  enabledToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveSetting('enabled', state);
  });
}

const themeSelect = document.getElementById('theme');
if (themeSelect) {
  themeSelect.addEventListener('change', function() {
    saveSetting('theme', this.value);
  });
}

const openNavbarEditorBtn = document.getElementById('openNavbarEditor');
if (openNavbarEditorBtn) {
  openNavbarEditorBtn.addEventListener('click', function() {
    chrome.tabs.create({ url: chrome.runtime.getURL('navbar-editor/navbar-editor.html') });
  });
}

const resetAllBtn = document.getElementById('resetAll');
if (resetAllBtn) {
  resetAllBtn.addEventListener('click', function() {
    if (confirm('Reset all settings to default?')) {
      chrome.storage.sync.clear(() => window.location.reload());
    }
  });
}

// Export settings
const exportSettingsBtn = document.getElementById('exportSettings');
if (exportSettingsBtn) {
  exportSettingsBtn.addEventListener('click', function() {
    chrome.storage.sync.get(null, (data) => {
      // Save current UI values to storage first, then export everything
      const uiSettings = {
        // General settings
        enabled: document.getElementById('enabled')?.getAttribute('aria-pressed') === 'true',
        theme: document.getElementById('theme')?.value || 'auto',
        enableStaffFeatures: document.getElementById('enableStaffFeatures')?.getAttribute('aria-pressed') === 'true',
        
        // Feature settings with values
        customServerOrder: document.getElementById('customServerOrder')?.getAttribute('aria-pressed') === 'true',
        customServerOrder_list: document.getElementById('customServerOrder_list')?.value || '',
        
        navbarHover: document.getElementById('navbarHover')?.getAttribute('aria-pressed') === 'true',
        navbarHoverZoneWidth: parseInt(document.getElementById('navbarHoverZoneWidth')?.value) || 40,
        
        uploadCreateHover: document.getElementById('uploadCreateHover')?.getAttribute('aria-pressed') === 'true',
        uploadCreateHover_createDelay: parseInt(document.getElementById('uploadCreateHover_createDelay')?.value) || 500,
        uploadCreateHover_uploadDelay: parseInt(document.getElementById('uploadCreateHover_uploadDelay')?.value) || 0,
        
        replaceSupportModal: document.getElementById('replaceSupportModal')?.getAttribute('aria-pressed') === 'true',
        
      };

      // Save current UI values to storage first
      chrome.storage.sync.set(uiSettings, () => {
        // Then get ALL storage data and export it
        chrome.storage.sync.get(null, (allData) => {
          const settingsJson = JSON.stringify(allData, null, 2);
          const blob = new Blob([settingsJson], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'better-falix-settings.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
      });
    });
  });
}

// Import settings
const importSettingsBtn = document.getElementById('importSettings');
const importFileInput = document.getElementById('importFileInput');
if (importSettingsBtn && importFileInput) {
  importSettingsBtn.addEventListener('click', function() {
    importFileInput.click();
  });

  importFileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const settings = JSON.parse(e.target.result);
        if (confirm('Import these settings? This will overwrite your current settings.')) {
          chrome.storage.sync.clear(() => {
            chrome.storage.sync.set(settings, () => {
              alert('Settings imported successfully!');
              window.location.reload();
            });
          });
        }
      } catch (error) {
        alert('Error: Invalid settings file format.');
      }
    };
    reader.readAsText(file);
  });
}

// Feature toggles and settings - only add listeners if elements exist
const customServerOrderToggle = document.getElementById('customServerOrder');
if (customServerOrderToggle) {
  customServerOrderToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveSetting('customServerOrder', state);
  });
}

const customServerOrderList = document.getElementById('customServerOrder_list');
if (customServerOrderList) {
  customServerOrderList.addEventListener('input', function() {
    saveSetting('customServerOrder_list', this.value);
  });
}

const editorWrapperHeightToggle = document.getElementById('editorWrapperHeight');
if (editorWrapperHeightToggle) {
  editorWrapperHeightToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveSetting('editorWrapperHeight', state);
  });
}

const editorWrapperHeightValue = document.getElementById('editorWrapperHeight_value');
if (editorWrapperHeightValue) {
  editorWrapperHeightValue.addEventListener('input', function() {
    saveSetting('editorWrapperHeight_value', this.value);
  });
}

const navbarHoverToggle = document.getElementById('navbarHover');
if (navbarHoverToggle) {
  navbarHoverToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveSetting('navbarHover', state);
  });
}

const navbarHoverZoneWidth = document.getElementById('navbarHoverZoneWidth');
if (navbarHoverZoneWidth) {
  navbarHoverZoneWidth.addEventListener('input', function() {
    saveSetting('navbarHoverZoneWidth', this.value);
  });
}

const uploadCreateHoverToggle = document.getElementById('uploadCreateHover');
if (uploadCreateHoverToggle) {
  uploadCreateHoverToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveSetting('uploadCreateHover', state);
  });
}

const uploadCreateHoverCreateDelay = document.getElementById('uploadCreateHover_createDelay');
if (uploadCreateHoverCreateDelay) {
  uploadCreateHoverCreateDelay.addEventListener('input', function() {
    saveSetting('uploadCreateHover_createDelay', this.value);
  });
}

const uploadCreateHoverUploadDelay = document.getElementById('uploadCreateHover_uploadDelay');
if (uploadCreateHoverUploadDelay) {
  uploadCreateHoverUploadDelay.addEventListener('input', function() {
    saveSetting('uploadCreateHover_uploadDelay', this.value);
  });
}

const replaceSupportModalToggle = document.getElementById('replaceSupportModal');
if (replaceSupportModalToggle) {
  replaceSupportModalToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveSetting('replaceSupportModal', state);
  });
}

const enableStaffFeaturesToggle = document.getElementById('enableStaffFeatures');
if (enableStaffFeaturesToggle) {
  enableStaffFeaturesToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveSetting('enableStaffFeatures', state);
  });
}

const replaceFalixLogoToggle = document.getElementById('replaceFalixLogo');
if (replaceFalixLogoToggle) {
  replaceFalixLogoToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveSetting('replaceFalixLogo', state);
  });
}

const replaceFalixLogoChoice = document.getElementById('replaceFalixLogoChoice');
if (replaceFalixLogoChoice) {
  replaceFalixLogoChoice.addEventListener('change', function() {
    saveSetting('replaceFalixLogoChoice', this.value);
  });
}

const navbarEditorToggle = document.getElementById('navbarEditorV2Enabled');
if (navbarEditorToggle) {
  navbarEditorToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveSetting('navbarEditorV2Enabled', state);
  });
}

// Remove State Overlays feature
const removeStateOverlaysToggle = document.getElementById('removeStateOverlays');
if (removeStateOverlaysToggle) {
  removeStateOverlaysToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveSetting('removeStateOverlays', state);
  });
}

const removeStartingOverlay = document.getElementById('removeStartingOverlay');
if (removeStartingOverlay) {
  removeStartingOverlay.addEventListener('change', function() {
    saveSetting('removeStartingOverlay', this.checked);
  });
}

const removeOfflineOverlay = document.getElementById('removeOfflineOverlay');
if (removeOfflineOverlay) {
  removeOfflineOverlay.addEventListener('change', function() {
    saveSetting('removeOfflineOverlay', this.checked);
  });
}


// --- Feature logic for reorder and editor height ---
function applyCustomServerOrder() {
  chrome.storage.sync.get(['customServerOrder', 'customServerOrder_list'], data => {
    if (!data.customServerOrder) return;
    const orderList = (data.customServerOrder_list || '')
      .split(',')
      .map(x => x.trim())
      .filter(Boolean);
    const serversList = document.getElementById('serverslist');
    if (!serversList) return;
    const serversContainer = serversList.querySelector('.servers-container');
    if (!serversContainer) return;
    const serverRows = Array.from(serversContainer.querySelectorAll('.server-row'));
    if (!serverRows.length) return;
    const nameToElement = {};
    serverRows.forEach(row => {
      const nameEl = row.querySelector('.server-name');
      if (nameEl) {
        const name = nameEl.textContent.trim();
        // Check if the row is wrapped in an <a> tag
        const wrapper = row.parentElement.tagName === 'A' ? row.parentElement : row;
        nameToElement[name] = wrapper;
      }
    });
    // Get all elements to move (either <a> wrappers or server-rows)
    const elementsToMove = Object.values(nameToElement);
    elementsToMove.forEach(element => {
      if (element.parentNode === serversContainer) {
        serversContainer.removeChild(element);
      }
    });
    orderList.forEach(name => {
      if (nameToElement[name]) {
        nameToElement[name].style.marginBottom = '16px';
        serversContainer.appendChild(nameToElement[name]);
      }
    });
    elementsToMove.forEach(element => {
      const row = element.tagName === 'A' ? element.querySelector('.server-row') : element;
      const name = row?.querySelector('.server-name')?.textContent.trim();
      if (name && !orderList.includes(name)) {
        element.style.marginBottom = '16px';
        serversContainer.appendChild(element);
      }
    });
  });
}

function observeAndApplyServerOrder() {
  applyCustomServerOrder();
  const serversList = document.getElementById('serverslist');
  if (!serversList) return;
  const serversContainer = serversList.querySelector('.servers-container');
  if (!serversContainer) return;
  const observer = new MutationObserver(applyCustomServerOrder);
  observer.observe(serversContainer, { childList: true, subtree: false });
}

function waitForServersList() {
  const serversList = document.getElementById('serverslist');
  if (serversList && serversList.querySelector('.servers-container')) {
    observeAndApplyServerOrder();
  } else {
    setTimeout(waitForServersList, 200);
  }
}

// --- Feature logic for editor-wrapper height ---
function applyEditorWrapperHeight() {
  chrome.storage.sync.get(['editorWrapperHeight', 'editorWrapperHeight_value'], data => {
    if (!data.editorWrapperHeight) return;
    const height = parseInt(data.editorWrapperHeight_value, 10) || 600;
    document.querySelectorAll('.editor-wrapper').forEach(el => {
      el.style.height = height + 'px';
    });
  });
}

function observeAndApplyEditorHeight() {
  applyEditorWrapperHeight();
  const observer = new MutationObserver(applyEditorWrapperHeight);
  observer.observe(document.body, { childList: true, subtree: true });
}

// --- Run feature logic on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
  waitForServersList();
  observeAndApplyEditorHeight();
});

// Screenshot mode settings handlers
function saveScreenshotModeConfig() {
  chrome.storage.sync.get(['screenshotModeConfig'], data => {
    const config = data.screenshotModeConfig || {};
    
    // Save all screenshot mode settings
    const inputs = {
      serverName: document.getElementById('screenshotMode_serverName'),
      serverIP: document.getElementById('screenshotMode_serverIP'),
      serverPort: document.getElementById('screenshotMode_serverPort'),
      serverDynamicIP: document.getElementById('screenshotMode_serverDynamicIP'),
      profileUsername: document.getElementById('screenshotMode_profileUsername'),
      profileTag: document.getElementById('screenshotMode_profileTag'),
      profilePicture: document.getElementById('screenshotMode_profilePicture'),
      consolePlayer: document.getElementById('screenshotMode_consolePlayer'),
      consoleUUID: document.getElementById('screenshotMode_consoleUUID'),
      consoleConnectionIP: document.getElementById('screenshotMode_consoleConnectionIP')
    };
    
    const toggles = {
      serverName: document.getElementById('screenshotMode_serverName_enabled'),
      serverIP: document.getElementById('screenshotMode_serverIP_enabled'),
      serverPort: document.getElementById('screenshotMode_serverPort_enabled'),
      serverDynamicIP: document.getElementById('screenshotMode_serverDynamicIP_enabled'),
      profileUsername: document.getElementById('screenshotMode_profileUsername_enabled'),
      profileTag: document.getElementById('screenshotMode_profileTag_enabled'),
      profilePicture: document.getElementById('screenshotMode_profilePicture_enabled'),
      consolePlayer: document.getElementById('screenshotMode_consolePlayer_enabled'),
      consoleUUID: document.getElementById('screenshotMode_consoleUUID_enabled'),
      consoleConnectionIP: document.getElementById('screenshotMode_consoleConnectionIP_enabled'),
      adminBadge: document.getElementById('screenshotMode_adminBadge_enabled')
    };
    
    Object.keys(inputs).forEach(key => {
      if (inputs[key] && toggles[key]) {
        config[key] = {
          enabled: toggles[key].getAttribute('aria-pressed') === 'true',
          replacement: inputs[key].value
        };
      }
    });
    
    if (toggles.adminBadge) {
      config.adminBadge = {
        enabled: toggles.adminBadge.getAttribute('aria-pressed') === 'true',
        replacement: null
      };
    }
    
    chrome.storage.sync.set({ screenshotModeConfig: config });
  });
}

// Add event listeners for screenshot mode settings
['serverName', 'serverIP', 'serverPort', 'serverDynamicIP', 'profileUsername', 'profileTag', 'profilePicture', 'consolePlayer'].forEach(key => {
  const input = document.getElementById(`screenshotMode_${key}`);
  const toggle = document.getElementById(`screenshotMode_${key}_enabled`);
  
  if (input) {
    input.addEventListener('input', saveScreenshotModeConfig);
  }
  
  if (toggle) {
    toggle.addEventListener('click', function() {
      const state = this.getAttribute('aria-pressed') !== 'true';
      setToggleState(this, state);
      saveScreenshotModeConfig();
    });
  }
});

const adminBadgeToggle = document.getElementById('screenshotMode_adminBadge_enabled');
if (adminBadgeToggle) {
  adminBadgeToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveScreenshotModeConfig();
  });
}
function observeAndApplyEditorHeight() {
  applyEditorWrapperHeight();
  const observer = new MutationObserver(applyEditorWrapperHeight);
  observer.observe(document.body, { childList: true, subtree: true });
}

// --- Run feature logic on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
  waitForServersList();
  observeAndApplyEditorHeight();
});
