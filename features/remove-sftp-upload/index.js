// [better-falix] remove-sftp-upload: Script loading
console.log('[better-falix] remove-sftp-upload: Script loading');

chrome.storage.sync.get({ enabled: true, removeSftpUpload: false }, (data) => {
  if (!data.enabled || !data.removeSftpUpload) {
    console.log('[better-falix] remove-sftp-upload: Script disabled');
    return;
  }
  console.log('[better-falix] remove-sftp-upload: Script enabled');

  //  --------- START FEATURE ----------

  function removeSftpAndDivider() {
    console.log('[better-falix] remove-sftp-upload: Running removeSftpAndDivider');
    // Remove the SFTP dropdown item
    let found = false;
    document.querySelectorAll('a.dropdown-item[onclick="showSftpModal()"]').forEach(a => {
      const li = a.closest('li');
      if (li) {
        li.remove();
        found = true;
        console.log('[better-falix] remove-sftp-upload: Removed SFTP item');
      }
    });
    // Remove the divider just before the SFTP item (if any remain)
    document.querySelectorAll('.dropdown-divider').forEach(divider => {
      // Remove divider if it's the last divider or if the next sibling is gone
      if (!divider.nextElementSibling || !divider.nextElementSibling.querySelector?.('a.dropdown-item[onclick="showSftpModal()"]')) {
        divider.remove();
        found = true;
        console.log('[better-falix] remove-sftp-upload: Removed divider');
      }
    });
    if (!found) {
      console.log('[better-falix] remove-sftp-upload: No SFTP item or divider found');
    }
  }

  // Try on DOMContentLoaded and with MutationObserver for dynamic content
  function observeSftp() {
    removeSftpAndDivider();
    const observer = new MutationObserver(removeSftpAndDivider);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeSftp);
  } else {
    observeSftp();
  }

  setTimeout(() => {
    console.log('[better-falix] remove-sftp-upload: Script loaded successfully');
  }, 10);
});
