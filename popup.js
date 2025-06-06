const toggleBtn = document.getElementById('toggle');
const hideConsoleTabsCheckbox = document.getElementById('hideConsoleTabs');

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
chrome.storage.sync.get({ enabled: true, hideConsoleTabs: false }, (data) => {
  updateButton(data.enabled);
  if (hideConsoleTabsCheckbox) {
    hideConsoleTabsCheckbox.checked = data.hideConsoleTabs;
    hideConsoleTabsCheckbox.disabled = !data.enabled;
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
    });
  });
});

// Toggle feature
if (hideConsoleTabsCheckbox) {
  hideConsoleTabsCheckbox.addEventListener('change', (e) => {
    chrome.storage.sync.set({ hideConsoleTabs: e.target.checked });
  });
}

document.getElementById('moveBackupsNav').addEventListener('change', function() {
  chrome.storage.sync.set({ moveBackupsNav: this.checked });
});

chrome.storage.sync.get('moveBackupsNav', ({ moveBackupsNav }) => {
  document.getElementById('moveBackupsNav').checked = !!moveBackupsNav;
});
