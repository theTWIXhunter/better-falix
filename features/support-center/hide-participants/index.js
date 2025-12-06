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
    if (participantsDisplay && participantsDisplay.style.display !== 'none') {
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
        console.log('[Better-Falix] hide-participants: Participants display hidden (no separator found)');
      }
      return true;
    }
    return false;
  }

  // Initial attempt
  hideParticipantsDisplay();

  // Watch for dynamic changes - the element is loaded after page load
  const observer = new MutationObserver(() => {
    hideParticipantsDisplay();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('[Better-Falix] hide-participants: Script loaded successfully');

  // --------- END FEATURE ----------
});
