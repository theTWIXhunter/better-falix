// Screenshot Mode Feature
// Censors sensitive information for screenshots

let screenshotModeActive = false;
let config = {};
let observer = null;
let lastApplied = 0;
const THROTTLE_MS = 500; // Only apply censoring every 500ms max

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
  // Throttle to prevent performance issues
  const now = Date.now();
  if (now - lastApplied < THROTTLE_MS) return;
  lastApplied = now;

  if (!screenshotModeActive || !config) return;

  // Server names
  if (config.serverName?.enabled) {
    document.querySelectorAll('.current-server-name, .server-name').forEach(el => {
      if (el.textContent !== config.serverName.replacement) {
        el.textContent = config.serverName.replacement;
      }
    });
  }
  
  // Server IPs
  if (config.serverIP?.enabled) {
    document.querySelectorAll('.server-address, .connection-details-ip').forEach(el => {
      if (el.textContent !== config.serverIP.replacement) {
        el.textContent = config.serverIP.replacement;
      }
    });
  }
  
  // Server Ports
  if (config.serverPort?.enabled) {
    document.querySelectorAll('.connection-details-port').forEach(el => {
      if (el.textContent !== config.serverPort.replacement) {
        el.textContent = config.serverPort.replacement;
      }
    });
  }
  
  // Dynamic IPs
  if (config.serverDynamicIP?.enabled) {
    document.querySelectorAll('.connection-details-dynamicip').forEach(el => {
      if (el.textContent !== config.serverDynamicIP.replacement) {
        el.textContent = config.serverDynamicIP.replacement;
      }
    });
  }
  
  // Profile Username
  if (config.profileUsername?.enabled) {
    document.querySelectorAll('.profile-name').forEach(el => {
      if (el.textContent !== config.profileUsername.replacement) {
        el.textContent = config.profileUsername.replacement;
      }
    });
  }
  
  // Profile Tag
  if (config.profileTag?.enabled) {
    document.querySelectorAll('.profile-tag').forEach(el => {
      if (el.textContent !== config.profileTag.replacement) {
        el.textContent = config.profileTag.replacement;
      }
    });
  }
  
  // Profile Picture
  if (config.profilePicture?.enabled) {
    document.querySelectorAll('.profile-avatar-large img').forEach(img => {
      if (img.src !== config.profilePicture.replacement) {
        img.src = config.profilePicture.replacement;
      }
    });
  }
  
  // Console Player Usernames
  if (config.consolePlayer?.enabled) {
    document.querySelectorAll('.console-player-username').forEach(el => {
      if (el.textContent !== config.consolePlayer.replacement) {
        el.textContent = config.consolePlayer.replacement;
      }
    });
  }
  
  // Admin Badge
  if (config.adminBadge?.enabled) {
    document.querySelectorAll('.admin-badge-large').forEach(el => {
      if (el.style.display !== 'none') {
        el.style.display = 'none';
      }
    });
  }
  
  // Server Address Card (on console page)
  if (config.serverIP?.enabled) {
    document.querySelectorAll('.info-card').forEach(card => {
      const header = card.querySelector('.info-card-header');
      if (header && header.textContent.includes('Server Address')) {
        const content = card.querySelector('.info-card-content');
        if (content && content.textContent !== config.serverIP.replacement) {
          content.textContent = config.serverIP.replacement;
        }
      }
    });
  }
  
  // Connect Modal - IP, Port, Dynamic IP
  if (config.serverIP?.enabled) {
    document.querySelectorAll('.modal-body .row').forEach(row => {
      const label = row.querySelector('.col-4, .col-sm-4');
      const value = row.querySelector('.col-8, .col-sm-8');
      if (label && value) {
        const labelText = label.textContent.trim();
        if (labelText.includes('IP') || labelText.includes('Address')) {
          if (value.textContent !== config.serverIP.replacement) {
            value.textContent = config.serverIP.replacement;
          }
        }
      }
    });
  }
  
  if (config.serverPort?.enabled) {
    document.querySelectorAll('.modal-body .row').forEach(row => {
      const label = row.querySelector('.col-4, .col-sm-4');
      const value = row.querySelector('.col-8, .col-sm-8');
      if (label && value) {
        const labelText = label.textContent.trim();
        if (labelText.includes('Port')) {
          if (value.textContent !== config.serverPort.replacement) {
            value.textContent = config.serverPort.replacement;
          }
        }
      }
    });
  }
  
  if (config.serverDynamicIP?.enabled) {
    document.querySelectorAll('.modal-body .row').forEach(row => {
      const label = row.querySelector('.col-4, .col-sm-4');
      const value = row.querySelector('.col-8, .col-sm-8');
      if (label && value) {
        const labelText = label.textContent.trim();
        if (labelText.includes('Dynamic')) {
          if (value.textContent !== config.serverDynamicIP.replacement) {
            value.textContent = config.serverDynamicIP.replacement;
          }
        }
      }
    });
  }
  
  // Console log messages - censor IPs, ports, and UUIDs
  document.querySelectorAll('.console-log-message, .log-message, .console-output div, .terminal-line').forEach(line => {
    let text = line.textContent;
    let modified = false;
    
    // Pattern: [20:05:12] [INFO]: * [/*.*.*.*:*] logged in
    if (config.serverIP?.enabled && config.serverPort?.enabled) {
      const ipPortPattern = /\[\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d+)\]/g;
      if (ipPortPattern.test(text)) {
        text = text.replace(ipPortPattern, `[/${config.serverDynamicIP.replacement}:${config.serverPort.replacement}]`);
        modified = true;
      }
    }
    
    // Pattern: UUID of player * is *-*-*-*-*
    if (config.consolePlayer?.enabled) {
      const uuidPattern = /UUID of player .+ is [0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
      if (uuidPattern.test(text)) {
        text = text.replace(uuidPattern, `UUID of player ${config.consolePlayer.replacement} is 00000000-0000-0000-0000-000000000000`);
        modified = true;
      }
    }
    
    if (modified && line.textContent !== text) {
      line.textContent = text;
    }
  });
}

function startObserver() {
  if (observer) return; // Already running
  
  observer = new MutationObserver(() => {
    if (screenshotModeActive) applyCensoring();
  });
  
  if (document.body) {
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
  }
}

function stopObserver() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

function enableScreenshotMode() {
  screenshotModeActive = true;
  loadConfig().then(() => {
    applyCensoring();
    startObserver();
  });
}

function disableScreenshotMode() {
  screenshotModeActive = false;
  stopObserver();
  // Don't reload - just stop censoring
  // User can refresh manually if they want to restore original values
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
