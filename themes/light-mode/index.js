(function() {
    // Remove 'dark' class from <html> and <body>
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');

    // Set Bootstrap theme to light
    document.documentElement.setAttribute('data-bs-theme', 'light');

    // Optionally, set background color for light mode
    document.body.style.backgroundColor = '#fff';

    // Remove any dark-mode specific classes from all elements
    document.querySelectorAll('[class*="dark"]').forEach(el => {
        el.className = el.className.replace(/\bdark\b/g, '');
    });

    // Optionally, override CSS variables for light mode
    document.documentElement.style.setProperty('--falcon-card-bg', '#fff');
    document.documentElement.style.setProperty('--falcon-700', '#2c3e50');
    document.documentElement.style.setProperty('--falcon-500', '#6c757d');
})();
