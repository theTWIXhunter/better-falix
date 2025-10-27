// [better-falix] remove-how-to-connect: Script loading
console.log('[better-falix] remove-how-to-connect: Script loading');

chrome.storage.sync.get({ enabled: true, removeHowToConnect: false }, (data) => {
  if (!data.enabled || !data.removeHowToConnect) {
    console.log('[better-falix] remove-how-to-connect: Script disabled');
    return;
  }
  console.log('[better-falix] remove-how-to-connect: Script enabled');

  //  --------- START FEATURE ----------

  function removeHowToConnectSections() {
    // Remove all connect steps
    document.querySelectorAll('.connect-step').forEach(el => el.remove());
    // Remove remote startup section
    document.querySelectorAll('.remote-startup-section').forEach(el => el.remove());
    // Remove DNS verification section
    document.querySelectorAll('.dns-verification-section').forEach(el => el.remove());
    // Remove edition tabs
    document.querySelectorAll('.connect-edition-tabs').forEach(el => el.remove());
    // Remove bedrock steps
    document.querySelectorAll('#bedrockSteps').forEach(el => el.remove());

    // Get the connection info
    const addressBox = document.querySelector('.connect-address-box');
    const javaSteps = document.getElementById('javaSteps');
    
    if (!addressBox || !javaSteps) {
      console.log('[better-falix] remove-how-to-connect: Connection info not found');
      return;
    }

    // Extract IP and port from the copy button's onclick attribute
    const copyBtn = addressBox.querySelector('.connect-inline-copy');
    const onclickAttr = copyBtn?.getAttribute('onclick');
    const match = onclickAttr?.match(/copyConnectionInfo\('([^']+)'/);
    const fullAddress = match ? match[1] : '';
    
    // Extract IP (from address text)
    const ip = addressBox.querySelector('.connect-address-text')?.textContent?.trim() || '';
    
    // Extract port (after the colon in fullAddress)
    const port = fullAddress.includes(':') ? fullAddress.split(':')[1] : '';
    
    console.log('[better-falix] remove-how-to-connect: IP:', ip, 'Full:', fullAddress, 'Port:', port);

    // Remove the old address box
    addressBox.remove();

    // Helper function to create address box
    function createAddressBox(label, value, copyValue) {
      const box = document.createElement('div');
      box.className = 'connect-address-box';
      box.innerHTML = `
        ${label} <span class="connect-address-text">${value}</span>
        <button class="btn connect-inline-copy" onclick="copyConnectionInfo('${copyValue}', this)" title="Copy to clipboard">
          <svg class="svg-inline--fa fa-copy" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"></path></svg>
        </button>
      `;
      return box;
    }

    // Add IP box
    javaSteps.appendChild(createAddressBox('SERVER IP:', ip, ip));
    
    // Add IP with port box
    if (fullAddress) {
      javaSteps.appendChild(createAddressBox('IP WITH PORT:', fullAddress, fullAddress));
    }
    
    // Add Port box
    if (port) {
      javaSteps.appendChild(createAddressBox('PORT:', port, port));
    }
  }

  // Fix: always run after DOMContentLoaded to ensure all elements exist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeHowToConnectSections);
  } else {
    setTimeout(removeHowToConnectSections, 0);
  }

  setTimeout(() => {
    console.log('[better-falix] remove-how-to-connect: Script loaded successfully');
  }, 10);
});
