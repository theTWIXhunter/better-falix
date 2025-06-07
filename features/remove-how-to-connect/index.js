chrome.storage.sync.get({ enabled: true, removeHowToConnect: false }, (data) => {
  if (!data.enabled || !data.removeHowToConnect) return;

  function removeHowToConnectSections() {
    // Remove all elements with class "connect-step"
    document.querySelectorAll('.connect-step').forEach(el => el.remove());
    // Remove all elements with class "dns-verification-section"
    document.querySelectorAll('.dns-verification-section').forEach(el => el.remove());
    // Remove all <div class="bedrock-detail-row"> with label "Server Name:"
    document.querySelectorAll('.bedrock-detail-row').forEach(row => {
      const label = row.querySelector('.bedrock-label');
      if (label && label.textContent.trim() === 'Server Name:') {
        row.remove();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeHowToConnectSections);
  } else {
    removeHowToConnectSections();
  }
});
