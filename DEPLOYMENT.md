# Deployment Guide - UBL Chatbot

## 🚀 Quick Deployment to Vercel

### Step 1: Prepare Environment Variables

Create a `.env.local` file with your API keys:

```env
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Tavily Search API Key
TAVILY_API_KEY=your_tavily_api_key_here
```

### Step 2: Get API Keys

#### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

#### Tavily API
1. Visit [Tavily](https://tavily.com/)
2. Sign up for a free account
3. Go to your dashboard
4. Copy your API key

### Step 3: Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Add environment variables:
     - `GEMINI_API_KEY`: Your Gemini API key
     - `TAVILY_API_KEY`: Your Tavily API key
   - Click "Deploy"

3. **Your chatbot will be live!** 🎉

## 🔧 Environment Variables for Production

In your Vercel dashboard, add these environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `TAVILY_API_KEY` | Tavily search API key | `tvly-...` |

## 📱 Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 🔍 Post-Deployment Checklist

- [ ] Environment variables are set
- [ ] API keys are valid and have quota
- [ ] HTTPS is enabled (required for speech)
- [ ] Custom domain is configured (if needed)
- [ ] Analytics are set up (optional)

## 🚨 Troubleshooting

### Common Issues

**"API key not found"**
- Check environment variables in Vercel dashboard
- Ensure variable names match exactly

**"Speech not working"**
- Verify HTTPS is enabled
- Check browser permissions
- Test in Chrome/Edge

**"Build failed"**
- Check Node.js version (18+ required)
- Verify all dependencies are in package.json
- Check for TypeScript errors

## 📊 Performance Monitoring

Monitor your deployment:
- Vercel Analytics (built-in)
- Google Analytics (optional)
- Uptime monitoring services

## 🔄 Updates and Maintenance

To update your deployment:
1. Push changes to GitHub
2. Vercel automatically redeploys
3. Monitor for any issues

---

**Your UBL Chatbot is now live and ready to serve customers! 🏦✨**
