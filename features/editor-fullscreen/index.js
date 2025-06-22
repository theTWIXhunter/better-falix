// [better-falix] editor-fullscreen: Script loading
console.log('[better-falix] editor-fullscreen: Script loading');

chrome.storage.sync.get({ editorFullscreen: false, enabled: true }, (data) => {
  if (!data.enabled) {
    console.log('[better-falix] editor-fullscreen: Script disabled');
    return;
  }
  console.log('[better-falix] editor-fullscreen: Script enabled');

  function addFullscreenButton() {
    // Find the toolbar
    const toolbar = document.querySelector('.editor-toolbar.d-flex');
    if (!toolbar || toolbar.querySelector('#editorFullscreenBtn')) return;

    // Create the button
    const btn = document.createElement('button');
    btn.id = 'editorFullscreenBtn';
    btn.className = 'px-3';
    btn.title = 'Toggle Fullscreen Editor';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;">
        <path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" stroke="#b0b8c1" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span style="margin-left:4px;">Fullscreen</span>
    `;
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.gap = '2px';

    // Insert after autosave toggle (or at end if not found)
    const autosave = toolbar.querySelector('#autosave-toggle')?.parentElement;
    if (autosave && autosave.nextSibling) {
      toolbar.insertBefore(btn, autosave.nextSibling);
    } else {
      toolbar.appendChild(btn);
    }

    // Fullscreen logic
    let isFullscreen = false;
    let prevStyles = {};

    btn.addEventListener('click', () => {
      const editorWrapper = document.querySelector('.editor-wrapper');
      const editorContainer = document.querySelector('.editor-container');
      const toolbar = document.querySelector('.editor-toolbar.d-flex');
      if (!editorWrapper || !editorContainer || !toolbar) return;

      if (!isFullscreen) {
        // Save previous styles
        prevStyles = {
          wrapper: editorWrapper.style.cssText,
          container: editorContainer.style.cssText,
          toolbar: toolbar.style.cssText,
          bodyOverflow: document.body.style.overflow,
        };
        // Hide everything except toolbar and editor-container
        Array.from(document.body.children).forEach(child => {
          if (
            !child.classList.contains('editor-wrapper') &&
            !child.classList.contains('modal-backdrop')
          ) {
            child.style.display = 'none';
          }
        });
        // Make editor-wrapper fill viewport
        editorWrapper.style.position = 'fixed';
        editorWrapper.style.top = '0';
        editorWrapper.style.left = '0';
        editorWrapper.style.width = '100vw';
        editorWrapper.style.height = '100vh';
        editorWrapper.style.zIndex = '99999';
        editorWrapper.style.background = '#181c20';
        editorWrapper.style.margin = '0';
        editorWrapper.style.padding = '0';
        // Make editor-container fill
        editorContainer.style.height = 'calc(100vh - 56px)';
        editorContainer.style.width = '100vw';
        editorContainer.style.background = '#141920';
        editorContainer.style.margin = '0';
        editorContainer.style.padding = '0';
        // Toolbar full width
        toolbar.style.width = '100vw';
        toolbar.style.position = 'relative';
        toolbar.style.zIndex = '100000';
        // Prevent scroll
        document.body.style.overflow = 'hidden';

        btn.querySelector('span').textContent = 'Exit Fullscreen';
        isFullscreen = true;
      } else {
        // Restore everything
        Array.from(document.body.children).forEach(child => {
          if (
            !child.classList.contains('editor-wrapper') &&
            !child.classList.contains('modal-backdrop')
          ) {
            child.style.display = '';
          }
        });
        editorWrapper.style.cssText = prevStyles.wrapper || '';
        editorContainer.style.cssText = prevStyles.container || '';
        toolbar.style.cssText = prevStyles.toolbar || '';
        document.body.style.overflow = prevStyles.bodyOverflow || '';
        btn.querySelector('span').textContent = 'Fullscreen';
        isFullscreen = false;
      }
      // Trigger resize for editors
      window.dispatchEvent(new Event('resize'));
    });
  }

  function waitForToolbar() {
    const toolbar = document.querySelector('.editor-toolbar.d-flex');
    if (toolbar) {
      addFullscreenButton();
    } else {
      setTimeout(waitForToolbar, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForToolbar);
  } else {
    waitForToolbar();
  }

  setTimeout(() => {
    console.log('[better-falix] editor-fullscreen: Script loaded successfully');
  }, 10);
});
