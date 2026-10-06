# Google Sheets & Google Drive Integration Guide

This guide walks you through connecting **Gusto '26** to Google Sheets and Google Drive in 3 minutes. This enables:
1. **Google Drive**: Automatic storage of student payment screenshots in your Google Drive folder.
2. **Google Sheets**: Automatic recording of registration rows.
3. **Admin Portal (`/admin`)**: Real-time loading of registrations, one-click attendance updates, and payment screenshot verification.

---

## 🚀 Setup Steps (Takes ~3 Minutes)

### Step 1: Create a Google Drive Folder
1. Go to [Google Drive](https://drive.google.com).
2. Create a new folder named: **`GUSTO 26 Payment Proofs`**.
3. Open the folder and copy the **Folder ID** from the browser URL:
   ```text
   https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ
                                          ^^^^^^^^^^^^^^^^^^^^^^^^^^
                                          This is your FOLDER_ID
   ```

### Step 2: Create a Google Sheet & Paste Script
1. Create a new [Google Sheet](https://sheets.new) named: **`GUSTO 26 Registrations`**.
2. In the top menu, click **Extensions** > **Apps Script**.
3. Clear any starter code in `Code.gs` and paste the entire contents of [`scripts/google-apps-script.js`](../scripts/google-apps-script.js).
4. Replace `YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE` with your Folder ID from Step 1.
5. Click the **Save** icon (💾) or press `Ctrl + S`.

### Step 3: Deploy as Web App
1. At the top right of the Apps Script editor, click **Deploy** > **New deployment**.
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
3. Set the fields:
   - **Description**: `GUSTO 26 API`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial so students and the website can post registrations without Google login)*
4. Click **Deploy**.
5. Grant permissions if prompted (Click *Advanced* > *Go to GUSTO 26 API (unsafe)* > *Allow*).
6. Copy the generated **Web App URL**:
   ```text
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

### Step 4: Add URL to Gusto 26 Website
1. In your local project root, open `.env.local` (or create it if it doesn't exist).
2. Add your Web App URL and desired Admin PIN:
   ```env
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/AKfycbx.../exec"
   NEXT_PUBLIC_ADMIN_PIN="gusto2026"
   ```
3. Restart your dev server (`npm run dev`).

---

## 🔒 Security & Admin Access
- The `/admin` portal requires the coordinator secret PIN (default: `gusto2026` or whatever you set in `NEXT_PUBLIC_ADMIN_PIN`).
- You can change this PIN anytime in `.env.local`.
