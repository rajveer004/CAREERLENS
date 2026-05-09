import React from "react";
import { motion } from "motion/react";
import { Map, ArrowRight, Star, Clock, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pathways = [
  {
    title: "Software Development",
    description: "From logic building to cloud architecture.",
    steps: "8 Steps",
    level: "All Levels",
    duration: "12-18 Months",
    icon: <Target className="text-blue-400" />,
    url: "https://roadmap.sh/full-stack"
  },
  {
    title: "Data Science & AI",
    description: "Master statistics, ML models, and data storytelling.",
    steps: "10 Steps",
    level: "Intermediate",
    duration: "24 Months",
    icon: <Map className="text-purple-400" />,
    url: "https://roadmap.sh/ai-data-scientist"
  },
  {
    title: "Civil Services (UPSC)",
    description: "Policy, history, and administrative excellence.",
    steps: "12 Steps",
    level: "Advanced",
    duration: "2-3 Years",
    icon: <Star className="text-yellow-400" />,
    url: "https://www.clearias.com/upsc-roadmap/"
  },
  {
    title: "Digital Marketing & Brand",
    description: "Growth hacking, performance ads, and content.",
    steps: "6 Steps",
    level: "Beginner",
    duration: "6 Months",
    icon: <Clock className="text-green-400" />,
    url: "https://roadmap.sh/digital-marketing"
  }
];

interface PathwaysProps {
  onNavigate: (view: any) => void;
}

export default function Pathways({ onNavigate }: PathwaysProps) {
  return (
    <div className="py-12 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-[var(--text-dim)] bg-clip-text text-transparent">
          Career Pathways
        </h1>
        <p className="text-[var(--text-dim)] max-w-2xl">
          Explore structured roadmaps for the world's most high-impact careers. 
          Each pathway is designed by industry experts and updated monthly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pathways.map((path, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="glass-card hover:border-[var(--accent-primary)]/50 transition-all group h-full flex flex-col">
              <CardHeader className="flex-none">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {path.icon}
                </div>
                <CardTitle className="text-xl text-white">{path.title}</CardTitle>
                <CardDescription className="text-[var(--text-dim)]">
                  {path.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col flex-1">
                <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-dim)] font-mono mb-auto">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {path.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" /> {path.steps}
                  </div>
                </div>
                <Button 
                  asChild
                  className="w-full bg-white/5 hover:bg-white/10 text-white border-white/10 mt-auto"
                >
                  <a href={path.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    Explore Roadmap <ArrowRight className="ml-2 w-4 h-4 shrink-0" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 p-12 glass-card rounded-3xl border border-[var(--accent-primary)]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)]/10 blur-[100px]" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Don't see your path?</h2>
            <p className="text-[var(--text-dim)] max-w-xl">
              Our AI can generate a custom roadmap specifically for your target role. 
              Take our assessment to get started.
            </p>
          </div>
          <Button 
            variant="default" 
            className="bg-[var(--accent-primary)] text-black hover:bg-[var(--accent-primary)]/90 h-14 px-8 text-lg font-bold"
            onClick={() => onNavigate("landing")}
          >
            Generate Custom Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
}
