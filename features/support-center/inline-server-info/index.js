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
    const serverButton = document.getElementById('serversModalBtn');
    if (serverButton) {
        console.log('[better-falix] inline-server-info: Server button found');
        checkAndReplaceServerButton();
        return;
    }

    console.log('[better-falix] inline-server-info: Waiting for server button...');
    const observer = new MutationObserver(() => {
        const btn = document.getElementById('serversModalBtn');
        if (btn) {
            console.log('[better-falix] inline-server-info: Server button detected');
            observer.disconnect();
            checkAndReplaceServerButton();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    setTimeout(() => {
        observer.disconnect();
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
    // Wait for modal body to be populated
    const modalBody = document.getElementById('serversModalBody');
    if (!modalBody) {
        console.log('[better-falix] inline-server-info: Modal body not found');
        return;
    }

    // Try to get server info immediately
    const serverInfo = extractServerInfo(modalBody);
    if (serverInfo) {
        replaceButtonWithInfo(serverInfo);
        return;
    }

    // If not found, observe for changes
    console.log('[better-falix] inline-server-info: Observing modal for server info...');
    const observer = new MutationObserver(() => {
        const info = extractServerInfo(modalBody);
        if (info) {
            console.log('[better-falix] inline-server-info: Server info found in modal');
            observer.disconnect();
            replaceButtonWithInfo(info);
        }
    });

    observer.observe(modalBody, {
        childList: true,
        subtree: true
    });

    setTimeout(() => {
        observer.disconnect();
        console.log('[better-falix] inline-server-info: Timeout waiting for modal content');
    }, 5000);
}

function extractServerInfo(modalBody) {
    const serverLink = modalBody.querySelector('a[href*="/staff/ViewServer"]');
    const pinElement = modalBody.querySelector('div[style*="font-size: 0.8rem"]');

    if (!serverLink || !pinElement) {
        return null;
    }

    const staffLink = serverLink.href;
    const serverIdMatch = serverLink.textContent.match(/Server #(\d+)/);
    const pinMatch = pinElement.textContent.match(/PIN:\s*(\d+)/);

    if (!serverIdMatch || !pinMatch) {
        return null;
    }

    return {
        serverId: serverIdMatch[1],
        staffLink: staffLink,
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

    // Server link
    const serverLink = document.createElement('a');
    serverLink.href = serverInfo.staffLink;
    serverLink.target = '_blank';
    serverLink.textContent = `Server #${serverInfo.serverId}`;
    serverLink.style.cssText = 'color: rgba(59, 130, 246, 0.9); text-decoration: none; font-weight: 500;';
    serverLink.onmouseover = () => serverLink.style.textDecoration = 'underline';
    serverLink.onmouseout = () => serverLink.style.textDecoration = 'none';

    // PIN copy button
    const pinButton = document.createElement('button');
    pinButton.textContent = serverInfo.pin;
    pinButton.style.cssText = 'background: rgba(59, 130, 246, 0.15); color: rgba(59, 130, 246, 0.9); border: 1px solid rgba(59, 130, 246, 0.3); padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 0.85em; font-weight: 500; transition: all 0.2s;';
    pinButton.title = 'Click to copy PIN';
    pinButton.onclick = (e) => {
        e.preventDefault();
        copyToClipboard(serverInfo.pin);
        showCopyFeedback(pinButton, 'PIN copied!');
    };
    pinButton.onmouseover = () => {
        pinButton.style.background = 'rgba(59, 130, 246, 0.25)';
    };
    pinButton.onmouseout = () => {
        pinButton.style.background = 'rgba(59, 130, 246, 0.15)';
    };

    // Copy all button
    const copyAllButton = document.createElement('button');
    copyAllButton.textContent = 'Copy All';
    copyAllButton.style.cssText = 'background: rgba(34, 197, 94, 0.15); color: rgba(34, 197, 94, 0.9); border: 1px solid rgba(34, 197, 94, 0.3); padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 0.85em; font-weight: 500; transition: all 0.2s;';
    copyAllButton.title = 'Copy all server info';
    copyAllButton.onclick = (e) => {
        e.preventDefault();
        const ticketId = getTicketIdFromUrl();
        const markdownText = `SupportID: [${serverInfo.serverId}](${serverInfo.staffLink})
SupportPIN: ${serverInfo.pin}
Ticket: [Support-center-#${ticketId}](https://client.falixnodes.net/support/viewticket.php?id=${ticketId})`;
        copyToClipboard(markdownText);
        showCopyFeedback(copyAllButton, 'All info copied!');
    };
    copyAllButton.onmouseover = () => {
        copyAllButton.style.background = 'rgba(34, 197, 94, 0.25)';
    };
    copyAllButton.onmouseout = () => {
        copyAllButton.style.background = 'rgba(34, 197, 94, 0.15)';
    };

    // Add separator dots
    const separator1 = document.createElement('span');
    separator1.textContent = '•';
    separator1.style.cssText = 'color: rgba(255, 255, 255, 0.3); font-size: 0.8em;';

    const separator2 = document.createElement('span');
    separator2.textContent = '•';
    separator2.style.cssText = 'color: rgba(255, 255, 255, 0.3); font-size: 0.8em;';

    // Assemble the inline display
    inlineDisplay.appendChild(serverLink);
    inlineDisplay.appendChild(separator1);
    inlineDisplay.appendChild(pinButton);
    inlineDisplay.appendChild(separator2);
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
    const originalText = button.textContent;
    button.textContent = message;
    button.style.pointerEvents = 'none';
    setTimeout(() => {
        button.textContent = originalText;
        button.style.pointerEvents = 'auto';
    }, 1500);
}
