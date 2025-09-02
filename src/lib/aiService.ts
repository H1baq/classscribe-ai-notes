// AI Service for real transcription and summarization
// You'll need to add your OpenAI API key to .env

export interface TranscriptionResult {
  transcript: string;
  summary: string;
}

export async function transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
  try {
    // Check if API key is available
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey.trim() === '') {
      throw new Error('OpenAI API key not configured');
    }
    
    console.log('Using real AI transcription with API key');
    
    // Convert audio blob to base64
    const base64Audio = await blobToBase64(audioBlob);
    
    // Call OpenAI Whisper API for transcription
    const transcription = await callWhisperAPI(base64Audio);
    
    // Generate summary using GPT
    const summary = await generateSummary(transcription);
    
    return {
      transcript: transcription,
      summary: summary
    };
  } catch (error) {
    console.error('AI transcription error:', error);
    throw error;
  }
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix to get just the base64 string
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function callWhisperAPI(base64Audio: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file: `data:audio/wav;base64,${base64Audio}`,
      model: 'whisper-1',
      response_format: 'text'
    })
  });

  if (!response.ok) {
    throw new Error(`Whisper API error: ${response.statusText}`);
  }

  return await response.text();
}

async function generateSummary(transcript: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that creates concise, educational summaries of lecture transcripts. Focus on key concepts, main points, and important details.'
        },
        {
          role: 'user',
          content: `Please create a concise summary of this lecture transcript:\n\n${transcript}`
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`GPT API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// Fallback function for when OpenAI API is not available
export async function simulateAITranscription(audioBlob: Blob): Promise<TranscriptionResult> {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Return more realistic mock data based on audio duration
  const duration = audioBlob.size / 1000; // Rough estimate
  
  if (duration < 30) {
    return {
      transcript: "This appears to be a short audio recording. Please record a longer lecture for better transcription.",
      summary: "Short audio recording detected. Consider recording a longer lecture for more detailed transcription and summary."
    };
  }
  
  return {
    transcript: `[Transcription would appear here for your ${Math.round(duration)} second recording. To enable real transcription, add your OpenAI API key to the .env file.]`,
    summary: `[AI-generated summary would appear here. Add VITE_OPENAI_API_KEY=your_api_key to .env for real AI processing.]`
  };
}
