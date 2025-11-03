# Quick Start Guide

Get the "nice" Farcaster mini-app running in 5 minutes!

## 🚀 One-Command Setup

```bash
npm install && npm run dev
```

That's it! Open http://localhost:3000 to see the app.

## 📦 Deploy to Vercel (1 minute)

### Option 1: GitHub + Vercel (Recommended)

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your repository
5. Click "Deploy"

Done! Your app will be live in ~1 minute.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

## 🧪 Verify Everything Works

Run all checks:

```bash
npm run build    # ✓ Should complete without errors
npm test         # ✓ All 7 tests should pass
npm run lint     # ✓ No linting errors
```

## 📱 Test in Farcaster

1. Get your deployed URL (e.g., `https://nice-xyz.vercel.app`)
2. Open Farcaster (Warpcast, etc.)
3. Create a cast with your URL
4. Click the "Open App" button
5. You should see your personalized daily wish!

## 🔧 Customize

### Change Wishes

Edit `lib/wishes.ts`:

```typescript
export const wishes = [
  "Your custom wish here...",
  // Add or modify wishes
];
```

### Change Colors

Edit `components/WishDisplay.tsx` - search for gradient colors:
- `from-purple-600 to-pink-600` - Main gradient
- `from-purple-50 to-pink-50` - Background gradient

### Change App Name

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your description",
  // ...
};
```

## 📚 More Documentation

- **Full setup**: See [README.md](README.md)
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Features**: See [FEATURES.md](FEATURES.md)
- **Algorithm**: See [ALGORITHM.md](ALGORITHM.md)

## 🆘 Troubleshooting

### Build fails?
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Tests fail?
Make sure you're on Node.js 18+:
```bash
node --version
```

### Linting errors?
```bash
npm run lint
```

## 💡 Tips

- **Development**: Use `npm run dev` for hot reloading
- **Production**: Always test with `npm run build` first
- **Testing**: Use `npm test:watch` for continuous testing
- **Environment**: Add `.env.local` for local environment variables

## ✅ Checklist

Before deploying to production:

- [ ] Run `npm run build` - succeeds
- [ ] Run `npm test` - all pass
- [ ] Run `npm run lint` - no errors
- [ ] Test locally at http://localhost:3000
- [ ] Update metadata in `app/layout.tsx`
- [ ] Add your deployment URL to `.env.local` (optional)

## 🎉 You're Ready!

Your Farcaster mini-app is ready to share with the world!

Questions? Check the other documentation files or open an issue.
