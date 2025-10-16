# GitHub Pages Deployment Fix

## Problem
The Next.js app deployed to GitHub Pages was showing 404 errors for all static assets (_next/*.js, *.css, fonts) because:

1. Using deprecated `next export` command
2. Missing `.nojekyll` file (GitHub Pages Jekyll ignores `_next/` folder)
3. No automated deployment workflow
4. Manual deployment prone to errors

## Changes Made

### 1. Fixed package.json
- **Removed**: Deprecated `export` script that used `next export`
- **Why**: Next.js 14+ uses `output: 'export'` in config instead

### 2. Updated next.config.js
- **Removed**: `experimental.appDir` (no longer needed in Next.js 14)
- **Confirmed**: Using custom domain (analysta.ai), so NO basePath needed
- **Kept**: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`

### 3. Created GitHub Actions Workflow
**File**: `.github/workflows/deploy.yml`

This workflow:
- Triggers on push to `main` branch
- Installs Node.js 18 and dependencies
- Runs `npm run build` to create static export
- **Adds `.nojekyll` file** to prevent Jekyll from ignoring `_next/`
- Copies CNAME file to maintain custom domain
- Deploys to GitHub Pages automatically

## Next Steps

### 1. Enable GitHub Actions for Pages
Go to your repository settings:
1. Navigate to: **Settings** → **Pages**
2. Under "Build and deployment" → **Source**
3. Select: **GitHub Actions** (instead of "Deploy from a branch")

### 2. Test the Build Locally (Optional)
```bash
cd analysta-ai-react
npm run build
```

This will create an `out/` folder with your static site.

### 3. Commit and Push Changes
```bash
git add .
git commit -m "Fix GitHub Pages deployment - add workflow and .nojekyll"
git push origin main
```

### 4. Monitor Deployment
1. Go to **Actions** tab in your GitHub repository
2. Watch the "Deploy Next.js to GitHub Pages" workflow run
3. Once complete (green checkmark), visit https://analysta.ai

## File Structure After Build
```
analysta-ai.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # ✅ New deployment workflow
├── analysta-ai-react/
│   ├── out/                    # Generated after build
│   │   ├── .nojekyll          # ✅ Prevents Jekyll processing
│   │   ├── CNAME              # Custom domain config
│   │   ├── _next/             # Next.js assets (now working!)
│   │   ├── index.html         # Main page
│   │   └── ...
│   ├── next.config.js         # ✅ Updated config
│   └── package.json           # ✅ Fixed scripts
└── CNAME                      # analysta.ai

```

## Why This Fixes The 404 Errors

### Before:
- Jekyll (GitHub Pages default) processes all files
- Jekyll **ignores** folders starting with `_` (like `_next/`)
- Result: All `_next/*.js` files return 404

### After:
- `.nojekyll` file tells GitHub Pages to skip Jekyll
- All `_next/` files are served normally
- Assets load correctly ✅

## Troubleshooting

### If 404 errors persist:
1. Check GitHub Pages source is set to **GitHub Actions** (not branch)
2. Verify workflow ran successfully in Actions tab
3. Check browser cache - do a hard refresh (Cmd+Shift+R)
4. Verify CNAME DNS settings point to GitHub Pages

### Check DNS Settings:
Your `analysta.ai` domain should have these records:
```
Type: A
Host: @
Value: 185.199.108.153 (or other GitHub Pages IPs)

Type: CNAME
Host: www
Value: analysta-ai.github.io
```

## Manual Deployment (If Needed)

If you need to deploy manually without GitHub Actions:
```bash
cd analysta-ai-react
npm run build
touch out/.nojekyll
cp ../CNAME out/CNAME
# Then copy contents of out/ to repository root
```

## Summary
✅ Fixed deprecated export command  
✅ Added `.nojekyll` file via workflow  
✅ Created automated GitHub Actions deployment  
✅ Configured for custom domain (analysta.ai)  
✅ Assets will now load correctly from `_next/` folder  
