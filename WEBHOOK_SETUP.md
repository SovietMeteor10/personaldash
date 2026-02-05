# Discord Research Report Integration Setup

## Overview
Your `/dr` command in Discord will now automatically:
1. Generate a research report using Claude
2. Send it to your dashboard via webhook
3. Update the `data/research.json` file
4. Commit and push to GitHub
5. Vercel auto-deploys the update

## Setup Steps

### 1. Add Environment Variable to Vercel

Go to your Vercel dashboard: https://vercel.com/your-project/settings/environment-variables

Add this environment variable:
- **Name:** `WEBHOOK_SECRET`
- **Value:** `your-super-secret-key-change-this` (or generate a strong random key)
- **Environment:** All (Production, Preview, Development)

**Important:** Use a strong secret! Generate one with:
```bash
openssl rand -base64 32
```

### 2. Update Discord Bot .env

Update the `WEBHOOK_SECRET` in `/home/coder/clawdbot/.env` to match the one you set in Vercel.

Also update `DASHBOARD_WEBHOOK_URL` to your actual Vercel URL:
```
DASHBOARD_WEBHOOK_URL=https://your-actual-dashboard.vercel.app/api/research
```

### 3. Restart Your Discord Bot

```bash
cd ~/clawdbot
pm2 restart clawdbot
# or if not using pm2:
# node bot.js
```

## Usage

In any Discord channel where the bot can see messages:

```
/dr Artificial Intelligence and the Future of Work
```

The bot will:
1. Generate a comprehensive research report
2. Post a preview in Discord
3. Automatically add it to your dashboard's Research tab
4. Push the update to GitHub

## How It Works

1. **Discord Bot** (`/dr` command) → 
2. **Claude API** (generates markdown report) → 
3. **Dashboard Webhook** (`/api/research`) → 
4. **Updates JSON** (`data/research.json`) → 
5. **Git Commit & Push** (automatic) → 
6. **Vercel Redeploy** (automatic)

## Troubleshooting

**Bot says "Failed to sync with dashboard":**
- Check the `WEBHOOK_SECRET` matches in both `.env` files
- Verify `DASHBOARD_WEBHOOK_URL` is correct
- Check Vercel logs for errors

**Report doesn't appear on dashboard:**
- Check GitHub commits - was it pushed?
- Check Vercel deployment logs
- Verify the webhook endpoint is deployed

**Git push fails:**
- The bot needs git credentials configured on the server
- Check the API route logs in Vercel

## Security Notes

- Never share your `WEBHOOK_SECRET`
- The webhook validates the secret before accepting requests
- Only requests with the correct secret can add research reports
