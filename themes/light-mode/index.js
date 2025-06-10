(function() {
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
        el.style.color = '#1f1f1f';
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
});
