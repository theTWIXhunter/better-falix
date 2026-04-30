// [better-falix] better-log-detection: Script loading
console.log('[better-falix] better-log-detection: Script loading');

chrome.storage.sync.get({ betterLogDetection: false, enabled: true }, (data) => {
  if (!data.enabled || !data.betterLogDetection) {
    console.log('[better-falix] better-log-detection: Script disabled');
    return;
  }
  console.log('[better-falix] better-log-detection: Script enabled');

  // --------- START FEATURE ----------
  function enhanceLogDetection() {
    const logLines = document.querySelectorAll('.log-line:not(.better-log-processed)');
    
    logLines.forEach(line => {
      line.classList.add('better-log-processed');
      
      const contentEl = line.querySelector('.line-content');
      if (!contentEl) return;
      
      const text = contentEl.textContent || '';
      
      // Common stack trace lines usually start with some whitespace followed by "at "
      if (text.trim().startsWith('at ')) {
        line.classList.add('error');
      }
    });
  }

  // Apply immediately
  enhanceLogDetection();

  // Watch for dynamic content
  const observer = new MutationObserver(() => {
    enhanceLogDetection();
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  // --------- END FEATURE ----------
  console.log('[better-falix] better-log-detection: Script loaded successfully');
});
