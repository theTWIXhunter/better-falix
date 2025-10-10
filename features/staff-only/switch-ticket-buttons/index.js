// [better-falix] Switch Ticket Buttons: Script loading
console.log('[better-falix] Switch Ticket Buttons: Script loading');

chrome.storage.sync.get({ switchTicketButtons: false, enabled: true }, (data) => {
  if (!data.enabled || !data.switchTicketButtons) {
    console.log('[better-falix] Switch Ticket Buttons: Script disabled');
    return;
  }
  console.log('[better-falix] Switch Ticket Buttons: Script enabled');

  // --------- START FEATURE ----------

  // Intercept SweetAlert2 fire method to swap button configurations
  function interceptSwal() {
    if (typeof Swal !== 'undefined') {
      const originalFire = Swal.fire;
      
      Swal.fire = function(config) {
        // Check if this is a confirmation dialog with both confirm and cancel buttons
        if (config && config.showCancelButton && config.confirmButtonText && config.cancelButtonText) {
          console.log('[better-falix] Switch Ticket Buttons: Intercepting SweetAlert with confirm/cancel buttons');
          console.log('[better-falix] Switch Ticket Buttons: Original confirm text:', config.confirmButtonText);
          console.log('[better-falix] Switch Ticket Buttons: Original cancel text:', config.cancelButtonText);
          
          // Swap the button texts and their associated actions
          const originalConfirmText = config.confirmButtonText;
          const originalCancelText = config.cancelButtonText;
          const originalConfirmColor = config.confirmButtonColor;
          const originalCancelColor = config.cancelButtonColor;
          
          // Swap texts
          config.confirmButtonText = originalCancelText;
          config.cancelButtonText = originalConfirmText;
          
          // Swap colors if they exist
          if (originalConfirmColor || originalCancelColor) {
            config.confirmButtonColor = originalCancelColor;
            config.cancelButtonColor = originalConfirmColor;
          }
          
          console.log('[better-falix] Switch Ticket Buttons: Swapped confirm text:', config.confirmButtonText);
          console.log('[better-falix] Switch Ticket Buttons: Swapped cancel text:', config.cancelButtonText);
        }
        
        return originalFire.call(this, config);
      };
      
      console.log('[better-falix] Switch Ticket Buttons: Successfully intercepted Swal.fire');
    } else {
      console.log('[better-falix] Switch Ticket Buttons: Swal not found, retrying...');
      // Retry after a short delay
      setTimeout(interceptSwal, 100);
    }
  }

  function switchTicketButtonsText() {
    // This function is now mainly for fallback/debugging
    const closeTicketButton = document.querySelector('.swal2-confirm.swal2-styled');
    const leaveOpenButton = document.querySelector('.swal2-cancel.swal2-styled');
    
    if (closeTicketButton && leaveOpenButton) {
      console.log('[better-falix] Switch Ticket Buttons: Found existing modal buttons');
      console.log('[better-falix] Switch Ticket Buttons: Confirm button text:', closeTicketButton.textContent.trim());
      console.log('[better-falix] Switch Ticket Buttons: Cancel button text:', leaveOpenButton.textContent.trim());
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
    document.addEventListener('DOMContentLoaded', () => {
      interceptSwal();
      waitForElements();
    });
  } else {
    interceptSwal();
    waitForElements();
  }

  console.log('[better-falix] Switch Ticket Buttons: Script loaded successfully');
});