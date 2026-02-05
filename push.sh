#!/bin/bash
cd "$(dirname "$0")"
git push -u origin main
echo ""
echo "✅ Pushed to GitHub!"
echo "Now go to https://vercel.com and import your repository"
