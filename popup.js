const toggleBtn = document.getElementById('toggle');

function updateButton(enabled) {
  if (enabled) {
    toggleBtn.textContent = 'Disable Extensions';
    toggleBtn.classList.remove('off');
  } else {
    toggleBtn.textContent = 'Enable Extensions';
    toggleBtn.classList.add('off');
  }
}

chrome.storage.sync.get({ enabled: true }, (data) => {
  updateButton(data.enabled);
});

toggleBtn.addEventListener('click', () => {
  chrome.storage.sync.get({ enabled: true }, (data) => {
    const newState = !data.enabled;
    chrome.storage.sync.set({ enabled: newState }, () => {
      updateButton(newState);
    });
  });
});
