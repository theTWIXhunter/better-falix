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
  'itsjustPaper',
  'serverNameButton',
  'navbarHover',
  'replaceSupportModal',
  'fixcheckboxicon',
  'uploadCreateHover'
];

function setFeatureBtnState(btn, enabled) {
  btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  btn.classList.toggle('on', enabled);
}

function setFeaturesListEnabled(enabled) {
  // Gray out all .feature-list containers
  document.querySelectorAll('.feature-list').forEach(list => {
    if (enabled) {
      list.classList.remove('disabled');
    } else {
      list.classList.add('disabled');
    }
  });
}

function updateFeatureButtons(data) {
  featureIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      setFeatureBtnState(btn, !!data[id]);
      btn.disabled = !data.enabled;
    }
  });
  setFeaturesListEnabled(data.enabled);
}

function updateToggleBtn(enabled) {
  const toggleBtn = document.getElementById('toggle');
  if (enabled) {
    toggleBtn.textContent = 'Disable Extension';
    toggleBtn.classList.remove('off');
  } else {
    toggleBtn.textContent = 'Enable Extension';
    toggleBtn.classList.add('off');
  }
}

function setThemesListEnabled(enabled) {
  const themesList = document.querySelector('.themes-list');
  if (themesList) {
    if (enabled) {
      themesList.classList.remove('disabled');
      // Also gray out theme cards and their children
      themesList.querySelectorAll('.theme-card, .theme-label, .theme-select-btn, .theme-preview').forEach(el => {
        el.style.pointerEvents = '';
        el.style.filter = '';
        el.style.opacity = '';
      });
    } else {
      themesList.classList.add('disabled');
      themesList.querySelectorAll('.theme-card, .theme-label, .theme-select-btn, .theme-preview').forEach(el => {
        el.style.pointerEvents = 'none';
        el.style.filter = 'grayscale(0.7)';
        el.style.opacity = '0.5';
      });
    }
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
    itsjustPaper: false,
    serverNameButton: false,
    navbarHover: false,
    replaceSupportModal: false,
    fixcheckboxicon: false,
    uploadCreateHover: false,
  }, (data) => {
    updateToggleBtn(data.enabled);
    updateFeatureButtons(data);
    setThemesListEnabled(data.enabled);
    setFeaturesListEnabled(data.enabled);
  });

  // Main toggle logic
  document.getElementById('toggle').addEventListener('click', function() {
    chrome.storage.sync.get({ enabled: true }, (data) => {
      const newState = !data.enabled;
      chrome.storage.sync.set({ enabled: newState }, () => {
        updateToggleBtn(newState);
        chrome.storage.sync.get(null, (allData) => {
          updateFeatureButtons(allData);
          setThemesListEnabled(allData.enabled);
          setFeaturesListEnabled(allData.enabled);
        });
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

  // Slider logic with animation and tab memory
  const featuresTab = document.getElementById('features-tab');
  const themesTab = document.getElementById('themes-tab');
  const featuresContent = document.getElementById('features-content');
  const themesContent = document.getElementById('themes-content');
  const sliderIndicator = document.getElementById('slider-indicator');

  function activateTab(tab, save = true) {
      if (tab === 'features') {
          featuresTab.classList.add('active');
          themesTab.classList.remove('active');
          featuresContent.style.display = '';
          themesContent.style.display = 'none';
          sliderIndicator.style.left = '0%';
      } else {
          themesTab.classList.add('active');
          featuresTab.classList.remove('active');
          featuresContent.style.display = 'none';
          themesContent.style.display = '';
          sliderIndicator.style.left = '50%';
      }
      if (save) {
        chrome.storage.sync.set({ popupActiveTab: tab });
      }
  }

  // Restore last active tab (and only activate after storage is loaded)
  chrome.storage.sync.get(['popupActiveTab'], function(data) {
    const tab = data.popupActiveTab || 'features';
    activateTab(tab, false);
  });

  // Always register tab event listeners
  featuresTab.addEventListener('click', function() {
      activateTab('features');
  });

  themesTab.addEventListener('click', function() {
      activateTab('themes');
  });

  // Theme selection logic
  function setActiveTheme(themeName) {
      // Mark the selected button and card
      document.querySelectorAll('.theme-select-btn').forEach(btn => {
          btn.classList.toggle('selected', btn.dataset.theme === themeName);
          // Also highlight the card for accessibility/visual feedback
          if (btn.closest('.theme-card')) {
              btn.closest('.theme-card').classList.toggle('selected', btn.dataset.theme === themeName);
          }
      });
      chrome.storage.sync.set({ activeTheme: themeName });
  }

  // Always register theme select button event listeners
  document.querySelectorAll('.theme-select-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          setActiveTheme(this.dataset.theme);
      });
  });

  // Load active theme from storage and update UI
  chrome.storage.sync.get(['activeTheme'], function(data) {
      const activeTheme = data.activeTheme || 'default';
      setActiveTheme(activeTheme);
  });
});
