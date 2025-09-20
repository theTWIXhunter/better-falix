// [better-falix] default-all-status: Script loading
console.log('[better-falix] default-all-status: Script loading');

chrome.storage.sync.get({ defaultAllStatus: false, enabled: true }, (data) => {
  if (!data.enabled || !data.defaultAllStatus) {
    console.log('[better-falix] default-all-status: Script disabled');
    return;
  }
  console.log('[better-falix] default-all-status: Script enabled');

  //  --------- START FEATURE ----------

  function setDefaultStatusFilter() {
    // Find the status filter dropdown
    const statusFilter = document.getElementById('statusFilter');
    
    if (statusFilter) {
      // Remove 'selected' from any option
      Array.from(statusFilter.options).forEach(option => {
        option.removeAttribute('selected');
      });
      
      // Set 'All Status' as selected
      const allStatusOption = Array.from(statusFilter.options).find(option => 
        option.value === 'all' || option.textContent.trim() === 'All Status'
      );
      
      if (allStatusOption) {
        allStatusOption.setAttribute('selected', '');
        statusFilter.value = 'all';
        
        // Dispatch change event to trigger any listeners
        const event = new Event('change', { bubbles: true });
        statusFilter.dispatchEvent(event);
        
        console.log('[better-falix] default-all-status: Set All Status as default option');
      } else {
        console.log('[better-falix] default-all-status: All Status option not found');
      }
    }
  }

  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setDefaultStatusFilter);
  } else {
    setDefaultStatusFilter();
  }
  
  // Also run when page content changes to catch dynamically loaded filters
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        for (const node of mutation.addedNodes) {
          if (node.id === 'statusFilter' || 
              (node.nodeType === Node.ELEMENT_NODE && node.querySelector('#statusFilter'))) {
            setTimeout(setDefaultStatusFilter, 10);
            break;
          }
        }
      }
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] default-all-status: Script loaded successfully');
  }, 10);
});