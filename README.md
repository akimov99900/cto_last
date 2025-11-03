# nice - Farcaster Mini-App

A Farcaster mini-app that displays a personalized daily wish to users based on their FID and the current date.

## Features

- 🔐 Farcaster Quick Auth integration
- ✨ Deterministic daily wishes using FNV-1a hash algorithm
- 📅 Same wish for the entire day, different wish each day
- 🎨 Clean, modern, mobile-friendly UI
- 🚀 Stateless application (no database required)
- 🔄 "New Wish" button to preview tomorrow's wish

## Tech Stack

- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Farcaster Frame SDK with Quick Auth
- **Deployment**: Vercel

## How It Works

1. User authenticates via Farcaster Quick Auth
2. App extracts user's FID (Farcaster ID) from the authenticated session
3. Daily wish is selected using FNV-1a hash algorithm:
   - Input: `${fid}-${YYYY-MM-DD}`
   - Output: Index into wishes array (hash % wishes.length)
4. Same user gets the same wish throughout the day
5. Different wish appears each day for each user

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vercel account for deployment

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your repository
5. Vercel will automatically detect Next.js and configure build settings
6. Click "Deploy"

### Environment Variables (Optional)

If you want to customize the app URL in the Frame metadata:

- `NEXT_PUBLIC_URL`: Your deployed app URL (e.g., `https://nice-miniapp.vercel.app`)

## Launching in Farcaster

Once deployed:

1. Share your deployment URL in a Farcaster cast
2. Users can open the mini-app directly from Farcaster clients
3. The app will automatically authenticate users via Farcaster Quick Auth

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with Frame metadata
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   └── WishDisplay.tsx     # Main wish display component
├── lib/
│   ├── wishes.ts           # Array of 25 inspirational wishes
│   └── hash.ts             # FNV-1a hash implementation
├── public/
│   └── manifest.json       # PWA manifest for Farcaster
└── vercel.json             # Vercel configuration
```

## Icon Design Suggestions

The app uses a ✨ sparkles emoji as the default icon. For a custom icon:

- **Theme**: Uplifting, positive, friendly
- **Suggestions**: 
  - A stylized star or sparkle
  - A smiling sun
  - A heart with rays
  - A simple "n" letterform with positive accents
- **Colors**: Purple to pink gradient (#9333ea to #ec4899)
- **Format**: PNG, 192x192 and 512x512 sizes

To add custom icons, replace `/public/icon-192.png` and `/public/icon-512.png`.

## License

MIT
