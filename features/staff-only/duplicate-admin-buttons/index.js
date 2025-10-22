// [better-falix] duplicate-admin-buttons: Script loading
console.log('[better-falix] duplicate-admin-buttons: Script loading');

chrome.storage.sync.get({ duplicateAdminButtons: false, enabled: true }, (data) => {
  if (!data.enabled || !data.duplicateAdminButtons) {
    console.log('[better-falix] duplicate-admin-buttons: Script disabled');
    return;
  }
  console.log('[better-falix] duplicate-admin-buttons: Script enabled');

  //  --------- START FEATURE ----------

  function duplicateAdminButtons() {
    // Find the card-body element
    const cardBody = document.querySelector('.card-body');
    if (!cardBody) {
      console.log('[Better-Falix] duplicate-admin-buttons: Card body not found');
      return;
    }

    // Find the original buttons row
    const originalRow = document.querySelector('.row.mt-3');
    if (!originalRow) {
      console.log('[Better-Falix] duplicate-admin-buttons: Original buttons row not found');
      return;
    }

    // Check if we already duplicated the buttons
    if (document.querySelector('#duplicated-admin-buttons')) {
      console.log('[Better-Falix] duplicate-admin-buttons: Buttons already duplicated');
      return;
    }

    // Clone the entire row
    const duplicatedRow = originalRow.cloneNode(true);
    
    // Add an ID to prevent multiple duplications
    duplicatedRow.id = 'duplicated-admin-buttons';
    
    // Remove the mt-3 class and add mb-3 for top spacing
    duplicatedRow.classList.remove('mt-3');
    duplicatedRow.classList.add('mb-3');

    // Update button IDs to avoid conflicts
    const buttons = duplicatedRow.querySelectorAll('button[id]');
    buttons.forEach(button => {
      if (button.id) {
        button.id = 'top-' + button.id;
      }
    });

    // Update modal targets to avoid conflicts
    const modalButtons = duplicatedRow.querySelectorAll('[data-bs-target]');
    modalButtons.forEach(button => {
      const target = button.getAttribute('data-bs-target');
      if (target) {
        const newTarget = target.replace('#', '#top-');
        button.setAttribute('data-bs-target', newTarget);
      }
    });

    // Clone and update modals as well
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      const clonedModal = modal.cloneNode(true);
      const modalId = modal.id;
      if (modalId) {
        clonedModal.id = 'top-' + modalId;
        // Update aria-labelledby if it exists
        const labelledBy = clonedModal.getAttribute('aria-labelledby');
        if (labelledBy) {
          clonedModal.setAttribute('aria-labelledby', 'top-' + labelledBy);
        }
        // Update modal title id
        const modalTitle = clonedModal.querySelector('.modal-title');
        if (modalTitle && modalTitle.id) {
          modalTitle.id = 'top-' + modalTitle.id;
        }
        // Append the cloned modal to body
        document.body.appendChild(clonedModal);
      }
    });

    // Insert the duplicated row as the first child of card-body
    cardBody.insertBefore(duplicatedRow, cardBody.firstChild);

    console.log('[Better-Falix] duplicate-admin-buttons: Successfully duplicated admin buttons at top');
  }

  // Wait for the page to load and then duplicate the buttons
  function waitForElements() {
    const checkInterval = setInterval(() => {
      const cardBody = document.querySelector('.card-body');
      const originalRow = document.querySelector('.row.mt-3');
      
      if (cardBody && originalRow) {
        clearInterval(checkInterval);
        duplicateAdminButtons();
      }
    }, 100);

    // Stop checking after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);
  }

  // Start the process
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForElements);
  } else {
    waitForElements();
  }

  console.log('[Better-Falix] duplicate-admin-buttons: Script loaded successfully');
});