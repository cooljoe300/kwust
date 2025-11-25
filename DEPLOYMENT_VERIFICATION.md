# Google Apps Script Deployment Verification Checklist

Use this checklist to verify your deployment is configured correctly.

## ✅ Deployment Settings to Check

### 1. Deployment Type
- ✅ Should be: **Web app**
- ❌ NOT: Add-on, API Executable, or Library

### 2. Execute as
- ✅ Should be: **Me** (your Google account)
- This ensures the script runs with your permissions

### 3. Who has access (CRITICAL!)
- ✅ **MUST be: "Anyone"**
- ❌ NOT: "Only myself" or "Users in [organization]"
- This is the most common cause of "failed to fetch" errors!

### 4. Web App URL
Your deployment URL should be:
```
https://script.google.com/macros/s/AKfycbzGC9Ok0vKvKRErETdJVIT50HZCy0YwQa3Ap7UhF2J2-pvP-_4CCGmsAuzvyklVP6XF/exec
```

### 5. Version
- Should show: **"New version"** or a version number
- If you made changes, create a **new version** and redeploy

---

## 🔍 How to Verify Your Deployment

### Step 1: Check Deployment Settings

1. Go to your deployment page (the link you provided)
2. Click **"Edit"** (pencil icon) next to your deployment
3. Verify these settings:
   - **Execute as**: "Me"
   - **Who has access**: **"Anyone"** ← MOST IMPORTANT!
4. If "Who has access" is NOT "Anyone":
   - Change it to "Anyone"
   - Click **"Deploy"**
   - This creates a new version

### Step 2: Test the Endpoint

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
- Check the execution log in Apps Script
- Verify Sheet ID is correct
- Check sheet permissions

### Step 3: Verify Script Configuration

In your Google Apps Script editor, check:

1. **Sheet ID** (line 18):
   ```javascript
   const SHEET_ID = '1143CqTT_kET1iB09qkNL7YXkEi-ggUCrOgDIr4xLJVA';
   ```
   ✅ Should match your actual Google Sheet ID

2. **Sheet Name** (line 19):
   ```javascript
   const SHEET_NAME = 'Sheet1';
   ```
   ✅ Should match your sheet tab name

3. **Email** (line 20):
   ```javascript
   const NOTIFICATION_EMAIL = 'jonmuhoro@gmail.com';
   ```
   ✅ Should be your email

### Step 4: Check Execution Log

1. In Apps Script editor, click **View** → **Execution log**
2. Look for recent executions
3. Check for any errors
4. If you see errors, they'll tell you what's wrong

---

## 🐛 Common Issues

### Issue 1: "Who has access" is NOT "Anyone"
**Symptom:** "Failed to fetch" or "403 Forbidden" errors

**Fix:**
1. Edit deployment
2. Change "Who has access" to "Anyone"
3. Redeploy

### Issue 2: Script not updated
**Symptom:** Old errors or missing features

**Fix:**
1. Make sure script is saved
2. Edit deployment → Create new version
3. Redeploy

### Issue 3: Sheet ID not configured
**Symptom:** "SHEET_ID is not configured" error

**Fix:**
1. Update SHEET_ID in script (line 18)
2. Save script
3. Redeploy

### Issue 4: Permissions not authorized
**Symptom:** "Permission denied" errors

**Fix:**
1. Run any function (like `setupGoogleSheet`)
2. Authorize all permissions
3. Try again

---

## ✅ Quick Verification Test

Run this in your browser console (F12) on your voting page:

```javascript
fetch('https://script.google.com/macros/s/AKfycbzGC9Ok0vKvKRErETdJVIT50HZCy0YwQa3Ap7UhF2J2-pvP-_4CCGmsAuzvyklVP6XF/exec', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({test: 'data'})
})
.then(r => r.text())
.then(console.log)
.catch(console.error);
```

**Expected:** Should return JSON response (even if error, should get response)
**If fails:** Deployment access issue - check "Who has access" setting

---

## 📋 Final Checklist

Before testing your form:

- [ ] Deployment is set to "Anyone" access
- [ ] Script has correct Sheet ID
- [ ] Script is saved
- [ ] Deployment is active (not deleted)
- [ ] Endpoint URL matches in HTML file
- [ ] Test endpoint URL works in browser
- [ ] Execution log shows no errors

---

**If everything above is correct, your deployment should work!**

If you're still having issues, check:
1. Browser console for specific error messages
2. Google Apps Script execution log
3. Network tab in browser DevTools


