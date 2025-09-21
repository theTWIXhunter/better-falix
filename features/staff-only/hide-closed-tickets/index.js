// Hide Closed Tickets Feature
(function() {
  // Check if the feature is enabled
  chrome.storage.sync.get(['hideClosedTickets'], function(result) {
    if (result.hideClosedTickets) {
      initHideClosedTickets();
    }
  });

  function initHideClosedTickets() {
    // Create and inject the toggle
    injectToggle();
    
    // Add styles for the toggle
    const styles = `
      .ticket-toggle-container {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
      .ticket-toggle-container label {
        margin-bottom: 0;
        margin-right: 8px;
        font-weight: 500;
        white-space: nowrap;
      }
      .form-check-input:checked {
        background-color: #0d6efd;
        border-color: #0d6efd;
      }
      tr.closed-ticket-hidden {
        display: none !important;
      }
    `;
    
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
        
        // Create the toggle container
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'ticket-toggle-container';
        
        // Create label for the checkbox
        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = 'hideClosedTicketsToggle';
        label.textContent = 'Hide Closed Tickets';
        
        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.id = 'hideClosedTicketsToggle';
        
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
        
        // Add elements to container
        toggleContainer.appendChild(label);
        toggleContainer.appendChild(checkbox);
        
        // Insert the toggle container before the last item in the row
        const children = Array.from(targetRow.children);
        if (children.length > 0) {
          targetRow.insertBefore(toggleContainer, children[children.length - 1]);
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