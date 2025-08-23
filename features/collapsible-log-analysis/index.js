// [better-falix] collapsible-log-analysis: Script loading
console.log('[better-falix] collapsible-log-analysis: Script loading');

chrome.storage.sync.get({ collapsibleLogAnalysis: false, collapsibleLogAnalysis_autoCollapse: true, enabled: true }, (data) => {
  if (!data.enabled || !data.collapsibleLogAnalysis) {
    console.log('[better-falix] collapsible-log-analysis: Script disabled');
    return;
  }
  console.log('[better-falix] collapsible-log-analysis: Script enabled');

  //  --------- START FEATURE ----------

  function addCollapseButton() {
    const analysisSection = document.querySelector('.analysis-section');
    if (!analysisSection) return;

    const analysisHeader = analysisSection.querySelector('.analysis-header');
    if (!analysisHeader) return;

    // Check if button already exists
    if (analysisHeader.querySelector('.collapse-btn')) return;

    // Create collapse button
    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'collapse-btn';
    collapseBtn.setAttribute('aria-label', 'Toggle Log Analysis');
    collapseBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    // Add styles
    collapseBtn.style.cssText = `
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background-color 0.2s, transform 0.2s;
      opacity: 0.7;
    `;

    // Style the header to be a flex container
    analysisHeader.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
    `;

    // Add hover effects
    collapseBtn.addEventListener('mouseenter', () => {
      collapseBtn.style.opacity = '1';
      collapseBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });

    collapseBtn.addEventListener('mouseleave', () => {
      collapseBtn.style.opacity = '0.7';
      collapseBtn.style.backgroundColor = 'transparent';
    });

    // Add click functionality
    collapseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const analysisContent = analysisSection.querySelector('#analysis-content');
      if (!analysisContent) return;

      const isCollapsed = analysisContent.style.display === 'none';
      
      if (isCollapsed) {
        // Expand
        analysisContent.style.display = 'block';
        collapseBtn.style.transform = 'rotate(0deg)';
        collapseBtn.setAttribute('aria-label', 'Collapse Log Analysis');
        // Restore margin-bottom when expanded
        analysisHeader.style.marginBottom = '';
      } else {
        // Collapse
        analysisContent.style.display = 'none';
        collapseBtn.style.transform = 'rotate(-90deg)';
        collapseBtn.setAttribute('aria-label', 'Expand Log Analysis');
        // Remove margin-bottom when collapsed
        analysisHeader.style.marginBottom = '0px';
      }
    });

    // Insert the button at the end of the header
    analysisHeader.appendChild(collapseBtn);
    
    // Auto-collapse if the setting is enabled
    if (data.collapsibleLogAnalysis_autoCollapse) {
      const analysisContent = analysisSection.querySelector('#analysis-content');
      if (analysisContent) {
        analysisContent.style.display = 'none';
        collapseBtn.style.transform = 'rotate(-90deg)';
        collapseBtn.setAttribute('aria-label', 'Expand Log Analysis');
        analysisHeader.style.marginBottom = '0px';
        console.log('[better-falix] collapsible-log-analysis: Auto-collapsed log analysis');
      }
    }
    
    console.log('[better-falix] collapsible-log-analysis: Collapse button added to Log Analysis');
  }

  // Run immediately
  addCollapseButton();

  // Also observe for dynamic content
  const observer = new MutationObserver(() => {
    addCollapseButton();
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    console.log('[better-falix] collapsible-log-analysis: Script loaded successfully');
  }, 10);
});
