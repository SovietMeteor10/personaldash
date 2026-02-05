require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const axios = require('axios');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateAndSendReport() {
  console.log('📊 Generating comprehensive gaming industry report...\n');
  
  const topic = `Comprehensive deep dive into the gaming industry. The report should educate on:
- History of gaming from origins to present day
- Technological trends and breakthroughs (hardware, software, engines)
- Philosophical and cultural contexts
- Science fiction influences on gaming
- Metaverse, VR, and AR in gaming
- Industry trends, market dynamics, and business models
- Future aspirations and predictions

Format as an educational report that is information-dense, well-structured, and easy to read.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: `You are a senior research analyst specializing in the gaming industry. Generate a comprehensive, educational research report on the given topic.

Format requirements:
- Use clear markdown headings (##, ###)
- Create logical sections with subheadings
- Include bullet points for key findings
- Add historical timeline elements where relevant
- Cite trends with context
- Make it information-dense but readable
- Include executive summary at the start
- End with future outlook and conclusions

Write in an educational, authoritative tone suitable for someone wanting to deeply understand the gaming industry.`,
      messages: [{
        role: 'user',
        content: topic
      }]
    });
    
    const reportContent = response.content[0].text;
    console.log('✅ Report generated!\n');
    console.log('📤 Sending to dashboard...\n');
    
    // Send to dashboard
    const webhookResponse = await axios.post(process.env.DASHBOARD_WEBHOOK_URL, {
      title: 'The Gaming Industry: A Comprehensive Deep Dive',
      content: reportContent,
      tags: ['gaming', 'technology', 'culture', 'industry-analysis', 'deep-dive'],
      secret: process.env.WEBHOOK_SECRET
    });
    
    console.log('✅ Report sent to dashboard!');
    console.log('📊 Response:', webhookResponse.data);
    console.log('\n🎉 Check your dashboard at: https://personaldashboard-blue.vercel.app');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

generateAndSendReport();
