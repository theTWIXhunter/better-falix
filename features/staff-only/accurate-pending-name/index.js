// [better-falix] accurate-pending-name: Script loading
console.log('[better-falix] accurate-pending-name: Script loading');

chrome.storage.sync.get({ enabled: true, accuratePendingName: false }, (data) => {
  if (!data.enabled || !data.accuratePendingName) {
    console.log('[better-falix] accurate-pending-name: Script disabled');
    return;
  }
  console.log('[better-falix] accurate-pending-name: Script enabled');

  //  --------- START FEATURE ----------

  function replacePendingWithLilying() {
    // Get all text nodes in the document
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const nodesToReplace = [];
    let node;

    while (node = walker.nextNode()) {
      // Skip script and style elements
      if (node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE') {
        continue;
      }

      // Skip exceptions
      const parent = node.parentElement;
      
      // Skip <p> elements inside div with class="message-text"
      if (parent.tagName === 'P' && parent.parentElement && parent.parentElement.classList.contains('message-text')) {
        continue;
      }
      
      // Skip elements with class="mb-0" (title)
      if (parent.classList.contains('mb-0')) {
        continue;
      }
      
      // Skip elements with class="message-sender" (username)
      if (parent.classList.contains('message-sender')) {
        continue;
      }
      
      // Skip <a> elements inside class="ticket-subject"
      if (parent.tagName === 'A' && parent.closest('.ticket-subject')) {
        continue;
      }

      // Check if the text contains "Pending" (case-insensitive)
      if (/pending/i.test(node.textContent)) {
        nodesToReplace.push(node);
      }
    }

    // Replace the text in all found nodes
    nodesToReplace.forEach(node => {
      node.textContent = node.textContent.replace(/pending/gi, (match) => {
        // Preserve the case of the original text
        if (match === 'PENDING') return 'LILYING';
        if (match === 'Pending') return 'Lilying';
        return 'lilying';
      });
    });

    console.log('[better-falix] accurate-pending-name: Replaced', nodesToReplace.length, 'instances of "pending" with "lilying"');
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replacePendingWithLilying);
  } else {
    replacePendingWithLilying();
  }

  // Watch for dynamic content changes
  const observer = new MutationObserver(() => {
    replacePendingWithLilying();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setTimeout(() => {
    console.log('[better-falix] accurate-pending-name: Script loaded successfully');
  }, 10);
});
