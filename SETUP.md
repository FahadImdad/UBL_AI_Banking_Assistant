# UBL Chatbot Setup Guide

## Quick Setup

1. **Copy the environment file**:
   ```bash
   copy env.example .env
   ```

2. **Get your API keys**:
   - **Tavily API Key**: Visit [https://tavily.com/](https://tavily.com/) and sign up
   - **Gemini API Key**: Visit [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey) and create an API key

3. **Update your .env file**:
   ```
   TAVILY_API_KEY=your_actual_tavily_key_here
   GEMINI_API_KEY=your_actual_gemini_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to `http://localhost:3000`

## How It Works

- **Gemini**: Acts as the main chat completion API
- **Tavily**: Used as a tool by Gemini to search UBL website
- **Smart Responses**: Gemini decides when to search vs. respond directly

## Testing

Once set up, try asking:
- "How can I open an account?"
- "What are your interest rates?"
- "Hello"

The chatbot will automatically search UBL's website for current information and provide natural, conversational responses!
