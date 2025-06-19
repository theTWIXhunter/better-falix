// [better-falix] options: Script loading
console.log('[better-falix] options: Script loading');

// Proof of concept: feature toggles and settings
function setToggleState(btn, state) {
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
  setToggleState(document.getElementById('enabled'), !!data.enabled);
  document.getElementById('theme').value = data.theme || 'auto';
  setToggleState(document.getElementById('customServerOrder'), !!data.customServerOrder);
  setToggleState(document.getElementById('customServerOrder_enable'), !!data.customServerOrder_enable);
  document.getElementById('customServerOrder_list').value = data.customServerOrder_list || '';
  setToggleState(document.getElementById('editorWrapperHeight'), !!data.editorWrapperHeight);
  document.getElementById('editorWrapperHeight_value').value = data.editorWrapperHeight_value || 600;
  setToggleState(document.getElementById('navbarHover'), !!data.navbarHover);
  setToggleState(document.getElementById('replaceSupportModal'), !!data.replaceSupportModal);
});

// General toggles
document.getElementById('enabled').addEventListener('click', function() {
  const state = this.getAttribute('aria-pressed') !== 'true';
  setToggleState(this, state);
  saveSetting('enabled', state);
});
document.getElementById('theme').addEventListener('change', function() {
  saveSetting('theme', this.value);
});
document.getElementById('resetAll').addEventListener('click', function() {
  if (confirm('Reset all settings to default?')) {
    chrome.storage.sync.clear(() => window.location.reload());
  }
});

// Feature toggles and settings
document.getElementById('customServerOrder').addEventListener('click', function() {
  const state = this.getAttribute('aria-pressed') !== 'true';
  setToggleState(this, state);
  saveSetting('customServerOrder', state);
});
document.getElementById('customServerOrder_enable').addEventListener('click', function() {
  const state = this.getAttribute('aria-pressed') !== 'true';
  setToggleState(this, state);
  saveSetting('customServerOrder_enable', state);
});
document.getElementById('customServerOrder_list').addEventListener('input', function() {
  saveSetting('customServerOrder_list', this.value);
});

document.getElementById('editorWrapperHeight').addEventListener('click', function() {
  const state = this.getAttribute('aria-pressed') !== 'true';
  setToggleState(this, state);
  saveSetting('editorWrapperHeight', state);
});
document.getElementById('editorWrapperHeight_value').addEventListener('input', function() {
  saveSetting('editorWrapperHeight_value', this.value);
});

document.getElementById('navbarHover').addEventListener('click', function() {
  const state = this.getAttribute('aria-pressed') !== 'true';
  setToggleState(this, state);
  saveSetting('navbarHover', state);
});

document.getElementById('replaceSupportModal').addEventListener('click', function() {
  const state = this.getAttribute('aria-pressed') !== 'true';
  setToggleState(this, state);
  saveSetting('replaceSupportModal', state);
});

// --- Feature logic for reorder and editor height ---
function applyCustomServerOrder() {
  chrome.storage.sync.get(['customServerOrder', 'customServerOrder_enable', 'customServerOrder_list'], data => {
    if (!data.customServerOrder || !data.customServerOrder_enable) return;
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
