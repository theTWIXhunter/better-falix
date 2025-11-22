// [better-falix] hide-template-button: Script loading
console.log('[better-falix] hide-template-button: Script loading');

chrome.storage.sync.get({ enabled: true, hideTemplateButton: false }, (data) => {
  if (!data.enabled || !data.hideTemplateButton) {
    console.log('[better-falix] hide-template-button: Script disabled');
    return;
  }
  console.log('[better-falix] hide-template-button: Script enabled');

  //  --------- START FEATURE ----------

  function hideTemplateButton() {
    // Hide template button
    document.querySelectorAll('.format-btn.template-btn').forEach(el => {
      el.style.setProperty('display', 'none', 'important');
    });

    console.log('[better-falix] hide-template-button: Hidden template button');
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideTemplateButton);
  } else {
    hideTemplateButton();
  }

  // Watch for dynamic content changes
  const observer = new MutationObserver(() => {
    hideTemplateButton();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setTimeout(() => {
    console.log('[better-falix] hide-template-button: Script loaded successfully');
  }, 10);
});
