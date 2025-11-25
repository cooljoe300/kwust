# How to Upload Your Voting Page to GitHub - Complete Guide

## Method 1: Using GitHub Website (Easiest - No Command Line)

### Step 1: Create a GitHub Account
1. Go to **https://github.com**
2. Click **"Sign up"** (top right)
3. Enter your email, create a password, and verify your account

### Step 2: Create a New Repository
1. After logging in, click the **"+"** icon (top right)
2. Select **"New repository"**
3. Fill in the details:
   - **Repository name**: `kwuso-voting` (or any name you like)
   - **Description**: "KWUSO People's Choice Awards Voting Page"
   - **Visibility**: Choose **Public** (required for free GitHub Pages)
   - **DO NOT** check "Add a README file" (we'll upload files manually)
4. Click **"Create repository"**

### Step 3: Upload Your Files
1. You'll see a page saying "Quick setup"
2. Look for **"uploading an existing file"** link and click it
   OR
   Click the **"Add file"** dropdown → **"Upload files"**

3. **Upload your files:**
   - Drag and drop your entire folder OR
   - Click "choose your files" and select all files:
     - `index.html`
     - All image folders:
       - `kwuso/` folder (with all images inside)
       - `best captain/` folder
       - `miss popularity/` folder
       - `tiktok influencer/` folder

4. **Important:** Make sure to upload:
   - ✅ `index.html` (your main voting page)
   - ✅ All image folders with their photos
   - ✅ Keep the folder structure the same!

5. Scroll down and enter a commit message:
   ```
   Initial commit - KWUSO voting page
   ```

6. Click **"Commit changes"** (green button)

### Step 4: Enable GitHub Pages
1. Go to your repository page
2. Click **"Settings"** (top menu)
3. Scroll down to **"Pages"** (left sidebar)
4. Under **"Source"**, select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)`
5. Click **"Save"**

### Step 5: Get Your Live URL
1. Wait 1-2 minutes for GitHub to build your site
2. Refresh the Settings → Pages page
3. You'll see a green banner with your live URL:
   ```
   https://YOUR_USERNAME.github.io/kwuso-voting/
   ```
4. **That's your voting link!** Share it with voters.

---

## Method 2: Using GitHub Desktop (Easier GUI)

### Step 1: Download GitHub Desktop
1. Go to **https://desktop.github.com**
2. Download and install GitHub Desktop
3. Sign in with your GitHub account

### Step 2: Create Repository
1. Open GitHub Desktop
2. Click **"File"** → **"New repository"**
3. Fill in:
   - **Name**: `kwuso-voting`
   - **Local path**: Choose where to save (e.g., `C:\Users\YourName\Documents\`)
   - **Description**: "KWUSO Voting Page"
   - Check **"Initialize this repository with a README"** (optional)
4. Click **"Create repository"**

### Step 3: Copy Your Files
1. Copy all your files into the repository folder:
   - `index.html`
   - All image folders (`kwuso/`, `best captain/`, etc.)

### Step 4: Commit and Push
1. In GitHub Desktop, you'll see all your files listed
2. At the bottom, enter a commit message:
   ```
   Initial commit - KWUSO voting page
   ```
3. Click **"Commit to main"**
4. Click **"Publish repository"** (or "Push origin" if already published)
5. Your files are now on GitHub!

### Step 5: Enable GitHub Pages
Follow Step 4 from Method 1 above.

---

## Method 3: Using Command Line (For Advanced Users)

### Step 1: Install Git
1. Download Git from **https://git-scm.com/downloads**
2. Install with default settings

### Step 2: Open Terminal/Command Prompt
- **Windows**: Open PowerShell or Command Prompt
- **Mac/Linux**: Open Terminal

### Step 3: Navigate to Your Folder
```bash
cd "C:\Users\user\New folder (4)"
```

### Step 4: Initialize Git Repository
```bash
git init
```

### Step 5: Add All Files
```bash
git add .
```

### Step 6: Create First Commit
```bash
git commit -m "Initial commit - KWUSO voting page"
```

### Step 7: Create Repository on GitHub
1. Go to **https://github.com/new**
2. Create a new repository (don't initialize with README)
3. Copy the repository URL

### Step 8: Connect and Push
```bash
git remote add origin https://github.com/YOUR_USERNAME/kwuso-voting.git
git branch -M main
git push -u origin main
```

You'll be asked to log in to GitHub.

---

## Important: Folder Structure

Make sure your GitHub repository looks like this:

```
kwuso-voting/
├── index.html
├── kwuso/
│   ├── president.jpeg
│   ├── hildah.jpeg
│   └── (other images)
├── best captain/
│   ├── handball.jpeg
│   └── vollyball.jpeg
├── miss popularity/
│   ├── dcs.jpeg
│   ├── jane.jpeg
│   └── (other images)
└── tiktok influencer/
    ├── faith.jpeg
    ├── kavata.jpeg
    └── (other images)
```

## Troubleshooting

### Problem: Images not showing?
- ✅ Make sure folder names match exactly (case-sensitive)
- ✅ Check that images are uploaded inside their folders
- ✅ Verify image paths in `index.html` match folder structure

### Problem: GitHub Pages not working?
- ✅ Make sure repository is **Public**
- ✅ Check that `index.html` is in the root folder
- ✅ Wait 2-3 minutes after enabling Pages
- ✅ Check repository Settings → Pages for errors

### Problem: Can't upload folders?
- ✅ Upload folders by dragging them into the upload area
- ✅ Or use GitHub Desktop or command line
- ✅ Make sure folder structure is preserved

## Quick Checklist

Before going live, make sure:
- [ ] `index.html` is uploaded
- [ ] All image folders are uploaded
- [ ] Formspree Form ID is updated in `index.html`
- [ ] GitHub Pages is enabled
- [ ] Repository is set to Public
- [ ] Test the live URL to see if images load

## Your Live Voting Link

After setup, your voting page will be available at:
```
https://YOUR_USERNAME.github.io/kwuso-voting/
```

Replace `YOUR_USERNAME` with your actual GitHub username and `kwuso-voting` with your repository name.

---

**Need Help?**
- GitHub Docs: https://docs.github.com
- GitHub Support: https://support.github.com

