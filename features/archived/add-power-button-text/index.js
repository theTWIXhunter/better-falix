// [better-falix] ARCHIVED_add-power-button-text: Script loading
console.log('[better-falix] ARCHIVED_add-power-button-text: Script loading');

chrome.storage.sync.get({ ARCHIVED_addPowerButtonText: false, enabled: true }, (data) => {
  if (!data.enabled || !data.ARCHIVED_addPowerButtonText) {
    console.log('[better-falix] ARCHIVED_add-power-button-text: Script disabled');
    return;
  }
  console.log('[better-falix] ARCHIVED_add-power-button-text: Script enabled');

  addPowerButtonLabels();
});

function addPowerButtonLabels() {
    // Add CSS to prevent button overlap
    const style = document.createElement('style');
    style.textContent = `
        .titlebar-power button.titlebar-btn {
            padding: 0 10px !important;
            min-width: fit-content !important;
            gap: 6px !important;
            display: inline-flex !important;
            align-items: center !important;
            white-space: nowrap !important;
        }
        .titlebar-power {
            gap: 8px !important;
            display: flex !important;
        }
        .titlebar-btn .btn-label {
            font-size: 0.875rem;
            line-height: 1;
        }
    `;
    if (!document.querySelector('#power-button-text-style')) {
        style.id = 'power-button-text-style';
        document.head.appendChild(style);
    }

    function addLabels() {
        const powerButtons = [
            { selector: 'button.titlebar-btn.start', label: 'Start' },
            { selector: 'button.titlebar-btn.stop', label: 'Stop' },
            { selector: 'button.titlebar-btn.restart', label: 'Restart' },
            { selector: 'button.titlebar-btn.kill', label: 'Kill' }
        ];

        powerButtons.forEach(({ selector, label }) => {
            const button = document.querySelector(selector);
            if (button && !button.querySelector('.btn-label')) {
                // Create a span for the label
                const labelSpan = document.createElement('span');
                labelSpan.className = 'btn-label';
                labelSpan.textContent = label;
                
                // Append the label after the SVG
                button.appendChild(labelSpan);
            }
        });
    }

    // Run initially
    if (document.body) {
        addLabels();
    }

    // Watch for dynamic changes
    const observer = new MutationObserver(() => {
        addLabels();
    });

    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}
