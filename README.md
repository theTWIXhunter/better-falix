# Better Falix

Better Falix is a browser extension that enhances the FalixNodes client-side experience by allowing you to customize and improve the website's navigation and interface.

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
- **Hide Support Category:** Hides the Support category from the navigation and main interface.

### Console

- **Hide Console Tabs:** Optionally hide unnecessary console tabs for a cleaner interface (added to Falix itself using a dropdown, this feature will just delete the dropdown button itself).
- **replace Support Modal:** Replaces the support modal with a cleaner one and adds a copy all button.
- **Remove How To Connect:** Removes all "How to connect" steps, DNS verification sections, and the "Server Name" row from the connect button and adds back the IPwithPORT.

### Filemanager

- **Remove SFTP info from upload:** Removes the SFTP info and its divider from the upload button dropdown for a cleaner UI.
- **upload-create-hover:** Makes the Upload and Create buttons show their dropdowns when hovered.
- **Better Editor Fullscreen:** Hide editor header and breadcrumb when using built-in fullscreen mode.

### Navigation

- **Move "Backups" to Server Settings:** Relocate the "Backups" navigation item to the Server Settings section.
- **Move "Monitoring" to Server Settings:** Move the "Monitoring" navigation item to the Server Settings section.
- **Move "Logs" to Server Settings:** Move the "Logs" navigation item to the Server Settings section.
- **Remove "Remote Startup" Nav Item:** Hide the "Remote Startup" navigation item from the sidebar.
- **Remove Navbar Support Links:** Optionally remove support-related links from the navbar.

### Shared Logs

- **Remove logs container:** Removes the scrollable container around the shared logs box.
- **Subtle Redacted Content:** Make redacted content less eye-catching with subtle gray styling.
- **Colored Log Messages:** Color warning log messages gold and error log messages red.
- **Auto-Collapse Log Analysis:** Automatically collapse the Log Analysis section when the page loads.

### Staff-only features
This is a hidden category with features for the admin/support panel and a lot of pages that are all admin-only. this category is hidden by default but can be shown in the options page, only falix staff will be able to notice and use these features.


### Archived features

Warning: These features are archived, this is either because they are replaced or because they got implemented into the native page.
Enabling these features might cause issues or incompatibilities with other plugins or native features.

- **Editor Fullscreen**: Adds a button to the file editor toolbar that allows you to make the editor and toolbar take up the entire browser window (added to falix itself).
- **Server Name Button:** Makes the server name in the navbar clickable and redirect you to the main page (added to falix itself).
- **Collapsible Log Analysis:** Add a collapse/expand button to the Log Analysis section (added to falix itself).
- **Editor Wrapper Height:** Sets the file editor height to 600px (new height can be configured in the config) (the issue this was fixing got solved).


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
      "js": ["features/FEATURENAME/index.js"],
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
console.log('[better-falix] FEATURENAME: Script loading');

chrome.storage.sync.get({ FEATURENAME: false, enabled: true }, (data) => {
  if (!data.enabled || !data FEATURENAME) {
    console.log('[better-falix] FEATURENAME: Script disabled');
    return;
  }
  console.log('[better-falix] FEATURENAME: Script enabled');

  //  --------- START FEATURE ----------
```

## Logging

All logging should use the following format:

```log
[Better-Falix] FEATURENAME: logged message here
```

A basic feature logs the following events:

- Script loading (at the start of the file)
- Script Enabled (after the enabled check)
- Script Disabled (when the enabled check fails)
- Script loaded successfully (somewhere at the end)

## License

License is located at the [LICENSE](LICENSE) file.

---
This project is not affiliated with FalixNodes.
