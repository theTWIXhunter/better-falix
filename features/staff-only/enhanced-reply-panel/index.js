// [better-falix] enhanced-reply-panel: Script loading
console.log('[better-falix] enhanced-reply-panel: Script loading');

chrome.storage.sync.get({ enhancedReplyPanel: false, enabled: true }, (data) => {
  if (!data.enabled || !data.enhancedReplyPanel) {
    console.log('[better-falix] enhanced-reply-panel: Script disabled');
    return;
  }
  console.log('[better-falix] enhanced-reply-panel: Script enabled');

  //  --------- START FEATURE ----------

  function replaceReplyPanel() {
    // Analyze existing form submission logic for debugging
    const existingForms = document.querySelectorAll('form');
    existingForms.forEach(form => {
      console.log('[better-falix] enhanced-reply-panel: Found form with action:', form.action || 'No action');
    });
    
    // Find the original reply panel toggle
    const replyPanelToggle = document.querySelector('.reply-panel-toggle[data-action="toggle-reply-panel"]');
    
    if (replyPanelToggle) {
      // Create the enhanced reply panel
      const enhancedReplyPanel = document.createElement('div');
      enhancedReplyPanel.innerHTML = `<form id="replyForm" action="javascript:void(0);

								<!-- Markdown Toolbar -->
								<div class="markdown-toolbar" style="display: flex; gap: 0.25rem; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 8px 8px 0 0; border: 1px solid rgba(255,255,255,0.1); border-bottom: none; flex-wrap: wrap;">
																		<button type="button" class="format-btn template-btn" id="openTemplatesBtn" title="Quick Templates" style="background: linear-gradient(135deg, rgba(var(--falcon-info-rgb), 0.15), rgba(var(--falcon-primary-rgb), 0.1)); border: 1px solid rgba(var(--falcon-info-rgb), 0.3); color: rgb(var(--falcon-info-rgb));">
										<svg class="svg-inline--fa fa-magic me-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magic" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M14.1 463.3c-18.7-18.7-18.7-49.1 0-67.9L395.4 14.1c18.7-18.7 49.1-18.7 67.9 0l34.6 34.6c18.7 18.7 18.7 49.1 0 67.9L116.5 497.9c-18.7 18.7-49.1 18.7-67.9 0L14.1 463.3zM347.6 187.6l105-105L429.4 59.3l-105 105 23.3 23.3z"></path></svg><!-- <i class="fas fa-magic me-1"></i> -->Templates
									</button>
									
																		
									
									
									
									
									
									
									
									
									
									
									
									
									
									<div style="margin-right: auto; display: flex; gap: 0.5rem;">
										<button type="button" class="format-btn paste-btn" id="openPasteModal" title="Share logs or code" style="background: linear-gradient(135deg, rgba(var(--falcon-success-rgb), 0.15), rgba(var(--falcon-success-rgb), 0.1)); border: 1px solid rgba(var(--falcon-success-rgb), 0.3); color: rgb(var(--falcon-success-rgb));">
											<svg class="svg-inline--fa fa-paste me-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paste" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M160 0c-23.7 0-44.4 12.9-55.4 32L48 32C21.5 32 0 53.5 0 80L0 400c0 26.5 21.5 48 48 48l144 0 0-272c0-44.2 35.8-80 80-80l48 0 0-16c0-26.5-21.5-48-48-48l-56.6 0C204.4 12.9 183.7 0 160 0zM272 128c-26.5 0-48 21.5-48 48l0 272 0 16c0 26.5 21.5 48 48 48l192 0c26.5 0 48-21.5 48-48l0-220.1c0-12.7-5.1-24.9-14.1-33.9l-67.9-67.9c-9-9-21.2-14.1-33.9-14.1L320 128l-48 0zM160 40a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"></path></svg><!-- <i class="fas fa-paste me-1"></i> -->Share Logs
										</button>
										<button type="button" class="format-btn preview-btn" data-action="toggle-preview" title="Preview">
											<svg class="svg-inline--fa fa-eye" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg><!-- <i class="fas fa-eye"></i> --> Preview
										</button>
<button type="button" class="btn-close-ticket format-btn" data-action="close-ticket">
											<svg class="svg-inline--fa fa-times me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg><!-- <i class="fas fa-times me-2"></i> -->
											Close Ticket
										</button>
<div style="background: rgba(var(--falcon-warning-rgb), 0.05); border-radius: 8px; border: 1px solid rgba(var(--falcon-warning-rgb), 0.2);" class="format-btn">
									<label class="form-check-label" style="color: rgba(255, 255, 255, 0.9); display: flex; align-items: center; gap: 0.75rem; cursor: pointer; font-weight: 500;">
										<input type="checkbox" id="internalMessageToggle" class="form-check-input" style="cursor: pointer; width: 18px; height: 18px;">
										<!-- <i class="fas fa-sticky-note" style="color: rgb(var(--falcon-warning-rgb)); font-size: 1rem;"></i> -->
										
										<span style="color: rgba(var(--falcon-warning-rgb), 0.9); font-size: 0.8rem; margin-right: auto;">
											<svg class="svg-inline--fa fa-lock me-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"></path></svg><!-- <i class="fas fa-lock me-1"></i> -->staff only
										</span>
									</label>
								</div><button type="submit" class="format-btn btn-send">
											<svg class="svg-inline--fa fa-paper-plane me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"></path></svg><!-- <i class="fas fa-paper-plane me-2"></i> -->
											Send
				</button>

            
										
									</div>
								</div>

								
								

								<!-- Preview Container -->
								<div id="markdownPreview" style="display: none; min-height: 150px; padding: 1rem; background: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.1); border-right: 1px solid rgba(255, 255, 255, 0.1); border-left: 1px solid rgba(255, 255, 255, 0.1); border-image: initial; border-bottom: none; margin-top: -1px; color: rgba(255, 255, 255, 0.9); overflow-y: auto; max-height: 400px;">
					<div style="text-align: center; color: rgba(255,255,255,0.5); padding: 2rem;">
						<svg class="svg-inline--fa fa-eye fa-2x mb-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg><!-- <i class="fas fa-eye fa-2x mb-2"></i> -->
						<p>Type something to see the preview...</p>
					</div>
				</div>

								<textarea class="reply-textarea" id="replyTextarea" name="message" placeholder="Type your message here..." required="" style="border-radius: 0px 0px 8px 8px; margin-top: -1px; display: block;"></textarea>

																
								
								
							</form>`;
      
      // Replace the original toggle with our enhanced panel
      replyPanelToggle.parentNode.replaceChild(enhancedReplyPanel, replyPanelToggle);
      
      // Set up event listeners for the new panel
      setupEnhancedPanelFunctionality();
      
      console.log('[better-falix] enhanced-reply-panel: Replaced reply panel toggle');
    }
  }
  
  function setupEnhancedPanelFunctionality() {
    // Preview functionality
    const previewBtn = document.querySelector('.format-btn.preview-btn[data-action="toggle-preview"]');
    const replyTextarea = document.getElementById('replyTextarea');
    const markdownPreview = document.getElementById('markdownPreview');
    
    if (previewBtn && replyTextarea && markdownPreview) {
      previewBtn.addEventListener('click', () => {
        const isVisible = markdownPreview.style.display !== 'none';
        
        if (isVisible) {
          markdownPreview.style.display = 'none';
          replyTextarea.style.display = 'block';
        } else {
          markdownPreview.style.display = 'block';
          replyTextarea.style.display = 'none';
          
          // Update preview content
          const content = replyTextarea.value;
          if (content.trim()) {
            // Simple markdown rendering (in production, you'd use a proper markdown library)
            markdownPreview.innerHTML = `<div>${content.replace(/\n/g, '<br>')}</div>`;
          } else {
            markdownPreview.innerHTML = `
              <div style="text-align: center; color: rgba(255,255,255,0.5); padding: 2rem;">
                <svg class="svg-inline--fa fa-eye fa-2x mb-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                <p>Type something to see the preview...</p>
              </div>
            `;
          }
        }
      });
    }
    
    // Form submission
    const replyForm = document.getElementById('replyForm');
    if (replyForm) {
      replyForm.addEventListener('submit', (event) => {
        // Prevent the default form submission which causes navigation to "#message-275"
        event.preventDefault();
        
        // Get the message content
        const messageContent = document.getElementById('replyTextarea').value;
        const isInternalMessage = document.getElementById('internalMessageToggle').checked;
        
        console.log('[better-falix] enhanced-reply-panel: Form submission intercepted');
        
        // Find the original form submit function or create a new submission mechanism
        
        // Try to find and use the original AJAX submission functionality
        const originalSubmitFunc = findOriginalFormSubmission();
        if (originalSubmitFunc) {
          console.log('[better-falix] enhanced-reply-panel: Using original submit function');
          
          try {
            // Call the original function with the form as context
            originalSubmitFunc.call(this, {
              preventDefault: () => {}, // Mock event object
              target: {
                elements: {
                  message: { value: messageContent },
                  staff_only: { checked: isInternalMessage }
                }
              }
            });
            return; // Return early if we successfully used the original function
          } catch (e) {
            console.error('[better-falix] enhanced-reply-panel: Error using original submit function', e);
            // Continue with other approaches
          }
        }
        
        // Second approach: Try to find and use the original submit button
        const originalSubmitBtn = document.querySelector('button.submit-reply, button[type="submit"].btn-send, input[type="submit"]');
        if (originalSubmitBtn) {
          console.log('[better-falix] enhanced-reply-panel: Using original submit button');
          
          // Fill the original textarea if it exists
          const originalTextarea = document.querySelector('textarea[name="message"]');
          if (originalTextarea && originalTextarea !== document.getElementById('replyTextarea')) {
            originalTextarea.value = messageContent;
          }
          
          // Set the internal message checkbox if it exists
          const originalInternalCheckbox = document.querySelector('input[name="staff_only"]');
          if (originalInternalCheckbox) {
            originalInternalCheckbox.checked = isInternalMessage;
          }
          
          // Trigger the original submit button click
          originalSubmitBtn.click();
        } else {
          console.log('[better-falix] enhanced-reply-panel: Creating new submission');
          
          // Second approach: Create a hidden form to use the original submission mechanism
          const hiddenForm = document.createElement('form');
          hiddenForm.style.display = 'none';
          hiddenForm.method = 'post';
          hiddenForm.action = window.location.pathname; // Use the current URL path
          
          // Add the message content
          const messageInput = document.createElement('textarea');
          messageInput.name = 'message';
          messageInput.value = messageContent;
          hiddenForm.appendChild(messageInput);
          
          // Add the internal message flag if checked
          if (isInternalMessage) {
            const staffOnlyInput = document.createElement('input');
            staffOnlyInput.type = 'checkbox';
            staffOnlyInput.name = 'staff_only';
            staffOnlyInput.checked = true;
            hiddenForm.appendChild(staffOnlyInput);
          }
          
          // Add other necessary form fields based on the original form
          // This might include a CSRF token, ticket ID, etc.
          document.querySelectorAll('input[type="hidden"]').forEach(input => {
            const clonedInput = document.createElement('input');
            clonedInput.type = 'hidden';
            clonedInput.name = input.name;
            clonedInput.value = input.value;
            hiddenForm.appendChild(clonedInput);
          });
          
          // Append to body, submit, and then remove
          document.body.appendChild(hiddenForm);
          hiddenForm.submit();
          document.body.removeChild(hiddenForm);
        }
      });
    }
  }

  // Function to find the original form submit handler
  function findOriginalFormSubmission() {
    // Try to find the original AJAX-based submission handler
    const ajaxSubmit = window.submitReply || window.sendReply || window.submitTicketResponse;
    
    if (ajaxSubmit && typeof ajaxSubmit === 'function') {
      console.log('[better-falix] enhanced-reply-panel: Found original AJAX submit function');
      return ajaxSubmit;
    }
    
    // Look for form elements that might contain the submission logic
    const ticketForms = Array.from(document.querySelectorAll('form')).filter(form => {
      return form.id?.includes('reply') || 
             form.id?.includes('ticket') || 
             form.id?.includes('message') ||
             form.action?.includes('ticket') ||
             form.action?.includes('message');
    });
    
    if (ticketForms.length > 0) {
      console.log('[better-falix] enhanced-reply-panel: Found potential ticket forms:', ticketForms.length);
      
      // We'll return the submit handler of the first form we find
      const firstForm = ticketForms[0];
      const originalHandler = firstForm.onsubmit;
      
      if (originalHandler) {
        console.log('[better-falix] enhanced-reply-panel: Found original onsubmit handler');
        return originalHandler;
      }
    }
    
    return null;
  }
  
  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceReplyPanel);
  } else {
    replaceReplyPanel();
  }
  
  // Monitor for page changes to handle dynamically loaded panels
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const toggle = node.querySelector ? 
              node.querySelector('.reply-panel-toggle[data-action="toggle-reply-panel"]') : null;
            
            if (toggle || (node.classList && node.classList.contains('reply-panel-toggle'))) {
              setTimeout(replaceReplyPanel, 10);
              break;
            }
          }
        }
      }
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] enhanced-reply-panel: Script loaded successfully');
  }, 10);
});