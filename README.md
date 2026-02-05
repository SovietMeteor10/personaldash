# Personal Dashboard

A Next.js personal dashboard for tracking ideas, writing, research, and projects with seamless GitHub integration for automatic updates.

## Features

### Quick Links Hub
- Prominently displays frequently accessed links (Daily Regime, Book Lists)
- Easy access to personal websites and tools

### Idea Parking Lot
- Quick capture interface for rapid idea entry
- Categories: Business, Training, Learning, Trading/ML, Personal
- Search and filter functionality
- Timestamped entries

### Writing & Essays
- Track essay ideas and writing prompts
- Progress tracking: Idea → Draft → In Progress → Completed
- Organize writing projects

### Research Reports
- Auto-populated from Discord /dr commands
- Markdown rendering with clean formatting
- Searchable archive with tags
- Expandable/collapsible view

### Ideation Workspace
- Expanded development area for promising ideas
- Priority ranking (Low, Medium, High)
- Next steps tracking
- Project brainstorming space

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Deployment**: Vercel with GitHub auto-deploy
- **Data Storage**: JSON files (version-controlled)
- **Features**: Dark/light mode, mobile-responsive, fast search

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deployment

This project is configured for automatic deployment to Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel auto-deploys on every push to main

### Data Management

All data is stored in JSON files in the `/data` directory:
- `links.json` - Quick links
- `ideas.json` - Idea parking lot entries
- `essays.json` - Writing and essay tracking
- `research.json` - Research reports
- `ideation.json` - Ideation workspace projects

Data persists through Git commits and is version-controlled.

## Future Enhancements

- API integrations for Google Sheets data display
- Analytics dashboard for personal metrics
- Calendar integration for goals/deadlines
- Export functionality for research reports
- Webhook integration for Discord /dr commands

## License

MIT
# Last updated: Thu Feb  5 09:16:27 UTC 2026
