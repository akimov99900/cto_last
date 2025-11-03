# Deployment Guide for "nice" Farcaster Mini-App

This guide will walk you through deploying the "nice" mini-app to Vercel and launching it in Farcaster.

## Prerequisites

- A [Vercel](https://vercel.com) account (free tier works)
- Git repository (GitHub, GitLab, or Bitbucket)
- A Farcaster account for testing

## Step 1: Push Code to Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: nice Farcaster mini-app"

# Add your remote repository
git remote add origin <your-repo-url>

# Push to main branch
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add environment variable (optional):
   - Name: `NEXT_PUBLIC_URL`
   - Value: `https://your-app.vercel.app` (update after first deploy)
6. Click "Deploy"

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 3: Update Environment Variables (After First Deploy)

After your first deployment, you'll get a URL like `https://nice-miniapp.vercel.app`

1. Go to your project settings in Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add or update `NEXT_PUBLIC_URL` with your actual deployment URL
4. Redeploy the app for changes to take effect

## Step 4: Configure for Farcaster

Your app is now ready to be used in Farcaster! The app includes:

- ✅ Farcaster Frame SDK integration
- ✅ Quick Auth implementation
- ✅ Proper frame metadata in meta tags
- ✅ PWA manifest for mini-app support
- ✅ CORS and frame headers configured

## Step 5: Test in Farcaster

### Testing the Mini-App

1. Open a Farcaster client (Warpcast, etc.)
2. Create a new cast with your deployed URL
3. The URL should render with a frame preview showing "Open App" button
4. Click the button or open the URL
5. The app should:
   - Load within the Farcaster client
   - Authenticate automatically via Quick Auth
   - Display your personalized daily wish based on your FID

### Troubleshooting

**Issue**: "Authentication Required" error
- **Solution**: Ensure you're opening the app within a Farcaster client, not a regular browser. The Farcaster Frame SDK only works within Farcaster contexts.

**Issue**: App doesn't load in frame
- **Solution**: Check that your deployment URL is correct and HTTPS is enabled (Vercel does this automatically)

**Issue**: Same wish appears for different users
- **Solution**: This shouldn't happen as wishes are based on FID. Check browser console for errors.

**Issue**: Wish changes when refreshing the page
- **Solution**: The wish is deterministic based on FID + date. If it's changing, check that the date is being read correctly.

## Step 6: Share Your Mini-App

Once tested and working:

1. Share your app URL in Farcaster casts
2. Users can click to open and use the mini-app
3. Each user will see their own personalized daily wish

## Continuous Deployment

Vercel automatically:
- Redeploys on every push to your main branch
- Creates preview deployments for pull requests
- Provides instant rollbacks if needed

## Monitoring

Monitor your app's performance:
- **Vercel Dashboard**: View deployments, logs, and analytics
- **Browser Console**: Check for client-side errors during testing
- **Vercel Logs**: Check for server-side errors

## Custom Domain (Optional)

To use a custom domain:

1. Go to your project in Vercel
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_URL` environment variable
6. Redeploy

## Support

For issues:
- Check [Farcaster Mini-Apps Documentation](https://miniapps.farcaster.xyz/docs)
- Review [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Check [Vercel Documentation](https://vercel.com/docs)

## Notes

- This is a stateless app with no backend or database
- All wish selection happens client-side
- No data is stored or tracked
- The app is fully serverless on Vercel
