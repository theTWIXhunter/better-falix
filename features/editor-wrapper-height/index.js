// [better-falix] editor-wrapper-height: Script loading
console.log('[better-falix] editor-wrapper-height: Script loading');

chrome.storage.sync.get({ editorWrapperHeight: false, editorWrapperHeight_value: 600, enabled: true }, (data) => {
  if (!data.enabled || !data.editorWrapperHeight) {
    console.log('[better-falix] editor-wrapper-height: Script disabled');
    return;
  }
  console.log('[better-falix] editor-wrapper-height: Script enabled');

  //  --------- START FEATURE ----------
  function setEditorHeight() {
    const height = parseInt(data.editorWrapperHeight_value, 10) || 600;
    document.querySelectorAll('.editor-wrapper').forEach(el => {
      el.style.height = height + 'px';
    });
    // Optionally, also set #text-container-editor if needed
    document.querySelectorAll('#text-container-editor').forEach(el => {
      el.style.height = '100%';
    });
  }

  function observeAndApplyEditorHeight() {
    setEditorHeight();
    const observer = new MutationObserver(setEditorHeight);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeAndApplyEditorHeight);
  } else {
    observeAndApplyEditorHeight();
  }

  setTimeout(() => {
    console.log('[better-falix] editor-wrapper-height: Script loaded successfully');
  }, 10);
});
