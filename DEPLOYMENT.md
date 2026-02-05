# Deployment Instructions

## Push to GitHub

Since you'll need to authenticate, run these commands from your local machine:

```bash
cd /path/to/personaldash
git push -u origin main
```

## Deploy to Vercel

### Option 1: Automatic (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `personaldash` repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"

Vercel will automatically:
- Install dependencies
- Build the project (handles Tailwind/PostCSS properly)
- Deploy to production
- Auto-deploy on every push to `main`

### Option 2: Vercel CLI

```bash
npm i -g vercel
cd /path/to/personaldash
vercel
```

Follow the prompts to link your project and deploy.

## Environment Configuration

No environment variables needed for the base setup. All data is stored in JSON files in the `/data` directory.

## Post-Deployment

Your dashboard will be available at: `https://your-project-name.vercel.app`

To set a custom domain:
1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain

## Updating Data

All data is version-controlled in the `/data` directory. To update:

1. Edit JSON files locally
2. Commit and push to GitHub
3. Vercel auto-deploys the update

## Future: Discord Integration

To auto-populate research reports from Discord `/dr` commands:
- Set up a webhook from Discord to a Vercel serverless function
- Function appends to `data/research.json`
- Commit changes via GitHub API
