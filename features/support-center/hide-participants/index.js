// [better-falix] hide-participants: Script loading
console.log('[Better-Falix] hide-participants: Script loading');

chrome.storage.sync.get({ hideParticipants: false, enabled: true }, (data) => {
  if (!data.enabled || !data.hideParticipants) {
    console.log('[Better-Falix] hide-participants: Script disabled');
    return;
  }
  console.log('[Better-Falix] hide-participants: Script enabled');

  // --------- START FEATURE ----------

  function hideParticipantsDisplay() {
    const participantsDisplay = document.getElementById('participantsDisplay');
    if (participantsDisplay) {
      participantsDisplay.style.display = 'none';
      
      // Find and hide the bullet separator right after it
      let nextElement = participantsDisplay.nextElementSibling;
      if (nextElement && 
          nextElement.tagName === 'SPAN' && 
          nextElement.classList.contains('text-muted') && 
          nextElement.textContent.includes('•')) {
        nextElement.style.display = 'none';
        console.log('[Better-Falix] hide-participants: Participants display and separator hidden');
      } else {
        console.log('[Better-Falix] hide-participants: Participants display hidden');
      }
    }
  }

  // Wait for the page to be ready and then hide the participants display
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideParticipantsDisplay);
  } else {
    hideParticipantsDisplay();
  }

  // Watch for dynamic changes in case the element is added later
  const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.id === 'participantsDisplay' || node.querySelector('#participantsDisplay')) {
            hideParticipantsDisplay();
            break;
          }
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('[Better-Falix] hide-participants: Script loaded successfully');

  // --------- END FEATURE ----------
});
