# Google Sheets backend for the potluck sign-up sheet

This folder contains the Google Apps Script backend for `../sign_up_sheet.html`.

## Setup

1. Create a new Google Sheet.
1. In the sheet, choose **Extensions > Apps Script**.
1. Replace the default `Code.gs` content with the contents of `Code.gs` from this folder.
1. In Apps Script, select the `setup` function and run it once.
1. Approve the permissions prompt.
1. Confirm the Google Sheet now has these tabs:
   - `Settings`
   - `Categories`
   - `Signups`
1. In Apps Script, choose **Deploy > New deployment**.
1. Select **Web app**.
1. Use these deployment settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
1. Copy the Web app URL ending in `/exec`.
1. Open `../sign_up_sheet.html` and paste that URL into:

   ```js
   const SHARED_BACKEND_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_EXEC_URL_HERE";
   ```

1. Publish/upload the updated `sign_up_sheet.html` to GitHub Pages.

## How customization works in shared mode

When `SHARED_BACKEND_URL` is set, the page loads shared data from the Google Sheet.

Edit the Google Sheet directly:

- `Settings` tab controls title, note, date, location, organizer email, and optional hero image URL.
- `Categories` tab controls category ID, display name, needed count, icon, and whether the category is active.
- `Signups` tab stores submitted sign-ups, including private email and phone details.

The public page intentionally displays only name and item. Email and phone stay private in the Google Sheet.

## Who can customize the page?

Only the Google Sheet owner/editors should be able to customize the shared page.

- Keep the Google Sheet private, or share it only with trusted organizers as **Editor**.
- Public visitors should only receive the GitHub Pages link, not edit access to the Google Sheet.
- In shared mode, the public page hides the customize/import/export controls and only allows visitors to add sign-ups or print the public sheet.
- The Apps Script web app exposes public `list` and `signup` actions only. It does not expose public actions for changing settings, categories, limits, or existing signups.

To customize the page as the organizer, edit these private Google Sheet tabs directly:

- `Settings` for title, note, date, location, organizer email, and optional hero image URL.
- `Categories` for category names, icons, signup limits, and whether a category is active.

## Category limits

The Apps Script uses `LockService` before saving a signup. That means if two people submit at nearly the same time for the last slot, only one should get the slot and the other will receive a full-category message.

## Troubleshooting: `Error 401: invalid_client`

If Google shows **Access blocked: Authorization Error** with **The OAuth client was not found** / **Error 401: invalid_client**, the Apps Script project's Google-managed OAuth client is usually stale or broken. The script code is not normally the cause.

Fastest fix:

1. Go back to the Google Sheet.
1. Choose **Extensions > Apps Script** from that sheet again.
1. If this opens the same broken Apps Script project, delete that Apps Script project from Drive or create a brand-new Google Sheet.
1. Open **Extensions > Apps Script** from the new sheet.
1. Paste `Code.gs` into the fresh bound script project.
1. Click **Save**.
1. Run `setup` again and authorize from the same Google account that owns the sheet.
1. Deploy a new web app and use the new `/exec` URL.

Other things to check:

- Use one Google account in the browser while authorizing. Multiple signed-in Google accounts can send authorization through the wrong account.
- Do not create or attach a custom Google Cloud OAuth client for this simple setup. A default Apps Script project is enough.
- If you changed **Project Settings > Google Cloud Platform project**, switch back to a normal/default Apps Script project or create a fresh bound script.
- If the error appears from an old deployment URL, create a new deployment and use the latest `/exec` URL.
