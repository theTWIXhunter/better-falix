// [better-falix] remove-staff-note-hover: Script loading
console.log('[better-falix] remove-staff-note-hover: Script loading');

chrome.storage.sync.get({ removeStaffNoteHover: false, enabled: true }, (data) => {
  if (!data.enabled || !data.removeStaffNoteHover) {
    console.log('[better-falix] remove-staff-note-hover: Script disabled');
    return;
  }
  console.log('[better-falix] remove-staff-note-hover: Script enabled');

  //  --------- START FEATURE ----------
  
  // Apply the feature
  applyStaffNoteHoverFix();
  
  function applyStaffNoteHoverFix() {
    // Create a style element
    const styleEl = document.createElement('style');
    styleEl.id = 'better-falix-remove-staff-note-hover-style';
    styleEl.textContent = `
      /* Remove hover effects from staff notes */
      .message-content.support-message.internal-message,
      .message-content.support-message.internal-message:hover {
        opacity: 1 !important;
        transition: none !important;
        background-color: #233042 !important; /* Maintain a consistent background color */
        box-shadow: none !important;
        transform: none !important;
      }
      
      /* Ensure better visibility for staff notes */
      .message-content.support-message.internal-message {
        border-left: 3px solid #3b82f6 !important; /* Blue border for clear identification */
        padding-left: 12px !important;
      }
    `;
    
    // Append the style to the document head
    document.head.appendChild(styleEl);
    console.log('[better-falix] remove-staff-note-hover: Style added to remove hover effects from staff notes');
  }
  
  setTimeout(() => {
    console.log('[better-falix] remove-staff-note-hover: Script loaded successfully');
  }, 10);
});