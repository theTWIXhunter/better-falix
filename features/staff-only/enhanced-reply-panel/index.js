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
    // Find the original reply panel toggle
    const replyPanelToggle = document.querySelector('.reply-panel-toggle[data-action="toggle-reply-panel"]');
    
    if (replyPanelToggle) {
      // Create the container for our enhanced panel
      const enhancedReplyPanel = document.createElement('div');
      
      // Create the structure but don't add buttons yet (we'll move them)
      enhancedReplyPanel.innerHTML = `<form id="replyForm">
        <!-- Markdown Toolbar -->
        <div class="markdown-toolbar" style="display: flex; gap: 0.25rem; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 8px 8px 0 0; border: 1px solid rgba(255,255,255,0.1); border-bottom: none; flex-wrap: wrap;">
          <div id="toolbar-buttons" style="display: flex; flex-wrap: wrap; gap: 0.5rem; width: 100%;">
            <!-- We'll move the existing buttons here -->
          </div>
        </div>

        <!-- Preview Container -->
        <div id="markdownPreview" style="display: none; min-height: 150px; padding: 1rem; background: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.1); border-right: 1px solid rgba(255, 255, 255, 0.1); border-left: 1px solid rgba(255, 255, 255, 0.1); border-image: initial; border-bottom: none; margin-top: -1px; color: rgba(255, 255, 255, 0.9); overflow-y: auto; max-height: 400px;">
          <div style="text-align: center; color: rgba(255,255,255,0.5); padding: 2rem;">
            <svg class="svg-inline--fa fa-eye fa-2x mb-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
            <p>Type something to see the preview...</p>
          </div>
        </div>

        <!-- The textarea will be moved from the original panel -->
        <div id="textarea-container" style="position: relative;"></div>
      </form>`;
      
      // Replace the original toggle with our enhanced panel container
      replyPanelToggle.parentNode.replaceChild(enhancedReplyPanel, replyPanelToggle);
      
      // Look for original elements we need to move
      const originalForm = document.querySelector('form[action*="ticket"]') || document.querySelector('form:has(.reply-textarea)');
      const originalTextarea = document.querySelector('.reply-textarea');
      const originalButtons = document.querySelectorAll('button[type="submit"], button[data-action="toggle-preview"], button[data-action="close-ticket"]');
      const originalInternalToggle = document.querySelector('#internalMessageToggle, input[name="internal"]');
      
      // Move elements instead of recreating them
      const toolbarContainer = document.getElementById('toolbar-buttons');
      const textareaContainer = document.getElementById('textarea-container');
      
      if (originalTextarea && textareaContainer) {
        // Adjust the textarea styling
        originalTextarea.style.borderRadius = '0px 0px 8px 8px';
        originalTextarea.style.marginTop = '-1px';
        originalTextarea.style.display = 'block';
        textareaContainer.appendChild(originalTextarea);
      }
      
      // Create new buttons only if needed
      if (!originalButtons.length) {
        // Add template button
        const templateBtn = document.createElement('button');
        templateBtn.type = 'button';
        templateBtn.className = 'format-btn template-btn';
        templateBtn.id = 'openTemplatesBtn';
        templateBtn.title = 'Quick Templates';
        templateBtn.style = 'background: linear-gradient(135deg, rgba(var(--falcon-info-rgb), 0.15), rgba(var(--falcon-primary-rgb), 0.1)); border: 1px solid rgba(var(--falcon-info-rgb), 0.3); color: rgb(var(--falcon-info-rgb));';
        templateBtn.innerHTML = '<svg class="svg-inline--fa fa-magic me-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magic" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M14.1 463.3c-18.7-18.7-18.7-49.1 0-67.9L395.4 14.1c18.7-18.7 49.1-18.7 67.9 0l34.6 34.6c18.7 18.7 18.7 49.1 0 67.9L116.5 497.9c-18.7 18.7-49.1 18.7-67.9 0L14.1 463.3zM347.6 187.6l105-105L429.4 59.3l-105 105 23.3 23.3z"></path></svg> Templates';
        toolbarContainer.appendChild(templateBtn);
        
        // Create a right-side container for buttons
        const rightButtons = document.createElement('div');
        rightButtons.style = 'margin-left: auto; display: flex; gap: 0.5rem;';
        toolbarContainer.appendChild(rightButtons);
        
        // Add preview button
        const previewBtn = document.createElement('button');
        previewBtn.type = 'button';
        previewBtn.className = 'format-btn preview-btn';
        previewBtn.dataset.action = 'toggle-preview';
        previewBtn.title = 'Preview';
        previewBtn.innerHTML = '<svg class="svg-inline--fa fa-eye" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg> Preview';
        previewBtn.addEventListener('click', togglePreview);
        rightButtons.appendChild(previewBtn);
        
        // Add send button
        const sendBtn = document.createElement('button');
        sendBtn.type = 'submit';
        sendBtn.className = 'format-btn btn-send';
        sendBtn.innerHTML = '<svg class="svg-inline--fa fa-paper-plane me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"></path></svg> Send';
        rightButtons.appendChild(sendBtn);
      } else {
        // Move existing buttons to our toolbar
        originalButtons.forEach(button => {
          button.classList.add('format-btn');
          
          // Style based on button type
          if (button.dataset.action === 'toggle-preview') {
            button.innerHTML = '<svg class="svg-inline--fa fa-eye" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg> Preview';
            button.addEventListener('click', togglePreview);
          } else if (button.dataset.action === 'close-ticket') {
            button.innerHTML = '<svg class="svg-inline--fa fa-times me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg> Close Ticket';
          } else if (button.type === 'submit') {
            button.innerHTML = '<svg class="svg-inline--fa fa-paper-plane me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"></path></svg> Send';
            button.classList.add('btn-send');
          }
          
          toolbarContainer.appendChild(button);
        });
        
        // Add template button at the start
        const templateBtn = document.createElement('button');
        templateBtn.type = 'button';
        templateBtn.className = 'format-btn template-btn';
        templateBtn.id = 'openTemplatesBtn';
        templateBtn.title = 'Quick Templates';
        templateBtn.style = 'background: linear-gradient(135deg, rgba(var(--falcon-info-rgb), 0.15), rgba(var(--falcon-primary-rgb), 0.1)); border: 1px solid rgba(var(--falcon-info-rgb), 0.3); color: rgb(var(--falcon-info-rgb));';
        templateBtn.innerHTML = '<svg class="svg-inline--fa fa-magic me-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magic" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M14.1 463.3c-18.7-18.7-18.7-49.1 0-67.9L395.4 14.1c18.7-18.7 49.1-18.7 67.9 0l34.6 34.6c18.7 18.7 18.7 49.1 0 67.9L116.5 497.9c-18.7 18.7-49.1 18.7-67.9 0L14.1 463.3zM347.6 187.6l105-105L429.4 59.3l-105 105 23.3 23.3z"></path></svg> Templates';
        toolbarContainer.insertBefore(templateBtn, toolbarContainer.firstChild);
      }
      
      // Handle staff-only toggle
      if (originalInternalToggle) {
        // Create a wrapper for the staff-only toggle
        const staffToggleWrapper = document.createElement('div');
        staffToggleWrapper.className = 'format-btn';
        staffToggleWrapper.style = 'background: rgba(var(--falcon-warning-rgb), 0.05); border-radius: 8px; border: 1px solid rgba(var(--falcon-warning-rgb), 0.2);';
        
        // Create a label for better styling
        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.style = 'color: rgba(255, 255, 255, 0.9); display: flex; align-items: center; gap: 0.75rem; cursor: pointer; font-weight: 500;';
        
        // Move the original checkbox
        originalInternalToggle.className = 'form-check-input';
        originalInternalToggle.style = 'cursor: pointer; width: 18px; height: 18px;';
        label.appendChild(originalInternalToggle);
        
        // Add the staff-only text
        const span = document.createElement('span');
        span.style = 'color: rgba(var(--falcon-warning-rgb), 0.9); font-size: 0.8rem; margin-right: auto;';
        span.innerHTML = '<svg class="svg-inline--fa fa-lock me-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"></path></svg> staff only';
        label.appendChild(span);
        
        staffToggleWrapper.appendChild(label);
        toolbarContainer.appendChild(staffToggleWrapper);
      }
      
      console.log('[better-falix] enhanced-reply-panel: Enhanced reply panel (moved buttons)');
    }
  }
  
  // Function to toggle the preview mode
  function togglePreview() {
    const markdownPreview = document.getElementById('markdownPreview');
    const replyTextarea = document.querySelector('.reply-textarea');
    
    if (!markdownPreview || !replyTextarea) return;
    
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