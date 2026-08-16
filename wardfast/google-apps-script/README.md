# Ward Fast shared sign-up setup

The website is ready to publish, but Google requires the sheet owner to authorize the private sign-up backend once.

1. Create a new Google Sheet named **Sundance 1st Ward September Fast 2026**.
2. In the sheet, choose **Extensions > Apps Script**.
3. Replace `Code.gs` with the contents of this folder's `Code.gs`.
4. Open **Project Settings**, enable **Show "appsscript.json" manifest file**, and replace the manifest with `appsscript.json`.
5. Run `setup` once and approve the permissions. This creates the `Signups` tab and a daily 6 PM Arizona reminder trigger.
6. Choose **Deploy > New deployment > Web app**.
7. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
8. Copy the deployment URL ending in `/exec`.
9. Paste it into `BACKEND_URL` near the top of `../app.js`.
10. Republish the `wardfast` folder.

Public visitors can see names and daily coverage. Phone numbers and reminder emails remain private in the Google Sheet. Opt-in reminders are sent by email the evening before the selected fast day. Missionaries can use the private phone column for their reminder calls.
