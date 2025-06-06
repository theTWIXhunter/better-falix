function hideExternalStartNav() {
  // Find all nav-link spans and look for "Remote Startup"
  const remoteStartupItem = Array.from(document.querySelectorAll('.nav-item .nav-link span')).find(span =>
    span.textContent.trim().toLowerCase() === 'remote startup'
  )?.closest('.nav-item');
  if (remoteStartupItem) {
    remoteStartupItem.style.display = 'none';
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideExternalStartNav);
} else {
  hideExternalStartNav();
}
