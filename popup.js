document.addEventListener('DOMContentLoaded', () => {
  console.log('popup.js loaded');
  // Optional: visually confirm by changing the popup background
  document.body.style.border = '3px solid #0078d7';
  
  // Handle settings page opening
  document.getElementById('openSettings').addEventListener('click', function(e) {
    e.preventDefault();
    browser.tabs.create({ url: browser.runtime.getURL('options.html') });
  });

  // Handle gear icon clicks to open settings page
  document.querySelectorAll('.feature-settings-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent triggering tooltip or other events
      browser.tabs.create({ url: browser.runtime.getURL('options.html') });
    });
  });
});

const toggleBtn = document.getElementById('toggle');
const featureIds = [
  'hideConsoleTabs',
  'replaceAccountCategory',
  'ARCHIVED_moveBackupsNav',
  'ARCHIVED_moveMonitoringNav',
  'ARCHIVED_moveLogsNav',
  'ARCHIVED_removeExternalStartNav',
  'ARCHIVED_removeNavbarSupportLinks',
  'ARCHIVED_removeConsoleFilesCategory',
  'removeSftpUpload',
  'replaceConnectTab',
  'removeExitDiscount',
  'itsJustPaper',
  'itsJustGeyser',
  'ARCHIVED_serverNameButton',
  'navbarHover',
  'replaceSupportModal',
  'replaceCpuWithNode',
  'removeMaxPlayers',
  'removePlayerManagement',
  'removePremiumTransfer',
  'uploadCreateHover',
  'ARCHIVED_editorWrapperHeight',
  'customServerOrder',
  'ARCHIVED_editorFullscreen',
  'removeServerSearch',
  'hideSupportCategory',
  'removeLanguageSelector',
  'replaceFalixLogo',
  'splitAddonsTabs',
  'renameConfigToProperties',
  'renameAddonsToMods',
  'addVersionsNav',
  'ARCHIVED_hideClosedTickets',
  'removeLogsContainer',
  'redactedContentSubtle',
  'ARCHIVED_collapsibleLogAnalysis',
  'betterEditorFullscreen',
  'coloredLogMessages',
  'autoCollapseLogAnalysis',
  'moveAdminPanelNav',
  'adminPanelIndexRedirect',
  'removePremiumRow',
  'defaultAllStatus',
  'hideWriteAReplyHeader',
  'shortenReplyStatus',
  'addAdminCategory',
  'duplicateAdminButtons',
  'copyAllSupportInfo',
  'accuratePendingName',
  'compactReplyBox',
  'iKnowMarkdown',
  'hideTemplateButton',
  'removeFileUploadLabel',
  'showTicketId'
];

function setFeatureBtnState(btn, enabled) {
  btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  btn.classList.toggle('on', enabled);
}

function setFeaturesListEnabled(enabled) {
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
  browser.storage.sync.get({
    enabled: false,
    enableStaffFeatures: false,
    hideConsoleTabs: false,
    replaceAccountCategory: false,
    ARCHIVED_moveBackupsNav: false,
    ARCHIVED_moveMonitoringNav: false,
    ARCHIVED_moveLogsNav: false,
    ARCHIVED_removeExternalStartNav: false,
    ARCHIVED_removeNavbarSupportLinks: false,
    ARCHIVED_removeConsoleFilesCategory: false,
    removeSftpUpload: false,
    replaceConnectTab: false,
    removeExitDiscount: false,
    itsJustPaper: false,
    itsJustGeyser: false,
    ARCHIVED_serverNameButton: false,
    navbarHover: false,
    replaceSupportModal: false,
    replaceCpuWithNode: false,
    removeMaxPlayers: false,
    removePlayerManagement: false,
    uploadCreateHover: false,
    ARCHIVED_editorWrapperHeight: false,
    customServerOrder: false,
    ARCHIVED_editorFullscreen: false,
    removeServerSearch: false,
    removeLogsContainer: false,
    removePremiumTransfer: false,
    redactedContentSubtle: false,
    ARCHIVED_collapsibleLogAnalysis: false,
    betterEditorFullscreen: false,
    coloredLogMessages: false,
    autoCollapseLogAnalysis: false,
    moveAdminPanelNav: false,
    adminPanelIndexRedirect: false,
    removePremiumRow: false,
    defaultAllStatus: false,
    hideWriteAReplyHeader: false,
    shortenReplyStatus: false,
    addAdminCategory: false,
    duplicateAdminButtons: false,
    accuratePendingName: false,
    hideSupportCategory: false,
    removeLanguageSelector: false,
    replaceFalixLogo: false,
    splitAddonsTabs: false,
    renameConfigToProperties: false,
    renameAddonsToMods: false,
    addVersionsNav: false,
    ARCHIVED_hideClosedTickets: false,
    copyAllSupportInfo: false,
    compactReplyBox: false,
    iKnowMarkdown: false,
    hideTemplateButton: false,
    removeFileUploadLabel: false,
    showTicketId: false

  }, (data) => {
    updateToggleBtn(data.enabled);
    updateFeatureButtons(data);
    setThemesListEnabled(data.enabled);
    setFeaturesListEnabled(data.enabled);
    
    // Show/hide staff features section based on enableStaffFeatures option
    const staffOnlySection = document.getElementById('staffOnlySection');
    if (staffOnlySection) {
      staffOnlySection.style.display = data.enableStaffFeatures ? 'block' : 'none';
    }
  });

  // Main toggle logic - completely reimplemented for reliability
  document.getElementById('toggle').addEventListener('click', function() {
    // Simply check the current text content to determine state
    const isCurrentlyDisabled = this.textContent === 'Enable Extension';
    const newState = isCurrentlyDisabled; // If it says "Enable", we want to enable it (true)
    
    console.log('Toggle clicked. Current state:', isCurrentlyDisabled ? 'disabled' : 'enabled', 'New state:', newState ? 'enabled' : 'disabled');
    
    browser.storage.sync.set({ enabled: newState }).then(() => {
      console.log('Updated storage with enabled:', newState);
      updateToggleBtn(newState);
      return browser.storage.sync.get(null);
    }).then((allData) => {
      updateFeatureButtons(allData);
      setThemesListEnabled(allData.enabled);
      setFeaturesListEnabled(allData.enabled);
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
        browser.storage.sync.set(obj).then(() => {
          return browser.storage.sync.get(null);
        }).then(updateFeatureButtons);
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
      browser.storage.sync.set({ popupActiveTab: tab });
    }
  }

  // Restore last active tab (and only activate after storage is loaded)
  browser.storage.sync.get(['popupActiveTab']).then(function(data) {
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
    document.querySelectorAll('.theme-select-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.theme === themeName);
      if (btn.closest('.theme-card')) {
      btn.closest('.theme-card').classList.toggle('selected', btn.dataset.theme === themeName);
    }
  });
    browser.storage.sync.set({ activeTheme: themeName });
  }  document.querySelectorAll('.theme-select-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      setActiveTheme(this.dataset.theme);
    });
  });

  browser.storage.sync.get(['activeTheme']).then(function(data) {
    const activeTheme = data.activeTheme || 'default';
    setActiveTheme(activeTheme);
  });

  // Archived features toggle logic
  const toggleArchivedBtn = document.getElementById('toggleArchivedFeatures');
  const archivedSection = document.getElementById('archivedFeaturesSection');
  
  toggleArchivedBtn.addEventListener('click', function() {
    const isHidden = archivedSection.style.display === 'none';
    archivedSection.style.display = isHidden ? 'block' : 'none';
    toggleArchivedBtn.textContent = isHidden ? 'Hide Archived Features' : 'Show Archived Features';
  });
});
