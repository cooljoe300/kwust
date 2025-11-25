# Quick Google Sheet Setup Guide

This guide will help you automatically create and configure your Google Sheet using the setup script.

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create a Blank Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create a new spreadsheet
3. Name it: **"KWUSO Voting Results 2025"**
4. **Copy the Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```
   Copy the part between `/d/` and `/edit`

### Step 2: Set Up Google Apps Script

1. In your Google Sheet, click **"Extensions"** → **"Apps Script"**
2. **Delete all default code**
3. **Copy the entire code** from `google-apps-script.js` file
4. **Paste it** into the Apps Script editor
5. **Update line 18** - Replace `'YOUR_SHEET_ID_HERE'` with your actual Sheet ID:
   ```javascript
   const SHEET_ID = '1143CqTT_kET1iB09qkNL7YXkEi-ggUCrOgDIr4xLJVA'; // Your Sheet ID here
   ```
6. Click **"Save"** (💾)

### Step 3: Run the Setup Function

1. In the Apps Script editor, look at the function dropdown (top)
2. Select **"setupGoogleSheet"** from the dropdown
3. Click the **"Run"** button (▶️)
4. **Authorize permissions:**
   - Click **"Review permissions"**
   - Choose your Google account
   - Click **"Advanced"** → **"Go to [Project Name] (unsafe)"**
   - Click **"Allow"**
5. Wait for the function to complete
6. Check the **Execution log** (View → Execution log) - should show "✅ Google Sheet setup complete!"

### Step 4: Verify Setup

1. Go back to your Google Sheet
2. Check **Row 1** - you should see:
   - Headers in bold with blue background
   - All 7 columns properly labeled
3. Or run **"verifySheetSetup"** function to check automatically

## ✅ What the Setup Function Does

The `setupGoogleSheet()` function automatically:
- ✅ Creates the sheet tab if it doesn't exist
- ✅ Sets up all 7 column headers in Row 1
- ✅ Formats headers (bold, blue background, white text)
- ✅ Auto-resizes columns to fit content
- ✅ Freezes the header row
- ✅ Sets up proper formatting

## 📋 Headers Created

| Column | Header |
|--------|--------|
| A | Timestamp |
| B | Best Student Leader KWUSO 24/25 |
| C | Best Captain Sports |
| D | Best Sports Team |
| E | Best Influencer |
| F | Miss Popularity 25/26 |
| G | User Agent |

## 🔍 Verify Everything Works

Run the **"verifySheetSetup"** function to check:
- ✅ Sheet exists
- ✅ All headers are correct
- ✅ Sheet ID is configured

## 🐛 Troubleshooting

### "SHEET_ID is not configured" Error
- Make sure you updated line 18 with your actual Sheet ID
- Sheet ID should be between quotes: `'YOUR_SHEET_ID'`

### "Cannot find spreadsheet" Error
- Verify the Sheet ID is correct
- Make sure the sheet exists and you have access to it

### "Permission denied" Error
- Make sure you authorized all permissions when running the function
- Go to Run → setupGoogleSheet → Authorize access

### Headers Not Created
- Check the execution log for errors
- Make sure the function completed successfully
- Try running it again

## 🎯 Next Steps

After setup is complete:
1. Deploy the script as a Web App (see GOOGLE_SHEETS_SETUP.md Step 3)
2. Update your HTML file with the Web App URL
3. Test a submission!

---

**Need Help?** Check the full setup guide: `GOOGLE_SHEETS_SETUP.md`


