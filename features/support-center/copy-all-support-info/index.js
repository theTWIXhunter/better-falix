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
    // Check if server-display already exists
    const existingServerDisplay = document.querySelector('.server-display');
    if (existingServerDisplay && existingServerDisplay.querySelector('a[href*="ViewServer"]')) {
        console.log('[better-falix] copy-all-support-info: Server info already loaded');
        addCopyAllButton();
        return;
    }

    // Otherwise, wait for it to load dynamically
    console.log('[better-falix] copy-all-support-info: Waiting for server info to load...');
    const observer = new MutationObserver((mutations) => {
        const serverDisplay = document.querySelector('.server-display');
        if (serverDisplay && serverDisplay.querySelector('a[href*="ViewServer"]')) {
            console.log('[better-falix] copy-all-support-info: Server info detected, adding button');
            observer.disconnect();
            addCopyAllButton();
        }
    });

    observer.observe(document.body, {
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
    // Look for the visible server-display element instead of the hidden ticket-meta-item
    const serverDisplay = document.querySelector('.server-display');
    
    if (!serverDisplay) {
        console.log('[better-falix] copy-all-support-info: Server display not found');
        return;
    }

    console.log('[better-falix] copy-all-support-info: Server display found', serverDisplay);

    // Extract server ID from the text content (format: "Server #12345")
    const serverText = serverDisplay.querySelector('#serverText');
    
    if (!serverText) {
        console.log('[better-falix] copy-all-support-info: Server text not found. HTML:', serverDisplay.innerHTML);
        return;
    }
    
    console.log('[better-falix] copy-all-support-info: Server text found', serverText.textContent);
    
    const serverIdMatch = serverText.textContent.match(/Server #(\d+)/);
    const serverId = serverIdMatch ? serverIdMatch[1] : '';
    
    // Extract PIN from the server-pin-badge
    const pinBadge = serverDisplay.querySelector('.server-pin-badge');
    if (!pinBadge) {
        console.log('[better-falix] copy-all-support-info: PIN badge not found');
        return;
    }
    
    // Extract PIN from the text content (format: "PIN: 5665")
    const pinMatch = pinBadge.textContent.match(/PIN:\s*(\d+)/);
    const pin = pinMatch ? pinMatch[1] : '';
    
    console.log('[better-falix] copy-all-support-info: Server ID:', serverId, 'PIN:', pin);
    
    // Extract ticket ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get('id') || '';
    
    // Create the formatted support information
    const supportInfo = `Support Information:
Support ID: ${serverId}
Support PIN: ${pin}
Ticket: Support-center-${ticketId}`;

    // Create the button with styling to match the new server display
    const copyAllBtn = document.createElement('span');
    copyAllBtn.className = 'server-pin-badge';
    copyAllBtn.style.cssText = `
        background: rgba(var(--falcon-info-rgb), 0.15);
        color: rgb(var(--falcon-info-rgb));
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-left: 0.5rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        transition: all 0.2s;
    `;
    copyAllBtn.setAttribute('data-pin', supportInfo);
    copyAllBtn.setAttribute('title', 'Click to copy all support information');
    copyAllBtn.innerHTML = `Copy All`;
    
    // Add click handler
    copyAllBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        const textToCopy = this.getAttribute('data-pin');
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('[better-falix] copy-all-support-info: Support information copied to clipboard');
            
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = `Copied!`;
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('[better-falix] copy-all-support-info: Failed to copy text:', err);
        });
    });
    
    // Add the button after the PIN badge in the server-display span
    serverDisplay.appendChild(copyAllBtn);
    console.log('[better-falix] copy-all-support-info: Copy All button added successfully');
}
