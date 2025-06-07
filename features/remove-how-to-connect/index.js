chrome.storage.sync.get({ enabled: true, removeHowToConnect: false }, (data) => {
  if (!data.enabled || !data.removeHowToConnect) return;

  function removeHowToConnectSections() {
    // Remove all elements with class "connect-step"
    document.querySelectorAll('.connect-step').forEach(el => el.remove());
    // Remove all elements with class "dns-verification-section"
    document.querySelectorAll('.dns-verification-section').forEach(el => el.remove());
    // Remove all <div class="bedrock-detail-row"> with label "Server Name:"
    document.querySelectorAll('.bedrock-detail-row').forEach(row => {
      const label = row.querySelector('.bedrock-label');
      if (label && label.textContent.trim() === 'Server Name:') {
        row.remove();
      }
    });
    // Remove the edition option menu
    document.querySelectorAll('.connect-edition-tabs').forEach(el => el.remove());

    // Merge connect-address-box into connect-bedrock-details as "IP with port"
    const javaBox = document.querySelector('.connect-address-box');
    const bedrockDetails = document.querySelector('.connect-bedrock-details');
    if (javaBox && bedrockDetails) {
      // Get the address and button from the javaBox
      const addressText = javaBox.querySelector('.connect-address-text')?.textContent?.trim();
      const copyBtn = javaBox.querySelector('.connect-inline-copy');
      // Create new bedrock-detail-row for "IP with port"
      if (addressText) {
        const row = document.createElement('div');
        row.className = 'bedrock-detail-row';
        const label = document.createElement('span');
        label.className = 'bedrock-label';
        label.textContent = 'IP with port:';
        const value = document.createElement('span');
        value.className = 'bedrock-value';
        value.textContent = addressText;
        row.appendChild(label);
        row.appendChild(value);
        if (copyBtn) {
          // Clone the copy button and update its onclick/copy value
          const newCopyBtn = copyBtn.cloneNode(true);
          newCopyBtn.setAttribute('onclick', `copyConnectionInfo('${addressText}', this)`);
          row.appendChild(newCopyBtn);
        }
        // Insert after Server Address row if possible, else at end
        const afterRow = Array.from(bedrockDetails.querySelectorAll('.bedrock-detail-row')).find(r =>
          r.querySelector('.bedrock-label')?.textContent.trim() === 'Server Address:'
        );
        // Fix: always append if afterRow is not found or afterRow.nextSibling is null
        if (afterRow) {
          if (afterRow.nextSibling) {
            bedrockDetails.insertBefore(row, afterRow.nextSibling);
          } else {
            bedrockDetails.appendChild(row);
          }
        } else {
          bedrockDetails.appendChild(row);
        }
      }
      javaBox.remove();
    }

    // Replace the Java edition item with the Bedrock edition item (as before)
    const javaItem = document.querySelector('.connect-edition-item.java');
    const bedrockItem = document.querySelector('.connect-edition-item.bedrock');
    if (javaItem && bedrockItem) {
      const bedrockClone = bedrockItem.cloneNode(true);
      javaItem.replaceWith(bedrockClone);
    }

    // Always show the connect-bedrock-details box
    if (bedrockDetails) {
      bedrockDetails.style.display = '';
      bedrockDetails.classList.remove('d-none');
    }
  }

  // Fix: always run after DOMContentLoaded to ensure all elements exist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeHowToConnectSections);
  } else {
    setTimeout(removeHowToConnectSections, 0);
  }
});
