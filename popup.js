document.addEventListener('DOMContentLoaded', () => {
  console.log('popup.js loaded');
  // Optional: visually confirm by changing the popup background
  document.body.style.border = '3px solid #0078d7';
  
  // Handle settings page opening
  document.getElementById('openSettings').addEventListener('click', function(e) {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
  });

  // Handle gear icon clicks to open settings page
  document.querySelectorAll('.feature-settings-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent triggering tooltip or other events
      chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
    });
  });

  // Screenshot mode button handler
  const screenshotBtn = document.getElementById('screenshotModeBtn');
  if (screenshotBtn) {
    let isProcessing = false;
    const injectedTabs = new Set(); // Track which tabs have the script
    
    console.log('[Screenshot Mode] Initializing button handler');
    
    // Ensure button starts clean
    screenshotBtn.classList.remove('active');
    
    // Load saved state (default to false)
    chrome.storage.sync.get({ screenshotModeActive: false }, (result) => {
      console.log('[Screenshot Mode] Loaded saved state:', result.screenshotModeActive);
      console.log('[Screenshot Mode] Button has active class before update:', screenshotBtn.classList.contains('active'));
      
      if (result.screenshotModeActive === true) {
        screenshotBtn.classList.add('active');
      } else {
        screenshotBtn.classList.remove('active');
      }
      
      console.log('[Screenshot Mode] Button has active class after update:', screenshotBtn.classList.contains('active'));
    });

    // Function to send toggle message
    const sendToggleMessage = (tabId, isActive, callback) => {
      console.log('[Screenshot Mode] Sending message to tab', tabId, '- action:', isActive ? 'enable' : 'disable');
      chrome.tabs.sendMessage(
        tabId,
        { action: isActive ? 'enableScreenshotMode' : 'disableScreenshotMode' },
        (response) => {
          if (chrome.runtime.lastError) {
            console.log('[Screenshot Mode] ❌ Message error:', chrome.runtime.lastError.message);
            injectedTabs.delete(tabId);
          } else {
            console.log('[Screenshot Mode] ✅ Message sent successfully, response:', response);
          }
          if (callback) callback();
        }
      );
    };

    // Toggle screenshot mode
    screenshotBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('[Screenshot Mode] 🔘 Button clicked');
      
      if (isProcessing) {
        console.log('[Screenshot Mode] ⚠️ Already processing, ignoring click');
        return;
      }
      isProcessing = true;
      console.log('[Screenshot Mode] Processing set to true');
      
      const wasActive = screenshotBtn.classList.contains('active');
      const isActive = !wasActive;
      console.log('[Screenshot Mode] Toggle state: was', wasActive, '-> now', isActive);
      
      // Update UI immediately
      if (isActive) {
        screenshotBtn.classList.add('active');
      } else {
        screenshotBtn.classList.remove('active');
      }
      console.log('[Screenshot Mode] UI updated');
      
      // Save state
      chrome.storage.sync.set({ screenshotModeActive: isActive }, () => {
        console.log('[Screenshot Mode] State saved to storage:', isActive);
        
        // Get the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
          if (tabs && tabs[0]) {
            const tabId = tabs[0].id;
            console.log('[Screenshot Mode] Active tab ID:', tabId);
            console.log('[Screenshot Mode] Injected tabs:', Array.from(injectedTabs));
            
            try {
              // Check if script needs to be injected
              const needsInjection = !injectedTabs.has(tabId);
              console.log('[Screenshot Mode] Needs injection:', needsInjection);
              
              if (needsInjection) {
                console.log('[Screenshot Mode] 💉 Injecting script...');
                // Inject the script
                await chrome.scripting.executeScript({
                  target: { tabId: tabId },
                  files: ['features/screenshot-mode/index.js']
                });
                injectedTabs.add(tabId);
                console.log('[Screenshot Mode] ✅ Script injected, waiting 250ms...');
                
                // Wait for script to initialize
                await new Promise(resolve => setTimeout(resolve, 250));
                console.log('[Screenshot Mode] Wait complete, sending first message...');
                
                // Send message twice after fresh injection (first ensures it's ready, second actually toggles)
                sendToggleMessage(tabId, isActive, () => {
                  console.log('[Screenshot Mode] First message sent, waiting 100ms...');
                  setTimeout(() => {
                    console.log('[Screenshot Mode] Sending second message...');
                    sendToggleMessage(tabId, isActive, () => {
                      console.log('[Screenshot Mode] Second message sent, processing complete');
                      isProcessing = false;
                    });
                  }, 100);
                });
              } else {
                console.log('[Screenshot Mode] Script already injected, sending single message...');
                // Script already injected, just send once
                sendToggleMessage(tabId, isActive, () => {
                  console.log('[Screenshot Mode] Message sent, processing complete');
                  isProcessing = false;
                });
              }
            } catch (err) {
              console.log('[Screenshot Mode] ❌ Injection error:', err);
              isProcessing = false;
            }
          } else {
            console.log('[Screenshot Mode] ❌ No active tab found');
            isProcessing = false;
          }
        });
      });
    });
  }
});

const toggleBtn = document.getElementById('toggle');
const featureIds = [
  'hideConsoleTabs',
  'replaceAccountCategory',
  'removeSftpUpload',
  'replaceConnectTab',
  'removeExitDiscount',
  'navbarHover',
  'replaceSupportModal',
  'replaceCpuWithNode',
  'removeMaxPlayers',
  'removePlayerManagement',
  'removePremiumTransfer',
  'removeCpuCard',
  'uploadCreateHover',
  'customServerOrder',
  'removeServerSearch',
  'hideSupportCategory',
  'removeLanguageSelector',
  'replaceFalixLogo',
  'splitAddonsTabs',
  'renameConfigToProperties',
  'renameAddonsToMods',
  'removeLogsContainer',
  'redactedContentSubtle',
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
  'showTicketId',
  'inlineServerInfo',
  'navbarEditorV2Enabled',
  'timeFormat24h',
  'hideParticipants'
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
  chrome.storage.sync.get({
    enabled: false,
    hideConsoleTabs: false,
    replaceAccountCategory: false,
    removeSftpUpload: false,
    replaceConnectTab: false,
    removeExitDiscount: false,
    itsJustPaper: false,
    itsJustGeyser: false,
    navbarHover: false,
    replaceSupportModal: false,
    replaceCpuWithNode: false,
    removeMaxPlayers: false,
    removePlayerManagement: false,
    uploadCreateHover: false,
    customServerOrder: false,
    removeServerSearch: false,
    removeLogsContainer: false,
    removePremiumTransfer: false,
    removeCpuCard: false,
    redactedContentSubtle: false,
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
    copyAllSupportInfo: false,
    compactReplyBox: false,
    iKnowMarkdown: false,
    hideTemplateButton: false,
    removeFileUploadLabel: false,
    showTicketId: false,
    inlineServerInfo: false,
    navbarEditorV2Enabled: true,
    timeFormat24h: false,
    hideParticipants: false,
    popupActiveTab: 'features'

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

    // Restore active tab
    if (data.popupActiveTab === 'themes') {
      document.getElementById('features-tab').classList.remove('active');
      document.getElementById('themes-tab').classList.add('active');
      document.getElementById('features-content').style.display = 'none';
      document.getElementById('themes-content').style.display = 'block';
      document.getElementById('slider-indicator').style.left = '50%';
    }
  });

  // Main toggle logic - completely reimplemented for reliability
  document.getElementById('toggle').addEventListener('click', function() {
    // Simply check the current text content to determine state
    const isCurrentlyDisabled = this.textContent === 'Enable Extension';
    const newState = isCurrentlyDisabled; // If it says "Enable", we want to enable it (true)
    
    console.log('Toggle clicked. Current state:', isCurrentlyDisabled ? 'disabled' : 'enabled', 'New state:', newState ? 'enabled' : 'disabled');
    
    chrome.storage.sync.set({ enabled: newState }, () => {
      console.log('Updated storage with enabled:', newState);
      updateToggleBtn(newState);
      chrome.storage.sync.get(null, (allData) => {
        updateFeatureButtons(allData);
        setThemesListEnabled(allData.enabled);
        setFeaturesListEnabled(allData.enabled);
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
  const navbarTab = document.getElementById('navbar-tab');
  const featuresContent = document.getElementById('features-content');
  const themesContent = document.getElementById('themes-content');
  const navbarContent = document.getElementById('navbar-content');
  const sliderIndicator = document.getElementById('slider-indicator');

  function activateTab(tab, save = true) {
    if (tab === 'features') {
      featuresTab.classList.add('active');
      themesTab.classList.remove('active');
      navbarTab.classList.remove('active');
      featuresContent.style.display = '';
      themesContent.style.display = 'none';
      navbarContent.style.display = 'none';
      sliderIndicator.style.left = '0%';
    } else if (tab === 'themes') {
      themesTab.classList.add('active');
      featuresTab.classList.remove('active');
      navbarTab.classList.remove('active');
      featuresContent.style.display = 'none';
      themesContent.style.display = '';
      navbarContent.style.display = 'none';
      sliderIndicator.style.left = '33.333%';
    } else if (tab === 'navbar') {
      navbarTab.classList.add('active');
      featuresTab.classList.remove('active');
      themesTab.classList.remove('active');
      featuresContent.style.display = 'none';
      themesContent.style.display = 'none';
      navbarContent.style.display = '';
      sliderIndicator.style.left = '66.666%';
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

  navbarTab.addEventListener('click', function() {
    activateTab('navbar');
    // Automatically open the navbar editor in a new tab
    chrome.tabs.create({ url: chrome.runtime.getURL('navbar-editor/navbar-editor.html') });
  });

  // Open navbar editor button
  document.getElementById('openNavbarEditor').addEventListener('click', function() {
    chrome.tabs.create({ url: chrome.runtime.getURL('navbar-editor/navbar-editor.html') });
  });

  // Navigation warning link
  document.getElementById('navWarningLink').addEventListener('click', function(e) {
    e.preventDefault();
    activateTab('navbar');
    chrome.tabs.create({ url: chrome.runtime.getURL('navbar-editor/navbar-editor.html') });
  });

  // Theme selection logic
  function setActiveTheme(themeName) {
    document.querySelectorAll('.theme-select-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.theme === themeName);
      if (btn.closest('.theme-card')) {
      btn.closest('.theme-card').classList.toggle('selected', btn.dataset.theme === themeName);
    }
  });
    chrome.storage.sync.set({ activeTheme: themeName });
  }  document.querySelectorAll('.theme-select-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      setActiveTheme(this.dataset.theme);
    });
  });

  chrome.storage.sync.get(['activeTheme'], function(data) {
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

  // Enable All / Disable All button logic
  document.querySelectorAll('.enable-all-btn').forEach(enableAllBtn => {
    enableAllBtn.addEventListener('click', function() {
      const category = this.dataset.category;
      const featureList = document.querySelector(`.feature-list[data-category="${category}"]`);
      
      if (!featureList) return;
      
      // Get all feature buttons in this category
      const featureButtons = featureList.querySelectorAll('.feature-btn');
      
      // Check if all features are currently enabled
      let allEnabled = true;
      featureButtons.forEach(btn => {
        if (!btn.disabled && btn.getAttribute('aria-pressed') !== 'true') {
          allEnabled = false;
        }
      });
      
      // Toggle all features based on current state
      const newState = !allEnabled;
      const featuresToUpdate = {};
      
      featureButtons.forEach(btn => {
        if (!btn.disabled) {
          const featureId = btn.id;
          featuresToUpdate[featureId] = newState;
          setFeatureBtnState(btn, newState);
        }
      });
      
      // Update button text
      this.textContent = newState ? 'Disable All' : 'Enable All';
      
      // Save all changes at once
      chrome.storage.sync.set(featuresToUpdate, () => {
        console.log(`${newState ? 'Enabled' : 'Disabled'} all features in ${category} category`);
      });
    });
  });

  // Update Enable/Disable All button text based on feature states
  function updateEnableAllButtons() {
    document.querySelectorAll('.enable-all-btn').forEach(btn => {
      const category = btn.dataset.category;
      const featureList = document.querySelector(`.feature-list[data-category="${category}"]`);
      
      if (!featureList) return;
      
      const featureButtons = featureList.querySelectorAll('.feature-btn');
      let allEnabled = true;
      
      featureButtons.forEach(featureBtn => {
        if (!featureBtn.disabled && featureBtn.getAttribute('aria-pressed') !== 'true') {
          allEnabled = false;
        }
      });
      
      btn.textContent = allEnabled ? 'Disable All' : 'Enable All';
    });
  }

  // Call updateEnableAllButtons when features are loaded
  chrome.storage.sync.get(null, (data) => {
    updateEnableAllButtons();
  });

  // Also update when individual features are toggled
  featureIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', function() {
        setTimeout(updateEnableAllButtons, 50);
      });
    }
  });
});
