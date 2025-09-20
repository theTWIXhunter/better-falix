// [better-falix] hide-reply-header: Script loading
console.log('[better-falix] hide-reply-header: Script loading');

chrome.storage.sync.get({ hideReplyHeader: false, enabled: true }, (data) => {
  if (!data.enabled || !data.hideReplyHeader) {
    console.log('[better-falix] hide-reply-header: Script disabled');
    return;
  }
  console.log('[better-falix] hide-reply-header: Script enabled');

  //  --------- START FEATURE ----------

  // Create a style element to hide reply headers
  function addHideReplyHeaderStyle() {
    const styleEl = document.createElement('style');
    styleEl.id = 'better-falix-hide-reply-header-style';
    styleEl.textContent = `
      .reply-header {
        display: none !important;
      }
    `;
    document.head.appendChild(styleEl);
    console.log('[better-falix] hide-reply-header: Added style to hide reply headers');
  }

  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addHideReplyHeaderStyle);
  } else {
    addHideReplyHeaderStyle();
  }

  setTimeout(() => {
    console.log('[better-falix] hide-reply-header: Script loaded successfully');
  }, 10);
});