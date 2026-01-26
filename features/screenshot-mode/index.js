// Screenshot Mode Feature
// Censors sensitive information for screenshots

let screenshotModeActive = false;
let config = {};

function loadConfig() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['screenshotModeConfig'], (data) => {
      const defaultConfig = {
        serverName: { enabled: true, replacement: "Example Server" },
        serverIP: { enabled: true, replacement: "serverIPhere.falixsrv.me" },
        serverPort: { enabled: true, replacement: "12345" },
        serverDynamicIP: { enabled: true, replacement: "127.0.0.1" },
        profileUsername: { enabled: true, replacement: "Example User" },
        profileTag: { enabled: true, replacement: "example" },
        profilePicture: { enabled: true, replacement: "https://ui-avatars.com/api/?name=User" },
        consolePlayer: { enabled: true, replacement: "Player" },
        adminBadge: { enabled: true, replacement: null },
      };
      config = data.screenshotModeConfig || defaultConfig;
      resolve();
    });
  });
}

function applyCensoring() {
  // Server names
  if (config.serverName.enabled) {
    document.querySelectorAll('.current-server-name, .server-name').forEach(el => {
      el.textContent = config.serverName.replacement;
    });
  }
  
  // Server IPs
  if (config.serverIP.enabled) {
    document.querySelectorAll('.server-address, .connection-details-ip').forEach(el => {
      el.textContent = config.serverIP.replacement;
    });
  }
  
  // Server Ports
  if (config.serverPort.enabled) {
    document.querySelectorAll('.connection-details-port').forEach(el => {
      el.textContent = config.serverPort.replacement;
    });
  }
  
  // Dynamic IPs
  if (config.serverDynamicIP.enabled) {
    document.querySelectorAll('.connection-details-dynamicip').forEach(el => {
      el.textContent = config.serverDynamicIP.replacement;
    });
  }
  
  // Profile Username
  if (config.profileUsername.enabled) {
    document.querySelectorAll('.profile-name').forEach(el => {
      el.textContent = config.profileUsername.replacement;
    });
  }
  
  // Profile Tag
  if (config.profileTag.enabled) {
    document.querySelectorAll('.profile-tag').forEach(el => {
      el.textContent = config.profileTag.replacement;
    });
  }
  
  // Profile Picture
  if (config.profilePicture.enabled) {
    document.querySelectorAll('.profile-avatar-large img').forEach(img => {
      img.src = config.profilePicture.replacement;
    });
  }
  
  // Console Player Usernames
  if (config.consolePlayer.enabled) {
    document.querySelectorAll('.console-player-username').forEach(el => {
      el.textContent = config.consolePlayer.replacement;
    });
  }
  
  // Admin Badge
  if (config.adminBadge.enabled) {
    document.querySelectorAll('.admin-badge-large').forEach(el => {
      el.style.display = 'none';
    });
  }
}

function enableScreenshotMode() {
  screenshotModeActive = true;
  loadConfig().then(() => applyCensoring());
}

function disableScreenshotMode() {
  screenshotModeActive = false;
  // Reload page to restore original content
  location.reload();
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enableScreenshotMode') {
    enableScreenshotMode();
  } else if (request.action === 'disableScreenshotMode') {
    disableScreenshotMode();
  }
});

// Check if screenshot mode should be active on page load
chrome.storage.sync.get(['screenshotModeActive'], (result) => {
  if (result.screenshotModeActive) {
    loadConfig().then(() => enableScreenshotMode());
  }
});

// If screenshot mode is enabled, re-apply on DOM changes
const observer = new MutationObserver(() => {
  if (screenshotModeActive) applyCensoring();
});

// Wait for body to be available
if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
