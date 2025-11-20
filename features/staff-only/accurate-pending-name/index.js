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
