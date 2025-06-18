# Better Falix

Better Falix is a browser extension that enhances the Falixnodes client-side experience by allowing you to customize and improve the website's navigation and interface.

## Features
- **Enable/Disable All Features:** A master toggle to quickly enable or disable all extension features.

**GENERAL**
- **Hide Console Tabs:**
 Optionally hide unnecessary console tabs for a cleaner interface.
- **Replace Account Category**: 
Hides the sidebar "Account" category and adds a custom popup menu to the profile icon with quick links to Profile Settings and Logout.
- **Remove SFTP info from upload**: 
Removes the SFTP info and its divider from the upload button dropdown for a cleaner UI.
- **Remove How To Connect**: 
Removes all "How to connect" steps, DNS verification sections, and the "Server Name" row from the connect button And add back the IPwithPORT.
- **Remove-exit-discount:** 
Removes the most annoying popup ever (the exit discount modal and its backdrop) from falixnodes.net.
- **its-just paper:** 
Renames "Craftbukkit / Spigot / PaperSpigot" to "Paper" in the server type dropdown for clarity.
- **Navbar Hover**
Opens and closes the navbar when you hover on/off it.
- **replace Support Modal**
Replaces the support modal with a cleaner one and adds a copy all button.
- **Server Name Button**
Makes the server name in the navbar clickable and redirect you to the main page.
- **upload-create-hover:**  
Makes the Upload and Create buttons show their dropdowns when hovered.
- **Editor Wrapper Height**
Sets the file editor height to 600px.

**NAVIGATION**
- **Server Name Button:** Makes the server name in the navbar (current-server-info) clickable to go to the main page, handy for when using the mobile nav bar.
- **Move "Backups" to Server Settings:** 
Relocate the "Backups" navigation item to the Server Settings section.
- **Move "Monitoring" to Advanced:** 
Move the "Monitoring" navigation item to the Advanced section.
- **Move "Logs" to Advanced:** 
Move the "Logs" navigation item to the Advanced section.
- **Remove "Remote Startup" Nav Item:** 
Hide the "Remote Startup" navigation item from the sidebar.
- **Remove Navbar Support Links:** 
Optionally remove support-related links from the navbar.

## Usage

1. **Install the Extension:**  
   Load the extension into your browser (e.g., via Chrome's "Load unpacked" feature).

2. **Open the Popup:**  
   Click the Better Falix icon in your browser toolbar to open the popup.

3. **Toggle Features:**  
   Use the checkboxes to enable or disable individual features. Use the main toggle button to enable or disable all features at once.

4. **Changes Apply Instantly:**  
   Most changes take effect immediately. If not, try refreshing the Falixnodes page.

## Development

- To add new features, Create a new folder in the `features/` directory and put your main code inside together with (optional) extra data and/or assets.

- Add your feature to the Popup by adding:
popup.HTML:
```html
      <div class="feature-row">
        <span class="feature-label" data-tooltip="1 line Feature description here (by author).">FEATURE NAME</span>
        <button class="feature-btn" id="removeConsoleFilesCategory" aria-pressed="false" tabindex="0"><span class="dot"></span></button>
      </div>
```
popup.JS:
```JS
const featureIds = [
    FEATURENAME: false // add this line to the end
   ];
```
```JS
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({
    FEATURENAME: false, // add this line to the end
```

Manifest.json:
```json
    {
      "matches": ["https://client.falixnodes.net/server/versions*"],
      "js": ["features/FEATURENAME/index.js"],
      "run_at": "document_idle"
    }
```
README.md
```md
- **FEATURENAME:** 1 line Feature description here (by author).
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
 ### Logging: all logging should happen in the following format:

```
[Better-Falix] FEATURENAME: logged message here
```

   A basic feature logs the following events:
   - Script loading (at the start of the file)
   - Script Enabled (after the enabled check)
   - Script Disabled (when the enabled check fails)
   - Script loaded sucsessfully (somewher at the end)

## License

MIT

---
This project is not affiliated with Falixnodes.
