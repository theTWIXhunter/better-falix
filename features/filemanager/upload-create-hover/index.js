// [better-falix] upload-create-hover: Script loading
console.log('[better-falix] upload-create-hover: Script loading');

chrome.storage.sync.get({
  uploadCreateHover: false,
  uploadCreateHover_createDelay: 500,
  uploadCreateHover_uploadDelay: 0,
  enabled: true
}, (data) => {
  if (!data.enabled || !data.uploadCreateHover) {
    console.log('[better-falix] upload-create-hover: Script disabled');
    return;
  }
  console.log('[better-falix] upload-create-hover: Script enabled');

  //  --------- START FEATURE ----------
  function addHoverDropdown(id, delay = 0) {
    const btn = document.getElementById(id);
    if (!btn) return;
    const dropdown = btn.nextElementSibling;
    if (!dropdown || !dropdown.classList.contains('dropdown-menu')) return;

    let openTimeout = null;

    btn.addEventListener('mouseenter', () => {
      openTimeout = setTimeout(() => {
        btn.classList.add('show');
        dropdown.classList.add('show');
        dropdown.style.display = 'block';
      }, delay);
    });
    btn.addEventListener('mouseleave', () => {
      clearTimeout(openTimeout);
      setTimeout(() => {
        if (!dropdown.matches(':hover')) {
          btn.classList.remove('show');
          dropdown.classList.remove('show');
          dropdown.style.display = '';
        }
      }, 100);
    });
    dropdown.addEventListener('mouseleave', () => {
      btn.classList.remove('show');
      dropdown.classList.remove('show');
      dropdown.style.display = '';
    });
    dropdown.addEventListener('mouseenter', () => {
      btn.classList.add('show');
      dropdown.classList.add('show');
      dropdown.style.display = 'block';
    });
  }

  function setup() {
    addHoverDropdown('createDropdown', parseInt(data.uploadCreateHover_createDelay, 10) || 0);
    addHoverDropdown('uploadDropdown', parseInt(data.uploadCreateHover_uploadDelay, 10) || 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  setTimeout(() => {
    console.log('[better-falix] upload-create-hover: Script loaded successfully');
  }, 10);
});
