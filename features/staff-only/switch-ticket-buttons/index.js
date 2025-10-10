// [better-falix] Switch Ticket Buttons: Script loading
console.log('[better-falix] Switch Ticket Buttons: Script loading');

chrome.storage.sync.get({ switchTicketButtons: false, enabled: true }, (data) => {
  if (!data.enabled || !data.switchTicketButtons) {
    console.log('[better-falix] Switch Ticket Buttons: Script disabled');
    return;
  }
  console.log('[better-falix] Switch Ticket Buttons: Script enabled');

  // --------- START FEATURE ----------

  function switchTicketButtonsText() {
    // Find buttons by their specific CSS classes in the SweetAlert modal
    const closeTicketButton = document.querySelector('.swal2-confirm.swal2-styled');
    const leaveOpenButton = document.querySelector('.swal2-cancel.swal2-styled');
    
    if (closeTicketButton) {
      console.log('[better-falix] Switch Ticket Buttons: Found close ticket button:', closeTicketButton.textContent.trim());
    }
    
    if (leaveOpenButton) {
      console.log('[better-falix] Switch Ticket Buttons: Found leave open button:', leaveOpenButton.textContent.trim());
    }
    
    // Switch both the text content and the CSS classes/functionality
    if (closeTicketButton && leaveOpenButton) {
      const closeText = closeTicketButton.textContent.trim();
      const leaveText = leaveOpenButton.textContent.trim();
      
      console.log('[better-falix] Switch Ticket Buttons: Switching button texts and actions');
      console.log('[better-falix] Switch Ticket Buttons: Close button had:', closeText);
      console.log('[better-falix] Switch Ticket Buttons: Leave button had:', leaveText);
      
      // Swap text content
      closeTicketButton.textContent = leaveText;
      leaveOpenButton.textContent = closeText;
      
      // Swap the CSS classes to swap functionality
      // Remove current classes
      closeTicketButton.classList.remove('swal2-confirm');
      closeTicketButton.classList.add('swal2-cancel');
      
      leaveOpenButton.classList.remove('swal2-cancel');
      leaveOpenButton.classList.add('swal2-confirm');
      
      // Swap background colors to match the new roles
      const closeStyle = closeTicketButton.style.backgroundColor;
      const leaveStyle = leaveOpenButton.style.backgroundColor;
      closeTicketButton.style.backgroundColor = leaveStyle;
      leaveOpenButton.style.backgroundColor = closeStyle;
      
      console.log('[better-falix] Switch Ticket Buttons: Successfully switched button texts and actions');
    } else {
      console.log('[better-falix] Switch Ticket Buttons: Could not find both buttons');
      console.log('[better-falix] Switch Ticket Buttons: Close button found:', !!closeTicketButton);
      console.log('[better-falix] Switch Ticket Buttons: Leave open button found:', !!leaveOpenButton);
    }
  }

  // Wait for the page to load and then switch the button texts
  function waitForElements() {
    // Set up a mutation observer to watch for SweetAlert modals
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Check if this is a SweetAlert modal or contains one
              const isModal = node.classList && node.classList.contains('swal2-container');
              const containsModal = node.querySelector && node.querySelector('.swal2-container');
              
              if (isModal || containsModal) {
                console.log('[better-falix] Switch Ticket Buttons: SweetAlert modal detected');
                // Small delay to ensure the modal is fully rendered
                setTimeout(() => {
                  switchTicketButtonsText();
                }, 50);
              }
            }
          });
        }
      });
    });

    // Start observing the document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Also try to switch buttons that might already be present
    const checkExisting = () => {
      const closeButton = document.querySelector('.swal2-confirm.swal2-styled');
      const cancelButton = document.querySelector('.swal2-cancel.swal2-styled');
      
      if (closeButton && cancelButton) {
        switchTicketButtonsText();
      }
    };

    // Check for existing modals
    checkExisting();
  }

  // Start the process
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForElements);
  } else {
    waitForElements();
  }

  console.log('[better-falix] Switch Ticket Buttons: Script loaded successfully');
});