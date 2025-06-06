const toggleBtn = document.getElementById('toggle');
const hideConsoleTabsCheckbox = document.getElementById('hideConsoleTabs');
const moveBackupsNavCheckbox = document.getElementById('moveBackupsNav');
const moveMonitoringNavCheckbox = document.getElementById('moveMonitoringNav');
const moveLogsNavCheckbox = document.getElementById('moveLogsNav');
const removeExternalStartNavCheckbox = document.getElementById('removeExternalStartNav');
const removeNavbarSupportLinksCheckbox = document.getElementById('removeNavbarSupportLinks');

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
}

// Load states
chrome.storage.sync.get({
  enabled: true,
  hideConsoleTabs: false,
  moveBackupsNav: false,
  moveMonitoringNav: false,
  moveLogsNav: false,
  removeExternalStartNav: false,
  removeNavbarSupportLinks: false
}, (data) => {
  updateButton(data.enabled);
  if (hideConsoleTabsCheckbox) hideConsoleTabsCheckbox.checked = data.hideConsoleTabs;
  if (moveBackupsNavCheckbox) moveBackupsNavCheckbox.checked = data.moveBackupsNav;
  if (moveMonitoringNavCheckbox) moveMonitoringNavCheckbox.checked = data.moveMonitoringNav;
  if (moveLogsNavCheckbox) moveLogsNavCheckbox.checked = data.moveLogsNav;
  if (removeExternalStartNavCheckbox) removeExternalStartNavCheckbox.checked = data.removeExternalStartNav;
  if (removeNavbarSupportLinksCheckbox) removeNavbarSupportLinksCheckbox.checked = data.removeNavbarSupportLinks;
});

// Toggle main extension
toggleBtn.addEventListener('click', () => {
  chrome.storage.sync.get({ enabled: true }, (data) => {
    const newState = !data.enabled;
    chrome.storage.sync.set({ enabled: newState }, () => {
      updateButton(newState);
    });
  });
});

// Toggle features
if (hideConsoleTabsCheckbox) {
  hideConsoleTabsCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({ hideConsoleTabs: e.target.checked });
  });
}
if (moveBackupsNavCheckbox) {
  moveBackupsNavCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({ moveBackupsNav: e.target.checked });
  });
}
if (moveMonitoringNavCheckbox) {
  moveMonitoringNavCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({ moveMonitoringNav: e.target.checked });
  });
}
if (moveLogsNavCheckbox) {
  moveLogsNavCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({ moveLogsNav: e.target.checked });
  });
}
if (removeExternalStartNavCheckbox) {
  removeExternalStartNavCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({ removeExternalStartNav: e.target.checked });
  });
}
if (removeNavbarSupportLinksCheckbox) {
  removeNavbarSupportLinksCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({ removeNavbarSupportLinks: e.target.checked });
  });
}
