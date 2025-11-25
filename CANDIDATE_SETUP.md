# How to Add Candidates to the Voting System

## Quick Setup Guide

### 1. Update Candidate Data

Open `index.html` and find the `candidates` object in the JavaScript section (around line 200). Update it with your actual candidates:

```javascript
const candidates = {
  leader: [
    { id: "leader1", name: "Jane Doe", image: "https://your-image-url.com/jane.jpg" },
    { id: "leader2", name: "Mary Smith", image: "https://your-image-url.com/mary.jpg" },
    // Add more candidates...
  ],
  captain: [
    // Add captain candidates...
  ],
  team: [
    // Add team candidates...
  ],
  influencer: [
    // Add influencer candidates...
  ],
  popularity: [
    // Add popularity candidates...
  ]
};
```

### 2. Add Candidate Photos

**Option A: Upload to GitHub**
1. Create an `images` folder in your repository
2. Upload candidate photos (recommended: 300x200px or similar aspect ratio)
3. Use URLs like: `https://jonmuh99.github.io/kwustvoting/images/candidate1.jpg`

**Option B: Use External Hosting**
- Upload to Imgur, Cloudinary, or any image hosting service
- Use the direct image URL in the candidate data

**Option C: Use Placeholder Images**
- Keep the placeholder URLs for now and update later
- Format: `https://via.placeholder.com/300x200/581b98/ffffff?text=Candidate+Name`

### 3. Configure Formspree

1. Go to [formspree.io](https://formspree.io) and create an account
2. Create a new form
3. Copy your form endpoint URL (e.g., `https://formspree.io/f/abc123xyz`)
4. In `index.html`, find this line (around line 180):
   ```javascript
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
5. Replace `YOUR_FORM_ID` with your actual Formspree form ID

### 4. Test the Voting System

1. Open your site in a browser
2. Select one candidate per category
3. Click "Submit My Votes"
4. Check your Formspree dashboard to see the submission
5. Try voting again - it should show "already voted" message

## Features

✅ **One Vote Per Person**: Uses localStorage to prevent duplicate votes  
✅ **Direct Voting**: No registration required  
✅ **Visual Selection**: Click candidate cards to vote  
✅ **Photo Display**: Shows candidate photos and names  
✅ **Responsive Design**: Works on mobile and desktop  

## How It Works

- Each voter can select **one candidate per category**
- Votes are stored in **localStorage** to prevent duplicate voting from the same device/browser
- Votes are submitted to **Formspree** for collection and analysis
- After voting, the page shows a "Thank You" message

## Customization

### Change Number of Candidates Per Row
In the HTML, find:
```html
<div class="column is-one-third-tablet is-half-mobile">
```
- `is-one-third-tablet`: 3 columns on tablet
- `is-half-mobile`: 2 columns on mobile
- Change to `is-one-quarter` for 4 columns, `is-half` for 2 columns, etc.

### Change Colors
Update the CSS variables in the `<style>` section:
- Primary gradient: `#581b98, #ff6a88`
- Card border: `rgba(88, 27, 152, 0.15)`
- Selected border: `#ff6a88`

## Troubleshooting

**Votes not submitting?**
- Check that Formspree endpoint is correct
- Check browser console for errors
- Ensure Formspree form is set to accept JSON submissions

**Can vote multiple times?**
- localStorage is browser-specific
- For stronger protection, consider adding email verification or IP tracking (requires backend)

**Images not loading?**
- Check image URLs are correct
- Ensure images are publicly accessible
- Check CORS settings if hosting externally

