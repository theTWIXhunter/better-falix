// [better-falix] show-ticket-id: Script loading
console.log('[better-falix] show-ticket-id: Script loading');

chrome.storage.sync.get({ showTicketId: false, enabled: true }, (data) => {
  if (!data.enabled || !data.showTicketId) {
    console.log('[better-falix] show-ticket-id: Script disabled');
    return;
  }
  console.log('[better-falix] show-ticket-id: Script enabled');

  //  --------- START FEATURE ----------

  function addTicketIdToTitle() {
    // Get ticket ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get('id');
    
    if (!ticketId) {
      console.log('[better-falix] show-ticket-id: No ticket ID found in URL');
      return;
    }

    // Find the ticket title h2 element
    const titleElement = document.querySelector('h2.mb-0');
    
    if (!titleElement) {
      console.log('[better-falix] show-ticket-id: Title element not found');
      return;
    }

    // Don't modify if this is inside the new ticket subject input
    if (titleElement.closest('#newTicketSubject')) {
      return;
    }

    // Check if we've already added the ticket ID
    if (titleElement.textContent.trim().startsWith('#')) {
      return;
    }

    // Get the current title text
    const currentTitle = titleElement.textContent.trim();
    
    // Update the title with ticket ID
    titleElement.textContent = `#${ticketId} - ${currentTitle}`;
    
    console.log('[better-falix] show-ticket-id: Added ticket ID to title');
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addTicketIdToTitle);
  } else {
    addTicketIdToTitle();
  }

  // Watch for dynamic content changes
  const observer = new MutationObserver(() => {
    addTicketIdToTitle();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setTimeout(() => {
    console.log('[better-falix] show-ticket-id: Script loaded successfully');
  }, 10);
});
