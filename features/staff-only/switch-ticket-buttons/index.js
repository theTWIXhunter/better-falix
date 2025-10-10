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

    // Find the original buttons to get their onclick handlers and all event listeners
    const originalConfirmButton = actionsContainer.querySelector('.swal2-confirm');
    const originalCancelButton = actionsContainer.querySelector('.swal2-cancel');

    if (!originalConfirmButton || !originalCancelButton) {
      console.log('[better-falix] Switch Ticket Buttons: Buttons not found');
      return;
    }

    console.log('[better-falix] Switch Ticket Buttons: Found both buttons');
    console.log('[better-falix] Switch Ticket Buttons: Original confirm text:', originalConfirmButton.textContent.trim());
    console.log('[better-falix] Switch Ticket Buttons: Original cancel text:', originalCancelButton.textContent.trim());

    // Store all the original attributes and handlers
    const originalConfirmHandler = originalConfirmButton.onclick;
    const originalCancelHandler = originalCancelButton.onclick;
    
    // Clone the original buttons to preserve all event listeners
    const originalConfirmClone = originalConfirmButton.cloneNode(true);
    const originalCancelClone = originalCancelButton.cloneNode(true);

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
      // Copy all attributes from original cancel to new confirm (except style and text)
      Array.from(originalCancelClone.attributes).forEach(attr => {
        if (attr.name !== 'style' && attr.name !== 'class') {
          newConfirmButton.setAttribute(attr.name, attr.value);
        }
      });

      // Copy all attributes from original confirm to new cancel (except style and text)  
      Array.from(originalConfirmClone.attributes).forEach(attr => {
        if (attr.name !== 'style' && attr.name !== 'class') {
          newCancelButton.setAttribute(attr.name, attr.value);
        }
      });

      // Set the onclick handlers (swapped)
      newConfirmButton.onclick = originalCancelHandler;
      newCancelButton.onclick = originalConfirmHandler;

      // Try to trigger any click events manually to test
      newConfirmButton.addEventListener('click', function(e) {
        console.log('[better-falix] Switch Ticket Buttons: New confirm button clicked');
        if (originalCancelHandler) {
          originalCancelHandler.call(this, e);
        }
      });

      newCancelButton.addEventListener('click', function(e) {
        console.log('[better-falix] Switch Ticket Buttons: New cancel button clicked');
        if (originalConfirmHandler) {
          originalConfirmHandler.call(this, e);
        }
      });

      console.log('[better-falix] Switch Ticket Buttons: Successfully replaced HTML and switched button actions');
      console.log('[better-falix] Switch Ticket Buttons: New confirm text:', newConfirmButton.textContent.trim());
      console.log('[better-falix] Switch Ticket Buttons: New cancel text:', newCancelButton.textContent.trim());
      console.log('[better-falix] Switch Ticket Buttons: Original confirm handler:', !!originalConfirmHandler);
      console.log('[better-falix] Switch Ticket Buttons: Original cancel handler:', !!originalCancelHandler);
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