// [better-falix] replaceSupportModal: Script loading
console.log('[better-falix] replaceSupportModal: Script loading');

chrome.storage.sync.get({ replaceSupportModal: false, enabled: true }, (data) => {
  if (!data.enabled || !data.replaceSupportModal) {
    console.log('[better-falix] replaceSupportModal: Script disabled');
    return;
  }
  console.log('[better-falix] replaceSupportModal: Script enabled');

  //  --------- START FEATURE ----------

  const processedModals = new WeakSet();

  function replaceSupportModal() {
    // Find and modify support modals
    document.querySelectorAll('.modal-body').forEach((modalBody) => {
      // Skip if already processed
      if (processedModals.has(modalBody)) return;

      // Check if this is a support modal by looking for support-info-card or support-info-grid
      const supportCards = modalBody.querySelectorAll('.support-info-card');
      const supportGrid = modalBody.querySelector('.support-info-grid');
      
      if (supportCards.length === 0 && !supportGrid) return;

      // Mark as processed immediately to prevent re-processing
      processedModals.add(modalBody);

      try {
        // Handle NEW modal structure (with support-info-grid)
        if (supportGrid) {
          console.log('[better-falix] replaceSupportModal: Processing new modal structure');
          
          // The new modal is already clean! Just add a "Copy All" button if it doesn't exist
          if (!modalBody.querySelector('.copy-all-support-btn')) {
            // Find all support info values for the copy all button
            const supportRows = supportGrid.querySelectorAll('.support-info-row');
            const allValues = [];
            
            supportRows.forEach(row => {
              const label = row.querySelector('.support-info-label')?.textContent.trim();
              const value = row.querySelector('.support-info-value')?.textContent.trim();
              if (label && value) {
                allValues.push(`${label}: ${value}`);
              }
            });
            
            // Create copy all button
            const copyAllBtn = document.createElement('button');
            copyAllBtn.className = 'support-action-btn copy-all-support-btn';
            copyAllBtn.style.marginTop = '12px';
            copyAllBtn.innerHTML = `
              <svg class="svg-inline--fa" viewBox="0 0 448 512" width="15.75px" height="14px" fill="currentColor" aria-hidden="true">
                <path d="M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z"></path>
              </svg>
              Copy All Support Info
            `;
            
            copyAllBtn.addEventListener('click', () => {
              const textToCopy = allValues.join('\n');
              navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHTML = copyAllBtn.innerHTML;
                copyAllBtn.innerHTML = `
                  <svg class="svg-inline--fa" viewBox="0 0 448 512" width="15.75px" height="14px" fill="currentColor" aria-hidden="true">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
                  </svg>
                  Copied!
                `;
                setTimeout(() => {
                  copyAllBtn.innerHTML = originalHTML;
                }, 2000);
              });
            });
            
            // Insert before the support ticket link
            const supportTicketLink = modalBody.querySelector('.support-action-btn:not(.copy-all-support-btn)');
            if (supportTicketLink) {
              supportTicketLink.parentNode.insertBefore(copyAllBtn, supportTicketLink);
              // Hide the original support ticket link
              supportTicketLink.style.display = 'none';
            } else {
              modalBody.appendChild(copyAllBtn);
            }
          } else {
            // If copy all button exists, make sure the support ticket link is hidden
            const supportTicketLink = modalBody.querySelector('.support-action-btn:not(.copy-all-support-btn)');
            if (supportTicketLink) {
              supportTicketLink.style.display = 'none';
            }
          }
          
          return; // Exit early for new structure
        }
        
        // Handle OLD modal structure (with support-info-card)
        console.log('[better-falix] replaceSupportModal: Processing old modal structure');
        
        // Remove the warning section
        const warningSection = modalBody.querySelector('.support-warning');
        if (warningSection) {
          warningSection.remove();
        }

        // Remove the support ticket notice
        const ticketNotice = modalBody.querySelector('.support-ticket-notice');
        if (ticketNotice) {
          ticketNotice.remove();
        }

        // Process each support-info-card
        supportCards.forEach((card) => {
          // Add height style to all cards
          card.style.height = '50px';

          // Remove the label section
          const label = card.querySelector('.support-info-label');
          if (label) {
            label.remove();
          }

          // Modify the value section
          const valueDiv = card.querySelector('.support-info-value');
          if (valueDiv) {
            valueDiv.style.marginTop = '-25px';

            // Get the current text content
            const textSpan = valueDiv.querySelector('.support-info-text');
            if (!textSpan) return;

            const textContent = textSpan.textContent.trim();

            // Determine the label based on card order or content
            let labelText = '';
            const allCards = Array.from(modalBody.querySelectorAll('.support-info-card'));
            const cardIndex = allCards.indexOf(card);

            if (cardIndex === 0) {
              labelText = 'SUPPORT ID:';
            } else if (cardIndex === 1) {
              labelText = 'SUPPORT PIN:';
            } else if (cardIndex === 2) {
              labelText = 'NODE:';
              // For node, keep only the node name (before the dash)
              const nodeName = textContent.split(' - ')[0];
              textSpan.textContent = nodeName;
            }

            // Insert label before the text span (only if not already there)
            if (labelText && !valueDiv.textContent.includes(labelText)) {
              const labelNode = document.createTextNode('\n    ' + labelText + '\n        ');
              valueDiv.insertBefore(labelNode, textSpan);
            }
          }
        });
      } catch (e) {
        console.error('[better-falix] replaceSupportModal: Error processing modal', e);
      }
    });
  }

  // Initial replacement
  replaceSupportModal();

  // Watch for new modals with a more targeted observer
  const observer = new MutationObserver((mutations) => {
    // Only check if modal-related elements were added
    let shouldCheck = false;
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1 && (node.classList?.contains('modal') || node.querySelector?.('.modal-body'))) {
          shouldCheck = true;
          break;
        }
      }
      if (shouldCheck) break;
    }
    
    if (shouldCheck) {
      replaceSupportModal();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    observer.disconnect();
    console.log('[better-falix] replaceSupportModal: Script loaded successfully');
  }, 3000);
});