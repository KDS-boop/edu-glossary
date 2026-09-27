import { BrowserUse } from 'browser-use-sdk';

const client = new BrowserUse({
  apiKey: process.env.BROWSER_USE_API_KEY,
});

async function auditSite() {
  const task = `Visit https://eduglossary.my.id and perform a complete website audit:
1. Check homepage for loading issues, layout problems, broken elements
2. Navigate to /glossary/ and check the glossary listing page
3. Open 3-4 individual glossary term pages and verify content quality
4. Check /articles/ page and open 1-2 article pages
5. Check /about/ page
6. Check /learn/ page
7. Look for any broken links, missing images, or rendering issues
8. Check if FAQ sections appear correctly on glossary pages
9. Check mobile responsiveness indicators if visible
Report a detailed audit summary with findings.`;

  try {
    const result = await client.tasks.create({
      task: task,
      model: 'gpt-5.6-luna',
      provider: 'openai',
      thinking: false
    });
    
    console.log('Full response:', JSON.stringify(result, null, 2));
    
    // Check what fields are available
    const taskId = result.task?.id || result.id || result.taskId;
    if (!taskId) {
      console.log('No taskId found, response keys:', Object.keys(result));
      return;
    }
    
    console.log('Task created:', taskId);
    
    // Poll for completion
    let status = result.status || result.task?.status;
    let taskData = result;
    
    while (status !== 'completed' && status !== 'failed' && status !== 'cancelled') {
      await new Promise(r => setTimeout(r, 2000));
      try {
        const check = await client.tasks.get(taskId);
        status = check.status;
        taskData = check;
        console.log('Status:', status);
      } catch (e) {
        console.log('Error checking:', e.message);
        break;
      }
    }
    
    console.log('Final status:', status);
    console.log('Result:', JSON.stringify(taskData, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Full error:', error);
  }
}

auditSite();