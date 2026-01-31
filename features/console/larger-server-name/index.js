// [better-falix] larger-server-name: Script loading
console.log('[better-falix] larger-server-name: Script loading');

chrome.storage.sync.get({ largerServerName: false, largerServerNameFontSize: 1.2, enabled: true }, (data) => {
  if (!data.enabled || !data.largerServerName) {
    console.log('[better-falix] larger-server-name: Script disabled');
    return;
  }
  console.log('[better-falix] larger-server-name: Script enabled');

  //  --------- START FEATURE ----------

  // Add CSS to make server name larger with configurable font size
  const fontSize = data.largerServerNameFontSize || 1.2;
  const style = document.createElement('style');
  style.textContent = `
    .server-name {
      font-size: ${fontSize}rem !important;
    }
  `;
  style.id = 'larger-server-name-style';
  document.head.appendChild(style);

  console.log('[better-falix] larger-server-name: Script loaded successfully');
});
