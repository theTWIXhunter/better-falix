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

      // --------- START THEME ----------

      // Change all blue accents to purple
      document.documentElement.style.setProperty('--falcon-primary', '#a259e6');
      document.documentElement.style.setProperty('--falcon-card-bg', '#fff');
      document.documentElement.style.setProperty('--falcon-700', '#2c3e50');
      document.documentElement.style.setProperty('--falcon-500', '#6c757d');
      document.documentElement.style.setProperty('--falix-accent', '#a259e6');
      document.documentElement.style.setProperty('--falix-accent-hover', '#7c3aed');

      // Animate #PageTitle with a purple gradient fade
      var pageTitle = document.getElementById('PageTitle');
      if (pageTitle && !document.getElementById('purple-mode-pagetitle-style')) {
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
.title-underline.bg-primary { background: #a259e6 !important; }
.console-tab-item.active {
  background: rgba(162,89,230,0.15) !important;
  color: #a259e6 !important;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 8px 0 rgba(162,89,230,0.08);
  position: relative;
}
.console-tab-item.active svg,
.console-tab-item.active i { color: #a259e6 !important; fill: #a259e6 !important; }
.console-tab-item.active .console-tab-count,
.console-tab-item.active span { color: #a259e6 !important; }
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
.resources-grid-modal .resource-value-modal { color: #a259e6 !important; }
.resources-grid-modal .progress-fill-modal {
  background: linear-gradient(90deg, #a259e6 0%, #d8b4fe 100%) !important;
}
`;
        document.head.appendChild(style);
      }

      // All elements with blue color or background
      [
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
          if (el.style.color && el.style.color.match(/#2c7be5|#007bff|#3b82f6|#0078d7|#5694E8|rgb\(44, 123, 229\)/i)) {
            el.style.color = '#a259e6';
          }
          if (el.style.background && el.style.background.match(/#2c7be5|#007bff|#3b82f6|#0078d7|#5694E8|rgb\(44, 123, 229\)/i)) {
            el.style.background = '#a259e6';
          }
          if (el.style.backgroundColor && el.style.backgroundColor.match(/#2c7be5|#007bff|#3b82f6|#0078d7|#5694E8|rgb\(44, 123, 229\)/i)) {
            el.style.backgroundColor = '#a259e6';
          }
          if (el.style.borderColor && el.style.borderColor.match(/#2c7be5|#007bff|#3b82f6|#0078d7|#5694E8|rgb\(44, 123, 229\)/i)) {
            el.style.borderColor = '#a259e6';
          }
        });
      });

      // ------- SVGs and Icons -------

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
  color: initial !important;
  fill: initial !important;
  stroke: initial !important;
}
`;
        document.head.appendChild(svgStyle);
      }

      // Fallback: set fill attribute for all SVG children (for dynamically added SVGs), 
      // excluding those inside excluded console-btns, .console-actions, or .console-header .console-actions
      function forcePurpleSVGs() {
        document.querySelectorAll('svg').forEach(function(svg) {
          if (
            svg.closest('.console-btn.stop') ||
            svg.closest('.console-btn.restart') ||
            svg.closest('.console-btn.start') ||
            svg.closest('.console-btn.connect') ||
            svg.closest('.console-actions') ||
            (svg.closest('.console-header') && svg.closest('.console-actions'))
          ) {
            svg.style.color = '';
            svg.querySelectorAll('path, circle, rect, ellipse, polygon, polyline').forEach(function(el) {
              el.removeAttribute('fill');
              el.style.fill = '';
              el.removeAttribute('stroke');
              el.style.stroke = '';
            });
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

      // Observe DOM changes to catch dynamically added SVGs
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

      // Make .compact-info-icon divs background purple but keep original alpha
      document.querySelectorAll('.compact-info-icon').forEach(function(div) {
        const bg = window.getComputedStyle(div).backgroundColor;
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
        if (match) {
          const alpha = typeof match[4] !== 'undefined' ? match[4] : 1;
          div.style.backgroundColor = `rgba(162,89,230,${alpha})`;
        } else {
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

      // Make .sort-label text purple
      document.querySelectorAll('.sort-label').forEach(function(el) {
        el.style.color = '#a259e6';
      });

      // Make Chart.js graphs purple (lines, bars, etc.)
      if (window.Chart && typeof window.Chart === 'function') {
        const origUpdate = window.Chart.prototype.update;
        window.Chart.prototype.update = function(...args) {
          if (this.data && Array.isArray(this.data.datasets)) {
            this.data.datasets.forEach(ds => {
              if (ds.type === 'line' || this.config.type === 'line') {
                ds.borderColor = '#a259e6';
                ds.backgroundColor = 'rgba(162,89,230,0.15)';
                ds.pointBackgroundColor = '#a259e6';
                ds.pointBorderColor = '#a259e6';
              } else if (ds.type === 'bar' || this.config.type === 'bar') {
                ds.backgroundColor = '#a259e6';
                ds.borderColor = '#a259e6';
              }
            });
          }
          return origUpdate.apply(this, args);
        };
        if (window.Chart.instances) {
          Object.values(window.Chart.instances).forEach(chart => {
            if (chart && typeof chart.update === 'function') chart.update();
          });
        }
      }

      // Fallback for dynamically created charts
      function forcePurpleCharts() {
        if (window.Chart && typeof window.Chart === 'function') {
          let charts = [];
          if (window.Chart.instances) {
            if (typeof window.Chart.instances.forEach === 'function') {
              window.Chart.instances.forEach(chart => charts.push(chart));
            } else {
              charts = Object.values(window.Chart.instances);
            }
          }
          charts.forEach(chart => {
            if (chart && chart.data && Array.isArray(chart.data.datasets)) {
              chart.data.datasets.forEach(ds => {
                if ((ds.type || chart.config.type) === 'line') {
                  ds.borderColor = '#a259e6';
                  ds.backgroundColor = 'rgba(162,89,230,0.15)';
                  ds.pointBackgroundColor = '#a259e6';
                  ds.pointBorderColor = '#a259e6';
                }
                if ((ds.type || chart.config.type) === 'bar') {
                  ds.backgroundColor = '#a259e6';
                  ds.borderColor = '#a259e6';
                }
                if (ds.fill === true || ds.fill === 'origin') {
                  ds.backgroundColor = 'rgba(162,89,230,0.15)';
                }
              });
              if (typeof chart.update === 'function') chart.update();
            }
          });
        }
      }
      forcePurpleCharts();

      // Patch resource charts to purple
      function patchResourceChartsToPurple() {
        if (window.Chart && typeof window.Chart === 'function') {
          ['cpuChart', 'ramChart', 'diskChart'].forEach(chartName => {
            if (window.consoleManager && window.consoleManager[chartName]) {
              const chart = window.consoleManager[chartName];
              if (chart && chart.data && Array.isArray(chart.data.datasets)) {
                chart.data.datasets.forEach(ds => {
                  ds.borderColor = '#a259e6';
                  ds.backgroundColor = 'rgba(162,89,230,0.15)';
                  ds.pointBackgroundColor = '#a259e6';
                  ds.pointBorderColor = '#a259e6';
                });
                if (typeof chart.update === 'function') chart.update();
              }
            }
          });
          if (window.Chart.instances) {
            let charts = [];
            if (typeof window.Chart.instances.forEach === 'function') {
              window.Chart.instances.forEach(chart => charts.push(chart));
            } else {
              charts = Object.values(window.Chart.instances);
            }
            charts.forEach(chart => {
              if (chart && chart.data && Array.isArray(chart.data.datasets)) {
                chart.data.datasets.forEach(ds => {
                  ds.borderColor = '#a259e6';
                  ds.backgroundColor = 'rgba(162,89,230,0.15)';
                  ds.pointBackgroundColor = '#a259e6';
                  ds.pointBorderColor = '#a259e6';
                });
                if (typeof chart.update === 'function') chart.update();
              }
            });
          }
        }
      }
      patchResourceChartsToPurple();

      if (!window.__purpleChartObserver) {
        window.__purpleChartObserver = new MutationObserver(patchResourceChartsToPurple);
        window.__purpleChartObserver.observe(document.body, { childList: true, subtree: true });
      }

      // Make .current-server-info background a purple gradient
      if (!document.getElementById('purple-mode-current-server-info-style')) {
        var csStyle = document.createElement('style');
        csStyle.id = 'purple-mode-current-server-info-style';
        csStyle.textContent = `.current-server-info {
  background: linear-gradient(90deg, #a259e6 0%,rgb(172, 95, 254) 100%) !important;
}
`;
        document.head.appendChild(csStyle);
      }

      // Make breadcrumbs and root file manager links purple (using CSS for !important)
      if (!document.getElementById('purple-mode-breadcrumb-style')) {
        var breadcrumbStyle = document.createElement('style');
        breadcrumbStyle.id = 'purple-mode-breadcrumb-style';
        breadcrumbStyle.textContent = `
a[onclick^="fileManager.navigateToDirectory("],
li.breadcrumb-item,
li.breadcrumb-item.active {
  color: #a259e6 !important;
}
`;
        document.head.appendChild(breadcrumbStyle);
      }

      // Make "Analyze" button (btn-outline-primary with fileManager.analyzeDiskUsage) light purple
      if (!document.getElementById('purple-mode-analyze-btn-style')) {
        var analyzeBtnStyle = document.createElement('style');
        analyzeBtnStyle.id = 'purple-mode-analyze-btn-style';
        analyzeBtnStyle.textContent = `
button.btn.btn-outline-primary[onclick="fileManager.analyzeDiskUsage()"] {
  color: #a259e6 !important;
  border-color: #d8b4fe !important;
  background-color: #d8b4fe !important;
}
button.btn.btn-outline-primary[onclick="fileManager.analyzeDiskUsage()"]:hover,
button.btn.btn-outline-primary[onclick="fileManager.analyzeDiskUsage()"]:focus {
  color: #fff !important;
  background-color: #a259e6 !important;
  border-color: #a259e6 !important;
}
button.btn.btn-outline-primary[onclick="fileManager.analyzeDiskUsage()"] svg {
  color: #a259e6 !important;
  fill: #a259e6 !important;
}
button.btn.btn-outline-primary[onclick="fileManager.analyzeDiskUsage()"]:hover svg,
button.btn.btn-outline-primary[onclick="fileManager.analyzeDiskUsage()"]:focus svg {
  color: #fff !important;
  fill: #fff !important;
}
`;
        document.head.appendChild(analyzeBtnStyle);
      }

      // Make text inside .btn.btn-outline-secondary black
      if (!document.getElementById('purple-mode-outline-secondary-style')) {
        var outlineSecondaryStyle = document.createElement('style');
        outlineSecondaryStyle.id = 'purple-mode-outline-secondary-style';
        outlineSecondaryStyle.textContent = `
.btn.btn-outline-secondary,
.btn.btn-outline-secondary * {
  color: #111 !important;
}
`;
        document.head.appendChild(outlineSecondaryStyle);
      }

      // Make Chart.js legend text black for diskUsageChart and all charts
      if (!document.getElementById('purple-mode-chart-legend-style')) {
        var chartLegendStyle = document.createElement('style');
        chartLegendStyle.id = 'purple-mode-chart-legend-style';
        chartLegendStyle.textContent = `
#diskUsageChart + div .legend,
#diskUsageChart + .chartjs-size-monitor + div .legend,
.chartjs-render-monitor ~ .chartjs-legend,
.chartjs-legend,
.chartjs-legend li,
.chartjs-legend span,
.chartjs-legend * {
  color: #111 !important;
  fill: #111 !important;
}
`;
        document.head.appendChild(chartLegendStyle);
      }

      // Try to patch Chart.js legend label color via options (for dynamic charts)
      function patchChartLegendColors() {
        if (window.Chart && typeof window.Chart === 'function' && window.Chart.instances) {
          let charts = [];
          if (typeof window.Chart.instances.forEach === 'function') {
            window.Chart.instances.forEach(chart => charts.push(chart));
          } else {
            charts = Object.values(window.Chart.instances);
          }
          charts.forEach(chart => {
            if (chart.options && chart.options.plugins && chart.options.plugins.legend) {
              if (!chart.options.plugins.legend.labels) chart.options.plugins.legend.labels = {};
              chart.options.plugins.legend.labels.color = '#111';
              if (typeof chart.update === 'function') chart.update();
            }
          });
        }
      }
      patchChartLegendColors();

      // Also observe DOM for new charts and patch legend color
      if (!window.__purpleLegendObserver) {
        window.__purpleLegendObserver = new MutationObserver(patchChartLegendColors);
        window.__purpleLegendObserver.observe(document.body, { childList: true, subtree: true });
      }
    });
  } else {
    console.error('[better-falix] PURPLE MODE THEME: chrome.storage.sync.get is not available or not running as a Chrome extension content script');
  }
})();
