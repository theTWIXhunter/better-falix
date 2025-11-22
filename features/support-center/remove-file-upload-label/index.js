// [better-falix] remove-file-upload-label: Script loading
console.log('[better-falix] remove-file-upload-label: Script loading');

chrome.storage.sync.get({ enabled: true, removeFileUploadLabel: false }, (data) => {
  if (!data.enabled || !data.removeFileUploadLabel) {
    console.log('[better-falix] remove-file-upload-label: Script disabled');
    return;
  }
  console.log('[better-falix] remove-file-upload-label: Script enabled');

  //  --------- START FEATURE ----------

  function removeFileUploadLabel() {
    // Remove the file upload label
    document.querySelectorAll('label[for="fileUploadInputReply"]').forEach(el => {
      el.remove();
    });

    console.log('[better-falix] remove-file-upload-label: Removed file upload label');
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeFileUploadLabel);
  } else {
    removeFileUploadLabel();
  }

  // Watch for dynamic content changes
  const observer = new MutationObserver(() => {
    removeFileUploadLabel();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setTimeout(() => {
    console.log('[better-falix] remove-file-upload-label: Script loaded successfully');
  }, 10);
});
