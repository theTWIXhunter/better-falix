// [better-falix] admin-panel-index-redirect: Script loading
console.log('[better-falix] hide-closed-tickets: Script loading');

chrome.storage.sync.get({ hideClosedTickets: false, enabled: true }, (data) => {
  if (!data.enabled || !data.hideClosedTickets) {
    console.log('[better-falix] hide-closed-tickets: Script disabled');
    return;
  }
  console.log('[better-falix] hide-closed-tickets: Script enabled');

  //  --------- START FEATURE ----------

  function initHideClosedTickets() {
    // Create and inject the toggle
    injectToggle();
    
    // Add minimal inline styles just for the hiding
    const styles = `tr.closed-ticket-hidden { display: none !important; }`;
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  function injectToggle() {
    // Wait for the page to load completely
    const checkExist = setInterval(() => {
      const targetRow = document.querySelector('.row.g-3.mb-3.align-items-center');
      if (targetRow) {
        clearInterval(checkExist);
        
        // Create a more compact toggle with inline elements
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'ticket-toggle-container';
        toggleContainer.style.display = 'inline-flex';
        toggleContainer.style.alignItems = 'center';
        toggleContainer.style.marginRight = '15px';
        
        // Create label and checkbox in a more compact way
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.id = 'hideClosedTicketsToggle';
        checkbox.style.marginRight = '5px';
        
        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = 'hideClosedTicketsToggle';
        label.textContent = 'Hide Closed Tickets';
        label.style.margin = '0';
        label.style.whiteSpace = 'nowrap';
        
        // Retrieve saved state
        chrome.storage.sync.get(['hideClosedTicketsState'], function(result) {
          checkbox.checked = result.hideClosedTicketsState || false;
          applyHideClosedTickets(checkbox.checked);
        });
        
        // Add event listener to the checkbox
        checkbox.addEventListener('change', function() {
          applyHideClosedTickets(this.checked);
          // Save the state
          chrome.storage.sync.set({hideClosedTicketsState: this.checked});
        });
        
        // Add elements to container - checkbox first, then label for better alignment
        toggleContainer.appendChild(checkbox);
        toggleContainer.appendChild(label);
        
        // Insert the toggle container before the last item in the row, with no extra spacing
        const children = Array.from(targetRow.children);
        if (children.length > 0) {
          // Find the last child or a suitable insertion point
          const lastChild = children[children.length - 1];
          targetRow.insertBefore(toggleContainer, lastChild);
        } else {
          targetRow.appendChild(toggleContainer);
        }
        
        // Initial application of hiding closed tickets
        applyHideClosedTickets(checkbox.checked);
        
        // Set up a mutation observer to catch dynamically loaded tickets
        setupMutationObserver();
      }
    }, 100);
  }

  function applyHideClosedTickets(hide) {
    const tickets = document.querySelectorAll('tr');
    tickets.forEach(ticket => {
      const statusBadge = ticket.querySelector('.badge-status-closed');
      if (statusBadge) {
        if (hide) {
          ticket.classList.add('closed-ticket-hidden');
        } else {
          ticket.classList.remove('closed-ticket-hidden');
        }
      }
    });
  }

  function setupMutationObserver() {
    // Select the node that will be observed for mutations (table body)
    const targetNode = document.querySelector('tbody');
    
    if (!targetNode) return;
    
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };
    
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const checkbox = document.getElementById('hideClosedTicketsToggle');
          if (checkbox && checkbox.checked) {
            applyHideClosedTickets(true);
          }
        }
      }
    });
    
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }
})();