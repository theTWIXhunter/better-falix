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

    // Find the ticket title element by ID
    const titleElement = document.getElementById('ticketSubject');
    
    if (!titleElement) {
      console.log('[better-falix] show-ticket-id: Title element not found');
      return;
    }

    // Check if we've already added the ticket ID
    if (titleElement.hasAttribute('data-ticket-id')) {
      return;
    }

    // Add ticket ID using CSS ::before pseudo-element to avoid modifying textContent
    titleElement.setAttribute('data-ticket-id', ticketId);
    
    // Inject CSS to display the ticket ID
    if (!document.getElementById('better-falix-ticket-id-style')) {
      const style = document.createElement('style');
      style.id = 'better-falix-ticket-id-style';
      style.textContent = `
        #ticketSubject[data-ticket-id]::before {
          content: '#' attr(data-ticket-id) ' - ';
        }
      `;
      document.head.appendChild(style);
    }
    
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
