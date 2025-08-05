document.addEventListener('DOMContentLoaded', () => {
  console.log('popup.js loaded');
  // Optional: visually confirm by changing the popup background
  document.body.style.border = '3px solid #0078d7';
  
  // Handle settings page opening
  document.getElementById('openSettings').addEventListener('click', function(e) {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
  });
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
  'customServerOrder',
  'editorFullscreen',
  'removeServerSearch'
];

// Create features object for archived features functionality
const features = {};
featureIds.forEach(id => {
  features[id] = true; // All features exist
});

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
    customServerOrder: false,
    editorFullscreen: false,
    removeServerSearch: false
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
    document.querySelectorAll('.theme-select-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.theme === themeName);
      if (btn.closest('.theme-card')) {
        btn.closest('.theme-card').classList.toggle('selected', btn.dataset.theme === themeName);
      }
    });
    chrome.storage.sync.set({ activeTheme: themeName });
  }

  document.querySelectorAll('.theme-select-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      setActiveTheme(this.dataset.theme);
    });
  });

  chrome.storage.sync.get(['activeTheme'], function(data) {
    const activeTheme = data.activeTheme || 'default';
    setActiveTheme(activeTheme);
  });

  // Archived features button
  const showArchivedBtn = document.getElementById('showArchivedFeatures');
  const archivedSection = document.getElementById('archivedFeaturesSection');
  const archivedList = document.getElementById('archivedFeaturesList');
  let archivedVisible = false;

  showArchivedBtn.addEventListener('click', () => {
      archivedVisible = !archivedVisible;
      
      if (archivedVisible) {
          archivedSection.style.display = 'block';
          showArchivedBtn.textContent = 'Hide Archived Features';
          populateArchivedFeatures();
      } else {
          archivedSection.style.display = 'none';
          showArchivedBtn.textContent = getArchivedButtonText();
      }
  });

  // Feature names mapping for better display
  const featureNames = {
      customServerOrder: 'Custom Server Order',
      legacyEditorFullscreen: 'Legacy Editor Fullscreen',
      hideConsoleTabs: 'Hide Console Tabs',
      replaceAccountCategory: 'Replace Account Category',
      moveBackupsNav: 'Move "Backups" to Server Settings',
      moveMonitoringNav: 'Move "Monitoring" to Advanced',
      moveLogsNav: 'Move "Logs" to Advanced',
      removeExternalStartNav: 'Remove "Remote Startup" nav item',
      removeNavbarSupportLinks: 'Remove Navbar Support Links',
      removeConsoleFilesCategory: 'Remove "Console" and "Files" categories',
      removeSftpUpload: 'Remove SFTP info from upload',
      removeHowToConnect: 'Remove How To Connect',
      removeExitDiscount: 'Remove Exit-Discount',
      itsJustPaper: "it's just Paper",
      itsJustGeyser: "it's just Geyser",
      serverNameButton: 'Server Name Button',
      navbarHover: 'Navbar Hover',
      replaceSupportModal: 'replace Support Modal',
      uploadCreateHover: 'Upload/Create Hover',
      editorWrapperHeight: 'Editor Wrapper Height',
      editorFullscreen: 'Editor Fullscreen',
      removeServerSearch: 'Remove Server search bar'
  };

  // Feature tooltips mapping
  const featureTooltips = {
      customServerOrder: 'Reorder your server list in any way you want. (See settings)',
      legacyEditorFullscreen: 'Legacy fullscreen editor implementation.',
      hideConsoleTabs: 'Optionally hide unnecessary console tabs for a cleaner interface.',
      replaceAccountCategory: 'Hides the sidebar \'Account\' category and adds a custom popup menu to the profile icon with quick links to Profile Settings and Logout.',
      moveBackupsNav: 'Relocate the \'Backups\' navigation item to the Server Settings section.',
      moveMonitoringNav: 'Move the \'Monitoring\' navigation item to the Advanced section.',
      moveLogsNav: 'Move the \'Logs\' navigation item to the Advanced section.',
      removeExternalStartNav: 'Hide the \'Remote Startup\' navigation item from the sidebar.',
      removeNavbarSupportLinks: 'Optionally remove support-related links from the navbar.',
      removeConsoleFilesCategory: 'Remove \'Console\' and \'Files\' categories (keep items).',
      removeSftpUpload: 'Removes the SFTP info and its divider from the upload button dropdown for a cleaner UI.',
      removeHowToConnect: 'Removes all \'How to connect\' steps, DNS verification sections, and the \'Server Name\' row from the connect button for a cleaner look.',
      removeExitDiscount: 'Removes the most annoying popup ever (the exit discount modal and its backdrop) from falixnodes.net.',
      itsJustPaper: 'Renames \'Craftbukkit / Spigot / PaperSpigot\' to \'Paper\' in the server type dropdown for clarity.',
      itsJustGeyser: 'Renames \'Java + Bedrock Support (Geyser)\' in the server type dropdown for clarity.',
      serverNameButton: 'Makes the server name in the navbar clickable and redirect you to the main page.',
      navbarHover: 'Opens and closes the navbar when you hover on/off it.',
      replaceSupportModal: 'Replaces the support modal with a cleaner one and adds a copy all button.',
      uploadCreateHover: 'Makes the Upload and Create buttons show their dropdowns when hovered.',
      editorWrapperHeight: 'Makes the file editor 600px Height',
      editorFullscreen: 'Adds a fullscreen button to the file editor.',
      removeServerSearch: 'Remove the Server Search bar from the main page.'
  };

  function populateArchivedFeatures() {
      chrome.storage.sync.get(null, (data) => {
          archivedList.innerHTML = '';
          
          Object.keys(features).forEach(featureKey => {
              // Check if feature is disabled (archived)
              if (!data[featureKey] && features[featureKey]) {
                  const featureRow = document.createElement('div');
                  featureRow.className = 'feature-row';
                  
                  const featureName = featureNames[featureKey] || featureKey;
                  const featureTooltip = featureTooltips[featureKey] || '';
                  
                  featureRow.innerHTML = `
                      <span class="feature-label" data-tooltip="${featureTooltip}">${featureName}</span>
                      <button class="feature-btn" id="archived-${featureKey}" aria-pressed="false" tabindex="0">
                          <span class="dot"></span>
                      </button>
                  `;
                  
                  archivedList.appendChild(featureRow);
                  
                  // Add event listener to the toggle button
                  const toggleBtn = featureRow.querySelector('.feature-btn');
                  toggleBtn.addEventListener('click', () => {
                      // Enable the feature
                      chrome.storage.sync.set({ [featureKey]: true }, () => {
                          // Remove from archived list
                          featureRow.remove();
                          
                          // Update the main feature toggle
                          const mainToggle = document.getElementById(featureKey);
                          if (mainToggle) {
                              mainToggle.setAttribute('aria-pressed', 'true');
                              mainToggle.classList.add('on');
                          }
                          
                          // Update button text
                          updateArchivedButtonText();
                          
                          // Hide section if no more archived features
                          if (archivedList.children.length === 0) {
                              archivedVisible = false;
                              archivedSection.style.display = 'none';
                              showArchivedBtn.textContent = getArchivedButtonText();
                          }
                      });
                  });
              }
          });
          
          // If no archived features, hide the section
          if (archivedList.children.length === 0) {
              archivedVisible = false;
              archivedSection.style.display = 'none';
              showArchivedBtn.textContent = 'No Archived Features';
          }
      });
  }

  function getArchivedButtonText() {
      // This will be updated by updateArchivedButtonText
      return showArchivedBtn.textContent;
  }

  // Update text when features are toggled
  function updateArchivedButtonText() {
      chrome.storage.sync.get(null, (data) => {
          let disabledCount = 0;
          Object.keys(features).forEach(featureKey => {
              if (!data[featureKey] && features[featureKey]) {
                  disabledCount++;
              }
          });
          
          if (disabledCount > 0) {
              if (!archivedVisible) {
                  showArchivedBtn.textContent = `Show Archived Features (${disabledCount})`;
              }
              showArchivedBtn.style.display = 'block';
          } else {
              showArchivedBtn.textContent = 'No Archived Features';
              showArchivedBtn.style.display = 'block';
              // Hide archived section if it's visible and there are no archived features
              if (archivedVisible) {
                  archivedVisible = false;
                  archivedSection.style.display = 'none';
                  showArchivedBtn.textContent = 'No Archived Features';
              }
          }
      });
  }

  // Call update function when toggles change
  updateArchivedButtonText();
  
  // Update archived button when any toggle is changed
  document.addEventListener('change', (e) => {
      if (e.target.classList.contains('form-check-input')) {
          setTimeout(updateArchivedButtonText, 100);
      }
  });
});
