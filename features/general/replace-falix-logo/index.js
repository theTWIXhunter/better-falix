// [better-falix] replace-falix-logo: Script loading
console.log('[better-falix] replace-falix-logo: Script loading');

chrome.storage.sync.get({ replaceFalixLogo: false, enabled: true, replaceFalixLogoChoice: 'better-falix_normal_logo' }, (data) => {
  if (!data.enabled || !data.replaceFalixLogo) {
    console.log('[better-falix] replace-falix-logo: Script disabled');
    return;
  }
  console.log('[better-falix] replace-falix-logo: Script enabled');

  //  --------- START FEATURE ----------

  const CHOICES = {
    'better-falix_normal_logo': 'https://thetwixhunter.nekoweb.org/better-falix/icons/better-falix_normal_logo.png',
    'falix_rainbow_gradient': 'https://thetwixhunter.nekoweb.org/better-falix/icons/falix_rainbow_gradient.png',
    'falix_rainbow_pride': 'https://thetwixhunter.nekoweb.org/better-falix/icons/falix_rainbow_pride.png',
    'TWIX_logo_falix': 'https://thetwixhunter.nekoweb.org/better-falix/icons/TWIX_logo.png',
    'TWIX_logoandname': 'https://thetwixhunter.nekoweb.org/better-falix/icons/TWIX_logoandname.png',
    'Falix_invaders_logo':'https://thetwixhunter.nekoweb.org/better-falix/icons/falixinvaders_logo.png',
    'falix_pineapple_pizza': 'https://thetwixhunter.nekoweb.org/better-falix/icons/falix_pineapple_pizza.png'
  };

  const choice = data.replaceFalixLogoChoice || 'better-falix_normal_logo';
  const logoUrl = CHOICES[choice] || CHOICES['better-falix_normal_logo'];
  
  let hasRunOnLoad = false;

  function replaceAllLogos() {
    try {
      // Replace img elements whose src ends with falix.svg or contains /assets/falix
      const imgs = Array.from(document.querySelectorAll('img'));
      imgs.forEach(img => {
        try {
          const src = img.getAttribute('src') || '';
          if (src.endsWith('/assets/falix.svg') || /falix\.svg/.test(src)) {
            img.setAttribute('src', logoUrl);
            // clear srcset if present to avoid browser choosing original
            if (img.hasAttribute('srcset')) img.removeAttribute('srcset');
            // Remove width and height attributes to allow natural sizing
            if (img.hasAttribute('width')) img.removeAttribute('width');
            if (img.hasAttribute('height')) img.removeAttribute('height');
          }
        } catch (e) {
          // ignore per-element errors
        }
      });

      // Replace background-image styles that reference falix.svg
      const all = Array.from(document.querySelectorAll('[style]'));
      all.forEach(el => {
        try {
          const s = el.style && el.style.backgroundImage || '';
          if (s && s.indexOf('falix.svg') !== -1) {
            el.style.backgroundImage = `url('${logoUrl}')`;
          }
        } catch (e) {}
      });
    } catch (e) {
      console.error('[better-falix] replace-falix-logo: replacement error', e);
    }
  }

  // One-shot replace now
  replaceAllLogos();

  // Rerun at document_idle for consistency (only once)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!hasRunOnLoad) {
        hasRunOnLoad = true;
        replaceAllLogos();
      }
    });
  } else if (document.readyState === 'interactive') {
    // Wait for complete
    window.addEventListener('load', () => {
      if (!hasRunOnLoad) {
        hasRunOnLoad = true;
        replaceAllLogos();
      }
    });
  }

  // Observe mutations for up to 3s to catch late-inserted logos
  const observer = new MutationObserver(() => {
    replaceAllLogos();
  });
  observer.observe(document.documentElement || document.body, { childList: true, subtree: true, attributes: true });
  setTimeout(() => {
    try { 
      observer.disconnect();
      console.log('[better-falix] replace-falix-logo: Script loaded successfully');
    } catch (e) {}
  }, 3000);
});
