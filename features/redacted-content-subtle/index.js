// [better-falix] redacted-content-subtle: Script loading
console.log('[better-falix] redacted-content-subtle: Script loading');

chrome.storage.sync.get({ redactedContentSubtle: false, enabled: true }, (data) => {
  if (!data.enabled || !data.redactedContentSubtle) {
    console.log('[better-falix] redacted-content-subtle: Script disabled');
    return;
  }
  console.log('[better-falix] redacted-content-subtle: Script enabled');

  //  --------- START FEATURE ----------

  function applySubtleRedactedStyling() {
    // Remove existing custom styles if any
    const existingStyle = document.getElementById('better-falix-redacted-subtle');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create and inject new subtle styling
    const style = document.createElement('style');
    style.id = 'better-falix-redacted-subtle';
    style.textContent = `
      .redacted {
        color: #a7a8a9 !important;
        background: unset !important;
        padding: unset !important;
        border-radius: unset !important;
        font-weight: unset !important;
      }
    `;
    document.head.appendChild(style);
    console.log('[better-falix] redacted-content-subtle: Subtle styling applied to redacted content');
  }

  // Apply styling immediately
  applySubtleRedactedStyling();

  // Also observe for dynamic content
  const observer = new MutationObserver(() => {
    // Check if our style is still present
    if (!document.getElementById('better-falix-redacted-subtle')) {
      applySubtleRedactedStyling();
    }
  });
  
  observer.observe(document.head, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] redacted-content-subtle: Script loaded successfully');
  }, 10);
});
