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
      popup.style.background = '#222';
      popup.style.color = '#fff';
      popup.style.border = '1px solid #444';
      popup.style.borderRadius = '6px';
      popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
      popup.style.padding = '8px 0';
      popup.style.minWidth = '160px';
      popup.style.zIndex = '99999';
      popup.style.display = 'none';

      // Profile Settings
      const settings = document.createElement('a');
      settings.href = 'https://client.falixnodes.net/profile/settings';
      settings.textContent = 'Profile Settings';
      settings.style.display = 'block';
      settings.style.padding = '8px 16px';
      settings.style.color = '#fff';
      settings.style.textDecoration = 'none';
      settings.style.cursor = 'pointer';
      settings.addEventListener('mouseover', () => settings.style.background = '#333');
      settings.addEventListener('mouseout', () => settings.style.background = 'none');

      // Logout
      const logout = document.createElement('a');
      logout.href = 'https://client.falixnodes.net/logout';
      logout.textContent = 'Logout';
      logout.style.display = 'block';
      logout.style.padding = '8px 16px';
      logout.style.color = '#fff';
      logout.style.textDecoration = 'none';
      logout.style.cursor = 'pointer';
      logout.addEventListener('mouseover', () => logout.style.background = '#333');
      logout.addEventListener('mouseout', () => logout.style.background = 'none');

      popup.appendChild(settings);
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
        popup.style.left = (rect.left + window.scrollX) + 'px';
        // Position above the profile box
        popup.style.top = (rect.top + window.scrollY - popup.offsetHeight - 8) + 'px';
        popup.style.display = 'block';
        // If popup is not yet rendered, force a reflow and reposition
        if (popup.offsetHeight === 0) {
          popup.style.display = 'block';
          setTimeout(() => {
            popup.style.top = (rect.top + window.scrollY - popup.offsetHeight - 8) + 'px';
          }, 0);
        }
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
