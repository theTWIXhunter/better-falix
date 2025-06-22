// [better-falix] editor-wrapper-height: Script loading
console.log('[better-falix] editor-wrapper-height: Script loading');

let isEditorFullscreen = false;

function setEditorHeight() {
  // Only set height if not in fullscreen mode
  if (isEditorFullscreen) return;
  chrome.storage.sync.get({ editorWrapperHeight: false, editorWrapperHeight_value: 600, enabled: true }, (data) => {
    if (!data.enabled || !data.editorWrapperHeight) {
      // Remove our height if not enabled
      document.querySelectorAll('.editor-wrapper').forEach(el => {
        el.style.removeProperty('height');
      });
      return;
    }
    const height = parseInt(data.editorWrapperHeight_value, 10) || 600;
    document.querySelectorAll('.editor-wrapper').forEach(el => {
      // Only set height if not in fullscreen mode
      if (!isEditorFullscreen) {
        el.style.height = height + 'px';
      }
      // Try to trigger a resize event for editors inside
      // Monaco editor uses .monaco-editor, Ace uses .ace_editor
      const monaco = el.querySelector('.monaco-editor');
      if (monaco && monaco.layout) {
        monaco.layout();
      }
      // Force a resize event for any textarea or contenteditable
      el.querySelectorAll('textarea, [contenteditable="true"]').forEach(input => {
        input.style.height = '100%';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });
    });
    // Optionally, also set #text-container-editor if needed
    document.querySelectorAll('#text-container-editor').forEach(el => {
      el.style.height = '100%';
    });

    // Dispatch a window resize event to force editors to recalculate layout
    window.dispatchEvent(new Event('resize'));
  });
}

function observeAndApplyEditorHeight() {
  setEditorHeight();
  const observer = new MutationObserver(setEditorHeight);
  observer.observe(document.body, { childList: true, subtree: true });
}

// Listen for fullscreen mode changes from the fullscreen feature
window.addEventListener('bf-editor-fullscreen', (e) => {
  isEditorFullscreen = !!(e && e.detail && e.detail.fullscreen);
  if (!isEditorFullscreen) {
    setEditorHeight();
  } else {
    // Remove our height override in fullscreen
    document.querySelectorAll('.editor-wrapper').forEach(el => {
      el.style.removeProperty('height');
    });
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeAndApplyEditorHeight);
} else {
  observeAndApplyEditorHeight();
}

setTimeout(() => {
  console.log('[better-falix] editor-wrapper-height: Script loaded successfully');
}, 10);
