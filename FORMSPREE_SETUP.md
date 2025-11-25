# Formspree Configuration Guide for KWUSO Voting

## Step 1: Create a Formspree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Click **"Sign Up"** (you can use your GitHub account for quick signup)
3. Verify your email address

## Step 2: Create a New Form
1. Once logged in, click **"New Form"** or **"Create Form"**
2. Give it a name: `KWUSO Voting 2024/2025`
3. Formspree will generate a unique endpoint URL like: `https://formspree.io/f/xxxxxxxxxx`

## Step 3: Update Your HTML File
1. Open `index.html` in your repository
2. Find this line (around line 238):
   ```html
   action="https://formspree.io/f/mnqekvjo"
   ```
3. Replace `https://formspree.io/f/mnqekvjo` with your new Formspree endpoint URL
4. Save and commit the change

## Step 4: Configure Form Settings
In your Formspree dashboard:

### Email Notifications
- Go to your form → **Settings** → **Email**
- Add your email address to receive vote submissions
- Choose notification frequency (instant, daily digest, etc.)

### Spam Protection (Recommended)
- Go to **Settings** → **Spam Protection**
- Enable **Honeypot** (already built into the form)
- Enable **reCAPTCHA** if you want extra protection

### Response Settings
- Go to **Settings** → **Responses**
- Enable **Auto-responder** to send confirmation emails to voters (optional)
- Set up custom success/error messages

## Step 5: Test Your Form
1. Visit your live GitHub Pages site
2. Fill out the form with test data
3. Submit it
4. Check your Formspree dashboard → **Submissions** tab
5. You should see the test submission appear

## Step 6: View and Export Votes
- **View Submissions**: Go to Formspree dashboard → Your form → **Submissions** tab
- **Export Data**: Click **"Export"** button to download as CSV or JSON
- **Filter**: Use the search/filter to find specific votes
- **Analytics**: View submission statistics in the **Analytics** tab

## Step 7: Add University Logo
1. Upload your KWUSO logo to:
   - Your GitHub repository (recommended: create an `images` folder)
   - Or use an image hosting service (Imgur, Cloudinary, etc.)
2. Open `index.html`
3. Find the logo image tag (around line 185):
   ```html
   <img
     src="https://via.placeholder.com/180x180/581b98/ffffff?text=KWUSO"
     alt="Kiriri Women's University Logo"
     class="university-logo"
     id="universityLogo"
   />
   ```
4. Replace the `src` URL with your logo's URL:
   - If in GitHub: `https://jonmuh99.github.io/kwustvoting/images/logo.png`
   - If hosted elsewhere: use the full URL

## Free Tier Limits
- **50 submissions per month** (free tier)
- If you expect more votes, consider upgrading to a paid plan

## Security Tips
1. **Email Validation**: Formspree automatically validates email format
2. **Duplicate Prevention**: You can manually filter duplicates in the submissions
3. **Rate Limiting**: Formspree has built-in rate limiting to prevent spam

## Need Help?
- Formspree Documentation: [https://help.formspree.io](https://help.formspree.io)
- Formspree Support: support@formspree.io

