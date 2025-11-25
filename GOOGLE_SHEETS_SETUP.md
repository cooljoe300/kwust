# Google Sheets Integration Setup Guide

This guide will help you set up your voting form to automatically save submissions to Google Sheets.

## Step 1: Create a Google Sheet

### Option A: Automatic Setup (Recommended - Uses Script)

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create a new spreadsheet
3. Name it: **"KWUSO Voting Results 2025"**
4. **Copy the Sheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - Copy the `YOUR_SHEET_ID` part
5. Go to **Step 2** to set up the script
6. After setting up the script, run the `setupGoogleSheet()` function (see Step 2.5 below)
7. The script will automatically create all headers for you!

### Option B: Manual Setup

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create a new spreadsheet
3. Name it: **"KWUSO Voting Results 2025"**
4. In the first row (Row 1), manually add these column headers:
   ```
   A1: Timestamp
   B1: Best Student Leader KWUSO 24/25
   C1: Best Captain Sports
   D1: Best Sports Team
   E1: Best Influencer
   F1: Miss Popularity 25/26
   G1: User Agent
   ```
5. **Save the sheet** (Ctrl+S or Cmd+S)

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **"Extensions"** → **"Apps Script"**
   - If you don't see "Extensions", click **"Tools"** → **"Script editor"**
2. A new tab will open with the Apps Script editor
3. **Delete all the default code** in the editor
4. **Copy and paste** the code from `google-apps-script.js` file (see below)
5. **Update the SHEET_ID** (line 18):
   - Replace `'YOUR_SHEET_ID_HERE'` with your actual Sheet ID from Step 1
6. Click **"Save"** (💾 icon) or press `Ctrl+S` / `Cmd+S`
7. Name your project: **"KWUSO Voting Handler"**

### Step 2.5: Run Setup Function (Automatic Header Creation)

1. In the Apps Script editor, click **"Run"** → Select **"setupGoogleSheet"**
2. Click **"Authorize access"** if prompted
3. Choose your Google account
4. Click **"Advanced"** → **"Go to [Project Name] (unsafe)"**
5. Click **"Allow"** to grant permissions
6. The function will run and create all headers automatically!
7. Go back to your Google Sheet and check Row 1 - headers should be there!

**To verify setup:**
- Run the **"verifySheetSetup"** function to check if everything is correct

## Step 3: Deploy as Web App

1. In the Apps Script editor, click **"Deploy"** → **"New deployment"**
2. Click the **⚙️ Settings icon** (gear) next to "Select type"
3. Choose **"Web app"**
4. Configure the deployment:
   - **Description**: "KWUSO Voting Form Handler"
   - **Execute as**: **"Me"** (your Google account)
   - **Who has access**: **"Anyone"** (important!)
5. Click **"Deploy"**
6. **IMPORTANT**: You may need to authorize the script:
   - Click **"Authorize access"**
   - Choose your Google account
   - Click **"Advanced"** → **"Go to [Project Name] (unsafe)"**
   - Click **"Allow"**
7. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
   ⚠️ **SAVE THIS URL** - you'll need it in the next step!

## Step 4: Get Your Google Sheet ID

1. Go back to your Google Sheet
2. Look at the URL in your browser:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
3. Copy the **SHEET_ID_HERE** part (the long string between `/d/` and `/edit`)
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`
   - Your Sheet ID is: `1a2b3c4d5e6f7g8h9i0j`
4. **Save this Sheet ID** - you'll need it for the script

## Step 5: Update the Google Apps Script

1. Go back to the Apps Script editor
2. Find this line in the code:
   ```javascript
   const SHEET_ID = 'YOUR_SHEET_ID_HERE';
   ```
3. Replace `'YOUR_SHEET_ID_HERE'` with your actual Sheet ID (from Step 4)
4. **Email Notifications**: The script is already configured to send email notifications to `jonmuhoro@gmail.com` when submissions are received. If you need to change this email, find this line:
   ```javascript
   const NOTIFICATION_EMAIL = 'jonmuhoro@gmail.com';
   ```
   and replace it with your desired email address.
5. Click **"Save"** (💾)
6. **IMPORTANT**: When you first run the script, Google will ask for permission to send emails. Click **"Review permissions"** → **"Allow"** to enable email notifications.
7. Click **"Deploy"** → **"Manage deployments"**
8. Click the **✏️ Edit icon** (pencil) next to your deployment
9. Click **"Deploy"** again to update it

## Step 6: Update Your HTML File

1. Open `index.html` in your code editor
2. Find this line (around line 674):
   ```javascript
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/mankeldl";
   ```
3. Replace it with your Google Apps Script Web App URL:
   ```javascript
   const FORMSPREE_ENDPOINT = "https://script.google.com/macros/s/AKfycby.../exec";
   ```
   (Use the URL you copied in Step 3)
4. **Save the file**

## Step 7: Test the Integration

1. Upload your updated `index.html` to GitHub
2. Visit your live voting page
3. Submit a test vote
4. Go back to your Google Sheet
5. **Refresh the page** (F5)
6. You should see your test vote appear in Row 2!
7. **Check your email** (jonmuhoro@gmail.com) - you should receive an email notification with the submission details!

## Step 8: View Your Results

- **Real-time updates**: Votes appear in Google Sheets as they're submitted
- **Sort & Filter**: Use Google Sheets features to analyze votes
- **Export**: Download as Excel, CSV, or PDF
- **Share**: Share the sheet with others (View-only or Edit access)

## Troubleshooting

### Problem: "Script not authorized"
- **Solution**: Go to Apps Script → Deploy → Manage deployments → Click "Authorize access"

### Problem: Votes not appearing in sheet
- **Check**: Make sure Sheet ID is correct in the script
- **Check**: Verify the Web App URL is correct in index.html
- **Check**: Make sure deployment is set to "Anyone" can access

### Problem: "Access denied" error
- **Solution**: 
  1. Go to Apps Script → Deploy → Manage deployments
  2. Click Edit (pencil icon)
  3. Set "Who has access" to "Anyone"
  4. Redeploy

### Problem: Script execution failed
- **Check**: Make sure column headers match exactly (see Step 1)
- **Check**: Make sure Sheet ID is correct
- **Check**: Open Apps Script → View → Execution log to see errors

### Problem: Not receiving email notifications
- **Check**: Make sure you authorized email permissions when first running the script
- **Check**: Verify the email address in the script matches your desired notification email
- **Check**: Look in your spam/junk folder
- **Solution**: Go to Apps Script → Run → Run function → Select any function → Authorize permissions again

## Security Notes

⚠️ **Important**: 
- The Web App URL is public - anyone with the URL can submit data
- Consider adding basic validation in the Apps Script
- Monitor your sheet for spam submissions
- You can add password protection or API keys for extra security

## Email Notifications

✅ **Email notifications are already configured!** 

When a new submission is received:
- The vote is saved to your Google Sheet
- An email is automatically sent to **jonmuhoro@gmail.com** (or the email you configured)
- The email includes all submission details: timestamp, all votes, and user agent

To change the notification email address, edit the `NOTIFICATION_EMAIL` constant in the Google Apps Script.

## Next Steps

- Create **charts and graphs** in Google Sheets to visualize results
- Set up **automatic backups** of your sheet
- Add **data validation** rules in the Apps Script

---

**Need Help?**
- Google Apps Script Docs: https://developers.google.com/apps-script
- Google Sheets API: https://developers.google.com/sheets/api


