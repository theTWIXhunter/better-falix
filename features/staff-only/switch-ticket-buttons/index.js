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

    // Find the confirm and cancel buttons
    const confirmButton = actionsContainer.querySelector('.swal2-confirm');
    const cancelButton = actionsContainer.querySelector('.swal2-cancel');

    if (!confirmButton || !cancelButton) {
      console.log('[better-falix] Switch Ticket Buttons: Buttons not found');
      return;
    }

    console.log('[better-falix] Switch Ticket Buttons: Found both buttons');
    console.log('[better-falix] Switch Ticket Buttons: Confirm button text:', confirmButton.textContent.trim());
    console.log('[better-falix] Switch Ticket Buttons: Cancel button text:', cancelButton.textContent.trim());

    // Store the original text and onclick handlers
    const confirmText = confirmButton.textContent.trim();
    const cancelText = cancelButton.textContent.trim();
    const confirmHandler = confirmButton.onclick;
    const cancelHandler = cancelButton.onclick;

    // Switch the text content
    confirmButton.textContent = cancelText;
    cancelButton.textContent = confirmText;

    // Switch the onclick handlers
    confirmButton.onclick = cancelHandler;
    cancelButton.onclick = confirmHandler;

    // Also handle click event listeners if they exist
    const confirmClone = confirmButton.cloneNode(true);
    const cancelClone = cancelButton.cloneNode(true);

    // Set the switched text again after cloning
    confirmClone.textContent = cancelText;
    cancelClone.textContent = confirmText;

    // Replace the buttons with the clones to remove old event listeners
    confirmButton.parentNode.replaceChild(confirmClone, confirmButton);
    cancelButton.parentNode.replaceChild(cancelClone, cancelButton);

    // Add back the switched handlers
    confirmClone.onclick = cancelHandler;
    cancelClone.onclick = confirmHandler;

    console.log('[better-falix] Switch Ticket Buttons: Successfully switched button text and actions');
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