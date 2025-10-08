// [better-falix] replaceSupportModal: Script loading
console.log('[better-falix] replaceSupportModal: Script loading');

chrome.storage.sync.get({ replaceSupportModal: false, enabled: true }, (data) => {
  if (!data.enabled || !data.replaceSupportModal) {
    console.log('[better-falix] replaceSupportModal: Script disabled');
    return;
  }
  console.log('[better-falix] replaceSupportModal: Script enabled');

  //  --------- START FEATURE ----------

  function hideSupportModalBody() {
    // Replace all modal-body elements that are support modals
    document.querySelectorAll('.modal-body').forEach((modalBody) => {
      if (
        modalBody.querySelector('.support-warning') &&
        modalBody.querySelector('.support-info-card')
      ) {
        // Get values from the original modal if possible
        const supportId = modalBody.querySelector('.support-info-text')?.textContent?.trim() || '';
        const supportPin = modalBody.querySelectorAll('.support-info-text')[1]?.textContent?.trim() || '';
        const nodeInfo = modalBody.querySelectorAll('.support-info-text')[2]?.textContent?.trim() || '';
        const serverName = modalBody.querySelector('.support-info-card:last-child .support-info-text')?.textContent?.trim() || '';

        // Add a copy button at the top that copies both values
        const copyAllBtn = `
          <button class="btn connect-inline-copy" id="bf-support-copy-all" style="margin-bottom:12px;" title="Copy all">
            <svg class="svg-inline--fa fa-copy" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"></path></svg>
            <span>Copy All</span>
          </button>
        `;

        const newHtml = `
      ${copyAllBtn}
      <div class="connect-steps" id="javaSteps">
        <div class="connect-bedrock-details">
          <div class="bedrock-detail-row">
            <span class="bedrock-label">Support ID:</span>
            <span class="bedrock-value">${supportId}</span>
            <button class="btn connect-inline-copy" onclick="copyConnectionInfo('${supportId}', this)" title="Copy address">
              <svg class="svg-inline--fa fa-copy" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"></path></svg>
            </button>
          </div>
          <div class="bedrock-detail-row">
            <span class="bedrock-label">Support PIN:</span><span class="bedrock-value">${supportPin}</span>
            <button class="btn connect-inline-copy" onclick="copyConnectionInfo('${supportPin}', this)" title="Copy to clipboard">
              <svg class="svg-inline--fa fa-copy" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"></path></svg>
            </button>
          </div>
          <div class="bedrock-detail-row">
            <span class="bedrock-label">Node:</span><span class="bedrock-value">${nodeInfo}</span>
            <button class="btn connect-inline-copy" onclick="copyConnectionInfo('${nodeInfo}', this)" title="Copy node info">
              <svg class="svg-inline--fa fa-copy" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"></path></svg>
            </button>
          </div>
        </div>
      </div>
      `;
        modalBody.innerHTML = newHtml;

        // Add copy event for the "Copy All" button
        setTimeout(() => {
          const btn = modalBody.querySelector('#bf-support-copy-all');
          if (btn) {
            btn.addEventListener('click', () => {
              const text = `Support ID: ${supportId}\nSupport PIN: ${supportPin}\nNode: ${nodeInfo}`;
              navigator.clipboard.writeText(text);
            });
          }
        }, 0);
      }
    });
  }

  function observeModals() {
    hideSupportModalBody();
    const observer = new MutationObserver(hideSupportModalBody);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeModals);
  } else {
    observeModals();
  }

  setTimeout(() => {
    console.log('[better-falix] replaceSupportModal: Script loaded successfully');
  }, 10);
});