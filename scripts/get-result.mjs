import { BrowserUse } from 'browser-use-sdk';

const client = new BrowserUse({
  apiKey: process.env.BROWSER_USE_API_KEY,
});

async function getTaskResult() {
  const taskId = '49ec2ba3-c123-43bf-bf11-549680f390ec';
  
  try {
    const result = await client.tasks.get(taskId);
    console.log('Final Result:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getTaskResult();