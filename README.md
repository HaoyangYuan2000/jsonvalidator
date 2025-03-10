# JSON Validator & Editor

## Project Overview

This is a validation and editing tool for AdConfig JSON data, providing an intuitive interface for JSON editing, validation, and difference comparison. This tool helps team members safely modify advertising configurations while ensuring data format correctness.

## System Requirements

- Modern browser (Chrome, Firefox, Edge, etc.)
- Node.js (v14 or higher)
- Internet connection (for API calls)

## Installation and Setup

1. **Clone the project to local machine**

   ```bash
   git clone https://github.com/HaoyangYuan2000/jsonvalidator.git
   cd jsonvalidator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure the server**

   Ensure that `server.js` or the corresponding server file is correctly configured. The server needs to proxy the following API requests:
   - `/api/proxy/getAdConfig` - Fetch ad configuration
   - `/api/proxy/saveAdConfig` - Save ad configuration

4. **Start the local server**

   ```bash
   node server.js
   ```

   The server will start by default at `http://localhost:3000`.

## Usage Instructions

1. **Open the application**

   Access `http://localhost:3000` in your browser or open `jsonvalidator.html`

2. **Fetch ad configuration**

   - Select App ID and Org ID from the dropdown menus
   - Click the "Fetch AdConfig" button to load the configuration

3. **Edit configuration**

   - Expand/collapse objects and arrays for easier editing
   - Add/remove fields or array items
   - Edit existing values

4. **Validate and compare**

   - After editing, click the "Generate New JSON & Diff" button
   - The system will automatically validate the modified JSON
   - If validation succeeds, it will display a comparison between the original and modified JSON

5. **Review and submit**

   - Check the difference comparison (green for additions, red for deletions)
   - Once validation passes and changes are confirmed, click "Approve Changes" to submit

## Features

- Intuitive JSON editing interface
- Real-time validation and error reporting
- Visual comparison between original and modified data
- Scrollbar markers for modification locations
- Collapsible areas for large JSON structures
- Synchronized scrolling in comparison view

## Troubleshooting

### If you cannot fetch data

1. Make sure the local server is running and on the correct port
2. Check the browser console for error messages
3. Confirm that API interface configuration is correct (app_id, org_id, and token)

### If validation fails

1. Check validation error messages and fix the indicated issues
2. Ensure numeric fields are actually number types, not strings

### If comparison or submit buttons are unresponsive

1. Make sure to complete the validation step first
2. Check the browser console for JavaScript errors
3. Try fetching the configuration again and reapplying modifications

## Important Notes

- All modifications will not be saved until "Approve Changes" is clicked
- Always check the difference comparison before submitting
- For the best experience, use a larger screen to properly view the comparison view