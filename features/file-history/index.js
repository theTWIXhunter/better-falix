// [better-falix] file-history: Script loading
console.log('[better-falix] file-history: Script loading');

chrome.storage.sync.get({ fileHistory: false, enabled: true }, (data) => {
  if (!data.enabled || !data.fileHistory) {
    console.log('[better-falix] file-history: Script disabled');
    return;
  }
  console.log('[better-falix] file-history: Script enabled');

  //  --------- START FEATURE ----------

  // File history storage
  let actionHistory = [];
  let historyIndex = -1;
  const MAX_HISTORY = 50; // Maximum number of actions to keep

  // Action types enum
  const ACTION_TYPES = {
    RENAME: 'rename',
    MOVE: 'move',
    DELETE: 'delete',
    CREATE: 'create',
    COPY: 'copy'
  };

  // Add action to history
  function addActionToHistory(action) {
    // Remove any actions after current index (for when we're in middle of history)
    actionHistory = actionHistory.slice(0, historyIndex + 1);
    
    // Add new action
    actionHistory.push({
      ...action,
      timestamp: Date.now(),
      id: generateActionId()
    });
    
    // Maintain max history size
    if (actionHistory.length > MAX_HISTORY) {
      actionHistory.shift();
    } else {
      historyIndex++;
    }
    
    console.log('[better-falix] file-history: Action logged:', action);
    console.log('[better-falix] file-history: History length:', actionHistory.length);
  }

  // Generate unique action ID
  function generateActionId() {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Get server UUID from current URL or page context
  function getServerUUID() {
    const pathParts = window.location.pathname.split('/');
    const serverIndex = pathParts.indexOf('server');
    return serverIndex !== -1 && pathParts[serverIndex + 1] ? pathParts[serverIndex + 1] : null;
  }

  // Intercept XMLHttpRequest to monitor file operations
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    this._method = method;
    this._url = url;
    return originalXHROpen.apply(this, [method, url, ...args]);
  };

  XMLHttpRequest.prototype.send = function(data) {
    const xhr = this;
    const method = this._method;
    const url = this._url;

    // Log ALL XHR requests for debugging
    console.log(`[better-falix] file-history: XHR SEND: ${method} ${url}`);
    if (data) {
      console.log('[better-falix] file-history: XHR Data:', data);
    }

    // Monitor file operations
    if (url && (url.includes('/server/ajax/files/') || url.includes('falixnodes.net/server/ajax/files/') || url.includes('/ajax/files/') || url.includes('/api/files/') || url.includes('/api/server/'))) {
      console.log(`[better-falix] file-history: Monitoring XHR request to ${url}`);
      const originalOnLoad = xhr.onload;
      
      xhr.onload = function() {
        try {
          // Parse request data
          let requestData = {};
          if (data) {
            if (typeof data === 'string') {
              try {
                requestData = JSON.parse(data);
              } catch (e) {
                // If it's form data or other format, try to parse as URLSearchParams
                const params = new URLSearchParams(data);
                requestData = Object.fromEntries(params.entries());
              }
            } else if (data instanceof FormData) {
              // Handle FormData
              requestData = Object.fromEntries(data.entries());
            } else if (data instanceof URLSearchParams) {
              // Handle URLSearchParams
              requestData = Object.fromEntries(data.entries());
            }
          }

          console.log(`[better-falix] file-history: Intercepted XHR ${method} request to ${url}`);
          console.log('[better-falix] file-history: XHR Request data:', requestData);

          processFileOperation(url, method, requestData);
        } catch (error) {
          console.error('[better-falix] file-history: Error processing XHR request:', error);
        }

        // Call original onload if it exists
        if (originalOnLoad) {
          originalOnLoad.apply(this, arguments);
        }
      };
    }

    return originalXHRSend.apply(this, arguments);
  };

  // Intercept Fetch API to monitor file operations
  const originalFetch = window.fetch;
  window.fetch = function(input, init = {}) {
    const url = typeof input === 'string' ? input : input.url;
    const method = init.method || 'GET';

    // Log ALL fetch requests for debugging
    console.log(`[better-falix] file-history: FETCH: ${method} ${url}`);
    if (init.body) {
      console.log('[better-falix] file-history: Fetch Body:', init.body);
    }

    // Monitor file operations
    if (url && (url.includes('/server/ajax/files/') || url.includes('falixnodes.net/server/ajax/files/') || url.includes('/ajax/files/') || url.includes('/api/files/') || url.includes('/api/server/'))) {
      console.log(`[better-falix] file-history: Monitoring Fetch request to ${url}`);
      
      return originalFetch.apply(this, arguments).then(response => {
        // Clone response to read it without consuming the original
        const responseClone = response.clone();
        
        try {
          // Parse request data
          let requestData = {};
          if (init.body) {
            if (typeof init.body === 'string') {
              try {
                requestData = JSON.parse(init.body);
              } catch (e) {
                const params = new URLSearchParams(init.body);
                requestData = Object.fromEntries(params.entries());
              }
            } else if (init.body instanceof FormData) {
              requestData = Object.fromEntries(init.body.entries());
            } else if (init.body instanceof URLSearchParams) {
              requestData = Object.fromEntries(init.body.entries());
            }
          }

          console.log(`[better-falix] file-history: Intercepted Fetch ${method} request to ${url}`);
          console.log('[better-falix] file-history: Fetch request data:', requestData);

          processFileOperation(url, method, requestData);
        } catch (error) {
          console.error('[better-falix] file-history: Error processing Fetch request:', error);
        }

        return response;
      });
    }

    return originalFetch.apply(this, arguments);
  };

  // Common function to process file operations
  function processFileOperation(url, method, requestData) {
    // Log different file operations based on endpoint
    if ((url.includes('/move') || url.includes('/rename')) && method === 'POST') {
      console.log('[better-falix] file-history: Detected move/rename operation');
      logMoveOrRenameAction(requestData);
    } else if (url.includes('/delete') && method === 'POST') {
      console.log('[better-falix] file-history: Detected delete operation');
      logDeleteAction(requestData);
    } else if (url.includes('/create') && method === 'POST') {
      console.log('[better-falix] file-history: Detected create operation');
      logCreateAction(requestData);
    } else if (url.includes('/copy') && method === 'POST') {
      console.log('[better-falix] file-history: Detected copy operation');
      logCopyAction(requestData);
    } else if (url.includes('/upload') && method === 'POST') {
      console.log('[better-falix] file-history: Detected upload operation');
      logCreateAction(requestData);
    } else {
      console.log('[better-falix] file-history: Unknown file operation:', url, method);
    }
  }

  // Log move or rename action
  function logMoveOrRenameAction(requestData) {
    const { path, newpath, newname } = requestData;
    
    if (!path) return;

    // Determine if it's a rename or move operation
    const isRename = newpath === "" || !newpath;
    const actionType = isRename ? ACTION_TYPES.RENAME : ACTION_TYPES.MOVE;
    
    const action = {
      type: actionType,
      originalPath: path,
      newPath: isRename ? newname : newpath,
      serverUUID: getServerUUID(),
      canUndo: true
    };

    if (isRename) {
      action.originalName = path.split('/').pop();
      action.newName = newname;
      console.log(`[better-falix] file-history: File renamed from "${action.originalName}" to "${action.newName}"`);
    } else {
      console.log(`[better-falix] file-history: File moved from "${path}" to "${newpath}"`);
    }

    addActionToHistory(action);
  }

  // Log delete action
  function logDeleteAction(requestData) {
    const { path, perm } = requestData;
    
    if (!path) return;

    const action = {
      type: ACTION_TYPES.DELETE,
      path: path,
      fileName: path.split('/').pop(),
      permanent: perm === true,
      serverUUID: getServerUUID(),
      canUndo: perm !== true, // Can only undo non-permanent deletions
      recyclebinPath: perm !== true ? `/recycleBin_${getServerUUID()}/${path.split('/').pop()}` : null
    };

    if (action.permanent) {
      console.log(`[better-falix] file-history: File permanently deleted: "${action.fileName}"`);
    } else {
      console.log(`[better-falix] file-history: File moved to recycle bin: "${action.fileName}"`);
    }

    addActionToHistory(action);
  }

  // Log create action
  function logCreateAction(requestData) {
    const action = {
      type: ACTION_TYPES.CREATE,
      ...requestData,
      serverUUID: getServerUUID(),
      canUndo: true
    };

    console.log(`[better-falix] file-history: File/folder created:`, requestData);
    addActionToHistory(action);
  }

  // Log copy action
  function logCopyAction(requestData) {
    const action = {
      type: ACTION_TYPES.COPY,
      ...requestData,
      serverUUID: getServerUUID(),
      canUndo: true
    };

    console.log(`[better-falix] file-history: File/folder copied:`, requestData);
    addActionToHistory(action);
  }

  // Get current history (for debugging/UI)
  function getActionHistory() {
    return {
      history: actionHistory,
      currentIndex: historyIndex,
      canUndo: historyIndex >= 0,
      canRedo: historyIndex < actionHistory.length - 1
    };
  }

  // Expose functions for debugging and future UI integration
  window.fileHistoryDebug = {
    getHistory: getActionHistory,
    clearHistory: () => {
      actionHistory = [];
      historyIndex = -1;
      console.log('[better-falix] file-history: History cleared');
    },
    logAction: addActionToHistory,
    testNetworkInterception: () => {
      console.log('[better-falix] file-history: Testing network interception...');
      fetch('/test-endpoint', { method: 'POST', body: 'test' }).catch(() => {});
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/test-endpoint');
      xhr.send('test');
    }
  };

  // Add DOM mutation observer to watch for file list changes
  function initDOMObserver() {
    const targetNode = document.body;
    const config = { attributes: false, childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          // Check for file list updates or notifications
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Look for success notifications or file list updates
              if (node.textContent && (
                node.textContent.includes('File renamed') ||
                node.textContent.includes('File moved') ||
                node.textContent.includes('File deleted') ||
                node.textContent.includes('successfully')
              )) {
                console.log('[better-falix] file-history: DOM change detected:', node.textContent);
              }
            }
          });
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    console.log('[better-falix] file-history: DOM observer initialized');
  }

  // Initialize DOM observer after a delay to ensure page is loaded
  setTimeout(initDOMObserver, 2000);

  console.log('[better-falix] file-history: Action logging system initialized');
  console.log('[better-falix] file-history: Use window.fileHistoryDebug to access debug functions');
  console.log('[better-falix] file-history: Current URL:', window.location.href);
  console.log('[better-falix] file-history: Server UUID:', getServerUUID());
  console.log('[better-falix] file-history: Starting network monitoring...');

  // Test the interception immediately
  setTimeout(() => {
    console.log('[better-falix] file-history: Testing network interception...');
    
    // Test XHR
    try {
      const testXHR = new XMLHttpRequest();
      testXHR.open('POST', '/test-xhr-endpoint');
      testXHR.send('test');
    } catch (e) {
      console.log('[better-falix] file-history: XHR test error (expected):', e.message);
    }

    // Test Fetch
    try {
      fetch('/test-fetch-endpoint', { method: 'POST', body: 'test' }).catch(() => {
        console.log('[better-falix] file-history: Fetch test completed (error expected)');
      });
    } catch (e) {
      console.log('[better-falix] file-history: Fetch test error (expected):', e.message);
    }
  }, 1000);

},)