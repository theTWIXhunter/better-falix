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
    
    // Switch the text content of the buttons
    if (closeTicketButton && leaveOpenButton) {
      const closeText = closeTicketButton.textContent.trim();
      const leaveText = leaveOpenButton.textContent.trim();
      
      console.log('[better-falix] Switch Ticket Buttons: Switching button texts');
      console.log('[better-falix] Switch Ticket Buttons: Close button had:', closeText);
      console.log('[better-falix] Switch Ticket Buttons: Leave button had:', leaveText);
      
      closeTicketButton.textContent = leaveText;
      leaveOpenButton.textContent = closeText;
      
      console.log('[better-falix] Switch Ticket Buttons: Successfully switched button texts');
    } else {
      console.log('[better-falix] Switch Ticket Buttons: Could not find both buttons');
      console.log('[better-falix] Switch Ticket Buttons: Close button found:', !!closeTicketButton);
      console.log('[better-falix] Switch Ticket Buttons: Leave open button found:', !!leaveOpenButton);
    }
  }

  // Wait for the page to load and then switch the button texts
  function waitForElements() {
    const checkInterval = setInterval(() => {
      const closeButton = document.querySelector('.swal2-confirm.swal2-styled');
      const cancelButton = document.querySelector('.swal2-cancel.swal2-styled');
      
      if (closeButton && cancelButton) {
        clearInterval(checkInterval);
        switchTicketButtonsText();
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

  console.log('[better-falix] Switch Ticket Buttons: Script loaded successfully');
});