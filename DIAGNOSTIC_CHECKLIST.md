# Diagnostic Checklist for Vote Submission Errors

Use this checklist to identify and fix submission errors on https://jonmuh99.github.io/kwustballot/

## 🔍 Step 1: Check Browser Console

1. Go to https://jonmuh99.github.io/kwustballot/
2. Press **F12** (or right-click → Inspect)
3. Open the **Console** tab
4. Try submitting a vote
5. **Copy the exact error message** you see

Common errors you might see:
- `Failed to fetch` - Network/CORS issue
- `403 Forbidden` - Access permission issue
- `404 Not Found` - Wrong endpoint URL
- `500 Internal Server Error` - Script error
- `SHEET_ID is not configured` - Script not updated

---

## ✅ Step 2: Verify Google Apps Script Configuration

### A. Check Script URL is Accessible

Visit this URL directly in your browser:
```
https://script.google.com/macros/s/AKfycbzGC9Ok0vKvKRErETdJVIT50HZCy0YwQa3Ap7UhF2J2-pvP-_4CCGmsAuzvyklVP6XF/exec
```

**Expected Result:**
```
KWUSO Voting Form Handler is active!

=== DIAGNOSTICS ===
✅ SHEET_ID: Valid and accessible
✅ SHEET_NAME: "Sheet1" found
✅ NOTIFICATION_EMAIL: Configured (jonmuhoro@gmail.com)
✅ Email permissions: Authorized
```

**If you see errors:**
- ❌ SHEET_ID: Not configured → Update script with Sheet ID
- ❌ SHEET_ID: Cannot access sheet → Check Sheet ID is correct
- ❌ Email permissions: Not authorized → Authorize permissions

### B. Verify Sheet ID in Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Open your project
3. Check line 18 - should show:
   ```javascript
   const SHEET_ID = '1143CqTT_kET1iB09qkNL7YXkEi-ggUCrOgDIr4xLJVA';
   ```
4. **If it shows `'YOUR_SHEET_ID_HERE'`:**
   - Copy the updated script from `google-apps-script.js`
   - Paste into Google Apps Script editor
   - Click **Save**
   - **Redeploy** (Deploy → Manage deployments → Edit → Deploy)

### C. Check Deployment Settings

1. In Google Apps Script, click **Deploy** → **Manage deployments**
2. Click **Edit** (pencil icon) next to your deployment
3. Verify:
   - ✅ **Execute as**: "Me" (your account)
   - ✅ **Who has access**: "Anyone" (CRITICAL!)
4. If "Who has access" is NOT "Anyone":
   - Change it to "Anyone"
   - Click **Deploy**
   - This creates a new version

### D. Check Google Sheet Configuration

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1143CqTT_kET1iB09qkNL7YXkEi-ggUCrOgDIr4xLJVA/edit
2. Verify Row 1 has these headers (exactly):
   - A1: `Timestamp`
   - B1: `Best Student Leader KWUSO 24/25`
   - C1: `Best Captain Sports`
   - D1: `Best Sports Team`
   - E1: `Best Influencer`
   - F1: `Miss Popularity 25/26`
   - G1: `User Agent`
3. Check the sheet tab name (bottom of sheet):
   - Should be `Sheet1` (or match `SHEET_NAME` in script)

---

## ✅ Step 3: Verify HTML File on GitHub

### A. Check Endpoint URL in Live Site

1. Go to https://jonmuh99.github.io/kwustballot/
2. Press **F12** → **Console** tab
3. Type: `GOOGLE_SHEETS_ENDPOINT` and press Enter
4. Should show:
   ```
   "https://script.google.com/macros/s/AKfycbzGC9Ok0vKvKRErETdJVIT50HZCy0YwQa3Ap7UhF2J2-pvP-_4CCGmsAuzvyklVP6XF/exec"
   ```

**If it shows a different URL:**
- The live site has old code
- Upload updated `index.html` to GitHub
- Wait 2-3 minutes for GitHub Pages to update

### B. Upload Updated HTML to GitHub

1. Make sure your local `index.html` has the correct endpoint (line 671)
2. Commit and push to GitHub:
   ```bash
   git add index.html
   git commit -m "Update Google Sheets endpoint"
   git push
   ```
3. Wait 2-3 minutes
4. Clear browser cache (Ctrl+Shift+Delete)
5. Test again

---

## ✅ Step 4: Check Google Apps Script Execution Log

1. Go to [Google Apps Script](https://script.google.com)
2. Open your project
3. Click **View** → **Execution log**
4. Look for recent errors when you tried to submit
5. **Copy any error messages** you see

Common errors in execution log:
- `Cannot find spreadsheet with ID` → Sheet ID is wrong
- `Sheet "Sheet1" not found` → Sheet tab name doesn't match
- `Permission denied` → Script needs authorization

---

## ✅ Step 5: Test Submission Manually

### Test 1: Direct Script Test

1. Visit: https://script.google.com/macros/s/AKfycbzGC9Ok0vKvKRErETdJVIT50HZCy0YwQa3Ap7UhF2J2-pvP-_4CCGmsAuzvyklVP6XF/exec
2. Should show diagnostics (not an error)

### Test 2: Check Sheet Permissions

1. Open your Google Sheet
2. Click **Share** button (top right)
3. Make sure the account running the script has **Editor** access
4. If not, add your account with Editor permissions

### Test 3: Authorize Script Permissions

1. In Google Apps Script, click **Run** → Select any function
2. Click **Authorize access**
3. Grant all requested permissions:
   - ✅ Google Sheets access
   - ✅ Send emails
4. Click **Allow**

---

## 🐛 Common Issues & Quick Fixes

| Error | Quick Fix |
|-------|-----------|
| `Failed to fetch` | Check deployment is set to "Anyone" |
| `403 Forbidden` | Redeploy with "Anyone" access |
| `SHEET_ID not configured` | Update script with Sheet ID and redeploy |
| `Cannot find spreadsheet` | Verify Sheet ID is correct |
| `Sheet "Sheet1" not found` | Check sheet tab name matches `SHEET_NAME` |
| Old endpoint URL on live site | Upload updated `index.html` to GitHub |

---

## 📋 Complete Fix Checklist

- [ ] Browser console shows no errors (or specific error identified)
- [ ] Script URL accessible and shows diagnostics
- [ ] Sheet ID is correct in Google Apps Script (line 18)
- [ ] Deployment is set to "Anyone" access
- [ ] Google Sheet has correct headers in Row 1
- [ ] Sheet tab name matches `SHEET_NAME` in script
- [ ] Script has proper permissions (authorized)
- [ ] Updated `index.html` uploaded to GitHub
- [ ] Browser cache cleared
- [ ] Test submission works

---

## 🆘 Still Having Issues?

If you've checked everything above and still have errors:

1. **Copy the exact error message** from browser console
2. **Check Google Apps Script execution log** for errors
3. **Verify the endpoint URL** matches in both places:
   - Google Apps Script deployment
   - HTML file on GitHub

Share the specific error message and I can help fix it!


