// [better-falix] hide-a-reply-header: Script loading
console.log('[better-falix] hide-a-reply-header: Script loading');

chrome.storage.sync.get({ hideWriteAReplyHeader: false, enabled: true }, (data) => {
  if (!data.enabled || !data.hideWriteAReplyHeader) {
    console.log('[better-falix] hide-a-reply-header: Script disabled');
    return;
  }
  console.log('[better-falix] hide-a-reply-header: Script enabled');

  //  --------- START FEATURE ----------

  // Create a style element to hide reply headers and containers
  function addhideWriteAReplyHeaderStyle() {
    const styleEl = document.createElement('style');
    styleEl.id = 'better-falix-hide-a-reply-header-style';
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
    console.log('[better-falix] hide-a-reply-header: Added style to hide reply headers and containers');
  }

  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addhideWriteAReplyHeaderStyle);
  } else {
    addhideWriteAReplyHeaderStyle();
  }

  setTimeout(() => {
    console.log('[better-falix] hide-a-reply-header: Script loaded successfully');
  }, 10);
});
