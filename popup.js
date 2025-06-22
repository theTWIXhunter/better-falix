document.addEventListener('DOMContentLoaded', () => {
  console.log('popup.js loaded');
  // Optional: visually confirm by changing the popup background
  document.body.style.border = '3px solid #0078d7';
});

const toggleBtn = document.getElementById('toggle');
const featureIds = [
  'hideConsoleTabs',
  'replaceAccountCategory',
  'moveBackupsNav',
  'moveMonitoringNav',
  'moveLogsNav',
  'removeExternalStartNav',
  'removeNavbarSupportLinks',
  'removeConsoleFilesCategory',
  'removeSftpUpload',
  'removeHowToConnect',
  'removeExitDiscount',
  'itsJustPaper',
  'itsJustGeyser',
  'serverNameButton',
  'navbarHover',
  'replaceSupportModal',
  'uploadCreateHover',
  'editorWrapperHeight',
  'customServerOrder'
];

function setFeatureBtnState(btn, enabled) {
  btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  btn.classList.toggle('on', enabled);
}

function updateFeatureButtons(data) {
  featureIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      setFeatureBtnState(btn, !!data[id]);
      btn.disabled = !data.enabled;
    }
  });
}

function updateToggleBtn(enabled) {
  const toggleBtn = document.getElementById('toggle');
  if (enabled) {
    toggleBtn.textContent = 'Disable Extensions';
    toggleBtn.classList.remove('off');
  } else {
    toggleBtn.textContent = 'Enable Extensions';
    toggleBtn.classList.add('off');
  }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({
    enabled: false,
    hideConsoleTabs: false,
    replaceAccountCategory: false,
    moveBackupsNav: false,
    moveMonitoringNav: false,
    moveLogsNav: false,
    removeExternalStartNav: false,
    removeNavbarSupportLinks: false,
    removeConsoleFilesCategory: false,
    removeSftpUpload: false,
    removeHowToConnect: false,
    removeExitDiscount: false,
    itsJustPaper: false,
    itsJustGeyser: false,
    serverNameButton: false,
    navbarHover: false,
    replaceSupportModal: false,
    uploadCreateHover: false,
    editorWrapperHeight: false,
    customServerOrder: false
  }, (data) => {
    updateToggleBtn(data.enabled);
    updateFeatureButtons(data);
  });

  // Main toggle logic
  document.getElementById('toggle').addEventListener('click', function() {
    chrome.storage.sync.get({ enabled: true }, (data) => {
      const newState = !data.enabled;
      chrome.storage.sync.set({ enabled: newState }, () => {
        updateToggleBtn(newState);
        chrome.storage.sync.get(null, updateFeatureButtons);
      });
    });
  });

  // Feature toggle logic
  featureIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', function() {
        if (btn.disabled) return;
        const current = btn.getAttribute('aria-pressed') === 'true';
        const newState = !current;
        setFeatureBtnState(btn, newState);
        const obj = {};
        obj[id] = newState;
        chrome.storage.sync.set(obj, () => {
          chrome.storage.sync.get(null, updateFeatureButtons);
        });
      });
      btn.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          btn.click();
        }
      });
    }
  });
});
