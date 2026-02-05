require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateReport() {
  console.log('📊 Generating gaming industry report...');
  
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      system: `You are a senior research analyst. Generate a comprehensive educational research report on the gaming industry.

Include:
- Executive Summary
- History of Gaming (1970s to present)
- Technological Evolution (hardware, software, engines)
- Cultural & Philosophical Impact
- VR/AR/Metaverse Integration
- Industry Trends & Business Models
- Future Outlook

Use markdown formatting with clear sections. Make it information-dense and educational.`,
      messages: [{
        role: 'user',
        content: 'Generate a comprehensive deep dive into the gaming industry as described in the system prompt.'
      }]
    });
    
    const reportContent = response.content[0].text;
    
    // Save locally first
    const reportPath = path.join(__dirname, 'data', 'research.json');
    const reports = JSON.parse(await fs.readFile(reportPath, 'utf-8'));
    
    const newReport = {
      id: Date.now().toString(),
      title: 'The Gaming Industry: A Comprehensive Deep Dive',
      content: reportContent,
      timestamp: new Date().toISOString(),
      tags: ['gaming', 'technology', 'culture', 'industry-analysis', 'deep-dive'],
    };
    
    reports.unshift(newReport);
    await fs.writeFile(reportPath, JSON.stringify(reports, null, 2));
    
    console.log('✅ Report saved locally!');
    console.log('📄 Preview:\n');
    console.log(reportContent.slice(0, 500) + '...\n');
    console.log(`📊 Full report saved to data/research.json`);
    console.log('💾 Committing to git...');
    
    return newReport;
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

generateReport()
  .then(() => {
    console.log('\n✅ Done! Now commit and push to GitHub.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  });
