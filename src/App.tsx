import { useState } from "react";
import { toast } from "sonner";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Assessment from "./components/Assessment";
import Dashboard from "./components/Dashboard";
import AIChat from "./components/AIChat";
import Pathways from "./components/Pathways";
import SkillLab from "./components/SkillLab";
import MarketTrends from "./components/MarketTrends";
import Community from "./components/Community";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/sonner";

type AppState = "landing" | "assessment-beginner" | "assessment-intermediate" | "dashboard" | "pathways" | "skills" | "trends" | "community";

export default function App() {
  const [state, setState] = useState<AppState>("landing");
  const [userData, setUserData] = useState<any>(null);

  const handleStartBeginner = () => {
    setState("assessment-beginner");
  };

  const handleStartIntermediate = () => {
    setState("assessment-intermediate");
  };

  const handleAssessmentComplete = (data: any) => {
    setUserData(data);
    setState("dashboard");
    toast.success("Analysis complete!", {
      description: "We've generated your personalized career recommendations.",
    });
  };

  const handleReset = () => {
    setState("landing");
    setUserData(null);
  };

  const handleNavigate = (view: AppState) => {
    setState(view);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar 
        onReset={handleReset} 
        onNavigate={handleNavigate}
        showReset={state === "dashboard"} 
      />
      
      <main className="container mx-auto">
        {state === "landing" && (
          <Landing 
            onStartBeginner={handleStartBeginner} 
            onStartIntermediate={handleStartIntermediate} 
            onNavigate={handleNavigate}
          />
        )}
        {state === "assessment-beginner" && (
          <Assessment mode="beginner" onComplete={handleAssessmentComplete} />
        )}
        {state === "assessment-intermediate" && (
          <Assessment mode="intermediate" onComplete={handleAssessmentComplete} />
        )}
        {state === "dashboard" && <Dashboard userData={userData} />}
        {state === "pathways" && <Pathways onNavigate={handleNavigate} />}
        {state === "skills" && <SkillLab userData={userData} />}
        {state === "trends" && <MarketTrends />}
        {state === "community" && <Community />}
      </main>

      {state === "dashboard" && (
        <AIChat 
          context={`User Interests & Hobbies: ${userData.interests}, Educational Background: ${userData.education}, Qualification: ${userData.qualification}, Performance: ${userData.percentage}`} 
        />
      )}

      <Toaster position="top-center" />
      
      <Footer />
    </div>
  );
}
