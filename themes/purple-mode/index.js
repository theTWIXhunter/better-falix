(function() {
    // [better-falix] PURPLE MODE THEME: Script loading
    console.log('[better-falix] PURPLE MODE THEME Script loading');

    if (
      typeof window.chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.sync &&
      typeof chrome.storage.sync.get === "function"
    ) {
      chrome.storage.sync.get({ activeTheme: false, enabled: true }, function(data) {
        if (data.activeTheme !== 'purple-mode' || data.enabled !== true) {
          console.log('[better-falix] PURPLE MODE THEME: Script disabled');
          return;
        }
        console.log('[better-falix] PURPLE MODE THEME: Script enabled');

        // Change all blue accents to purple
        // Bootstrap/falcon variables
        document.documentElement.style.setProperty('--falcon-primary', '#a259e6');
        document.documentElement.style.setProperty('--falcon-card-bg', '#fff');
        document.documentElement.style.setProperty('--falcon-700', '#2c3e50');
        document.documentElement.style.setProperty('--falcon-500', '#6c757d');

        // General accent
        document.documentElement.style.setProperty('--falix-accent', '#a259e6');
        document.documentElement.style.setProperty('--falix-accent-hover', '#7c3aed');

        // Animate #PageTitle with a purple color (no gradient)
        var pageTitle = document.getElementById('PageTitle');
        if (pageTitle) {
          // Only inject once
          if (!document.getElementById('purple-mode-pagetitle-style')) {
            var style = document.createElement('style');
            style.id = 'purple-mode-pagetitle-style';
            style.textContent = `
#PageTitle {
  color: #a259e6 !important;
  background: none !important;
  -webkit-background-clip: initial !important;
  -webkit-text-fill-color: initial !important;
  background-clip: initial !important;
  text-fill-color: initial !important;
  animation: none !important;
  transition: color 0.4s;
}
.title-underline.bg-primary {
  background: #a259e6 !important;
}
.console-tab-item.active {
  background: #a259e6 !important;
  color: #fff !important;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 8px 0 rgba(162,89,230,0.08);
}
.console-tab-item.active svg,
.console-tab-item.active i {
  color: #fff !important;
  fill: #fff !important;
}
`;
            document.head.appendChild(style);
          }
        }

        // All elements with blue color or background
        [
          // Buttons, links, icons, progress, etc.
          '.btn-primary', '.text-primary', '.bg-primary', '.border-primary',
          '.progress-bar', '.theme-select-btn.selected', '.slider-tab-btn.active',
          '.slider-tab-btn.active::after', '.slider-indicator', '.feature-btn[aria-pressed="true"]',
          '.feature-btn.on', '.category', '.theme-card.selected .theme-preview',
          '.theme-select-btn.selected', '.sort-btn.active', '.mass-action-btn i',
          '.profile-resources-icon', '.resource-value-modal', '.resource-name-modal',
          '.modal-header.bg-primary', '.modal-title', '.support-link', '.support-link i',
          '.support-link-large', '.support-link-small'
        ].forEach(selector => {
          document.querySelectorAll(selector).forEach(el => {
            // Color
            if (el.style.color && el.style.color.match(/#2c7be5|#007bff|#3b82f6|#0078d7|#5694E8|rgb\(44, 123, 229\)/i)) {
              el.style.color = '#a259e6';
            }
            // Background
            if (el.style.background && el.style.background.match(/#2c7be5|#007bff|#3b82f6|#0078d7|#5694E8|rgb\(44, 123, 229\)/i)) {
              el.style.background = '#a259e6';
            }
            if (el.style.backgroundColor && el.style.backgroundColor.match(/#2c7be5|#007bff|#3b82f6|#0078d7|#5694E8|rgb\(44, 123, 229\)/i)) {
              el.style.backgroundColor = '#a259e6';
            }
            // Border
            if (el.style.borderColor && el.style.borderColor.match(/#2c7be5|#007bff|#3b82f6|#0078d7|#5694E8|rgb\(44, 123, 229\)/i)) {
              el.style.borderColor = '#a259e6';
            }
          });
        });

        // Also update inline SVGs/icons with fill="#2c7be5" or similar
        document.querySelectorAll('svg, i').forEach(el => {
          if (el.style.color && el.style.color.match(/#2c7be5|#007bff|#3b82f6|#0078d7|#5694E8|rgb\(44, 123, 229\)/i)) {
            el.style.color = '#a259e6';
          }
          if (el.getAttribute('fill') && el.getAttribute('fill').match(/#2c7be5|#007bff|#3b82f6|#0078d7|#5694E8/i)) {
            el.setAttribute('fill', '#a259e6');
          }
        });
      });
    } else {
      console.error('[better-falix] PURPLE MODE THEME: chrome.storage.sync.get is not available or not running as a Chrome extension content script');
    }
})();
