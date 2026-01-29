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
        consoleUUID: { enabled: true, replacement: "00000000-0000-0000-0000-000000000000" },
        consoleConnectionIP: { enabled: true, replacement: "0.0.0.0:00000" },
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
  
  // Server domain on main site
  if (config.serverIP?.enabled) {
    document.querySelectorAll('.server-info.server-domain span').forEach(el => {
      if (el.textContent.trim() !== config.serverIP.replacement) {
        el.textContent = config.serverIP.replacement;
        if (el.hasAttribute('title')) {
          el.setAttribute('title', config.serverIP.replacement);
        }
      }
    });
    
    // Domain URL and primary domain name
    document.querySelectorAll('.domain-url, .primary-domain-name').forEach(el => {
      if (el.textContent.trim() !== config.serverIP.replacement) {
        el.textContent = config.serverIP.replacement;
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
    document.querySelectorAll('.connection-details-port, .port-address-text, .port-ip-text').forEach(el => {
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
  
  // Console UUIDs
  if (config.consoleUUID?.enabled) {
    document.querySelectorAll('.console-uuid').forEach(el => {
      if (el.textContent !== config.consoleUUID.replacement) {
        el.textContent = config.consoleUUID.replacement;
      }
    });
  }
  
  // Console Connection IPs (in console logs)
  if (config.consoleConnectionIP?.enabled) {
    document.querySelectorAll('.console-censored-ip').forEach(el => {
      if (el.textContent !== config.consoleConnectionIP.replacement) {
        el.textContent = config.consoleConnectionIP.replacement;
        if (el.hasAttribute('title')) {
          el.setAttribute('title', 'Censored for screenshot');
        }
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
    document.querySelectorAll('.compact-info-card').forEach(card => {
      const header = card.querySelector('.compact-info-header');
      if (header && header.textContent.toUpperCase().includes('SERVER ADDRESS')) {
        const valueEl = card.querySelector('.compact-info-value');
        if (valueEl && valueEl.textContent.trim() !== config.serverIP.replacement) {
          valueEl.textContent = config.serverIP.replacement;
        }
      }
    });
  }
  
  // Connect Modal - Address boxes
  if (config.serverIP?.enabled || config.serverPort?.enabled || config.serverDynamicIP?.enabled) {
    document.querySelectorAll('.connect-address-box').forEach(box => {
      const boxText = box.textContent.toLowerCase();
      const addressSpan = box.querySelector('.connect-address-text');
      
      if (!addressSpan) return;
      
      // Server IP (includes "server ip:" label or .falixsrv.me domain)
      if (config.serverIP?.enabled && 
          (boxText.includes('server ip:') || addressSpan.textContent.includes('.falixsrv.me'))) {
        if (addressSpan.textContent !== config.serverIP.replacement) {
          addressSpan.textContent = config.serverIP.replacement;
        }
      }
      
      // IP with Port (includes "ip with port:" label)
      if (config.serverIP?.enabled && config.serverPort?.enabled && boxText.includes('ip with port:')) {
        const newValue = `${config.serverIP.replacement}:${config.serverPort.replacement}`;
        if (addressSpan.textContent !== newValue) {
          addressSpan.textContent = newValue;
        }
      }
      
      // Port (includes "port:" label)
      if (config.serverPort?.enabled && boxText.includes('port:') && !boxText.includes('ip with port:')) {
        if (addressSpan.textContent !== config.serverPort.replacement) {
          addressSpan.textContent = config.serverPort.replacement;
        }
      }
      
      // Dynamic IP (includes "dynamic ip:" label or host.falixserver.net)
      if (config.serverDynamicIP?.enabled && 
          (boxText.includes('dynamic ip:') || addressSpan.textContent.includes('host.falixserver.net'))) {
        // Check if it includes a port (has a colon)
        const hasDynamicPort = addressSpan.textContent.includes(':');
        let newValue = config.serverDynamicIP.replacement;
        
        if (hasDynamicPort && config.serverPort?.enabled) {
          newValue = `${config.serverDynamicIP.replacement}:${config.serverPort.replacement}`;
        }
        
        if (addressSpan.textContent !== newValue) {
          addressSpan.textContent = newValue;
        }
      }
    });
    
    // Bedrock connection details
    document.querySelectorAll('.bedrock-detail-row').forEach(row => {
      const label = row.querySelector('.bedrock-detail-label');
      const valueSpan = row.querySelector('.bedrock-detail-value span');
      
      if (!label || !valueSpan) return;
      
      const labelText = label.textContent.toLowerCase();
      
      if (config.serverDynamicIP?.enabled && labelText.includes('address')) {
        if (valueSpan.textContent.trim() !== config.serverDynamicIP.replacement) {
          valueSpan.textContent = config.serverDynamicIP.replacement;
        }
      }
      
      if (config.serverPort?.enabled && labelText.includes('port')) {
        if (valueSpan.textContent.trim() !== config.serverPort.replacement) {
          valueSpan.textContent = config.serverPort.replacement;
        }
      }
    });
    
    // Backup connection items (Java full address and Bedrock details)
    document.querySelectorAll('.backup-connection-value').forEach(valueEl => {
      const span = valueEl.querySelector('span');
      if (!span) return;
      
      const text = span.textContent;
      
      // Java Edition - Full Address (IP:Port)
      if (config.serverDynamicIP?.enabled && config.serverPort?.enabled && text.match(/^\d+\.\d+\.\d+\.\d+:\d+$/)) {
        const newValue = `${config.serverDynamicIP.replacement}:${config.serverPort.replacement}`;
        if (text !== newValue) {
          span.textContent = newValue;
        }
      }
      
      // Bedrock - Address line
      if (config.serverDynamicIP?.enabled && text.includes('Address:') && text.match(/\d+\.\d+\.\d+\.\d+/)) {
        span.innerHTML = span.innerHTML.replace(/\d+\.\d+\.\d+\.\d+/, config.serverDynamicIP.replacement);
      }
      
      // Bedrock - Port line
      if (config.serverPort?.enabled && text.includes('Port:') && text.match(/Port:\s*\d+/)) {
        span.innerHTML = span.innerHTML.replace(/Port:\s*\d+/, `Port: ${config.serverPort.replacement}`);
      }
    });
    
    // Quick Add link for Bedrock (minecraft:// protocol)
    if (config.serverDynamicIP?.enabled && config.serverPort?.enabled) {
      document.querySelectorAll('a[href^="minecraft://"]').forEach(link => {
        const newHref = `minecraft://?addExternalServer=Direct%20Server|${config.serverDynamicIP.replacement}:${config.serverPort.replacement}`;
        if (link.href !== newHref) {
          link.href = newHref;
        }
      });
    }
    
    // Domain in warning message
    if (config.serverIP?.enabled) {
      document.querySelectorAll('.alert-warning strong').forEach(strong => {
        if (strong.textContent.includes('.falixsrv.me')) {
          strong.textContent = config.serverIP.replacement;
        }
      });
    }
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
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enableScreenshotMode') {
    enableScreenshotMode();
    sendResponse({ success: true });
  } else if (request.action === 'disableScreenshotMode') {
    disableScreenshotMode();
    sendResponse({ success: true });
  }
  return true; // Keep message channel open for async response
});
