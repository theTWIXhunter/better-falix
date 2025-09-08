// [better-falix] remove-logs-container: Script loading
console.log('[better-falix] remove-logs-container: Script loading');

chrome.storage.sync.get({ enabled: true, removeLogsContainer: false }, (data) => {
  if (!data.enabled || !data.removeLogsContainer) {
    console.log('[better-falix] remove-logs-container: Script disabled');
    return;
  }
  console.log('[better-falix] remove-logs-container: Script enabled');

  //  --------- START FEATURE ----------

  function removeLogsContainer() {
    const logsContainer = document.querySelector('.logs-container');
    if (logsContainer) {
      const logsContent = logsContainer.querySelector('.logs-content');
      if (logsContent) {
        logsContainer.parentNode.insertBefore(logsContent, logsContainer);
        logsContainer.remove();
        console.log('[better-falix] remove-logs-container: Logs container removed');
      }
    }
  }

  // Run immediately
  removeLogsContainer();

  // Also observe for dynamic content
  const observer = new MutationObserver(() => {
    removeLogsContainer();
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] remove-logs-container: Script loaded successfully');
  }, 10);
});