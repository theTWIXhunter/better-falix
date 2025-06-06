# Better Falix

Better Falix is a browser extension that enhances the Falixnodes client-side experience by allowing you to customize and improve the website's navigation and interface.

## Features

- **Hide Console Tabs:** Optionally hide unnecessary console tabs for a cleaner interface.
- **Move "Backups" to Server Settings:** Relocate the "Backups" navigation item to the Server Settings section.
- **Move "Monitoring" to Advanced:** Move the "Monitoring" navigation item to the Advanced section.
- **Move "Logs" to Advanced:** Move the "Logs" navigation item to the Advanced section.
- **Remove "Remote Startup" Nav Item:** Hide the "Remote Startup" navigation item from the sidebar.
- **Remove Navbar Support Links:** Optionally remove support-related links from the navbar.
- **Enable/Disable All Features:** A master toggle to quickly enable or disable all extension features.

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

- All feature scripts should check the global "enabled" state and their individual feature flag before running.
- To add new features, create a new script in the `features/` directory and follow the same pattern.

## License

MIT

---
This project is not affiliated with Falixnodes.
