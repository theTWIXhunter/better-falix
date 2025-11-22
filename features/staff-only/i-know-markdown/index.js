// [better-falix] i-know-markdown: Script loading
console.log('[better-falix] i-know-markdown: Script loading');

chrome.storage.sync.get({ enabled: true, iKnowMarkdown: false }, (data) => {
  if (!data.enabled || !data.iKnowMarkdown) {
    console.log('[better-falix] i-know-markdown: Script disabled');
    return;
  }
  console.log('[better-falix] i-know-markdown: Script enabled');

  //  --------- START FEATURE ----------

  function hideMarkdownButtons() {
    // Hide emoji picker button
    document.querySelectorAll('.format-btn.emoji-picker-btn').forEach(el => {
      el.style.display = 'none';
    });

    // Hide bold button
    document.querySelectorAll('.format-btn[data-format="bold"]').forEach(el => {
      el.style.display = 'none';
    });

    // Hide italic button
    document.querySelectorAll('.format-btn[data-format="italic"]').forEach(el => {
      el.style.display = 'none';
    });

    // Hide code button
    document.querySelectorAll('.format-btn[data-format="code"]').forEach(el => {
      el.style.display = 'none';
    });

    // Hide link button
    document.querySelectorAll('.format-btn[data-format="link"]').forEach(el => {
      el.style.display = 'none';
    });

    // Hide dropdown
    document.querySelectorAll('.dropdown.d-inline-block').forEach(el => {
      el.style.display = 'none';
    });

    // Hide help button
    document.querySelectorAll('.format-btn.help-btn').forEach(el => {
      el.style.display = 'none';
    });

    // Hide preview button
    document.querySelectorAll('.format-btn.preview-btn').forEach(el => {
      el.style.display = 'none';
    });

    // Hide paste button
    document.querySelectorAll('.format-btn.paste-btn').forEach(el => {
      el.style.display = 'none';
    });

    // Hide dividers (vertical lines between buttons)
    document.querySelectorAll('div[style*="width: 1px"][style*="background: rgba(255,255,255,0.2)"]').forEach(el => {
      el.style.display = 'none';
    });

    // Add margin-left to actionbuttonlist
    document.querySelectorAll('.actionbuttonlist').forEach(el => {
      el.style.marginLeft = '39%';
    });

    console.log('[better-falix] i-know-markdown: Hidden markdown formatting buttons');
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideMarkdownButtons);
  } else {
    hideMarkdownButtons();
  }

  // Watch for dynamic content changes
  const observer = new MutationObserver(() => {
    hideMarkdownButtons();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setTimeout(() => {
    console.log('[better-falix] i-know-markdown: Script loaded successfully');
  }, 10);
});
