import React from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onReset: () => void;
  onNavigate: (view: any) => void;
  showReset?: boolean;
}

export default function Navbar({ onReset, onNavigate, showReset }: NavbarProps) {
  return (
    <nav className="border-b border-[var(--glass-border)] bg-transparent backdrop-blur-md sticky top-0 z-40 w-full h-[70px]">
      <div className="max-w-7xl mx-auto px-10 h-full flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate("landing")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-blue-600 flex items-center justify-center text-white shadow-lg shadow-[var(--accent-primary)]/20 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
            <GraduationCap className="w-6 h-6 relative z-10" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white leading-none">
              CAREER<span className="text-[var(--accent-primary)]">LENS</span>
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[8px] font-bold tracking-[0.2em] text-[var(--text-dim)] uppercase">AI LABS</span>
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate("pathways")}
            className="text-sm font-medium text-[var(--text-dim)] hover:text-white transition-colors cursor-pointer"
          >
            Pathways
          </button>
          <button 
            onClick={() => onNavigate("skills")}
            className="text-sm font-medium text-[var(--text-dim)] hover:text-white transition-colors cursor-pointer"
          >
            Skill Lab
          </button>
          <button 
            onClick={() => onNavigate("trends")}
            className="text-sm font-medium text-[var(--text-dim)] hover:text-white transition-colors cursor-pointer"
          >
            Market Trends
          </button>
          <button 
            onClick={() => onNavigate("community")}
            className="text-sm font-medium text-[var(--text-dim)] hover:text-white transition-colors cursor-pointer"
          >
            Community
          </button>
        </div>

        <div className="flex items-center gap-4">
          {showReset && (
            <Button variant="ghost" size="sm" onClick={onReset} className="text-[var(--text-dim)] hover:text-white">
              New Assessment
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
