// [better-falix] editor-wrapper-height: Script loading
console.log('[better-falix] editor-wrapper-height: Script loading');

chrome.storage.sync.get({ editorWrapperHeight: false, enabled: true }, (data) => {
  if (!data.enabled || !data.editorWrapperHeight) {
    console.log('[better-falix] editor-wrapper-height: Script disabled');
    return;
  }
  console.log('[better-falix] editor-wrapper-height: Script enabled');

  //  --------- START FEATURE ----------
  function setEditorHeight() {
    document.querySelectorAll('.editor-wrapper').forEach(el => {
      el.style.height = '600px';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setEditorHeight);
  } else {
    setEditorHeight();
  }

  setTimeout(() => {
    console.log('[better-falix] editor-wrapper-height: Script loaded sucsessfully');
  }, 10);
});
