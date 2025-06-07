chrome.storage.sync.get({ enabled: true, replaceAccountCategory: false }, (data) => {
  if (!data.enabled || !data.replaceAccountCategory) return;

  (function replaceAccountCategory() {
    function hideAccountCategory() {
      // Hide the Account category section
      const accountBtn = document.querySelector('button.nav-category[data-category="ACCOUNT"]');
      const accountSection = document.getElementById('accountSection');
      if (accountBtn) accountBtn.style.display = 'none';
      if (accountSection) accountSection.style.display = 'none';
    }

    function createProfilePopup() {
      // Avoid duplicate popups
      if (document.getElementById('bf-profile-popup')) return;

      const popup = document.createElement('div');
      popup.id = 'bf-profile-popup';
      popup.style.position = 'fixed';
      popup.style.background = 'var(--bs-dark, #181c20)';
      popup.style.color = 'var(--bs-light, #fff)';
      popup.style.border = '1px solid var(--bs-border-color, #23272b)';
      popup.style.borderRadius = '0.5rem';
      popup.style.boxShadow = '0 4px 24px 0 rgba(0,0,0,0.25)';
      popup.style.padding = '0.5rem 0';
      popup.style.minWidth = '180px';
      popup.style.zIndex = '99999';
      popup.style.display = 'none';
      popup.style.fontFamily = 'inherit';
      popup.style.fontSize = '1rem';

      // Helper to create a menu item with icon HTML
      function createMenuItem(href, html, mouseoverBg) {
        const a = document.createElement('a');
        a.href = href;
        a.innerHTML = html;
        a.style.display = 'flex';
        a.style.alignItems = 'center';
        a.style.gap = '0.5rem';
        a.style.padding = '0.75rem 1.25rem';
        a.style.color = 'var(--bs-light, #fff)';
        a.style.textDecoration = 'none';
        a.style.cursor = 'pointer';
        a.style.transition = 'background 0.15s';
        a.addEventListener('mouseover', () => a.style.background = mouseoverBg);
        a.addEventListener('mouseout', () => a.style.background = 'none');
        return a;
      }

      // Profile Settings
      const settings = createMenuItem(
        'https://client.falixnodes.net/profile/settings',
        '<i class="fa-solid fa-user-gear"></i> Profile Settings',
        'var(--bs-secondary-bg, #23272b)'
      );

      // Activity
      const activity = createMenuItem(
        'https://client.falixnodes.net/profile/activity',
        '<i class="fa-solid fa-clock-rotate-left"></i> Activity',
        'var(--bs-secondary-bg, #23272b)'
      );

      // Logout
      const logout = createMenuItem(
        'https://client.falixnodes.net/logout',
        '<i class="fa-solid fa-arrow-right-from-bracket"></i> Logout',
        'var(--bs-secondary-bg, #23272b)'
      );

      // Divider
      const divider = document.createElement('div');
      divider.style.height = '1px';
      divider.style.background = 'var(--bs-border-color, #23272b)';
      divider.style.margin = '0.25rem 0';

      popup.appendChild(settings);
      popup.appendChild(activity);
      popup.appendChild(divider);
      popup.appendChild(logout);

      document.body.appendChild(popup);

      // Show/hide popup on profile hover
      const profile = document.querySelector('.navbar-user-profile');
      if (!profile) return;

      profile.style.cursor = 'pointer';

      let popupTimeout;
      function showPopup() {
        clearTimeout(popupTimeout);
        const rect = profile.getBoundingClientRect();
        popup.style.display = 'block';
        // Use offsetHeight after display:block to get correct height
        const popupHeight = popup.offsetHeight;
        popup.style.left = (rect.left + window.scrollX) + 'px';
        popup.style.top = (rect.top + window.scrollY - popupHeight - 8) + 'px';
      }
      function hidePopup() {
        popupTimeout = setTimeout(() => {
          popup.style.display = 'none';
        }, 150);
      }

      profile.addEventListener('mouseenter', showPopup);
      profile.addEventListener('mouseleave', hidePopup);
      popup.addEventListener('mouseenter', () => clearTimeout(popupTimeout));
      popup.addEventListener('mouseleave', hidePopup);

      // Hide on scroll/resize
      window.addEventListener('scroll', () => { popup.style.display = 'none'; });
      window.addEventListener('resize', () => { popup.style.display = 'none'; });
    }

    function run() {
      hideAccountCategory();
      createProfilePopup();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  })();
});
