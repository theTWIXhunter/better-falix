(function removeConsoleFilesCategory() {
  // Helper to move all children of a category to its parent, then remove the category
  function flattenCategory(categorySelector) {
    const category = document.querySelector(categorySelector);
    if (category) {
      // Move all child nav-items (li) to the parent of the category
      const parent = category.parentElement;
      const items = Array.from(category.querySelectorAll(':scope > .nav-item'));
      items.forEach(item => parent.insertBefore(item, category));
      // Remove the now-empty category
      category.remove();
    }
  }

  function run() {
    // Adjust selectors as needed for your sidebar structure
    // Example: categories may be <ul class="nav-category" data-title="Console">...</ul>
    // or <div class="nav-category"><span>Console</span><ul>...</ul></div>
    // Try common patterns:
    flattenCategory('.nav-category[data-title="Console"]');
    flattenCategory('.nav-category[data-title="Files"]');

    // Fallback: look for headings or spans with text "Console"/"Files"
    document.querySelectorAll('.nav-category, .sidebar-category, .nav-section').forEach(cat => {
      const label = cat.querySelector('span, .nav-title, .category-title');
      if (label && ["console", "files"].includes(label.textContent.trim().toLowerCase())) {
        // Move all nav-items up
        const parent = cat.parentElement;
        const items = Array.from(cat.querySelectorAll(':scope > .nav-item'));
        items.forEach(item => parent.insertBefore(item, cat));
        cat.remove();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
