// [better-falix] colored-log-messages: Script loading
console.log('[better-falix] colored-log-messages: Script loading');

chrome.storage.sync.get({ coloredLogMessages: false, betterLogDetection: false, enabled: true }, (data) => {
  if (!data.enabled || !data.coloredLogMessages) {
    console.log('[better-falix] colored-log-messages: Script disabled');
    return;
  }
  console.log('[better-falix] colored-log-messages: Script enabled');

  //  --------- START FEATURE ----------

  function applyLogColoring() {
    // Color warning log lines gold
    const warningLines = document.querySelectorAll('.log-line.warning .line-content');
    warningLines.forEach(lineContent => {
      if (!lineContent.style.color) { // Only apply if no color is already set
        lineContent.style.color = 'gold';
      }
    });

    // Color error log lines red and potentially better log detection ones
    const errorLines = document.querySelectorAll('.log-line.error .line-content');
    errorLines.forEach(lineContent => {
      if (!lineContent.style.color) { // Only apply if no color is already set
        lineContent.style.color = 'red';
      }
    });

    // Support for better-log-detection checking "at " lines if they haven't gotten the generic error class yet
    if (data.betterLogDetection) {
      const allLines = document.querySelectorAll('.log-line .line-content');
      allLines.forEach(lineContent => {
        if (!lineContent.style.color && lineContent.textContent && lineContent.textContent.trim().startsWith('at ')) {
          lineContent.style.color = 'red';
        }
      });
    }

    if (warningLines.length > 0 || errorLines.length > 0) {
      console.log('[better-falix] colored-log-messages: Applied coloring to', warningLines.length, 'warning and', errorLines.length, 'error log lines');
    }
  }

  // Apply coloring immediately
  applyLogColoring();

  // Also observe for dynamic content (new log lines being added)
  const observer = new MutationObserver(() => {
    applyLogColoring();
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] colored-log-messages: Script loaded successfully');
  }, 10);
});
