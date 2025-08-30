import { Card } from "@/components/ui/card";
import { Mic, Brain, Download, Search, Zap, FileText } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Audio Upload & Live Input",
    description: "Upload recordings from Zoom, Meet, or stream live audio directly from your classes."
  },
  {
    icon: Brain,
    title: "AI-Powered Transcription",
    description: "Get accurate transcripts using advanced speech-to-text technology powered by OpenAI Whisper."
  },
  {
    icon: FileText,
    title: "Smart Summarization",
    description: "Automatically generate clean bullet-point summaries and highlight key concepts and definitions."
  },
  {
    icon: Download,
    title: "Multiple Export Formats",
    description: "Download your notes in PDF, Word, or Markdown format for easy sharing and studying."
  },
  {
    icon: Search,
    title: "Searchable Dashboard",
    description: "Find any note instantly with our powerful search functionality across all your transcripts."
  },
  {
    icon: Zap,
    title: "Quiz Generation",
    description: "Generate practice quizzes from your notes to test your understanding of the material."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 bg-education-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Better Notes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed specifically for students to enhance their learning experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-float transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;