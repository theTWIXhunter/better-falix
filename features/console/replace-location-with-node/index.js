// [better-falix] Replace-location-with-Node: Script loading
console.log('[better-falix] Replace-location-with-Node: Script loading');

chrome.storage.sync.get({ replaceCpuWithNode: false, enabled: true }, (data) => {
  if (!data.enabled || !data.replaceCpuWithNode) {
    console.log('[better-falix] Replace-location-with-Node: Script disabled');
    return;
  }
  console.log('[better-falix] Replace-location-with-Node: Script enabled');

  // --------- START FEATURE ----------

  function replaceCpuWithNode() {
    // Find all info cards
    const cpuCards = document.querySelectorAll('.compact-info-card');
    console.log('[better-falix] Replace-location-with-Node: Found', cpuCards.length, 'compact info cards');
    
    let targetCard = null;
    
    // Look through all cards to find the one with "LOCATION" header
    cpuCards.forEach((card, index) => {
      const headerText = card.querySelector('.compact-info-header');
      
      if (headerText && headerText.textContent.trim().toUpperCase() === 'LOCATION') {
        targetCard = card;
        console.log('[better-falix] Replace-location-with-Node: Found LOCATION card at index', index);
      }
    });

    // Find the node information from the third span with class="support-info-text"
    // Also check the new modal structure created by replace-support-modal feature
    const supportInfoSpans = document.querySelectorAll('span.support-info-text');
    const supportInfoValues = document.querySelectorAll('.support-info-value');
    
    console.log('[better-falix] Replace-location-with-Node: Found', supportInfoSpans.length, 'support info spans');
    console.log('[better-falix] Replace-location-with-Node: Found', supportInfoValues.length, 'support info values');
    
    let nodeInfo = null;
    
    // Try to get node info from original structure first
    if (supportInfoSpans.length >= 3) {
      const fullText = supportInfoSpans[2].textContent.trim();
      // Extract just the node name (before " - CPU" part)
      nodeInfo = fullText.split(' - ')[0].trim();
      console.log('[better-falix] Replace-location-with-Node: Found node info from original structure:', nodeInfo);
    }
    // If that fails, try to get it from the new modal structure (replace-support-modal)
    // Look for the support-info-value that has "Node" as its label
    else if (supportInfoValues.length > 0) {
      // Find the value associated with "Node" label
      supportInfoValues.forEach((valueSpan, index) => {
        const parentDetails = valueSpan.closest('.support-info-details');
        if (parentDetails) {
          const labelSpan = parentDetails.querySelector('.support-info-label');
          if (labelSpan && labelSpan.textContent.trim().toLowerCase() === 'node') {
            const fullText = valueSpan.textContent.trim();
            // Extract just the node name (before " - CPU" part)
            nodeInfo = fullText.split(' - ')[0].trim();
            console.log('[better-falix] Replace-location-with-Node: Found node info from new modal structure:', nodeInfo);
          }
        }
      });
    }
    
    if (!nodeInfo) {
      console.log('[better-falix] Replace-location-with-Node: Node information not found in either structure');
      return;
    }

    // Replace the header text and icon in the card (if it exists)
    if (targetCard) {
      const headerElement = targetCard.querySelector('.compact-info-header');
      if (headerElement) {
        // Clear the header and add new text with the transfer icon
        headerElement.innerHTML = 'Server Node <svg class="svg-inline--fa" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M502.6 150.6l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L402.7 160 32 160c-17.7 0-32-14.3-32-32S14.3 96 32 96l370.7 0-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3zm-397.3 352l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L109.3 352 480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32l-370.7 0 41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z"></path></svg>';
      }

      // Replace the value with node information
      const valueElement = targetCard.querySelector('.compact-info-value span');
      if (valueElement) {
        valueElement.textContent = nodeInfo;
      }
    } else {
      console.log('[better-falix] Replace-location-with-Node: No LOCATION card found, skipping card replacement');
    }
    
    // Also replace in statusbar button - check all statusbar buttons
    document.querySelectorAll('button.statusbar-item').forEach(button => {
      // Look for the button with transfer server modal or has a flag image (location button)
      const hasTransferModal = button.getAttribute('data-bs-target') === '#transferserver';
      const hasFlag = button.querySelector('.statusbar-flag');
      
      if (hasTransferModal || hasFlag) {
        // Get all spans and find the one that's not a status dot
        const spans = button.querySelectorAll('span');
        spans.forEach(span => {
          // Skip spans that are status dots or have specific IDs
          if (!span.classList.contains('status-dot') && !span.id) {
            span.textContent = nodeInfo;
            console.log('[better-falix] Replace-location-with-Node: Also replaced statusbar location with node info');
          }
        });
      }
    });

    console.log('[better-falix] Replace-location-with-Node: Successfully replaced CPU info with node info');
  }

  // Wait for the page to load and then replace the CPU info
  function waitForElements() {
    const checkInterval = setInterval(() => {
      const cpuCard = document.querySelector('.compact-info-card');
      const supportInfoSpans = document.querySelectorAll('span.support-info-text');
      const supportInfoValues = document.querySelectorAll('.support-info-value');
      const statusbarButtons = document.querySelectorAll('button.statusbar-item');
      
      console.log('[better-falix] Replace-location-with-Node: Checking for elements...', {
        cpuCard: !!cpuCard,
        supportInfoSpans: supportInfoSpans.length,
        supportInfoValues: supportInfoValues.length,
        statusbarButtons: statusbarButtons.length
      });
      
      // Check if we have the card (we can at least change the header)
      // or if we have node info sources
      const hasNodeInfo = supportInfoSpans.length >= 3 || supportInfoValues.length >= 3;
      
      if (cpuCard || hasNodeInfo) {
        console.log('[better-falix] Replace-location-with-Node: Elements found, executing replacement');
        clearInterval(checkInterval);
        replaceCpuWithNode();
        
        // Also set up an observer for statusbar buttons that might load later
        setTimeout(() => {
          console.log('[better-falix] Replace-location-with-Node: Running delayed statusbar check');
          replaceCpuWithNode();
        }, 1000);
      }
    }, 100);

    // Stop checking after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);
  }

  // Start the process
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForElements);
  } else {
    waitForElements();
  }

  console.log('[better-falix] Replace-location-with-Node: Script loaded successfully');
});