// [better-falix] auto-collapse-log-analysis: Script loading
console.log('[better-falix] auto-collapse-log-analysis: Script loading');

chrome.storage.sync.get({ autoCollapseLogAnalysis: false, enabled: true }, (data) => {
  if (!data.enabled || !data.autoCollapseLogAnalysis) {
    console.log('[better-falix] auto-collapse-log-analysis: Script disabled');
    return;
  }
  console.log('[better-falix] auto-collapse-log-analysis: Script enabled');

  //  --------- START FEATURE ----------

  function autoCollapseAnalysis() {
    const collapseButton = document.querySelector('.collapse-btn');
    if (!collapseButton) {
      console.log('[better-falix] auto-collapse-log-analysis: Collapse button not found');
      return;
    }

    const spanElement = collapseButton.querySelector('span');
    if (!spanElement) {
      console.log('[better-falix] auto-collapse-log-analysis: Span element not found in collapse button');
      return;
    }

    // Check if analysis is currently open (button shows "Hide")
    if (spanElement.textContent.trim() === 'Hide') {
      // Trigger the collapse by calling the onclick function
      if (typeof window.toggleAnalysisCollapse === 'function') {
        window.toggleAnalysisCollapse();
        console.log('[better-falix] auto-collapse-log-analysis: Successfully collapsed log analysis');
      } else {
        // Fallback: trigger click event
        collapseButton.click();
        console.log('[better-falix] auto-collapse-log-analysis: Collapsed log analysis using click event');
      }
    } else {
      console.log('[better-falix] auto-collapse-log-analysis: Log analysis already collapsed');
    }
  }

  // Wait for the collapse button to be available
  function waitForCollapseButton() {
    const collapseButton = document.querySelector('.collapse-btn');
    if (collapseButton) {
      // Wait a short moment for the page to fully load before collapsing
      setTimeout(autoCollapseAnalysis, 100);
    } else {
      setTimeout(waitForCollapseButton, 200);
    }
  }

  // Start the process
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForCollapseButton);
  } else {
    waitForCollapseButton();
  }

  setTimeout(() => {
    console.log('[better-falix] auto-collapse-log-analysis: Script loaded successfully');
  }, 10);
});
