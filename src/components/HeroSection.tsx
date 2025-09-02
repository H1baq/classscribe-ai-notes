import { Button } from "@/components/ui/button";
import { Play, Upload, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="bg-gradient-hero py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Your
              <br />
              <span className="text-education-accent">Class Recordings</span>
              <br />
              Into Perfect Notes
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Upload audio, get instant transcripts and AI-powered summaries. 
              Never miss important information in your online classes again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/record">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                  <Upload className="w-5 h-5 mr-2" />
                  Start Recording
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Play className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl shadow-float p-8">
              <img 
                src={heroImage} 
                alt="ClassScribe interface showing transcription and note-taking" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-3xl opacity-30 transform scale-105"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;