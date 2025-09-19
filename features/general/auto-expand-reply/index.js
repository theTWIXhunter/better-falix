// [better-falix] auto-expand-reply: Script loading
console.log('[better-falix] auto-expand-reply: Script loading');

chrome.storage.sync.get({ autoExpandReply: false, enabled: true }, (data) => {
  if (!data.enabled || !data.autoExpandReply) {
    console.log('[better-falix] auto-expand-reply: Script disabled');
    return;
  }
  console.log('[better-falix] auto-expand-reply: Script enabled');

  //  --------- START FEATURE ----------

  function expandReplyForm() {
    // Find the reply panel
    const replyPanel = document.querySelector('.reply-panel');
    
    if (replyPanel) {
      // Add the expanded class to ensure it's expanded
      replyPanel.classList.add('expanded');
      
      // Make sure the content is displayed
      const replyPanelContent = document.getElementById('replyPanelContent');
      if (replyPanelContent) {
        replyPanelContent.style.display = 'block';
      }
      
      // Update the toggle text to indicate it can be hidden
      const replyPanelText = document.getElementById('replyPanelText');
      if (replyPanelText) {
        replyPanelText.textContent = 'Hide Reply Form';
      }
      
      // Update the icon to show the up arrow
      const replyPanelIcon = document.getElementById('replyPanelIcon');
      if (replyPanelIcon && replyPanelIcon.classList.contains('fa-chevron-down')) {
        replyPanelIcon.classList.remove('fa-chevron-down');
        replyPanelIcon.classList.add('fa-chevron-up');
      }
      
      console.log('[better-falix] auto-expand-reply: Reply form expanded');
    } else {
      console.log('[better-falix] auto-expand-reply: Reply panel not found');
    }
  }

  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', expandReplyForm);
  } else {
    expandReplyForm();
  }

  // Also run on page mutations to catch dynamic form loading
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        // Check if any of the added nodes contain the reply panel
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.classList && node.classList.contains('reply-panel')) {
              expandReplyForm();
              break;
            } else if (node.querySelector && node.querySelector('.reply-panel')) {
              expandReplyForm();
              break;
            }
          }
        }
      }
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] auto-expand-reply: Script loaded successfully');
  }, 10);
});