// [better-falix] better-editor-fullscreen: Script loading
console.log('[better-falix] better-editor-fullscreen: Script loading');

chrome.storage.sync.get({ betterEditorFullscreen: false, enabled: true }, (data) => {
  if (!data.enabled || !data.betterEditorFullscreen) {
    console.log('[better-falix] better-editor-fullscreen: Script disabled');
    return;
  }
  console.log('[better-falix] better-editor-fullscreen: Script enabled');

  //  --------- START FEATURE ----------

  function handleFullscreenState() {
    const editorWrapper = document.querySelector('.editor-wrapper');
    const editorHeader = document.querySelector('.editor-header.py-3.px-4');
    const editorBreadcrumb = document.querySelector('.editor-breadcrumb');
    
    if (!editorWrapper) return;
    
    const isFullscreen = editorWrapper.classList.contains('editor-fullscreen');
    
    if (isFullscreen) {
      // Hide elements when in fullscreen
      if (editorHeader) {
        editorHeader.style.display = 'none';
        console.log('[better-falix] better-editor-fullscreen: Hidden editor header');
      }
      if (editorBreadcrumb) {
        editorBreadcrumb.style.display = 'none';
        console.log('[better-falix] better-editor-fullscreen: Hidden editor breadcrumb');
      }
    } else {
      // Show elements when not in fullscreen
      if (editorHeader) {
        editorHeader.style.display = '';
        console.log('[better-falix] better-editor-fullscreen: Shown editor header');
      }
      if (editorBreadcrumb) {
        editorBreadcrumb.style.display = '';
        console.log('[better-falix] better-editor-fullscreen: Shown editor breadcrumb');
      }
    }
  }

  // Initial check
  handleFullscreenState();

  // Observe for class changes on the editor-wrapper
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        if (target.classList.contains('editor-wrapper')) {
          handleFullscreenState();
        }
      }
    });
  });

  // Start observing the editor wrapper for class changes
  const editorWrapper = document.querySelector('.editor-wrapper');
  if (editorWrapper) {
    observer.observe(editorWrapper, { attributes: true, attributeFilter: ['class'] });
    console.log('[better-falix] better-editor-fullscreen: Started observing editor wrapper');
  }

  // Also observe the document body for new editor wrappers being added
  const bodyObserver = new MutationObserver(() => {
    const newEditorWrapper = document.querySelector('.editor-wrapper');
    if (newEditorWrapper && !newEditorWrapper.hasAttribute('data-bf-fullscreen-observed')) {
      newEditorWrapper.setAttribute('data-bf-fullscreen-observed', 'true');
      observer.observe(newEditorWrapper, { attributes: true, attributeFilter: ['class'] });
      handleFullscreenState();
      console.log('[better-falix] better-editor-fullscreen: Found new editor wrapper, started observing');
    }
  });
  
  bodyObserver.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] better-editor-fullscreen: Script loaded successfully');
  }, 10);
});
