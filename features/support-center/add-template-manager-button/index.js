// [better-falix] add-template-manager-button: Script loading
console.log('[better-falix] add-template-manager-button: Script loading');

chrome.storage.sync.get({ addTemplateManagerButton: false, enabled: true }, (data) => {
  if (!data.enabled || !data.addTemplateManagerButton) {
    console.log('[better-falix] add-template-manager-button: Script disabled');
    return;
  }
  console.log('[better-falix] add-template-manager-button: Script enabled');

  //  --------- START FEATURE ----------

  let buttonAdded = false;

  const addManagerButton = () => {
    const templateAutocomplete = document.getElementById('templateAutocomplete');
    
    if (templateAutocomplete && !buttonAdded && !document.getElementById('manageTemplatesBtn')) {
      // Create the button
      const button = document.createElement('button');
      button.type = 'button';
      button.id = 'manageTemplatesBtn';
      button.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(var(--falcon-warning-rgb), 0.1);
        color: rgb(var(--falcon-warning-rgb));
        border: 1px solid rgba(var(--falcon-warning-rgb), 0.2);
        padding: 0.35rem 0.7rem;
        border-radius: 6px;
        font-size: 0.75rem;
        cursor: pointer;
        z-index: 10002;
        transition: all 0.2s;
      `;
      
      button.innerHTML = `
        <svg class="svg-inline--fa" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path class="fa-secondary" opacity="0.4" d="M208.3 256a47.7 47.7 0 1 0 95.4 0 47.7 47.7 0 1 0 -95.4 0z"></path>
          <path class="fa-primary" d="M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 352a96 96 0 1 0 -.6-192 96 96 0 1 0 .6 192z"></path>
        </svg>
      `;
      
      // Add hover effect
      button.addEventListener('mouseenter', () => {
        button.style.background = 'rgba(var(--falcon-warning-rgb), 0.2)';
        button.style.borderColor = 'rgba(var(--falcon-warning-rgb), 0.4)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.background = 'rgba(var(--falcon-warning-rgb), 0.1)';
        button.style.borderColor = 'rgba(var(--falcon-warning-rgb), 0.2)';
      });
      
      // Find the original manage templates button and clone its click functionality
      const originalBtn = document.querySelector('[data-bs-target="#templatesModal"]');
      if (originalBtn) {
        button.addEventListener('click', () => {
          originalBtn.click();
        });
      }
      
      templateAutocomplete.appendChild(button);
      buttonAdded = true;
      
      console.log('[better-falix] add-template-manager-button: Button added successfully');
    }
  };

  // Observe for the template autocomplete to appear
  const observer = new MutationObserver(() => {
    addManagerButton();
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Try immediately in case it's already there
  addManagerButton();

  // [better-falix] add-template-manager-button: Script loaded successfully
  setTimeout(() => {
    console.log('[better-falix] add-template-manager-button: Script loaded successfully');
  }, 10);
});
