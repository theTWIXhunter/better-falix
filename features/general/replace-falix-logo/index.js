// Replaces Falix logo images (src ending with falix.svg) with a chosen custom logo
// Options are stored in chrome.storage.sync under keys:
// - replaceFalixLogo: boolean
// - replaceFalixLogoChoice: string (one of the keys in `CHOICES`)

(function(){
  const NAME = '[better-falix] replace-falix-logo:';
  const CHOICES = {
    'better-falix_normal_logo': 'https://thetwixhunter.nekoweb.org/better-falix/icons/better-falix_normal_logo.png',
    'falix_rainbow_gradient': 'https://thetwixhunter.nekoweb.org/better-falix/icons/falix_rainbow_gradient.png',
    'falix_rainbow_pride': 'https://thetwixhunter.nekoweb.org/better-falix/icons/falix_rainbow_pride.png',
    'TWIX_logo_falix': 'https://thetwixhunter.nekoweb.org/better-falix/icons/TWIX_logo.png',
    'TWIX_logoandname': 'https://thetwixhunter.nekoweb.org/better-falix/icons/TWIX_logoandname.png'
  };

  function replaceAllLogos(url) {
    try {
      // Replace img elements whose src ends with falix.svg or contains /assets/falix
      const imgs = Array.from(document.querySelectorAll('img'));
      imgs.forEach(img => {
        try {
          const src = img.getAttribute('src') || '';
          if (src.endsWith('/assets/falix.svg') || /falix\.svg/.test(src)) {
            img.setAttribute('src', url);
            // clear srcset if present to avoid browser choosing original
            if (img.hasAttribute('srcset')) img.removeAttribute('srcset');
          }
        } catch (e) {
          // ignore per-element errors
        }
      });

      // Also try to replace any inline SVG <use xlink:href="/assets/falix.svg#..."> or object/embed references
      // Replace background-image styles that reference falix.svg
      const all = Array.from(document.querySelectorAll('[style], div, a, span'));
      all.forEach(el => {
        try {
          const s = el.style && el.style.backgroundImage || '';
          if (s && s.indexOf('falix.svg') !== -1) {
            el.style.backgroundImage = `url('${url}')`;
          }
        } catch (e) {}
      });
    } catch (e) {
      console.error(NAME, 'replacement error', e);
    }
  }

  function attemptReplace(choiceKey) {
    const url = CHOICES[choiceKey] || CHOICES['better-falix_normal_logo'];
    replaceAllLogos(url);
  }

  chrome.storage && chrome.storage.sync && chrome.storage.sync.get({ replaceFalixLogo: false, replaceFalixLogoChoice: 'better-falix_normal_logo' }, (data) => {
    if (!data || !data.replaceFalixLogo) {
      console.log(NAME, 'disabled in settings');
      return;
    }
    const choice = data.replaceFalixLogoChoice || 'better-falix_normal_logo';
    console.log(NAME, 'enabled, using choice', choice);

    // One-shot replace now
    attemptReplace(choice);

    // Observe mutations for up to 3s to catch late-inserted logos
    const observer = new MutationObserver((mutations) => {
      attemptReplace(choice);
    });
    observer.observe(document.documentElement || document.body, { childList: true, subtree: true, attributes: true });
    setTimeout(() => {
      try { observer.disconnect(); } catch (e) {}
    }, 3000);
  });
})();
