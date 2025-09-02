# UBL Chatbot - AI Banking Assistant

A modern, futuristic AI-powered banking chatbot for United Bank Limited (UBL) built with Next.js 14, featuring real-time streaming responses, voice input/output, and seamless integration with UBL's digital services.

## 🚀 Features

### 🤖 AI-Powered Banking Assistant
- **Gemini AI Integration**: Powered by Google's Gemini 1.5 Flash model
- **Real-time Web Search**: Tavily API integration for up-to-date UBL information
- **Streaming Responses**: Word-by-word streaming for natural conversation flow
- **UBL-Specific**: Tailored responses for UBL banking services and products

### 🎤 Voice Capabilities
- **Speech-to-Text**: Voice input using Web Speech API
- **Text-to-Speech**: Audio responses with speaker buttons
- **Real-time Processing**: Instant voice recognition and synthesis

### 🎨 Modern UI/UX
- **Futuristic Design**: Glassmorphism effects with neon accents
- **Responsive Layout**: Optimized for all device sizes
- **Smooth Animations**: Framer Motion powered interactions
- **UBL Branding**: Official UBL colors and styling

### ⚡ Performance Optimized
- **Fast Loading**: Optimized bundle size and lazy loading
- **Quick Responses**: 3x faster streaming with chunk processing
- **Smooth Animations**: Reduced motion for better performance
- **Efficient API**: Optimized search results and response times

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Google Gemini 1.5 Flash
- **Search**: Tavily API
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key
- Tavily API key

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ubl-chatbot.git
cd ubl-chatbot
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Tavily Search API
TAVILY_API_KEY=your_tavily_api_key_here
```

### 4. Get API Keys

#### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env.local` file

#### Tavily API
1. Visit [Tavily](https://tavily.com/)
2. Sign up for an account
3. Get your API key from the dashboard
4. Copy the key to your `.env.local` file

### 5. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `GEMINI_API_KEY`: Your Gemini API key
     - `TAVILY_API_KEY`: Your Tavily API key
   - Deploy!

### Alternative Deployment Options

#### Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

#### Railway
```bash
# Connect your GitHub repo to Railway
# Add environment variables in Railway dashboard
```

## 📁 Project Structure

```
ubl-chatbot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main chat interface
├── components/
│   └── ChatMessage.tsx           # Message component
├── public/
│   ├── ubl_logo.png             # UBL logo
│   └── ubl_logo_1.png           # Favicon
├── types/
│   └── speech.d.ts              # Speech API types
├── .env.local                   # Environment variables
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🎯 Key Features Explained

### AI Integration
- **Gemini 1.5 Flash**: Fast, efficient AI model for natural conversations
- **Tavily Search**: Real-time web search limited to UBL's official website
- **Fallback Responses**: Helpful UBL information when APIs are unavailable

### Voice Features
- **Speech Recognition**: Convert voice to text using browser APIs
- **Speech Synthesis**: Convert text to speech with natural voices
- **Manual Control**: Speaker buttons for each response

### Performance
- **Streaming**: Real-time text streaming for natural conversation
- **Optimized**: Fast loading and smooth animations
- **Responsive**: Works on all devices and screen sizes

## 🔧 Configuration

### Customizing the Chatbot

#### Change UBL Branding
Edit `app/globals.css` to modify colors:
```css
:root {
  --neon-cyan: #00d4ff;
  --neon-blue: #0066cc;
  --electric-blue: #003366;
}
```

#### Modify AI Behavior
Edit `app/api/chat/route.ts` to change prompts and responses.

#### Update Styling
Modify `app/globals.css` for different visual effects.

## 🐛 Troubleshooting

### Common Issues

#### API Keys Not Working
- Ensure keys are correctly set in `.env.local`
- Check API key validity and quotas
- Verify environment variables are loaded

#### Speech Not Working
- Ensure HTTPS (required for Web Speech API)
- Check browser permissions for microphone
- Test in Chrome/Edge for best compatibility

#### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version (18+ required)

## 📊 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Streaming Response Time**: < 500ms
- **Bundle Size**: < 500KB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **UBL Digital** for banking information and branding
- **Google** for Gemini AI capabilities
- **Tavily** for web search functionality
- **Vercel** for deployment platform
- **Next.js** team for the amazing framework

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: [your-email@example.com]
- UBL Support: [UBL Digital](https://www.ubldigital.com/)

---

**Built with ❤️ for UBL Digital Banking**