# 🏈 Pro Sports Crime Tracker

A searchable database of professional athlete criminal records.

---

## 🚀 HOW TO GET THIS LIVE (Step-by-Step for Beginners)

### OPTION A: Deploy with Vercel (Recommended — Easiest)

**Step 1: Create a GitHub account (if you don't have one)**
1. Go to https://github.com
2. Click "Sign Up" and follow the steps
3. Verify your email

**Step 2: Upload this project to GitHub**
1. Log into GitHub
2. Click the **+** button (top right) → **New repository**
3. Name it: `pro-sports-crime-tracker`
4. Keep it **Public**
5. Click **Create repository**
6. On the next page, click **"uploading an existing file"**
7. Drag and drop ALL the files/folders from this project into the upload area
   - Make sure you include: `package.json`, `vite.config.js`, `index.html`, the `src/` folder, and the `public/` folder
8. Click **Commit changes**

**Step 3: Deploy on Vercel**
1. Go to https://vercel.com
2. Click **Sign Up** → **Continue with GitHub**
3. Authorize Vercel to access your GitHub
4. Click **"Add New..."** → **Project**
5. Find `pro-sports-crime-tracker` in the list and click **Import**
6. Leave all settings as default (Vite should be auto-detected)
7. Click **Deploy**
8. Wait 1-2 minutes... DONE! You'll get a live URL like `pro-sports-crime-tracker.vercel.app`

**Step 4: Add a custom domain (optional, ~$10/year)**
1. Buy a domain at https://namecheap.com (e.g., `prosportscrime.com`)
2. In Vercel, go to your project → **Settings** → **Domains**
3. Type your domain and click **Add**
4. Vercel will show you DNS settings — go to Namecheap and update your DNS to match
5. Wait 10-30 minutes for it to go live on your domain

---

### OPTION B: Deploy with Netlify

1. Go to https://netlify.com and sign up with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **Deploy site**

---

## 📁 Project Structure

```
pro-sports-crime-tracker/
├── index.html          ← Main HTML file
├── package.json        ← Project config & dependencies
├── vite.config.js      ← Build tool config
├── public/
│   └── favicon.svg     ← Browser tab icon
└── src/
    ├── main.jsx        ← App entry point
    └── App.jsx         ← The main app (all the code lives here)
```

## ✏️ How to Update the Database

Open `src/App.jsx` and find the `CRIME_DATABASE` object near the top. Add new athletes following this format:

```javascript
"Athlete Name": {
  sport: "NFL",
  team: "Team Name",
  position: "POS",
  crimes: [
    {
      year: 2024,
      charge: "Description of the charge",
      outcome: "What happened in court"
    }
  ],
  status: "Current status"
},
```

Save the file and push to GitHub — Vercel will auto-redeploy.

---

## 📜 Disclaimer

This is a database for informational purposes only. All information is sourced from public records and news reports. Inclusion does not imply guilt where acquittals or dismissals occurred.
