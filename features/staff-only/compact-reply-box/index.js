// [better-falix] compact-reply-box: Script loading
console.log('[better-falix] compact-reply-box: Script loading');

chrome.storage.sync.get({ compactReplyBox: false, enabled: true }, (data) => {
  if (!data.enabled || !data.compactReplyBox) {
    console.log('[better-falix] compact-reply-box: Script disabled');
    return;
  }
  console.log('[better-falix] compact-reply-box: Script enabled');

  //  --------- START FEATURE ----------

  // Create a style element to hide reply headers and containers
  function addCompactReplyBoxStyle() {
    const styleEl = document.createElement('style');
    styleEl.id = 'better-falix-compact-reply-box-style';
    styleEl.textContent = `
      .reply-header {
        display: none !important;
      }
      
      /* Hide the container but preserve its children */
      .reply-container {
        all: unset !important;
        display: contents !important;
      }
    `;
    document.head.appendChild(styleEl);
    console.log('[better-falix] compact-reply-box: Added style to hide reply headers and containers');
  }

  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCompactReplyBoxStyle);
  } else {
    addCompactReplyBoxStyle();
  }

  setTimeout(() => {
    console.log('[better-falix] compact-reply-box: Script loaded successfully');
  }, 10);
});