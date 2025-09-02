import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Square, Play, Pause, Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { createNote } from '@/lib/notesService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const RecordPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [title, setTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingStartTime(Date.now());
      toast({
        title: "Recording started",
        description: "Your lecture is being recorded. Click stop when finished.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      // Calculate actual recording duration
      if (recordingStartTime) {
        const duration = Math.round((Date.now() - recordingStartTime) / 1000);
        setRecordingDuration(duration);
      }
      
      toast({
        title: "Recording stopped",
        description: "Processing your audio...",
      });
      
      // Wait for audioBlob to be set before processing
      setTimeout(() => {
        processAudioWithAI();
      }, 100);
    }
  };

  const processAudioWithAI = async () => {
    if (!audioBlob) {
      toast({
        title: "Error",
        description: "No audio recording found.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Try real AI transcription first
      const { transcribeAudio, simulateAITranscription } = await import('@/lib/aiService');
      
      let result;
      try {
        result = await transcribeAudio(audioBlob);
        toast({
          title: "AI Processing Complete!",
          description: "Your lecture has been transcribed and summarized using AI.",
        });
      } catch (aiError) {
        console.log('AI transcription failed, using fallback:', aiError);
        
        // Check if it's an API key issue
        if (aiError.message === 'OpenAI API key not configured') {
          toast({
            title: "API Key Missing",
            description: "Please add your OpenAI API key to .env file for real AI transcription.",
            variant: "destructive",
          });
        }
        
        result = await simulateAITranscription(audioBlob);
        toast({
          title: "Demo Mode Active",
          description: "Using demo mode. Add VITE_OPENAI_API_KEY=your_key to .env for real AI.",
        });
      }
      
      setTranscript(result.transcript);
      setSummary(result.summary);
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const saveNote = async () => {
    if (!user || !title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your note.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Saving note with data:', {
        user_id: user.id,
        title: title.trim(),
        content: transcript,
        summary: summary,
        duration: recordingDuration > 0 ? recordingDuration : null,
      });

      await createNote({
        user_id: user.id,
        title: title.trim(),
        content: transcript,
        summary: summary,
        duration: recordingDuration > 0 ? recordingDuration : null,
      });

      toast({
        title: "Note saved!",
        description: "Your note has been saved to your dashboard.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error saving note:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        fullError: error
      });
      console.error('Full error object:', JSON.stringify(error, null, 2));
      toast({
        title: "Error",
        description: error.message || error.details || 'Failed to save note',
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Record Lecture</h1>
          <p className="text-gray-600 mt-2">Record your lecture and get AI-powered notes instantly</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recording Section */}
          <Card>
            <CardHeader>
              <CardTitle>Audio Recording</CardTitle>
              <CardDescription>
                Record your lecture audio to generate transcripts and summaries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  size="lg"
                  className={`w-20 h-20 rounded-full ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isRecording ? (
                    <Square className="w-8 h-8" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
                </p>
              </div>

              {audioUrl && (
                <div className="space-y-2">
                  <Label>Preview Recording</Label>
                  <audio controls className="w-full" src={audioUrl} />
                </div>
              )}

              {isProcessing && (
                <div className="flex items-center justify-center gap-2 text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing audio with AI...</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Note Details Section */}
          <Card>
            <CardHeader>
              <CardTitle>Note Details</CardTitle>
              <CardDescription>
                Add a title and review your generated content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Note Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to Neural Networks"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {transcript && (
                <div>
                  <Label>Transcript</Label>
                  <Textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>
              )}

              {summary && (
                <div>
                  <Label>AI Summary</Label>
                  <Textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>
              )}

              {transcript && (
                <Button 
                  onClick={saveNote} 
                  className="w-full"
                  disabled={!title.trim()}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Note
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecordPage; 