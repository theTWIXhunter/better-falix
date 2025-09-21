// [better-falix] shorten-reply-status: Script loading
console.log('[better-falix] shorten-reply-status: Script loading');

chrome.storage.sync.get({ shortenReplyStatus: false, enabled: true }, (data) => {
  if (!data.enabled || !data.shortenReplyStatus) {
    console.log('[better-falix] shorten-reply-status: Script disabled');
    return;
  }
  console.log('[better-falix] shorten-reply-status: Script enabled');

  //  --------- START FEATURE ----------
  
  // Apply the function immediately
  shortenReplyStatuses();
  
  // Set up a MutationObserver to apply the function to dynamically added elements
  const observer = new MutationObserver(function(mutations) {
    shortenReplyStatuses();
  });
  
  // Start observing the document for added/removed nodes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  function shortenReplyStatuses() {
    // Find all elements containing the text "Awaiting User Reply"
    const elements = [...document.querySelectorAll('*')].filter(el => 
      el.childNodes && 
      [...el.childNodes].some(node => 
        node.nodeType === Node.TEXT_NODE && 
        node.textContent.trim() === 'Awaiting User Reply'
      )
    );
    
    // Replace the text content
    elements.forEach(el => {
      el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === 'Awaiting User Reply') {
          node.textContent = node.textContent.replace('Awaiting User Reply', 'waiting');
        }
      });
    });
    
    // Also look for elements with specific classes that might contain this text
    const statusElements = document.querySelectorAll('.ticket-status, .status-badge, .status-text');
    statusElements.forEach(el => {
      if (el.textContent.trim() === 'Awaiting User Reply') {
        el.textContent = 'waiting';
      }
    });
  }
  
  setTimeout(() => {
    console.log('[better-falix] shorten-reply-status: Script loaded successfully');
  }, 10);
});