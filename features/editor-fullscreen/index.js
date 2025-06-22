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
    let prevDisplay = new Map();

    btn.addEventListener('click', () => {
      const editorWrapper = document.querySelector('.editor-wrapper');
      const editorContainer = document.querySelector('.editor-container');
      const toolbar = document.querySelector('.editor-toolbar.d-flex');
      const breadcrumb = document.querySelector('.editor-breadcrumb');
      const header = document.querySelector('.editor-header.py-3.px-4');
      if (!editorWrapper || !editorContainer || !toolbar) return;

      if (!isFullscreen) {
        // Save previous styles and display for all body children
        prevStyles = {
          wrapper: editorWrapper.style.cssText,
          container: editorContainer.style.cssText,
          toolbar: toolbar.style.cssText,
          bodyOverflow: document.body.style.overflow,
          breadcrumb: breadcrumb ? breadcrumb.style.display : undefined,
          header: header ? header.style.display : undefined
        };
        prevDisplay.clear();
        Array.from(document.body.children).forEach(child => {
          prevDisplay.set(child, child.style.display);
          if (
            child !== editorWrapper &&
            !child.contains(editorWrapper) &&
            !editorWrapper.contains(child) &&
            !child.classList.contains('modal-backdrop')
          ) {
            child.style.display = 'none';
          }
        });
        // Remove editor-breadcrumb and editor-header
        if (breadcrumb) breadcrumb.style.display = 'none';
        if (header) header.style.display = 'none';

        // Remove unwanted styles from editor-wrapper and override height
        editorWrapper.style.position = 'fixed';
        editorWrapper.style.top = '0';
        editorWrapper.style.left = '0';
        editorWrapper.style.width = '100vw';
        // Remove any inline height set by other features
        editorWrapper.style.removeProperty('height');
        // Remove !important height if set by other features
        editorWrapper.setAttribute('style',
          editorWrapper.getAttribute('style')
            .replace(/height\s*:\s*[^;]+;?/gi, '')
        );
        // Now force fullscreen height
        editorWrapper.style.setProperty('height', '100vh', 'important');
        editorWrapper.style.zIndex = '99999';
        editorWrapper.style.background = '#181c20';
        editorWrapper.style.margin = '0';
        editorWrapper.style.padding = '0';
        editorWrapper.style.border = 'none';
        editorWrapper.style.borderRadius = '0';
        editorWrapper.style.overflow = 'unset';
        editorWrapper.style.boxShadow = 'none';
        editorWrapper.style.backgroundImage = 'none';
        editorWrapper.style.background = '#181c20';

        // Make editor-container fill
        editorContainer.style.height = 'calc(100vh - 56px)';
        editorContainer.style.width = '100vw';
        editorContainer.style.background = '#141920';
        editorContainer.style.margin = '0';
        editorContainer.style.padding = '0';

        // Toolbar full width, transparent background
        toolbar.style.width = '100vw';
        toolbar.style.position = 'relative';
        toolbar.style.zIndex = '100000';
        toolbar.style.background = 'transparent';

        // Prevent scroll
        document.body.style.overflow = 'hidden';

        btn.querySelector('span').textContent = 'Exit Fullscreen';
        isFullscreen = true;
      } else {
        // Restore everything
        prevDisplay.forEach((display, child) => {
          child.style.display = display;
        });
        editorWrapper.style.cssText = prevStyles.wrapper || '';
        editorContainer.style.cssText = prevStyles.container || '';
        toolbar.style.cssText = prevStyles.toolbar || '';
        document.body.style.overflow = prevStyles.bodyOverflow || '';
        if (breadcrumb && typeof prevStyles.breadcrumb !== 'undefined') {
          breadcrumb.style.display = prevStyles.breadcrumb;
        }
        if (header && typeof prevStyles.header !== 'undefined') {
          header.style.display = prevStyles.header;
        }
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
