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

    // Replace location in the new .csb-location card
    const locationCards = document.querySelectorAll('.csb-location');
    locationCards.forEach(locationCard => {
      // Keep the image, update text
      const img = locationCard.querySelector('img');
      if (img) {
        locationCard.innerHTML = '';
        locationCard.appendChild(img);
        locationCard.appendChild(document.createTextNode(' ' + nodeInfo));
      } else {
        locationCard.textContent = nodeInfo;
      }
      console.log('[better-falix] Replace-location-with-Node: Replaced location card text with node info');
    });

    console.log('[better-falix] Replace-location-with-Node: Successfully replaced location info with node info');
  }

  // Wait for the page to load and then replace the CPU info
  function waitForElements() {
    const checkInterval = setInterval(() => {
      const locationCard = document.querySelector('.csb-location');
      const supportInfoSpans = document.querySelectorAll('span.support-info-text');
      const supportInfoValues = document.querySelectorAll('.support-info-value');
      
      console.log('[better-falix] Replace-location-with-Node: Checking for elements...', {
        locationCard: !!locationCard,
        supportInfoSpans: supportInfoSpans.length,
        supportInfoValues: supportInfoValues.length
      });
      
      // Check if we have the card (we can at least change the header)
      // or if we have node info sources
      const hasNodeInfo = supportInfoSpans.length >= 3 || supportInfoValues.length >= 3;
      
      if (locationCard || hasNodeInfo) {
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