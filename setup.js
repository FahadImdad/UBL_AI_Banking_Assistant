#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 UBL Chatbot Setup\n');

const questions = [
  {
    key: 'GEMINI_API_KEY',
    question: 'Enter your Google Gemini API key: ',
    description: 'Get it from: https://makersuite.google.com/app/apikey'
  },
  {
    key: 'TAVILY_API_KEY', 
    question: 'Enter your Tavily API key: ',
    description: 'Get it from: https://tavily.com/'
  }
];

const envVars = {};

function askQuestion(index) {
  if (index >= questions.length) {
    createEnvFile();
    return;
  }

  const q = questions[index];
  console.log(`\n${q.description}`);
  
  rl.question(q.question, (answer) => {
    if (answer.trim()) {
      envVars[q.key] = answer.trim();
    }
    askQuestion(index + 1);
  });
}

function createEnvFile() {
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const envPath = path.join(process.cwd(), '.env.local');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Environment file created successfully!');
    console.log('📁 File location: .env.local');
    console.log('\n🚀 Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open: http://localhost:3000');
    console.log('3. Start chatting with your UBL assistant!');
  } catch (error) {
    console.error('❌ Error creating environment file:', error.message);
  }
  
  rl.close();
}

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  rl.question('\n⚠️  .env.local already exists. Overwrite? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      askQuestion(0);
    } else {
      console.log('Setup cancelled.');
      rl.close();
    }
  });
} else {
  askQuestion(0);
}