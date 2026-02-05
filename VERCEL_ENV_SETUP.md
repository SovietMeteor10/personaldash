# ⚠️ IMPORTANT: Add These to Vercel Environment Variables

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these variables:

## 1. WEBHOOK_SECRET
**Name:** `WEBHOOK_SECRET`  
**Value:** (see ~/.kimaki/projects/test-project/personaldash/.env)  
**Environment:** All (Production, Preview, Development)

## 2. GITHUB_TOKEN
**Name:** `GITHUB_TOKEN`  
**Value:** (use your GitHub Personal Access Token with repo permissions)  
**Environment:** All (Production, Preview, Development)

To create a GitHub token:
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select `repo` scope
4. Copy the token and add it to Vercel

This token is needed to commit research reports directly to GitHub via the API.

Then click **"Redeploy"** to apply the changes.

Without these, the webhook API will reject incoming research reports or fail to commit them.
