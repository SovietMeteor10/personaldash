# ⚠️ IMPORTANT: Add This to Vercel Environment Variables

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add this variable:

**Name:** `WEBHOOK_SECRET`  
**Value:** `un/WNWHeXS5P6Xn0O7oEQ/kRANIjDWbvS+X96PSJKj4=`  
**Environment:** All (Production, Preview, Development)

Then click **"Redeploy"** to apply the changes.

Without this, the webhook API will reject incoming research reports.
