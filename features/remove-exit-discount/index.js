// [better-falix] remove-exit-discount: Script loading
console.log('[better-falix] remove-exit-discount: Script loading');

chrome.storage.sync.get({ enabled: true, removeExitDiscount: false }, (data) => {
  if (!data.enabled || !data.removeExitDiscount) {
    console.log('[better-falix] remove-exit-discount: Script disabled');
    return;
  }
  console.log('[better-falix] remove-exit-discount: Script enabled');

  //  --------- START FEATURE ----------

  function removeExitDiscountModal() {
    // Remove modal by id
    const modal = document.getElementById('exitDiscountModal');
    if (modal) modal.remove();
    // Remove backdrop by id (may not be valid HTML, so fallback to querySelector)
    const backdrop = document.getElementById('modal-backdrop fade show') ||
      document.querySelector('#modal-backdrop.fade.show');
    if (backdrop) backdrop.remove();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeExitDiscountModal);
  } else {
    removeExitDiscountModal();
  }

  setTimeout(() => {
    console.log('[better-falix] remove-exit-discount: Script loaded successfully');
  }, 10);
});
