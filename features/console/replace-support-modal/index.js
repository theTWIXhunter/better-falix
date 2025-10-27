// [better-falix] replaceSupportModal: Script loading
console.log('[better-falix] replaceSupportModal: Script loading');

chrome.storage.sync.get({ replaceSupportModal: false, enabled: true }, (data) => {
  if (!data.enabled || !data.replaceSupportModal) {
    console.log('[better-falix] replaceSupportModal: Script disabled');
    return;
  }
  console.log('[better-falix] replaceSupportModal: Script enabled');

  //  --------- START FEATURE ----------

  function replaceSupportModal() {
    // Find and modify support modals
    document.querySelectorAll('.modal-body').forEach((modalBody) => {
      // Check if this is a support modal by looking for support-info-card
      const supportCards = modalBody.querySelectorAll('.support-info-card');
      if (supportCards.length === 0) return;

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

          // Insert label before the text span
          if (labelText && !valueDiv.textContent.includes(labelText)) {
            const labelNode = document.createTextNode('\n    ' + labelText + '\n        ');
            valueDiv.insertBefore(labelNode, textSpan);
          }
        }
      });
    });
  }

  function observeModals() {
    replaceSupportModal();
    const observer = new MutationObserver(replaceSupportModal);
    observer.observe(document.body, { childList: true, subtree: true });
    
    setTimeout(() => {
      observer.disconnect();
      console.log('[better-falix] replaceSupportModal: Script loaded successfully');
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeModals);
  } else {
    observeModals();
  }
});