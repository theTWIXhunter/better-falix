// Match legacy class selectors against Next.js CSS-module class names.
(function installNextJsClassCompatibility() {
  const classSelectorPattern = /(^|[^\w-])\.([A-Za-z_][\w-]*)/g;

  function expandClassSelectors(selector) {
    if (typeof selector !== 'string') return selector;

    return selector.replace(classSelectorPattern, (_, prefix, className) =>
      `${prefix}:is(.${className}, [class*="__${className}"])`
    );
  }

  const querySelector = Document.prototype.querySelector;
  const querySelectorAll = Document.prototype.querySelectorAll;
  Document.prototype.querySelector = function(selector) {
    return querySelector.call(this, expandClassSelectors(selector));
  };
  Document.prototype.querySelectorAll = function(selector) {
    return querySelectorAll.call(this, expandClassSelectors(selector));
  };

  const elementQuerySelector = Element.prototype.querySelector;
  const elementQuerySelectorAll = Element.prototype.querySelectorAll;
  const elementMatches = Element.prototype.matches;
  const elementClosest = Element.prototype.closest;
  Element.prototype.querySelector = function(selector) {
    return elementQuerySelector.call(this, expandClassSelectors(selector));
  };
  Element.prototype.querySelectorAll = function(selector) {
    return elementQuerySelectorAll.call(this, expandClassSelectors(selector));
  };
  Element.prototype.matches = function(selector) {
    return elementMatches.call(this, expandClassSelectors(selector));
  };
  Element.prototype.closest = function(selector) {
    return elementClosest.call(this, expandClassSelectors(selector));
  };

  const contains = DOMTokenList.prototype.contains;
  DOMTokenList.prototype.contains = function(token) {
    if (contains.call(this, token)) return true;
    return Array.from(this).some(className => className.endsWith(`__${token}`));
  };
})();
