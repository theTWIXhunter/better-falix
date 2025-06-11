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

    //  --------- START THEME ----------

        // Change all blue accents to purple
        // Bootstrap/falcon variables
        document.documentElement.style.setProperty('--falcon-primary', '#a259e6');
        document.documentElement.style.setProperty('--falcon-card-bg', '#fff');
        document.documentElement.style.setProperty('--falcon-700', '#2c3e50');
        document.documentElement.style.setProperty('--falcon-500', '#6c757d');

        // General accent
        document.documentElement.style.setProperty('--falix-accent', '#a259e6');
        document.documentElement.style.setProperty('--falix-accent-hover', '#7c3aed');

        // Animate #PageTitle with a purple gradient fade
        var pageTitle = document.getElementById('PageTitle');
        if (pageTitle) {
          // Only inject once
          if (!document.getElementById('purple-mode-pagetitle-style')) {
            var style = document.createElement('style');
            style.id = 'purple-mode-pagetitle-style';
            style.textContent = `
#PageTitle {
  background: linear-gradient(90deg, #7c3aed 0%, #a259e6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  animation: pageTitleFade 4s linear infinite alternate;
  transition: background 0.4s;
}
@keyframes pageTitleFade {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
/* Make the underline purple */
.title-underline.bg-primary {
  background: #a259e6 !important;
}
/* Make active console tab slightly transparent purple with solid purple text and underline */
.console-tab-item.active {
  background: rgba(162,89,230,0.15) !important;
  color: #a259e6 !important;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 8px 0 rgba(162,89,230,0.08);
  position: relative;
}
.console-tab-item.active svg,
.console-tab-item.active i {
  color: #a259e6 !important;
  fill: #a259e6 !important;
}
/* The underline for the active tab*/
.console-tab-item.active .console-tab-count,
.console-tab-item.active span {
  color: #a259e6 !important;
}
/* Resource modules at the bottom */
.resources-grid-modal .resource-item-modal {
  background: rgba(162,89,230,0.08) !important;
  border: 1.5px solid #a259e6 !important;
  border-radius: 12px !important;
}
.resources-grid-modal .resource-icon-modal {
  background: linear-gradient(135deg, #a259e6 0%, #d8b4fe 100%) !important;
  color: #fff !important;
}
.resources-grid-modal .resource-name-modal,
.resources-grid-modal .resource-value-modal {
  color: #a259e6 !important;
}
.resources-grid-modal .progress-fill-modal {
  background: linear-gradient(90deg, #a259e6 0%, #d8b4fe 100%) !important;
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

        // Make all <svg> icons purple (forcefully)
        document.querySelectorAll('svg').forEach(function(svg) {
          svg.style.color = '#a259e6';
          // Set fill on all child paths, circles, rects
          svg.querySelectorAll('path, circle, rect').forEach(function(el) {
            el.setAttribute('fill', '#a259e6');
            el.style.fill = '#a259e6';
          });
        });

        // Inject CSS to force all SVGs and their children to be purple, except inside excluded console-btns
        if (!document.getElementById('purple-mode-svg-style')) {
          var svgStyle = document.createElement('style');
          svgStyle.id = 'purple-mode-svg-style';
          svgStyle.textContent = `
svg:not(.no-purple):not(.console-btn-stop-svg):not(.console-btn-restart-svg):not(.console-btn-start-svg):not(.console-btn-connect-svg),
svg:not(.no-purple):not(.console-btn-stop-svg):not(.console-btn-restart-svg):not(.console-btn-start-svg):not(.console-btn-connect-svg) * {
  color: #a259e6 !important;
  fill: #a259e6 !important;
  stroke: #a259e6 !important;
}
.console-btn.stop svg,
.console-btn.restart svg,
.console-btn.start svg,
.console-btn.connect svg {
  /* Reset to inherit or initial (remove purple override) */
  color: initial !important;
  fill: initial !important;
  stroke: initial !important;
}
          `;
          document.head.appendChild(svgStyle);
        }

        // Fallback: set fill attribute for all SVG children (for dynamically added SVGs), excluding those inside excluded console-btns
        function forcePurpleSVGs() {
          // Select all SVGs not inside excluded console-btns
          document.querySelectorAll('svg').forEach(function(svg) {
            // Check if this svg is inside any excluded button
            if (
              svg.closest('.console-btn.stop') ||
              svg.closest('.console-btn.restart') ||
              svg.closest('.console-btn.start') ||
              svg.closest('.console-btn.connect')
            ) {
              // Skip excluded SVGs
              return;
            }
            svg.style.color = '#a259e6';
            svg.querySelectorAll('path, circle, rect, ellipse, polygon, polyline').forEach(function(el) {
              el.setAttribute('fill', '#a259e6');
              el.style.fill = '#a259e6';
              el.setAttribute('stroke', '#a259e6');
              el.style.stroke = '#a259e6';
            });
          });
        }
        forcePurpleSVGs();

        // Optionally, observe DOM changes to catch dynamically added SVGs
        if (!window.__purpleSVGObserver) {
          window.__purpleSVGObserver = new MutationObserver(forcePurpleSVGs);
          window.__purpleSVGObserver.observe(document.body, { childList: true, subtree: true });
        }

        // Make footer-links and nav-link active purple
        document.querySelectorAll('.footer-links.mb-4, .nav-link.active').forEach(function(el) {
          el.style.color = '#a259e6';
        });

        // Make specific <a> elements purple by their text content
        [
          'Privacy Policy',
          'Terms of Service',
          'Imprint',
          'Knowledge Base',
          'Join our Discord Server',
          'Falix Benelux CommV'
        ].forEach(function(text) {
          document.querySelectorAll('a').forEach(function(a) {
            if (a.textContent.trim() === text) {
              a.style.color = '#a259e6';
            }
          });
        });

        // Make <a> with [PROD] Minecraft Bimsem text purple
        document.querySelectorAll('a').forEach(function(a) {
          if (a.textContent && a.textContent.includes('[PROD] Minecraft Bimsem')) {
            a.style.color = '#a259e6';
          }
        });

        // Make .compact-info-icon divs background purple but keep original alpha
        document.querySelectorAll('.compact-info-icon').forEach(function(div) {
          const bg = window.getComputedStyle(div).backgroundColor;
          // Match rgba or rgb
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
          if (match) {
            // Use original alpha if present, otherwise 1
            const alpha = typeof match[4] !== 'undefined' ? match[4] : 1;
            div.style.backgroundColor = `rgba(162,89,230,${alpha})`;
          } else {
            // fallback: just set to purple
            div.style.backgroundColor = '#a259e6';
          }
        });

        // Make <input type="checkbox"> purple when selected
        if (!document.getElementById('purple-mode-checkbox-style')) {
          var checkboxStyle = document.createElement('style');
          checkboxStyle.id = 'purple-mode-checkbox-style';
          checkboxStyle.textContent = `
input[type="checkbox"]:checked {
  accent-color: #a259e6 !important;
}
          `;
          document.head.appendChild(checkboxStyle);
        }
      });
    } else {
      console.error('[better-falix] PURPLE MODE THEME: chrome.storage.sync.get is not available or not running as a Chrome extension content script');
    }
})();
