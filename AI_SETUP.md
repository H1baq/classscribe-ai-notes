# AI Transcription Setup Guide

## 🚀 Enable Real AI Transcription

Your ClassScribe app now supports **real AI transcription** using OpenAI's Whisper API and GPT for summarization!

### 1. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to "API Keys" in your dashboard
4. Click "Create new secret key"
5. Copy your API key

### 2. Add API Key to Environment

Add this line to your `.env` file:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Example:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=sk-1234567890abcdef...
```

### 3. Restart Your App

```bash
npm run dev
```

## 🎯 How It Works

### With API Key (Real AI)
- **Whisper API**: Transcribes your actual audio recording
- **GPT-3.5**: Creates intelligent summaries of your lecture content
- **Real-time**: Processes your voice into accurate text

### Without API Key (Demo Mode)
- Shows placeholder text explaining how to enable real AI
- Still works for testing the app interface
- No cost, but no real transcription

## 💰 Cost Estimate

- **Whisper API**: ~$0.006 per minute of audio
- **GPT-3.5**: ~$0.002 per summary
- **Typical lecture (50 min)**: ~$0.30 total

## 🔧 Troubleshooting

### "API Key Not Found"
- Check your `.env` file has the correct variable name
- Restart your development server
- Ensure no spaces around the `=` sign

### "Rate Limit Exceeded"
- OpenAI has usage limits for new accounts
- Check your OpenAI dashboard for current usage
- Consider upgrading your plan for higher limits

### "Audio Too Large"
- Whisper supports files up to 25MB
- For longer lectures, consider splitting into segments
- The app automatically handles file size limits

## 🎉 Test It Out!

1. Add your OpenAI API key to `.env`
2. Restart the app
3. Record a lecture
4. Watch real AI transcription happen!

Your notes will now contain the **actual content** of your lectures! 🎤➡️📝
