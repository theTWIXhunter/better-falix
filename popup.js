const toggleBtn = document.getElementById('toggle');
const hideConsoleTabsCheckbox = document.getElementById('hideConsoleTabs');
const moveBackupsNavCheckbox = document.getElementById('moveBackupsNav');
const moveMonitoringNavCheckbox = document.getElementById('moveMonitoringNav');
const moveLogsNavCheckbox = document.getElementById('moveLogsNav');
const removeExternalStartNavCheckbox = document.getElementById('removeExternalStartNav');
const removeNavbarSupportLinksCheckbox = document.getElementById('removeNavbarSupportLinks');
const removeConsoleFilesCategoryCheckbox = document.getElementById('removeConsoleFilesCategory');
const replaceAccountCategoryCheckbox = document.getElementById('replaceAccountCategory');

function updateButton(enabled) {
  if (enabled) {
    toggleBtn.textContent = 'Disable Extensions';
    toggleBtn.classList.remove('off');
  } else {
    toggleBtn.textContent = 'Enable Extensions';
    toggleBtn.classList.add('off');
  }
  if (hideConsoleTabsCheckbox) hideConsoleTabsCheckbox.disabled = !enabled;
  if (moveBackupsNavCheckbox) moveBackupsNavCheckbox.disabled = !enabled;
  if (moveMonitoringNavCheckbox) moveMonitoringNavCheckbox.disabled = !enabled;
  if (moveLogsNavCheckbox) moveLogsNavCheckbox.disabled = !enabled;
  if (removeExternalStartNavCheckbox) removeExternalStartNavCheckbox.disabled = !enabled;
  if (removeNavbarSupportLinksCheckbox) removeNavbarSupportLinksCheckbox.disabled = !enabled;
  if (removeConsoleFilesCategoryCheckbox) removeConsoleFilesCategoryCheckbox.disabled = !enabled;
  if (replaceAccountCategoryCheckbox) replaceAccountCategoryCheckbox.disabled = !enabled;
}

// Load states
chrome.storage.sync.get({
  enabled: true,
  hideConsoleTabs: false,
  moveBackupsNav: false,
  moveMonitoringNav: false,
  moveLogsNav: false,
  removeExternalStartNav: false,
  removeNavbarSupportLinks: false,
  removeConsoleFilesCategory: false,
  replaceAccountCategory: false
}, (data) => {
  updateButton(data.enabled);
  // Always update checkbox checked state, even if disabled
  if (hideConsoleTabsCheckbox) hideConsoleTabsCheckbox.checked = data.hideConsoleTabs;
  if (moveBackupsNavCheckbox) moveBackupsNavCheckbox.checked = !!data.moveBackupsNav;
  if (moveMonitoringNavCheckbox) moveMonitoringNavCheckbox.checked = !!data.moveMonitoringNav;
  if (moveLogsNavCheckbox) moveLogsNavCheckbox.checked = !!data.moveLogsNav;
  if (removeExternalStartNavCheckbox) removeExternalStartNavCheckbox.checked = !!data.removeExternalStartNav;
  if (removeNavbarSupportLinksCheckbox) removeNavbarSupportLinksCheckbox.checked = !!data.removeNavbarSupportLinks;
  if (removeConsoleFilesCategoryCheckbox) removeConsoleFilesCategoryCheckbox.checked = !!data.removeConsoleFilesCategory;
  if (replaceAccountCategoryCheckbox) {
    replaceAccountCategoryCheckbox.checked = !!data.replaceAccountCategory;
    replaceAccountCategoryCheckbox.disabled = !data.enabled;
  }
  // Disable checkboxes if extension is disabled
  updateButton(data.enabled);
});

// Toggle main extension
toggleBtn.addEventListener('click', () => {
  chrome.storage.sync.get({ enabled: true }, (data) => {
    const newState = !data.enabled;
    chrome.storage.sync.set({ enabled: newState }, () => {
      updateButton(newState);
      // Optionally, reload the page to apply changes immediately
      // window.location.reload();
    });
  });
});

// Toggle features
if (hideConsoleTabsCheckbox) {
  hideConsoleTabsCheckbox.addEventListener('change', (e) => {
    if (hideConsoleTabsCheckbox.disabled) return;
    chrome.storage.sync.set({ hideConsoleTabs: e.target.checked });
  });
}
if (moveBackupsNavCheckbox) {
  moveBackupsNavCheckbox.addEventListener('change', (e) => {
    if (moveBackupsNavCheckbox.disabled) return;
    chrome.storage.sync.set({ moveBackupsNav: e.target.checked });
  });
}
if (moveMonitoringNavCheckbox) {
  moveMonitoringNavCheckbox.addEventListener('change', (e) => {
    if (moveMonitoringNavCheckbox.disabled) return;
    chrome.storage.sync.set({ moveMonitoringNav: e.target.checked });
  });
}
if (moveLogsNavCheckbox) {
  moveLogsNavCheckbox.addEventListener('change', (e) => {
    if (moveLogsNavCheckbox.disabled) return;
    chrome.storage.sync.set({ moveLogsNav: e.target.checked });
  });
}
if (removeExternalStartNavCheckbox) {
  removeExternalStartNavCheckbox.addEventListener('change', (e) => {
    if (removeExternalStartNavCheckbox.disabled) return;
    chrome.storage.sync.set({ removeExternalStartNav: e.target.checked });
  });
}
if (removeNavbarSupportLinksCheckbox) {
  removeNavbarSupportLinksCheckbox.addEventListener('change', (e) => {
    if (removeNavbarSupportLinksCheckbox.disabled) return;
    chrome.storage.sync.set({ removeNavbarSupportLinks: e.target.checked });
  });
}
if (removeConsoleFilesCategoryCheckbox) {
  removeConsoleFilesCategoryCheckbox.addEventListener('change', (e) => {
    if (removeConsoleFilesCategoryCheckbox.disabled) return;
    chrome.storage.sync.set({ removeConsoleFilesCategory: e.target.checked });
  });
}
if (replaceAccountCategoryCheckbox) {
  replaceAccountCategoryCheckbox.addEventListener('change', (e) => {
    if (replaceAccountCategoryCheckbox.disabled) return;
    chrome.storage.sync.set({ replaceAccountCategory: e.target.checked });
  });
}
