// Simple browser polyfill for content scripts
// This provides cross-browser compatibility by using 'browser' API
if (typeof browser === "undefined") {
  var browser = chrome;
}
