console.log('[better-falix] copy-all-support-info: Script loaded');

chrome.storage.sync.get(['copyAllSupportInfo'], function(result) {
    if (result.copyAllSupportInfo) {
        console.log('[better-falix] copy-all-support-info: Feature enabled');
        addCopyAllButton();
    } else {
        console.log('[better-falix] copy-all-support-info: Feature disabled');
    }
});

function addCopyAllButton() {
    const ticketMetaItem = document.querySelector('span.ticket-meta-item#server-info-value');
    
    if (!ticketMetaItem) {
        console.log('[better-falix] copy-all-support-info: Ticket meta item not found');
        return;
    }

    // Extract server ID from the link
    const serverLink = ticketMetaItem.querySelector('a[href*="/admin/ViewServer?id="]');
    if (!serverLink) {
        console.log('[better-falix] copy-all-support-info: Server link not found');
        return;
    }
    
    const serverIdMatch = serverLink.href.match(/id=(\d+)/);
    const serverId = serverIdMatch ? serverIdMatch[1] : '';
    
    // Extract PIN from the span
    const pinElement = ticketMetaItem.querySelector('#serverPinCode');
    const pin = pinElement ? pinElement.textContent.trim() : '';
    
    // Extract ticket ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get('id') || '';
    
    // Create the formatted support information
    const supportInfo = `Support Information:
Support ID: [${serverId}](https://client.falixnodes.net/admin/ViewServer?id=${serverId})
Support PIN: ${pin}
Ticket: [Support-center-${ticketId}](https://client.falixnodes.net/support/viewticket.php?id=${ticketId})`;

    // Create the button
    const copyAllBtn = document.createElement('button');
    copyAllBtn.className = 'copy-pin-btn';
    copyAllBtn.setAttribute('data-pin', supportInfo);
    copyAllBtn.innerHTML = `
        <svg class="svg-inline--fa fa-copy me-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"></path></svg>Copy All
    `;
    
    // Add click handler
    copyAllBtn.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-pin');
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('[better-falix] copy-all-support-info: Support information copied to clipboard');
            
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = `
                <svg class="svg-inline--fa fa-check me-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg>Copied!
            `;
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('[better-falix] copy-all-support-info: Failed to copy text:', err);
        });
    });
    
    // Add the button as the last child of the ticket-meta-item div
    const innerDiv = ticketMetaItem.querySelector('div');
    if (innerDiv) {
        innerDiv.appendChild(copyAllBtn);
        console.log('[better-falix] copy-all-support-info: Copy All button added successfully');
    } else {
        console.log('[better-falix] copy-all-support-info: Inner div not found');
    }
}
