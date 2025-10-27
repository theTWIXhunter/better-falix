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

      // Check if this is a support modal by looking for support-info-card
      const supportCards = modalBody.querySelectorAll('.support-info-card');
      if (supportCards.length === 0) return;

      // Mark as processed immediately to prevent re-processing
      processedModals.add(modalBody);

      try {
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