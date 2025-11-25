# Troubleshooting Vote Submission Errors

This guide helps you diagnose and fix common errors when submitting votes.

## 🔍 Quick Diagnosis Steps

1. **Check Browser Console** (F12 → Console tab)
   - Look for red error messages
   - Note the exact error text

2. **Check Google Apps Script Execution Log**
   - Go to Apps Script editor → View → Execution log
   - Look for recent errors

3. **Test the Endpoint**
   - Visit your Google Apps Script URL directly in browser
   - Should show: "KWUSO Voting Form Handler is active!"

## ❌ Common Errors & Solutions

### Error 1: "SHEET_ID is not configured"
**Symptoms:**
- Error message mentions "SHEET_ID is not configured"
- Votes not saving to Google Sheet

**Solution:**
1. Open your Google Sheet
2. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```
3. Open Google Apps Script editor
4. Find this line:
   ```javascript
   const SHEET_ID = 'YOUR_SHEET_ID_HERE';
   ```
5. Replace `'YOUR_SHEET_ID_HERE'` with your actual Sheet ID
6. Click **Save**
7. Go to **Deploy** → **Manage deployments** → Click **Edit** (pencil icon) → **Deploy**

---

### Error 2: "Cannot find Google Sheet"
**Symptoms:**
- Error: "Cannot find Google Sheet with ID: ..."
- Sheet ID looks correct but still fails

**Solutions:**
1. **Verify Sheet ID is correct:**
   - Open your Google Sheet
   - Check the URL matches the ID in your script
   - Make sure there are no extra spaces or characters

2. **Check Sheet Access:**
   - Make sure the Google account used in Apps Script has access to the sheet
   - The sheet should be shared with the account running the script

3. **Verify Sheet Exists:**
   - Make sure the sheet hasn't been deleted or moved
   - Check that you're using the correct Google account

---

### Error 3: "Access denied" or "403 Forbidden"
**Symptoms:**
- Error 403 when submitting
- "Access denied" message

**Solution:**
1. Go to Google Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the **Edit icon** (pencil) next to your deployment
4. Under **"Who has access"**, select **"Anyone"**
5. Click **Deploy**
6. **Important:** You may need to create a new deployment version

---

### Error 4: "Network error" or "Failed to fetch"
**Symptoms:**
- "Network error: Cannot connect to server"
- "Failed to fetch" in console

**Solutions:**
1. **Check Internet Connection:**
   - Make sure you're connected to the internet
   - Try refreshing the page

2. **Check Endpoint URL:**
   - Verify the `FORMSPREE_ENDPOINT` in `index.html` is correct
   - Should look like: `https://script.google.com/macros/s/.../exec`
   - Make sure there are no typos

3. **Test Endpoint:**
   - Open the endpoint URL in a new browser tab
   - Should show: "KWUSO Voting Form Handler is active!"
   - If you see an error, the script isn't deployed correctly

4. **CORS Issues:**
   - Google Apps Script should handle CORS automatically
   - If still having issues, make sure deployment is set to "Anyone"

---

### Error 5: "Sheet '[Sheet1]' not found"
**Symptoms:**
- Error mentions sheet name not found
- Sheet exists but has different name

**Solution:**
1. Check the actual name of your sheet tab (bottom of Google Sheets)
2. Open Google Apps Script editor
3. Find this line:
   ```javascript
   const SHEET_NAME = 'Sheet1';
   ```
4. Change `'Sheet1'` to match your actual sheet tab name (case-sensitive)
5. Click **Save**
6. Redeploy: **Deploy** → **Manage deployments** → **Edit** → **Deploy**

---

### Error 6: "Error writing to sheet: Permission denied"
**Symptoms:**
- Error mentions permission issues
- Script runs but can't write data

**Solutions:**
1. **Authorize the Script:**
   - Go to Apps Script editor
   - Click **Run** → Select any function → **Authorize access**
   - Grant all requested permissions

2. **Check Sheet Permissions:**
   - Open your Google Sheet
   - Click **Share** button
   - Make sure the account running the script has **Editor** access

3. **Re-authorize:**
   - Go to Apps Script → **Deploy** → **Manage deployments**
   - Click **"Authorize access"** if shown

---

### Error 7: "Invalid JSON data received"
**Symptoms:**
- Error about invalid JSON
- Data format issues

**Solution:**
1. This usually means the form data isn't being sent correctly
2. Check browser console for JavaScript errors
3. Make sure all form fields are properly filled
4. Try submitting again

---

### Error 8: Votes Save but No Email Notification
**Symptoms:**
- Votes appear in Google Sheet
- But no email received

**Solutions:**
1. **Check Email Permissions:**
   - Go to Apps Script editor
   - Click **Run** → Select any function → **Authorize access**
   - Make sure email permissions are granted

2. **Check Email Address:**
   - Verify `NOTIFICATION_EMAIL` in script is correct
   - Currently set to: `jonmuhoro@gmail.com`

3. **Check Spam Folder:**
   - Look in spam/junk folder
   - Mark as "Not Spam" if found

4. **Check Execution Log:**
   - Apps Script → View → Execution log
   - Look for email-related errors

---

## 🔧 Step-by-Step Fix Guide

### Complete Reset (If Nothing Works)

1. **Verify Google Sheet Setup:**
   - ✅ Sheet exists and is accessible
   - ✅ Headers are in Row 1 (Timestamp, Best Student Leader, etc.)
   - ✅ Sheet ID copied correctly

2. **Verify Google Apps Script:**
   - ✅ Script is saved
   - ✅ SHEET_ID is set correctly
   - ✅ SHEET_NAME matches your tab name
   - ✅ NOTIFICATION_EMAIL is set

3. **Redeploy Script:**
   - Go to **Deploy** → **Manage deployments**
   - Delete old deployment
   - Create **New deployment** → **Web app**
   - Set "Execute as": **Me**
   - Set "Who has access": **Anyone**
   - Click **Deploy**
   - **Copy the new URL**

4. **Update HTML File:**
   - Open `index.html`
   - Find `FORMSPREE_ENDPOINT`
   - Replace with new deployment URL
   - Save file

5. **Test:**
   - Submit a test vote
   - Check Google Sheet for new row
   - Check email for notification

---

## 🧪 Testing Checklist

Before going live, test:

- [ ] Can access the voting page
- [ ] Can select candidates in all categories
- [ ] Submit button works
- [ ] Success message appears after submission
- [ ] Vote appears in Google Sheet
- [ ] Email notification received
- [ ] Duplicate vote prevention works
- [ ] Error messages are clear and helpful

---

## 📞 Getting More Help

If you're still having issues:

1. **Check Browser Console:**
   - Press F12
   - Go to Console tab
   - Look for red error messages
   - Copy the full error text

2. **Check Apps Script Execution Log:**
   - Apps Script → View → Execution log
   - Look for recent errors
   - Note the error message

3. **Common Issues to Check:**
   - Sheet ID is correct (no spaces, correct format)
   - Script is deployed (not just saved)
   - Deployment is set to "Anyone"
   - Script has proper permissions
   - Endpoint URL in HTML matches deployment URL

---

## ✅ Quick Reference

| Issue | Quick Fix |
|-------|-----------|
| SHEET_ID error | Update SHEET_ID constant in script |
| 403 Access denied | Set deployment to "Anyone" |
| Sheet not found | Check SHEET_NAME matches tab name |
| No emails | Authorize email permissions |
| Network error | Check endpoint URL is correct |
| Votes not saving | Check sheet permissions and Sheet ID |

---

**Last Updated:** 2025


