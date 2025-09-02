# ClassScribe AI Notes

## 🎤 AI-Powered Lecture Transcription & Note-Taking

ClassScribe transforms your lectures into organized, searchable notes using real AI transcription and intelligent summarization.

### ✨ Features

- **🎤 Real-time Audio Recording** - Record lectures directly in your browser
- **🤖 AI Transcription** - Convert speech to text using OpenAI Whisper
- **📝 Intelligent Summaries** - AI-generated summaries of key concepts
- **🔍 Search & Filter** - Find notes quickly with powerful search
- **📱 Responsive Design** - Works perfectly on desktop and mobile
- **🔐 User Authentication** - Secure, private note storage
- **💾 Cloud Storage** - Notes saved to Supabase database

### 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone <YOUR_GIT_URL>
   cd classscribe-ai-notes
   npm install
   ```

2. **Set up Environment**
   ```bash
   # Copy .env.example to .env and add your keys
   cp .env.example .env
   ```

3. **Configure AI (Optional)**
   - Get OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
   - Add `VITE_OPENAI_API_KEY=your_key` to `.env`
   - See `AI_SETUP.md` for detailed instructions

4. **Start Development**
   ```bash
   npm run dev
   ```

### 🎯 Hackathon Ready

This project is perfect for hackathons with:
- ✅ Working authentication
- ✅ Real AI transcription (with API key)
- ✅ Demo mode (without API key)
- ✅ Responsive UI
- ✅ Database integration
- ✅ Search functionality

## Project info

**URL**: https://lovable.dev/projects/d25614f4-4e1f-46fe-a659-3c5ea4bcda66

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d25614f4-4e1f-46fe-a659-3c5ea4bcda66) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d25614f4-4e1f-46fe-a659-3c5ea4bcda66) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
