import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary/5 py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground">ClassScribe</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Transforming the way students take notes, one class at a time.
          </p>
          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              © 2025 ClassScribe. Built for students, by students.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;