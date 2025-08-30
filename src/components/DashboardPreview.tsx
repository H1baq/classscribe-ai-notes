import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Clock, Download, Play } from "lucide-react";

const DashboardPreview = () => {
  const sampleNotes = [
    {
      title: "Physics 101 - Quantum Mechanics",
      date: "2 hours ago",
      duration: "45 min",
      summary: "Introduction to wave-particle duality, uncertainty principle, and quantum states...",
      keywords: ["quantum", "physics", "wave-particle", "uncertainty"]
    },
    {
      title: "History 205 - World War II",
      date: "1 day ago", 
      duration: "60 min",
      summary: "Discussion of major battles, political implications, and social impact of WWII...",
      keywords: ["history", "WWII", "battles", "politics"]
    },
    {
      title: "Mathematics 301 - Calculus",
      date: "3 days ago",
      duration: "50 min", 
      summary: "Integration techniques, substitution methods, and practical applications...",
      keywords: ["calculus", "integration", "math", "derivatives"]
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Personal Study Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All your notes organized, searchable, and ready to help you succeed
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 bg-gradient-card border-0 shadow-float">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search your notes by keyword, topic, or date..."
                  className="pl-10"
                />
              </div>
              <Button variant="education">
                <FileText className="w-4 h-4 mr-2" />
                New Transcript
              </Button>
            </div>
            
            <div className="space-y-4">
              {sampleNotes.map((note, index) => (
                <Card key={index} className="p-4 hover:shadow-card transition-all duration-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{note.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {note.duration}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{note.summary}</p>
                      <div className="flex flex-wrap gap-2">
                        {note.keywords.map((keyword, keyIndex) => (
                          <Badge key={keyIndex} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground">{note.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;