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
    // Remove the SFTP dropdown item
    document.querySelectorAll('a.dropdown-item[onclick="showSftpModal()"]').forEach(a => {
      const li = a.closest('li');
      if (li) li.remove();
    });
    // Remove the divider just before the SFTP item (if any remain)
    document.querySelectorAll('.dropdown-divider').forEach(divider => {
      // Remove divider if it's the last divider or if the next sibling is gone
      if (!divider.nextElementSibling || !divider.nextElementSibling.querySelector?.('a.dropdown-item[onclick="showSftpModal()"]')) {
        divider.remove();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeSftpAndDivider);
  } else {
    removeSftpAndDivider();
  }

  setTimeout(() => {
    console.log('[better-falix] remove-sftp-upload: Script loaded sucsessfully');
  }, 10);
});
