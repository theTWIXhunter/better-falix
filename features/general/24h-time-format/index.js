// [better-falix] 24h-time-format: Script loading
console.log('[Better-Falix] 24h-time-format: Script loading');

chrome.storage.sync.get({ timeFormat24h: false, enabled: true }, (data) => {
  if (!data.enabled || !data.timeFormat24h) {
    console.log('[Better-Falix] 24h-time-format: Script disabled');
    return;
  }
  console.log('[Better-Falix] 24h-time-format: Script enabled');

  // --------- START FEATURE ----------

  function convertTo24Hour(time12h) {
    const match = time12h.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return time12h;
    
    let [, hours, minutes, period] = match;
    hours = parseInt(hours, 10);
    
    if (period.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }
  
  function processTextNode(node) {
    const text = node.textContent;
    const timePattern = /\b(\d{1,2}):(\d{2})\s*(AM|PM)\b/gi;
    
    if (timePattern.test(text)) {
      const newText = text.replace(timePattern, (match) => convertTo24Hour(match));
      if (newText !== text) {
        node.textContent = newText;
      }
    }
  }
  
  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      processTextNode(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Skip script and style elements
      if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') {
        return;
      }
      
      // Process child nodes
      for (let child of node.childNodes) {
        processNode(child);
      }
    }
  }
  
  // Initial conversion of existing content
  processNode(document.body);
  
  // Watch for dynamically added content
  const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        processNode(node);
      }
      
      // Also check for text changes
      if (mutation.type === 'characterData') {
        processTextNode(mutation.target);
      }
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });

  console.log('[Better-Falix] 24h-time-format: Script loaded successfully');

  // --------- END FEATURE ----------
});
