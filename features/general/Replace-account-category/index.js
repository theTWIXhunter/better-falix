// [better-falix] replace-account-category: Script loading
console.log('[better-falix] replace-account-category: Script loading');

chrome.storage.sync.get({ enabled: true, replaceAccountCategory: false }, (data) => {
  if (!data.enabled || !data.replaceAccountCategory) {
    console.log('[better-falix] replace-account-category: Script disabled');
    return;
  }
  console.log('[better-falix] replace-account-category: Script enabled');

  //  --------- START FEATURE ----------

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

      // Profile Settings
      const settings = document.createElement('a');
      settings.href = 'https://client.falixnodes.net/profile/settings';
      settings.textContent = 'Profile Settings';
      settings.style.display = 'flex';
      settings.style.alignItems = 'center';
      settings.style.gap = '0.5rem';
      settings.style.padding = '0.75rem 1.25rem';
      settings.style.color = 'var(--bs-light, #fff)';
      settings.style.textDecoration = 'none';
      settings.style.cursor = 'pointer';
      settings.style.transition = 'background 0.15s';
      settings.addEventListener('mouseover', () => settings.style.background = 'var(--bs-secondary-bg, #23272b)');
      settings.addEventListener('mouseout', () => settings.style.background = 'none');
      // Optionally add an icon
      settings.innerHTML = '<i class="fa-solid fa-user-gear"></i> Profile Settings';

      // Sessions
      const sessions = document.createElement('a');
      sessions.href = 'https://client.falixnodes.net/profile/sessions';
      sessions.textContent = 'Sessions';
      sessions.style.display = 'flex';
      sessions.style.alignItems = 'center';
      sessions.style.gap = '0.5rem';
      sessions.style.padding = '0.75rem 1.25rem';
      sessions.style.color = 'var(--bs-light, #fff)';
      sessions.style.textDecoration = 'none';
      sessions.style.cursor = 'pointer';
      sessions.style.transition = 'background 0.15s';
      sessions.addEventListener('mouseover', () => sessions.style.background = 'var(--bs-secondary-bg, #23272b)');
      sessions.addEventListener('mouseout', () => sessions.style.background = 'none');
      // Optionally add an icon
      sessions.innerHTML = '<i class="fa-solid fa-desktop"></i> Sessions';

      // Activity
      const activity = document.createElement('a');
      activity.href = 'https://client.falixnodes.net/profile/activity';
      activity.textContent = 'Activity';
      activity.style.display = 'flex';
      activity.style.alignItems = 'center';
      activity.style.gap = '0.5rem';
      activity.style.padding = '0.75rem 1.25rem';
      activity.style.color = 'var(--bs-light, #fff)';
      activity.style.textDecoration = 'none';
      activity.style.cursor = 'pointer';
      activity.style.transition = 'background 0.15s';
      activity.addEventListener('mouseover', () => activity.style.background = 'var(--bs-secondary-bg, #23272b)');
      activity.addEventListener('mouseout', () => activity.style.background = 'none');
      // Optionally add an icon
      activity.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i> Activity';

      // Logout
      const logout = document.createElement('a');
      logout.href = 'https://client.falixnodes.net/logout';
      logout.textContent = 'Logout';
      logout.style.display = 'flex';
      logout.style.alignItems = 'center';
      logout.style.gap = '0.5rem';
      logout.style.padding = '0.75rem 1.25rem';
      logout.style.color = 'var(--bs-light, #fff)';
      logout.style.textDecoration = 'none';
      logout.style.cursor = 'pointer';
      logout.style.transition = 'background 0.15s';
      logout.addEventListener('mouseover', () => logout.style.background = 'var(--bs-secondary-bg, #23272b)');
      logout.addEventListener('mouseout', () => logout.style.background = 'none');
      // Optionally add an icon
      logout.innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket"></i> Logout';

      // Divider (only above logout)
      const divider = document.createElement('div');
      divider.style.height = '1px';
      divider.style.background = 'var(--bs-border-color, #23272b)';
      divider.style.margin = '0.25rem 0';

      popup.appendChild(settings);
      popup.appendChild(sessions);
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

  setTimeout(() => {
    console.log('[better-falix] replace-account-category: Script loaded successfully');
  }, 10);
});
