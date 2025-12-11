# Studio Share Viewer Deployment

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `studio-share-viewer`
3. Description: "Web viewer for Studio audio sharing"
4. Public or Private: **Public** (recommended for Vercel free tier)
5. Click **"Create repository"**

## Step 2: Push Code to GitHub

```powershell
cd D:\Coding\TTTN\studio-share-viewer

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/studio-share-viewer.git

# Push code
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select `studio-share-viewer` repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build` (or leave default)
   - **Output Directory**: `.next` (default)
5. **Environment Variables** → Click "Add":
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://bblrmklhznabnmdyfnbe.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
6. Click **"Deploy"**

## Step 4: Get Deployment URL

After deployment:

- Vercel will show URL: `https://studio-share-viewer-xxx.vercel.app`
- Copy this URL

## Step 5: Update Electron App

Edit `D:\Coding\TTTN\.env`:

```env
WEB_VIEWER_URL=https://studio-share-viewer-xxx.vercel.app
```

Restart Electron app:

```powershell
cd D:\Coding\TTTN
pnpm dev
```

## Done! ✅

Now when you create a share link, it will be:
`https://studio-share-viewer-xxx.vercel.app/share/abc123`

Anyone can open this link and listen to the audio!
