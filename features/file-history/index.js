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

    // Monitor file operations
    if (url && url.includes('/server/ajax/files/')) {
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
            }
          }

          // Log different file operations based on endpoint
          if (url.includes('/move') && method === 'POST') {
            logMoveOrRenameAction(requestData);
          } else if (url.includes('/delete') && method === 'POST') {
            logDeleteAction(requestData);
          } else if (url.includes('/create') && method === 'POST') {
            logCreateAction(requestData);
          } else if (url.includes('/copy') && method === 'POST') {
            logCopyAction(requestData);
          }
        } catch (error) {
          console.error('[better-falix] file-history: Error processing request:', error);
        }

        // Call original onload if it exists
        if (originalOnLoad) {
          originalOnLoad.apply(this, arguments);
        }
      };
    }

    return originalXHRSend.apply(this, arguments);
  };

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
    logAction: addActionToHistory
  };

  console.log('[better-falix] file-history: Action logging system initialized');
  console.log('[better-falix] file-history: Use window.fileHistoryDebug to access debug functions');

},)