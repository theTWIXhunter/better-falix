/**
 * Remove Staff Note Hover - Removes hover effects from staff note messages
 * 
 * This staff-only feature removes hover effects from elements with the class
 * "message-content support-message internal-message" to improve readability.
 * 
 * @author the_twix_hunter
 */

(function() {
  // Check if the feature is enabled
  chrome.storage.sync.get(['extensionEnabled', 'removeStaffNoteHover'], function(data) {
    if (data.extensionEnabled && data.removeStaffNoteHover) {
      // Apply the feature
      applyStaffNoteHoverFix();
    }
  });
  
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
})();