const toggleBtn = document.getElementById('toggle');
const hideConsoleTabsCheckbox = document.getElementById('hideConsoleTabs');
const moveBackupsNavCheckbox = document.getElementById('moveBackupsNav');
const moveMonitoringNavCheckbox = document.getElementById('moveMonitoringNav');
const moveLogsNavCheckbox = document.getElementById('moveLogsNav');
const removeExternalStartNavCheckbox = document.getElementById('removeExternalStartNav');

function updateButton(enabled) {
  if (enabled) {
    toggleBtn.textContent = 'Disable Extensions';
    toggleBtn.classList.remove('off');
  } else {
    toggleBtn.textContent = 'Enable Extensions';
    toggleBtn.classList.add('off');
  }
}

// Load states
chrome.storage.sync.get({
  enabled: true,
  hideConsoleTabs: false,
  moveBackupsNav: false,
  moveMonitoringNav: false,
  moveLogsNav: false,
  removeExternalStartNav: false
}, (data) => {
  updateButton(data.enabled);
  if (hideConsoleTabsCheckbox) {
    hideConsoleTabsCheckbox.checked = data.hideConsoleTabs;
    hideConsoleTabsCheckbox.disabled = !data.enabled;
  }
  if (moveBackupsNavCheckbox) {
    moveBackupsNavCheckbox.checked = !!data.moveBackupsNav;
    moveBackupsNavCheckbox.disabled = !data.enabled;
  }
  if (moveMonitoringNavCheckbox) {
    moveMonitoringNavCheckbox.checked = !!data.moveMonitoringNav;
    moveMonitoringNavCheckbox.disabled = !data.enabled;
  }
  if (moveLogsNavCheckbox) {
    moveLogsNavCheckbox.checked = !!data.moveLogsNav;
    moveLogsNavCheckbox.disabled = !data.enabled;
  }
  if (removeExternalStartNavCheckbox) {
    removeExternalStartNavCheckbox.checked = !!data.removeExternalStartNav;
    removeExternalStartNavCheckbox.disabled = !data.enabled;
  }
});

// Toggle main extension
toggleBtn.addEventListener('click', () => {
  chrome.storage.sync.get({ enabled: true }, (data) => {
    const newState = !data.enabled;
    chrome.storage.sync.set({ enabled: newState }, () => {
      updateButton(newState);
      if (hideConsoleTabsCheckbox) {
        hideConsoleTabsCheckbox.disabled = !newState;
      }
      if (moveBackupsNavCheckbox) {
        moveBackupsNavCheckbox.disabled = !newState;
      }
      if (moveMonitoringNavCheckbox) {
        moveMonitoringNavCheckbox.disabled = !newState;
      }
      if (moveLogsNavCheckbox) {
        moveLogsNavCheckbox.disabled = !newState;
      }
      if (removeExternalStartNavCheckbox) {
        removeExternalStartNavCheckbox.disabled = !newState;
      }
    });
  });
});

// Toggle feature
if (hideConsoleTabsCheckbox) {
  hideConsoleTabsCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({ hideConsoleTabs: e.target.checked });
  });
}

if (moveBackupsNavCheckbox) {
  moveBackupsNavCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({ moveBackupsNav: this.checked });
  });
}

if (moveMonitoringNavCheckbox) {
  moveMonitoringNavCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({ moveMonitoringNav: this.checked });
  });
}

if (moveLogsNavCheckbox) {
  moveLogsNavCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({ moveLogsNav: this.checked });
  });
}

if (removeExternalStartNavCheckbox) {
  removeExternalStartNavCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({ removeExternalStartNav: this.checked });
  });
}
