# Better Falix 1.5.1

Better Falix is a browser extension that enhances the FalixNodes client-side experience by allowing you to customize and improve the website's navigation and interface.

**Any questions? Join our discord server here:** https://discord.gg/EXm6uWcCeV

## Custom Navbar Editor (NEW!)
Customize navbar sections and items with the visual editor. Features include:
  - Drag and drop reordering of sections and items
  - Icon picker with common Font Awesome icons
  - Advanced custom SVG path support for custom icons
  - Per-section expanded/collapsed state control
  - Option to hide section headers
  - Export/import configurations for backup or sharing


## Features

- **Enable/Disable All Features:** A master toggle to quickly enable or disable all extension features.

### General

- **Custom Server Order:** Reorder your server list in any way you want.
- **Navbar Hover:** Opens and closes the navbar when you hover on/off it.
- **Replace Account Category:** Hides the sidebar "Account" category and adds a custom popup menu to the profile icon with quick links to Profile Settings and Logout.
- **Remove-exit-discount:** Removes the most annoying popup ever (the exit discount modal and its backdrop) from falixnodes.net.
- **it's just Paper:** Renames "Craftbukkit / Spigot / PaperSpigot" to "Paper" in the server type dropdown for clarity.
- **it's just Geyser:** Renames "Java + Bedrock Support (Geyser)" to "geyser" in the server type dropdown for clarity.
- **Remove Server search bar:** Removes the Server Search bar from the main page.

### Console

- **Hide Console Tabs:** Optionally hide unnecessary console tabs for a cleaner interface (added to Falix itself using a dropdown, this feature will just delete the dropdown button itself).
- **Replace Support Modal:** Replaces the support modal with a cleaner one and adds a copy all button.
- **Replace CPU with Node:** Replaces the CPU information with Node information in the console.
- **Remove Max Players card:** Removes the Max Players info card from the console interface.
- **Remove Player Management card:** Removes the Player Management info card from the console interface.
- **Replace connect modal:** Removes all "How to connect" steps, DNS verification sections, and the "Server Name" row from the connect button and adds back the IPwithPORT and PORT.
- **Remove Premium Transfer Banner:** Removes the 'Welcome to Premium' transfer notification banner from the console.

### Filemanager

- **Remove SFTP info from upload:** Removes the SFTP info and its divider from the upload button dropdown for a cleaner UI.
- **upload-create-hover:** Makes the Upload and Create buttons show their dropdowns when hovered.
- **Better Editor Fullscreen:** Hide editor header and breadcrumb when using built-in fullscreen mode.

### Navigation
these features have been deprecated and will be removed in 1.6.0, use the navbar editor for more customizable options.

- **Rename Config to Properties:** Renames the "Config" navigation option to "Properties" in the Minecraft category for clarity.
- **Rename Addons to Mods:** Renames the "Addons" navigation option to "Mods" in the Minecraft category for clarity.
- **Split Addons Tabs:** Splits the addons tab back into separate plugins, mods, modpacks, and datapacks tabs on server pages.
- **Add Versions Nav:** Adds a "Versions" link with a code-branch icon to the Minecraft section of the navbar for quick access to server version changes.
- **Hide Support Category:** Hides the Support category from the navigation and main interface.

### Shared Logs

- **Remove logs container:** Removes the scrollable container around the shared logs box.
- **Subtle Redacted Content:** Make redacted content less eye-catching with subtle gray styling.
- **Colored Log Messages:** Color warning log messages gold and error log messages red.
- **Auto-Collapse Log Analysis:** Automatically collapse the Log Analysis section when the page loads.

### Support Center
Note: this category isn't visible by default, you can enable "staff features" in the options page.

- **Hide Reply Headers:**  removes the  unnecessarily bulky "write a reply" headers from the message box in the support center chat.
- **I Know Markdown:** Hides markdown formatting buttons in ticket reply box for users who prefer to write markdown manually.
- **Hide Template Button:** Hides the template button in ticket reply box. You can use '!' command instead to access templates.
- **Remove File Upload Label:** Removes the file upload label from ticket reply box.
- **Show Ticket ID in Title:** Adds the ticket ID to the start of the ticket title (e.g., '#123 - Title') for easier identification.

## Usage

1. **Install the Extension:**  
   Load the extension into your browser (e.g., via Chrome's "Load unpacked" feature).

2. **Open the Popup:**  
   Click the Better Falix icon in your browser toolbar to open the popup.

3. **Toggle Features:**  
   Use the checkboxes to enable or disable individual features. Use the main toggle button to enable or disable all features at once.

4. **Changes Apply Instantly:**  
   Most changes take effect immediately. If not, try refreshing the FalixNodes page.

## Development
### Adding a basic feature:

- To add new features, create a new folder in the `features/` directory and put your main code inside together with (optional) extra data and/or assets.

- Add your feature to the popup by adding:
popup.HTML:

```html
      <div class="feature-row">
        <span class="feature-label" data-tooltip="1 line Feature description here (by author).">FEATURE NAME</span>
        <button class="feature-btn" id="removeConsoleFilesCategory" aria-pressed="false" tabindex="0"><span class="dot"></span></button>
      </div>
```

popup.js:

```js
const featureIds = [
    FEATURENAME: false // add this line to the end
   ];
```

```js
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({
    FEATURENAME: false, // add this line to the end
```

manifest.json:

```json
    {
      "matches": ["https://client.falixnodes.net/server/versions*"],
      "js": ["features/FEATURE-NAME/index.js"],
      "run_at": "document_idle"
    }
```

README.md

```md
### FEATURENAME

- List all changes made by this feature here (specifying the author).
```

- All feature scripts should check the global "enabled" state and their individual feature flag before running.

Start your script with:

```js
// [better-falix] FEATURENAME: Script loading
console.log('[better-falix] FEATURE-NAME: Script loading');

chrome.storage.sync.get({ featureName: false, enabled: true }, (data) => {
  if (!data.enabled || !data.featureName) {
    console.log('[better-falix] FEATURE-NAME: Script disabled');
    return;
  }
  console.log('[better-falix] FEATURE-NAME: Script enabled');

  //  --------- START FEATURE ----------
```

### adding options.
To add an options icon, the following should be added between the </span> and <button> elements in the popup.html:
```html
<svg class="feature-settings-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" title="Open settings for this feature"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
```
the following should be added to the options.html:
```html
    <div class="feature-block">
      <div class="feature-header">
        <span class="feature-title">example feature</span>
        <button class="feature-toggle" id="FEATUREIDHERE" aria-pressed="false" tabindex="0"><span class="dot"></span></button>
      </div>
      <div class="feature-desc">what you put here will be the description above the input.</div>
      <div class="setting-row">
        <span class="setting-label">Input name here:</span>
        <input class="setting-input" id="SETTINGSIDHERE" type="number" min="1" max="100" value="30"> <!-- don't forget to change the min, max and default values -->
      </div>
    </div>
```
and the following in options.js:

```js
const FEATURENAMEToggle = document.getElementById('FEATURENAME');
if (customServerOrderToggle) {
  customServerOrderToggle.addEventListener('click', function() {
    const state = this.getAttribute('aria-pressed') !== 'true';
    setToggleState(this, state);
    saveSetting('FEATURE NAME', state);
  });
}


```


## Logging

All logging should use the following format:

```log
[Better-Falix] FEATURE-NAME: logged message here
```

with the FEATURE-NAME being the name of the folder (with -)

A basic feature logs the following events:

- Script loading (at the start of the file)
- Script Enabled (after the enabled check)
- Script Disabled (when the enabled check fails)
- Script loaded successfully (somewhere at the end)

## License

License is located at the [LICENSE](LICENSE) file.

---
This project is not affiliated with FalixNodes.
