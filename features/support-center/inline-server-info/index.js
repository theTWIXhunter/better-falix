// [better-falix] inline-server-info: Script loading
console.log('[better-falix] inline-server-info: Script loading');

chrome.storage.sync.get({ inlineServerInfo: false, enabled: true }, (data) => {
  if (!data.enabled || !data.inlineServerInfo) {
    console.log('[better-falix] inline-server-info: Script disabled');
    return;
  }
  console.log('[better-falix] inline-server-info: Script enabled');

  //  --------- START FEATURE ----------
  waitForServerButton();
});

function waitForServerButton() {
    console.log('[better-falix] inline-server-info: Waiting for server button with valid count...');
    
    let timeoutId = null;
    let observer = null;
    
    const cleanup = () => {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };
    
    const checkServerButton = () => {
        const serverButton = document.getElementById('serversModalBtn');
        const serverCountText = document.getElementById('serverCountText');
        
        if (serverButton && serverCountText) {
            const countText = serverCountText.textContent.trim();
            const serverCount = parseInt(countText.match(/\d+/)?.[0] || '0');
            
            // Make sure the count has been updated (not 0 or empty)
            if (countText && countText !== '0 Servers' && serverCount > 0) {
                console.log('[better-falix] inline-server-info: Server button found with count:', countText);
                cleanup();
                checkAndReplaceServerButton();
                return true;
            }
        }
        return false;
    };

    // Try immediately
    if (checkServerButton()) {
        return;
    }

    // If not ready, observe for changes
    observer = new MutationObserver(() => {
        if (checkServerButton()) {
            cleanup();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    timeoutId = setTimeout(() => {
        cleanup();
        console.log('[better-falix] inline-server-info: Timeout waiting for server button');
    }, 10000);
}

function checkAndReplaceServerButton() {
    const serverCountText = document.getElementById('serverCountText');
    if (!serverCountText) {
        console.log('[better-falix] inline-server-info: Server count text not found');
        return;
    }

    const countText = serverCountText.textContent.trim();
    // Extract just the number from text like "1 Server" or "2 Servers"
    const serverCount = parseInt(countText.match(/\d+/)?.[0] || '0');

    console.log('[better-falix] inline-server-info: Server count text:', countText, '| Parsed count:', serverCount);

    if (serverCount !== 1) {
        console.log('[better-falix] inline-server-info: Not exactly 1 server, skipping');
        return;
    }

    // Get server info from the modal
    getServerInfoFromModal();
}

function getServerInfoFromModal() {
    const modalBody = document.getElementById('serversModalBody');
    const serverButton = document.getElementById('serversModalBtn');
    const modal = document.getElementById('serversModal');
    
    if (!modalBody || !serverButton || !modal) {
        console.log('[better-falix] inline-server-info: Modal body, button, or modal element not found');
        return;
    }

    // Hide the modal before opening using opacity and pointer-events
    const originalOpacity = modal.style.opacity;
    const originalPointerEvents = modal.style.pointerEvents;
    const originalVisibility = modal.style.visibility;
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    modal.style.visibility = 'hidden';

    // Set up observer before triggering modal
    console.log('[better-falix] inline-server-info: Setting up modal observer and triggering modal open...');
    
    let foundInfo = false;
    let attemptCount = 0;
    
    const observer = new MutationObserver(() => {
        if (foundInfo) return;
        
        attemptCount++;
        console.log('[better-falix] inline-server-info: Modal mutation detected, attempt', attemptCount);
        
        const info = extractServerInfo(modalBody);
        if (info) {
            console.log('[better-falix] inline-server-info: Server info found in modal:', info);
            foundInfo = true;
            observer.disconnect();
            
            // Close the modal using Bootstrap's modal API
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
            
            // Restore modal visibility
            modal.style.removeProperty('opacity');
            modal.style.removeProperty('visibility');
            modal.style.removeProperty('pointer-events');
            
            replaceButtonWithInfo(info);
        } else {
            console.log('[better-falix] inline-server-info: Server info not yet complete in modal');
        }
    });

    observer.observe(modalBody, {
        childList: true,
        subtree: true
    });

    // Trigger the modal to open
    serverButton.click();
    
    // Force hide modal immediately after click (Bootstrap may override our styles)
    setTimeout(() => {
        modal.style.setProperty('opacity', '0', 'important');
        modal.style.setProperty('visibility', 'hidden', 'important');
        modal.style.setProperty('pointer-events', 'none', 'important');
    }, 0);

    setTimeout(() => {
        if (!foundInfo) {
            observer.disconnect();
            console.log('[better-falix] inline-server-info: Timeout waiting for modal content after', attemptCount, 'mutations');
            console.log('[better-falix] inline-server-info: Modal body content:', modalBody.innerHTML.substring(0, 200));
            
            // Close the modal if it's still open
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
            
            // Restore modal visibility
            modal.style.removeProperty('opacity');
            modal.style.removeProperty('visibility');
            modal.style.removeProperty('pointer-events');
        }
    }, 5000);
}

function extractServerInfo(modalBody) {
    // Find the link with target="_blank" that contains the server ID
    const serverLink = modalBody.querySelector('a[target="_blank"][href*="?id="]');
    
    // Look for PIN element
    const pinElement = Array.from(modalBody.querySelectorAll('div')).find(el => el.textContent.includes('PIN:'));

    console.log('[better-falix] inline-server-info: Extraction attempt - serverLink:', !!serverLink, 'pinElement:', !!pinElement);
    
    if (serverLink) {
        console.log('[better-falix] inline-server-info: Server link found - href:', serverLink.getAttribute('href'));
    }
    if (pinElement) {
        console.log('[better-falix] inline-server-info: PIN element found:', pinElement.textContent);
    }

    if (!serverLink || !pinElement) {
        return null;
    }

    // Get the href attribute (relative path) and extract ID from it
    const href = serverLink.getAttribute('href');
    const idMatch = href.match(/[?&]id=(\d+)/);
    
    const pinMatch = pinElement.textContent.match(/PIN:\s*(\d+)/);

    console.log('[better-falix] inline-server-info: Server ID from href:', idMatch?.[1], 'PIN match:', pinMatch?.[1]);

    if (!idMatch || !pinMatch) {
        return null;
    }

    return {
        serverId: idMatch[1],
        serverHref: href,
        pin: pinMatch[1]
    };
}

function replaceButtonWithInfo(serverInfo) {
    const serverButton = document.getElementById('serversModalBtn');
    if (!serverButton) {
        console.log('[better-falix] inline-server-info: Server button not found for replacement');
        return;
    }

    console.log('[better-falix] inline-server-info: Replacing button with inline info', serverInfo);

    // Create new inline display
    const inlineDisplay = document.createElement('span');
    inlineDisplay.className = 'participants-display inline-server-info';
    inlineDisplay.style.cssText = 'padding: 0.25rem 0.6rem; display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap;';

    // Server link - use the href from modal
    const serverLink = document.createElement('a');
    serverLink.href = serverInfo.serverHref;
    serverLink.target = '_blank';
    serverLink.textContent = `Server #${serverInfo.serverId}`;
    serverLink.style.cssText = 'color: rgba(59, 130, 246, 0.9); text-decoration: none; font-weight: 500;';
    serverLink.onmouseover = () => serverLink.style.textDecoration = 'underline';
    serverLink.onmouseout = () => serverLink.style.textDecoration = 'none';

    // PIN display with copy button
    const pinButton = document.createElement('button');
    pinButton.innerHTML = `${serverInfo.pin} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px; vertical-align: middle;">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>`;
    pinButton.style.cssText = 'background: rgba(249, 115, 22, 0.15); color: rgba(249, 115, 22, 0.9); border: 1px solid rgba(249, 115, 22, 0.3); padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 0.85em; font-weight: 500; display: inline-flex; align-items: center; transition: all 0.2s;';
    pinButton.title = 'Click to copy PIN';
    pinButton.onclick = (e) => {
        e.preventDefault();
        copyToClipboard(serverInfo.pin);
        showCopyFeedback(pinButton, 'PIN copied!');
    };
    pinButton.onmouseover = () => {
        pinButton.style.background = 'rgba(249, 115, 22, 0.25)';
    };
    pinButton.onmouseout = () => {
        pinButton.style.background = 'rgba(249, 115, 22, 0.15)';
    };

    // Copy all button
    const copyAllButton = document.createElement('button');
    copyAllButton.innerHTML = `Copy All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px; vertical-align: middle;">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>`;
    copyAllButton.style.cssText = 'background: rgba(34, 197, 94, 0.15); color: rgba(34, 197, 94, 0.9); border: 1px solid rgba(34, 197, 94, 0.3); padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 0.85em; font-weight: 500; display: inline-flex; align-items: center; transition: all 0.2s;';
    copyAllButton.title = 'Copy all server info';
    copyAllButton.onclick = (e) => {
        e.preventDefault();
        const ticketId = getTicketIdFromUrl();
        const fullServerUrl = `https://client.falixnodes.net${serverInfo.serverHref}`;
        const markdownText = `SupportID: [${serverInfo.serverId}](<${fullServerUrl}>)
SupportPIN: ${serverInfo.pin}
Ticket: [Support-center-#${ticketId}](<https://client.falixnodes.net/support/viewticket.php?id=${ticketId}>)`;
        copyToClipboard(markdownText);
        showCopyFeedback(copyAllButton, 'All info copied!');
    };
    copyAllButton.onmouseover = () => {
        copyAllButton.style.background = 'rgba(34, 197, 94, 0.25)';
    };
    copyAllButton.onmouseout = () => {
        copyAllButton.style.background = 'rgba(34, 197, 94, 0.15)';
    };

    // Assemble the inline display
    inlineDisplay.appendChild(serverLink);
    inlineDisplay.appendChild(pinButton);
    
    // Add spacing before Copy All
    const spacer = document.createElement('span');
    spacer.style.cssText = 'display: inline-block; width: 8px;';
    inlineDisplay.appendChild(spacer);
    
    inlineDisplay.appendChild(copyAllButton);

    // Replace the original button
    serverButton.parentNode.replaceChild(inlineDisplay, serverButton);
    console.log('[better-falix] inline-server-info: Button replaced successfully');
}

function getTicketIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'unknown';
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('[better-falix] inline-server-info: Copied to clipboard');
        }).catch(err => {
            console.error('[better-falix] inline-server-info: Failed to copy:', err);
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        console.log('[better-falix] inline-server-info: Copied using fallback method');
    } catch (err) {
        console.error('[better-falix] inline-server-info: Fallback copy failed:', err);
    }
    document.body.removeChild(textarea);
}

function showCopyFeedback(button, message) {
    const originalHTML = button.innerHTML;
    button.innerHTML = message;
    button.style.pointerEvents = 'none';
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.pointerEvents = 'auto';
    }, 1500);
}
