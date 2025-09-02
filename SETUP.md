# ClassScribe AI Notes - Setup Guide

## 🚀 Quick Start

### 1. Environment Setup
Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Database Setup
Create a `notes` table in your Supabase database with the following schema:

```sql
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  summary TEXT,
  duration INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own notes
CREATE POLICY "Users can view own notes" ON notes
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own notes
CREATE POLICY "Users can insert own notes" ON notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own notes
CREATE POLICY "Users can update own notes" ON notes
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own notes
CREATE POLICY "Users can delete own notes" ON notes
  FOR DELETE USING (auth.uid() = user_id);
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

## 🎯 Features Implemented

✅ **Authentication System**
- User sign up/sign in with Supabase Auth
- Protected routes and user context

✅ **Audio Recording**
- Browser-based audio recording
- Real-time recording controls
- Audio preview functionality

✅ **AI Note Generation** (Simulated)
- Mock transcript generation
- AI-powered summaries
- Editable content

✅ **Dashboard**
- View all user notes
- Clean card-based layout
- Note management interface

✅ **Landing Page**
- Beautiful hero section
- Feature highlights
- Call-to-action buttons

## 🔧 Next Steps for Hackathon Demo

1. **Real AI Integration**: Replace mock transcription with actual AI service
2. **File Upload**: Add support for uploading existing audio files
3. **Note Sharing**: Implement note sharing functionality
4. **Export Features**: Add PDF/Word export options
5. **Search & Filter**: Add search functionality to dashboard

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your GitHub repo to Netlify
2. Add environment variables in Netlify dashboard
3. Deploy automatically on push

## 🐛 Troubleshooting

**Authentication Issues:**
- Ensure Supabase Auth is enabled in your project
- Check that RLS policies are correctly set up
- Verify environment variables are loaded

**Audio Recording Issues:**
- Ensure HTTPS in production (required for microphone access)
- Check browser permissions for microphone
- Test in Chrome/Firefox for best compatibility

**Database Issues:**
- Verify table schema matches the provided SQL
- Check RLS policies are active
- Ensure user_id foreign key relationship is correct 