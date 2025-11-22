console.log('[better-falix] copy-all-support-info: Script loaded');

chrome.storage.sync.get(['copyAllSupportInfo'], function(result) {
    if (result.copyAllSupportInfo) {
        console.log('[better-falix] copy-all-support-info: Feature enabled');
        waitForServerInfo();
    } else {
        console.log('[better-falix] copy-all-support-info: Feature disabled');
    }
});

function waitForServerInfo() {
    const ticketMetaItem = document.querySelector('span.ticket-meta-item#server-info-value');
    
    if (!ticketMetaItem) {
        console.log('[better-falix] copy-all-support-info: Ticket meta item not found');
        return;
    }

    // Check if server link already exists
    const existingLink = ticketMetaItem.querySelector('a[href*="ViewServer"]');
    if (existingLink) {
        console.log('[better-falix] copy-all-support-info: Server info already loaded');
        addCopyAllButton();
        return;
    }

    // Otherwise, wait for it to load dynamically
    console.log('[better-falix] copy-all-support-info: Waiting for server info to load...');
    const observer = new MutationObserver((mutations) => {
        const serverLink = ticketMetaItem.querySelector('a[href*="ViewServer"]');
        if (serverLink) {
            console.log('[better-falix] copy-all-support-info: Server info detected, adding button');
            observer.disconnect();
            addCopyAllButton();
        }
    });

    observer.observe(ticketMetaItem, {
        childList: true,
        subtree: true
    });

    // Timeout after 10 seconds
    setTimeout(() => {
        observer.disconnect();
        console.log('[better-falix] copy-all-support-info: Timeout waiting for server info');
    }, 10000);
}

function addCopyAllButton() {
    const ticketMetaItem = document.querySelector('span.ticket-meta-item#server-info-value');
    
    if (!ticketMetaItem) {
        console.log('[better-falix] copy-all-support-info: Ticket meta item not found');
        return;
    }

    console.log('[better-falix] copy-all-support-info: Ticket meta item found', ticketMetaItem);

    // Extract server ID from the link - try multiple selectors
    let serverLink = ticketMetaItem.querySelector('a[href*="/admin/ViewServer?id="]');
    if (!serverLink) {
        serverLink = ticketMetaItem.querySelector('a[href*="ViewServer"]');
    }
    if (!serverLink) {
        serverLink = ticketMetaItem.querySelector('a');
    }
    
    if (!serverLink) {
        console.log('[better-falix] copy-all-support-info: Server link not found. HTML:', ticketMetaItem.innerHTML);
        return;
    }
    
    console.log('[better-falix] copy-all-support-info: Server link found', serverLink.href);
    
    const serverIdMatch = serverLink.href.match(/id=(\d+)/);
    const serverId = serverIdMatch ? serverIdMatch[1] : '';
    
    // Extract PIN from the new structure (.server-pin-badge)
    let pin = '';
    const pinBadge = ticketMetaItem.querySelector('.server-pin-badge');
    if (pinBadge) {
        // Extract PIN from the text content (format: "PIN: 5665")
        const pinMatch = pinBadge.textContent.match(/PIN:\s*(\d+)/);
        pin = pinMatch ? pinMatch[1] : '';
    } else {
        // Fallback to old structure
        const pinElement = ticketMetaItem.querySelector('#serverPinCode');
        pin = pinElement ? pinElement.textContent.trim() : '';
    }
    
    console.log('[better-falix] copy-all-support-info: Server ID:', serverId, 'PIN:', pin);
    
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
