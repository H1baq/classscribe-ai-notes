import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <Card className="bg-gradient-primary p-12 text-center border-0 shadow-float">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Study Experience?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of students who are already taking better notes with ClassScribe. 
              Upload your first recording and see the magic happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="bg-white text-education-primary hover:bg-white/90 text-lg px-8 py-4">
                <Upload className="w-5 h-5 mr-2" />
                Start Transcribing
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;