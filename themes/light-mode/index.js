(function() {
    // [better-falix] LIGHT MODE THEME: Script loading
    console.log('[better-falix] LIGHT MODE THEME Script loading');

    // Check if both the theme and the general extension are enabled
    if (
      typeof window.chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.sync &&
      typeof chrome.storage.sync.get === "function"
    ) {
      chrome.storage.sync.get({ activeTheme: false, enabled: true }, function(data) {
        if (data.activeTheme !== 'light-mode' || data.enabled !== true) {
          console.log('[better-falix] LIGHT MODE THEME: Script disabled');
          return;
        }
        console.log('[better-falix] LIGHT MODE THEME: Script enabled');

        // Remove 'dark' class from <html> and <body>
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');

        // Set Bootstrap theme to light
        document.documentElement.setAttribute('data-bs-theme', 'light');

        // Set background color for light mode
        document.body.style.backgroundColor = '#fff';

        // Remove any dark-mode specific classes from all elements
        document.querySelectorAll('[class*="dark"]').forEach(el => {
            el.className = el.className.replace(/\bdark\b/g, '');
        });

        // Override CSS variables for light mode
        document.documentElement.style.setProperty('--falcon-card-bg', '#fff');
        document.documentElement.style.setProperty('--falcon-700', '#2c3e50');
        document.documentElement.style.setProperty('--falcon-500', '#6c757d');

        // Make navbar white
        var navbars = document.querySelectorAll('.navbar-vertical, .navbar-brand-container, .navbar-content-wrapper, .navbar-footer, .top-navbar');
        navbars.forEach(function(nav) {
            nav.style.background = '#fff';
            nav.style.backgroundColor = '#fff';
            nav.style.color = '#222';
            nav.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
        });

        // Make widget cards white
        var cards = document.querySelectorAll('.card, .resource-card, .compact-info-card, .modal-content');
        cards.forEach(function(card) {
            card.style.background = '#fff';
            card.style.backgroundColor = '#fff';
            card.style.color = '#222';
            card.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
        });

        // Set nav-category text to black
        var navCategories = document.querySelectorAll('.nav-category');
        navCategories.forEach(function(el) {
            el.style.color = '#000';
        });

        // Set navbar-support-links text to darkish gray
        var supportLinks = document.querySelectorAll('.navbar-support-links');
        supportLinks.forEach(function(el) {
            el.style.color = '#333';
        });

        // Set console-tabs background to white
        var consoleTabs = document.querySelectorAll('.console-tabs');
        consoleTabs.forEach(function(el) {
            el.style.background = '#fff';
            el.style.backgroundColor = '#fff';
        });

        // Set console-output, console-terminal, console-input-container, and console-input background to white
        var consoleOutput = document.querySelectorAll('.console-output');
        consoleOutput.forEach(function(el) {
            el.style.background = '#fff';
            el.style.backgroundColor = '#fff';
        });
        var consoleTerminal = document.querySelectorAll('.console-terminal');
        consoleTerminal.forEach(function(el) {
            el.style.background = '#fff';
            el.style.backgroundColor = '#fff';
        });
        var consoleInputContainer = document.querySelectorAll('.console-input-container');
        consoleInputContainer.forEach(function(el) {
            el.style.background = '#fff';
            el.style.backgroundColor = '#fff';
        });
        var consoleInput = document.querySelectorAll('.console-input');
        consoleInput.forEach(function(el) {
            el.style.background = '#fff';
            el.style.backgroundColor = '#fff';
        });

        // Set plain text in <pre class="console-terminal"> to light black (#222)
        var consoleTerminals = document.querySelectorAll('.console-terminal');
        consoleTerminals.forEach(function(pre) {
            // Walk all child nodes
            pre.childNodes.forEach(function(node) {
                // If it's a text node and not just whitespace
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                    // Wrap in a span with color if not already wrapped
                    var span = document.createElement('span');
                    span.style.color = '#222';
                    span.textContent = node.textContent;
                    pre.replaceChild(span, node);
                }
            });
        });

        // Also make #console_box white with dark text and light border
        var consoleBox = document.getElementById('console_box');
        if (consoleBox) {
            consoleBox.style.background = '#fff';
            consoleBox.style.backgroundColor = '#fff';
            consoleBox.style.color = '#222';
            consoleBox.style.borderColor = '#e5e7eb';
            consoleBox.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
        }

        // Make sidebar and widget text dark for contrast
        var darkTextEls = document.querySelectorAll(
            '.navbar-vertical, .navbar-brand, .navbar-content-wrapper, .navbar-footer, .top-navbar, .card, .resource-card, .compact-info-card, .modal-content, .profile-name, .profile-tag, .support-info-text, .server-name'
        );
        darkTextEls.forEach(function(el) {
            // Skip #PageTitle to keep it normal
            if (el.id === "PageTitle") return;
            el.style.color = '#222';
        });

        // Make previously white or light text dark for readability
        var whiteTextEls = document.querySelectorAll(
            '.text-white, .text-light, .text-gradient-primary, .text-primary, .fw-bold, .modal-title, .support-info-text, .profile-name, .profile-tag, .resource-name-modal, .resource-value-modal, .resource-desc-modal, .resource-details-modal, .server-name, .support-warning-text, .support-info-label, .support-info-value, .support-close-btn, .support-copy-btn, .profile-resources-icon'
        );
        whiteTextEls.forEach(function(el) {
            // Skip #PageTitle to keep it normal
            if (el.id === "PageTitle") return;
            if (el.class === "compact-info-value copy-text") return;
            el.style.color = '#222';
            // For gradients, remove background-clip/text-fill
            el.style.background = 'none';
            el.style.webkitBackgroundClip = '';
            el.style.webkitTextFillColor = '';
        });

        // Remove any background gradients from nav and widgets
        var gradientEls = document.querySelectorAll(
            '.navbar-vertical, .navbar-footer, .card, .resource-card, .compact-info-card, .modal-content'
        );
        gradientEls.forEach(function(el) {
            el.style.backgroundImage = 'none';
        });

        // Optionally, adjust border colors for light mode
        var borderEls = document.querySelectorAll(
            '.card, .resource-card, .compact-info-card, .modal-content, .navbar-footer'
        );
        borderEls.forEach(function(el) {
            el.style.borderColor = '#e5e7eb';
        });

        // Set .compact-info-value text to blue
        var compactInfoValues = document.querySelectorAll('.compact-info-value');
        compactInfoValues.forEach(function(el) {
            el.style.color = '#007bff';
        });

        // Make .clickablebox white with black text
        var clickableBoxes = document.querySelectorAll('.clickablebox');
        clickableBoxes.forEach(function(el) {
            el.style.background = '#fff';
            el.style.backgroundColor = '#fff';
            el.style.color = '#000';
        });

        // Make .checkbox-cell and .recycle-icon-wrapper light gray
        var lightGrayEls = document.querySelectorAll('.checkbox-cell, .recycle-icon-wrapper');
        lightGrayEls.forEach(function(el) {
            el.style.background = '#f3f4f6';
            el.style.backgroundColor = '#f3f4f6';
            el.style.color = '#222';
        });

        // Mass actions panel white
        var massActionsPanels = document.querySelectorAll('.mass-actions-panel');
        massActionsPanels.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Upload queue white
        var uploadQueues = document.querySelectorAll('.upload-queue, .upload-queue-header, .upload-queue-body, .upload-item');
        uploadQueues.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Progress overlays white
        var progressModals = document.querySelectorAll('.download-progress-modal, .upload-progress-modal');
        progressModals.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // All modals white
        var modalContents = document.querySelectorAll('.modal-content, .modal-header');
        modalContents.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Select all container white
        var selectAllContainers = document.querySelectorAll('.select-all-container');
        selectAllContainers.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // File table rows and cells white
        var fileTableRows = document.querySelectorAll('.file-table tbody tr');
        fileTableRows.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });
        var fileTableCells = document.querySelectorAll('.file-table tbody tr td');
        fileTableCells.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // File/folder/goback icon wrappers white
        var iconWrappers = document.querySelectorAll('.file-icon-wrapper, .folder-icon-wrapper, .goback-icon-wrapper');
        iconWrappers.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Dropdown menus white
        var dropdownMenus = document.querySelectorAll('.dropdown-menu, .custom-dropdown-menu, .context-menu-content');
        dropdownMenus.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Breadcrumbs white
        var breadcrumbs = document.querySelectorAll('.breadcrumb, .breadcrumb-wrapper');
        breadcrumbs.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Error/empty state containers white
        var emptyStates = document.querySelectorAll('.access-denied-container, .hexagon-bg');
        emptyStates.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Resource modal white
        var resourceModals = document.querySelectorAll('.resources-grid-modal, .resource-item-modal');
        resourceModals.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Select all label white
        var selectAllLabels = document.querySelectorAll('.select-all-label');
        selectAllLabels.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Sort bar/buttons white
        var sortEls = document.querySelectorAll('.sort-options, .sort-btn');
        sortEls.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Mass actions header/content/buttons white
        var massActionsEls = document.querySelectorAll('.mass-actions-header, .mass-actions-content, .mass-action-btn');
        massActionsEls.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Mobile action sheet white
        var mobileActionSheets = document.querySelectorAll('.mobile-action-sheet, .mobile-action-sheet-overlay');
        mobileActionSheets.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Footer white
        var footers = document.querySelectorAll('.footer-modern');
        footers.forEach(function(el) {
            el.style.background = '#fff';
            el.style.color = '#222';
        });

        // Light gray for .mass-action-check, .file-table tbody tr.selected, .file-table tbody tr:hover
        var lightGray2Els = document.querySelectorAll('.mass-action-check, .file-table tbody tr.selected, .file-table tbody tr:hover');
        lightGray2Els.forEach(function(el) {
            el.style.background = '#f3f4f6';
            el.style.backgroundColor = '#f3f4f6';
            el.style.color = '#222';
        });

        // Light gray for .file-table
        var fileTables = document.querySelectorAll('.file-table');
        fileTables.forEach(function(el) {
            el.style.background = '#f3f4f6';
            el.style.backgroundColor = '#f3f4f6';
            el.style.color = '#222';
        });

        // Light gray for .select-all-container:hover
        var selectAllHover = document.querySelectorAll('.select-all-container:hover');
        selectAllHover.forEach(function(el) {
            el.style.background = '#f3f4f6';
            el.style.backgroundColor = '#f3f4f6';
            el.style.color = '#222';
        });

        // Light gray for dropdown/context menu item hover
        var dropdownHover = document.querySelectorAll('.dropdown-menu .dropdown-item:hover, .custom-dropdown-item:hover, .context-menu-item:hover');
        dropdownHover.forEach(function(el) {
            el.style.background = '#f3f4f6';
            el.style.backgroundColor = '#f3f4f6';
            el.style.color = '#222';
        });

        // Set color for server-info domain/ram/location
        var serverInfoEls = document.querySelectorAll(
            '.server-info.server-domain, .server-info.server-ram, .server-info.server-location'
        );
        serverInfoEls.forEach(function(el) {
            el.style.color = 'rgb(34, 34, 34)';
        });

        // Make .server-row.bg-200.mx-2 white with dark text, force background
        var serverRows = document.querySelectorAll('.server-row.bg-200.mx-2');
        serverRows.forEach(function(el) {
            el.style.setProperty('background', '#fff', 'important');
            el.style.setProperty('background-color', '#fff', 'important');
            el.style.color = '#222';
        });

        // Set background to white for island/world/player containers
        var whiteBgEls = document.querySelectorAll(
            '.island-container.mb-5, .world-card, .player-card'
        );
        whiteBgEls.forEach(function(el) {
            el.style.setProperty('background', '#fff', 'important');
            el.style.setProperty('background-color', '#fff', 'important');
        });

        // Set text color to black(ish) for #last-updated and .player-name
        var blackTextEls = [
            document.getElementById('last-updated')
        ].concat(Array.from(document.querySelectorAll('.player-name')));
        blackTextEls.forEach(function(el) {
            if (el) el.style.color = '#222';
        });

        // Set .console-tab-item text and icon to black
        var consoleTabItems = document.querySelectorAll('.console-tab-item');
        consoleTabItems.forEach(function(el) {
            el.style.color = '#222';
            // Set all SVG icons inside to black
            var svgs = el.querySelectorAll('svg');
            svgs.forEach(function(svg) {
                svg.style.color = '#222';
                svg.style.fill = '#222';
            });
        });

        // Make all <span> text black
        var spanEls = document.querySelectorAll('span');
        spanEls.forEach(function(el) {
            el.style.color = '#000';
        });

        // Force background-color: white !important for modal-body, modal-header bg-1000 border-700, card-body
        // and make all text and headers inside black
        if (!document.getElementById('light-mode-modal-card-style')) {
          var style = document.createElement('style');
          style.id = 'light-mode-modal-card-style';
          style.textContent = `
.modal-body,
.modal-header.bg-1000.border-700,
.card-body {
  background-color: #fff !important;
}
.modal-body,
.modal-header.bg-1000.border-700,
.card-body,
.modal-body *:not(.btn),
.modal-header.bg-1000.border-700 *:not(.btn),
.card-body *:not(.btn) {
  color: #000 !important;
}
`;
          document.head.appendChild(style);
        }

      });
    } else {
      console.error('[better-falix] LIGHT MODE THEME: chrome.storage.sync.get is not available or not running as a Chrome extension content script');
    }
})();
