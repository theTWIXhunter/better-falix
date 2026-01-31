const storageApi = (typeof browser !== 'undefined' && browser.storage) ? browser : chrome;

storageApi.storage.sync.get(['addPowerButtonText'], (result) => {
    if (result.addPowerButtonText) {
        addPowerButtonLabels();
    }
});

function addPowerButtonLabels() {
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
                labelSpan.style.marginLeft = '6px';
                labelSpan.style.fontSize = '0.875rem';
                
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
