# Google Sheets CRM Setup Guide

## Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it something like **"BaseAim Onboarding CRM"**
3. In **Row 1**, add these exact headers (one per column, A through O):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Session ID | Timestamp | Last Updated | Full Name | Firm Name | Services | Phone Number | 90-Day Win | Current Situation | New Clients/Month | Has Meta Ads | Software Person on Call | Booking System | Current Step | Completed |

## Step 2: Add the Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code in the editor
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Phase 2 Onboarding");
    var data = JSON.parse(e.postData.contents);

    var sessionId = data.sessionId;
    var step = data.step;
    var completed = data.completed;
    var formData = data.data;

    // Find existing row by session ID
    var sessionCol = sheet.getRange("A:A").getValues();
    var rowIndex = -1;

    for (var i = 1; i < sessionCol.length; i++) {
      if (sessionCol[i][0] === sessionId) {
        rowIndex = i + 1; // 1-indexed
        break;
      }
    }

    var now = new Date().toISOString();

    if (rowIndex === -1) {
      // New row — append at the bottom
      rowIndex = sheet.getLastRow() + 1;
      sheet.getRange(rowIndex, 1).setValue(sessionId);       // A: Session ID
      sheet.getRange(rowIndex, 2).setValue(now);              // B: Timestamp
    }

    // Update the row
    sheet.getRange(rowIndex, 3).setValue(now);                                          // C: Last Updated
    sheet.getRange(rowIndex, 4).setValue(formData.fullName || "");                      // D: Full Name
    sheet.getRange(rowIndex, 5).setValue(formData.firmName || "");                      // E: Firm Name

    // F: Services (combine selected + other)
    var services = formData.services || "";
    if (formData.servicesOther) {
      services = services ? services + ", Other: " + formData.servicesOther : "Other: " + formData.servicesOther;
    }
    sheet.getRange(rowIndex, 6).setValue(services);

    sheet.getRange(rowIndex, 7).setValue(formData.phoneNumber || "");                   // G: Phone Number

    // H: 90-Day Win (combine choice + other)
    var win = formData.winIn90Days || "";
    if (formData.winIn90DaysOther) {
      win = win === "Other" ? "Other: " + formData.winIn90DaysOther : win;
    }
    sheet.getRange(rowIndex, 8).setValue(win);

    // I: Current Situation (combine choice + other)
    var situation = formData.currentSituation || "";
    if (formData.currentSituationOther) {
      situation = situation === "Other" ? "Other: " + formData.currentSituationOther : situation;
    }
    sheet.getRange(rowIndex, 9).setValue(situation);

    sheet.getRange(rowIndex, 10).setValue(formData.newClientsPerMonth || "");           // J: New Clients/Month
    sheet.getRange(rowIndex, 11).setValue(formData.hasMetaAds || "");                   // K: Has Meta Ads
    sheet.getRange(rowIndex, 12).setValue(formData.softwarePersonOnCall || "");         // L: Software Person on Call

    // M: Booking System (combine choice + other)
    var booking = formData.bookingSystem || "";
    if (formData.bookingSystemOther) {
      booking = booking === "Other" ? "Other: " + formData.bookingSystemOther : booking;
    }
    sheet.getRange(rowIndex, 13).setValue(booking);

    sheet.getRange(rowIndex, 14).setValue("Step " + step);                              // N: Current Step
    sheet.getRange(rowIndex, 15).setValue(completed ? "Yes" : "No");                    // O: Completed

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (Ctrl+S) and name the project (e.g., "Onboarding CRM Script")

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Set the following:
   - **Description**: Onboarding form handler
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Authorize the script when prompted (click through the "unsafe" warning — it's your own script)
6. **Copy the Web App URL** — it will look like:
   `https://script.google.com/macros/s/XXXXXXXXXXXXX/exec`

## Step 4: Add the URL to Your Website

1. Open the file `.env.local` in your project root
2. Replace the placeholder with your actual URL:

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec
```

3. Restart your dev server (`npm run dev`)

## How It Works

- Each survey respondent gets a unique session ID
- When they click "Next" or "Skip" on any question, the website sends the current form data to your Google Sheet
- If the respondent already has a row (matched by session ID), it updates that row
- If they're new, a new row is created
- The "Current Step" column shows how far they got
- The "Completed" column shows "Yes" when they reach the booking page

## Troubleshooting

- **Data not appearing**: Make sure the `.env.local` URL is correct and the dev server was restarted
- **Permission errors**: Re-deploy the Apps Script and make sure "Who has access" is set to "Anyone"
- **If you update the script**: You need to create a **new deployment** (Deploy → New deployment) for changes to take effect. The URL changes each time.

## Redeploying After Script Changes

If you edit the Apps Script code:
1. Go to **Deploy → Manage deployments**
2. Click the pencil icon on your deployment
3. Change the version to **New version**
4. Click **Deploy**
