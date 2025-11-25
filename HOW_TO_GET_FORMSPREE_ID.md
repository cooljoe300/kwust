# How to Get Your Formspree Form ID - Step by Step Guide

## Step 1: Create a Formspree Account

1. Go to **https://formspree.io** in your web browser
2. Click the **"Sign Up"** button (top right corner)
3. You can sign up using:
   - Your email address
   - **GitHub account** (recommended - fastest option)
   - Google account

## Step 2: Verify Your Email

1. Check your email inbox for a verification message from Formspree
2. Click the verification link in the email
3. You'll be redirected back to Formspree

## Step 3: Create a New Form

1. Once logged in, you'll see your **Formspree Dashboard**
2. Click the **"New Form"** or **"Create Form"** button (usually a big green/blue button)
3. You'll see a form creation page

## Step 4: Configure Your Form

1. **Form Name**: Enter a name like "KWUSO Voting 2024/2025"
2. **Email Notifications** (optional):
   - Add your email address to receive vote submissions
   - You can add multiple emails
3. Click **"Create Form"** or **"Save"**

## Step 5: Get Your Form ID

After creating the form, you'll see your form details page. Look for:

### Option A: Form Endpoint URL
You'll see something like:
```
https://formspree.io/f/xjvqknyz
```

The part after `/f/` is your **Form ID**: `xjvqknyz`

### Option B: Form Settings
1. Click on your form name to open it
2. Go to **"Settings"** or **"Integration"** tab
3. You'll see the **Form Endpoint** or **Form ID**

## Step 6: Copy Your Form ID

1. Copy the **entire URL** (e.g., `https://formspree.io/f/xjvqknyz`)
   OR
2. Copy just the **Form ID** part (e.g., `xjvqknyz`)

## Step 7: Update Your HTML File

1. Open `index.html` in your code editor
2. Find this line (around line 300):
   ```javascript
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
3. Replace `YOUR_FORM_ID` with your actual Form ID:

   **If you copied the full URL:**
   ```javascript
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjvqknyz";
   ```

   **If you copied just the ID:**
   ```javascript
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjvqknyz";
   ```

4. Save the file

## Step 8: Test Your Form

1. Upload your `index.html` to GitHub
2. Visit your live voting page
3. Fill out the form and submit a test vote
4. Go back to your Formspree dashboard
5. Click on your form → **"Submissions"** tab
6. You should see your test vote!

## Visual Guide

```
Formspree Dashboard
├── New Form Button
│
└── Your Forms List
    └── "KWUSO Voting 2024/2025"
        ├── Settings
        │   └── Form Endpoint: https://formspree.io/f/xjvqknyz
        │                                    ^^^^^^^^^^^^
        │                                    This is your Form ID!
        │
        ├── Submissions (view votes here)
        └── Analytics
```

## Important Notes

⚠️ **Free Tier Limits:**
- 50 submissions per month (free plan)
- If you expect more votes, consider upgrading

🔒 **Security:**
- Formspree automatically validates submissions
- Built-in spam protection
- Rate limiting to prevent abuse

📧 **Email Notifications:**
- Enable email notifications in Form Settings
- You'll receive an email for each vote
- Or check the Submissions tab in dashboard

## Troubleshooting

**Problem: Votes not submitting?**
- Check that Form ID is correct (no extra spaces)
- Make sure form is set to accept JSON submissions
- Check browser console for errors (F12)

**Problem: Can't find Form ID?**
- Look in the form's Settings/Integration section
- The Form ID is always in the URL: `formspree.io/f/YOUR_ID`

**Problem: Getting errors?**
- Make sure you verified your email
- Check that the form is active (not deleted)
- Verify the endpoint URL is correct

## Quick Reference

Your Form ID will look like one of these:
- `xjvqknyz` (8 characters)
- `abc123xyz` (9 characters)
- `mnqekvjo` (8 characters)

The full endpoint format is always:
```
https://formspree.io/f/YOUR_FORM_ID
```

---

**Need Help?**
- Formspree Docs: https://help.formspree.io
- Formspree Support: support@formspree.io

