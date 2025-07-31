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
  if (navbarHoverZoneWidth) navbarHoverZoneWidth.value = data.navbarHoverZoneWidth || 40;
  
  const uploadCreateHoverToggle = document.getElementById('uploadCreateHover');
  if (uploadCreateHoverToggle) setToggleState(uploadCreateHoverToggle, !!data.uploadCreateHover);
  
  const uploadCreateHoverCreateDelay = document.getElementById('uploadCreateHover_createDelay');
  if (uploadCreateHoverCreateDelay) uploadCreateHoverCreateDelay.value = data.uploadCreateHover_createDelay ?? 500;
  
  const uploadCreateHoverUploadDelay = document.getElementById('uploadCreateHover_uploadDelay');
  if (uploadCreateHoverUploadDelay) uploadCreateHoverUploadDelay.value = data.uploadCreateHover_uploadDelay ?? 0;
  
  const replaceSupportModalToggle = document.getElementById('replaceSupportModal');
  if (replaceSupportModalToggle) setToggleState(replaceSupportModalToggle, !!data.replaceSupportModal);
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

const resetAllBtn = document.getElementById('resetAll');
if (resetAllBtn) {
  resetAllBtn.addEventListener('click', function() {
    if (confirm('Reset all settings to default?')) {
      chrome.storage.sync.clear(() => window.location.reload());
    }
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
    const nameToRow = {};
    serverRows.forEach(row => {
      const nameEl = row.querySelector('.server-name');
      if (nameEl) nameToRow[nameEl.textContent.trim()] = row;
    });
    serverRows.forEach(row => serversContainer.removeChild(row));
    orderList.forEach(name => {
      if (nameToRow[name]) serversContainer.appendChild(nameToRow[name]);
    });
    serverRows.forEach(row => {
      const name = row.querySelector('.server-name')?.textContent.trim();
      if (name && !orderList.includes(name)) serversContainer.appendChild(row);
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
