import { BrowserUse } from 'browser-use-sdk';

const client = new BrowserUse({
  apiKey: process.env.BROWSER_USE_API_KEY,
});

async function test() {
  try {
    const account = await client.billing.account();
    console.log('✅ API Key valid!');
    console.log('Project ID:', account.projectId);
    console.log('Credits:', account.totalCreditsBalanceUsd);
    console.log('Plan:', account.planInfo);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
