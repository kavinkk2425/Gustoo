/**
 * ==============================================================================
 * GUSTO '26 (2.0) — GOOGLE APPS SCRIPT WEBHOOK BACKEND
 * ==============================================================================
 * Connects the Gusto '26 website directly to your Google Sheet & Google Drive:
 *  1. Saves student payment screenshot images into a designated Google Drive folder.
 *  2. Records registration rows into Google Sheets.
 *  3. Serves registrations data via GET request to the /admin page.
 *  4. Updates student Attendance (Present, Absent, Pending) via POST request.
 *
 * HOW TO DEPLOY:
 *  1. Create a Google Sheet named "GUSTO 26 Registrations".
 *  2. Create a Google Drive folder named "GUSTO 26 Payment Proofs".
 *  3. In the Sheet, click: Extensions -> Apps Script.
 *  4. Paste this entire code into `Code.gs`.
 *  5. Replace FOLDER_ID with your Drive folder ID (from the folder URL).
 *  6. Click: Deploy -> New deployment -> Select type: Web app.
 *  7. Execute as: "Me" | Who has access: "Anyone".
 *  8. Copy the Web App URL and add it to your `.env.local`:
 *     NEXT_PUBLIC_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/..."
 * ==============================================================================
 */

// REPLACE WITH YOUR GOOGLE DRIVE FOLDER ID
const FOLDER_ID = "YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE";

/**
 * Handle GET requests — return all registered students from Google Sheet
 */
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({ registrations: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const headers = data[0];
  const registrations = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    registrations.push({
      id: row[0],                  // Pass Code
      timestamp: row[1],           // Registration Time
      fullName: row[2],            // Student Name
      phone: row[3],               // Phone
      email: row[4],               // Email
      college: row[5],             // College
      department: row[6],          // Department
      year: row[7],                // Year
      selectedEvents: row[8] ? String(row[8]).split(", ") : [],
      transactionId: row[9],       // UTR Reference
      paymentScreenshotUrl: row[10],// Drive File Link
      paymentStatus: row[11] || "Unverified",
      attendance: row[12] || "Pending",
      attendanceUpdatedAt: row[13] || "",
      notes: row[14] || ""
    });
  }

  return ContentService.createTextOutput(JSON.stringify({ registrations: registrations }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST requests — Register student or Update attendance/payment status
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Pass Code",
        "Timestamp",
        "Full Name",
        "Phone",
        "Email",
        "College",
        "Department",
        "Year",
        "Selected Events",
        "UTR Number",
        "Payment Drive Link",
        "Payment Status",
        "Attendance",
        "Attendance Updated At",
        "Notes"
      ]);
    }

    // ACTION 1: New Student Registration
    if (payload.action === "register") {
      let driveFileUrl = "";

      // Save screenshot to Google Drive if provided
      if (payload.screenshotBase64 && payload.screenshotName) {
        try {
          const folder = DriveApp.getFolderById(FOLDER_ID);
          const contentType = payload.screenshotType || "image/jpeg";
          const bytes = Utilities.base64Decode(payload.screenshotBase64);
          const blob = Utilities.newBlob(bytes, contentType, payload.id + "_" + payload.screenshotName);
          const file = folder.createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          driveFileUrl = file.getUrl();
        } catch (driveErr) {
          driveFileUrl = "Drive Error: " + driveErr.message;
        }
      }

      sheet.appendRow([
        payload.id,
        new Date().toLocaleString(),
        payload.fullName,
        payload.phone,
        payload.email || "",
        payload.college,
        payload.department || "",
        payload.year || "",
        (payload.selectedEvents || []).join(", "),
        payload.transactionId || "",
        driveFileUrl,
        "Unverified",
        "Pending",
        "",
        ""
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        id: payload.id,
        paymentScreenshotUrl: driveFileUrl
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ACTION 2: Update Student Attendance
    if (payload.action === "updateAttendance") {
      const data = sheet.getDataRange().getValues();
      let found = false;

      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === payload.id) {
          // Attendance is in column 13 (M)
          sheet.getRange(i + 1, 13).setValue(payload.attendance);
          sheet.getRange(i + 1, 14).setValue(new Date().toLocaleString());
          found = true;
          break;
        }
      }

      return ContentService.createTextOutput(JSON.stringify({ success: found }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ACTION 3: Update Payment Verification Status
    if (payload.action === "updatePaymentStatus") {
      const data = sheet.getDataRange().getValues();
      let found = false;

      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === payload.id) {
          // Payment status is in column 12 (L)
          sheet.getRange(i + 1, 12).setValue(payload.paymentStatus);
          found = true;
          break;
        }
      }

      return ContentService.createTextOutput(JSON.stringify({ success: found }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ error: "Unknown action" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
