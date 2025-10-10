// [better-falix] Switch Ticket Buttons: Script loading
console.log('[better-falix] Switch Ticket Buttons: Script loading');

chrome.storage.sync.get({ switchTicketButtons: false, enabled: true }, (data) => {
  if (!data.enabled || !data.switchTicketButtons) {
    console.log('[better-falix] Switch Ticket Buttons: Script disabled');
    return;
  }
  console.log('[better-falix] Switch Ticket Buttons: Script enabled');

  // --------- START FEATURE ----------

  function switchTicketButtonsOrder() {
    // Look for the swal2-actions container
    const actionsContainer = document.querySelector('.swal2-actions');
    if (!actionsContainer) {
      return;
    }

    console.log('[better-falix] Switch Ticket Buttons: Found swal2-actions container');

    // Find the original buttons
    const originalConfirmButton = actionsContainer.querySelector('.swal2-confirm');
    const originalCancelButton = actionsContainer.querySelector('.swal2-cancel');

    if (!originalConfirmButton || !originalCancelButton) {
      console.log('[better-falix] Switch Ticket Buttons: Buttons not found');
      return;
    }

    console.log('[better-falix] Switch Ticket Buttons: Found both buttons');

    // Replace the entire swal2-actions HTML structure
    actionsContainer.innerHTML = `
      <div class="swal2-loader"></div>
      <button type="button" class="swal2-confirm swal2-styled swal2-default-outline" aria-label="" style="display: inline-block; background-color: rgb(108, 117, 125);">Keep it open</button>
      <button type="button" class="swal2-deny swal2-styled" aria-label="" style="display: none;">No</button>
      <button type="button" class="swal2-cancel swal2-styled swal2-default-outline" aria-label="" style="display: inline-block; background-color: rgb(220, 38, 38);">Yes, close it</button>
    `;

    // Get the new buttons after HTML replacement
    const newConfirmButton = actionsContainer.querySelector('.swal2-confirm');
    const newCancelButton = actionsContainer.querySelector('.swal2-cancel');

    if (newConfirmButton && newCancelButton) {
      // The actions should match the button text (not swapped)
      newConfirmButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('[better-falix] Switch Ticket Buttons: "Keep it open" clicked - triggering CANCEL action');
        
        // "Keep it open" should trigger the CANCEL action (close the modal without confirming)
        if (window.Swal && window.Swal.getPopup()) {
          window.Swal.close();
        } else {
          // Fallback: simulate click on original cancel button
          originalCancelButton.click();
        }
      });

      newCancelButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('[better-falix] Switch Ticket Buttons: "Yes, close it" clicked - triggering CONFIRM action');
        
        // "Yes, close it" should trigger the CONFIRM action (actually close the ticket)
        if (window.Swal && window.Swal.getPopup()) {
          window.Swal.clickConfirm();
        } else {
          // Fallback: simulate click on original confirm button
          originalConfirmButton.click();
        }
      });

      console.log('[better-falix] Switch Ticket Buttons: Successfully replaced HTML and set up new event handlers');
      console.log('[better-falix] Switch Ticket Buttons: New confirm text:', newConfirmButton.textContent.trim());
      console.log('[better-falix] Switch Ticket Buttons: New cancel text:', newCancelButton.textContent.trim());
    }
  }

  // Use MutationObserver to watch for the modal appearing
  function observeForModal() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if a swal2 modal was added
              if (node.classList && node.classList.contains('swal2-container')) {
                console.log('[better-falix] Switch Ticket Buttons: SweetAlert modal detected');
                // Wait a bit for the modal to fully render
                setTimeout(switchTicketButtonsOrder, 100);
              }
              // Also check for swal2-actions being added directly
              if (node.querySelector && node.querySelector('.swal2-actions')) {
                console.log('[better-falix] Switch Ticket Buttons: SweetAlert actions detected');
                setTimeout(switchTicketButtonsOrder, 100);
              }
            }
          });
        }
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log('[better-falix] Switch Ticket Buttons: MutationObserver started');
  }

  // Start observing when the page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeForModal);
  } else {
    observeForModal();
  }

  console.log('[better-falix] Switch Ticket Buttons: Script loaded successfully');
});