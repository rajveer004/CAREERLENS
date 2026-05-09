import { motion } from "motion/react";
import { GraduationCap, Briefcase, Sparkles, ArrowRight, TrendingUp, Users, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingProps {
  onStartBeginner: () => void;
  onStartIntermediate: () => void;
  onNavigate: (view: any) => void;
}

const liveStats = [
  { label: "Students Guided", value: "12,450+", icon: <Users className="w-4 h-4" /> },
  { label: "Goals Achieved", value: "98%", icon: <Target className="w-4 h-4" /> },
  { label: "Real-time Trends", value: "Live", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "AI Precision", value: "99.9%", icon: <Zap className="w-4 h-4" /> },
];

export default function Landing({ onStartBeginner, onStartIntermediate }: LandingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[var(--accent-primary)]/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[var(--accent-secondary)]/10 blur-[120px] rounded-full animate-pulse delay-700" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 text-[var(--accent-primary)] text-xs font-bold mb-8 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-ping" />
          <span className="uppercase tracking-[0.2em]">Next-Gen Career Intelligence engine</span>
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1] text-white">
          <span className="block italic font-serif text-[var(--accent-primary)] text-xl md:text-2xl mb-3 font-normal tracking-wide opacity-80">Define your future.</span>
          <span className="opacity-90">ULTIMATE </span>
          <motion.span 
            whileHover={{ y: -2 }}
            className="relative inline-block cursor-default group"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--accent-primary)] to-white group-hover:to-[var(--accent-primary)] transition-all duration-500 font-black">
              CAREER
            </span>
            <div className="absolute inset-x-0 -bottom-1 h-[1px] bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.span>
          <span className="opacity-80"> NAVIGATION FOR</span> <br />
          <span className="relative inline-block mt-1 group">
            <span className="text-white/40 group-hover:text-white transition-colors duration-700 uppercase tracking-tighter inline-block text-3xl md:text-5xl">
              Professional Goals
            </span>
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-[var(--text-dim)] mb-12 max-w-xl mx-auto leading-relaxed font-medium">
          The world's first predictive career engine that converts your passions 
          into a high-performance professional roadmap with clinical precision.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Button 
            size="lg" 
            onClick={onStartBeginner}
            className="h-16 px-10 text-lg font-bold bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.1)] group rounded-2xl transition-all hover:scale-105 active:scale-95"
          >
            Start Beginner Journey
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            onClick={onStartIntermediate}
            className="h-16 px-10 text-lg font-bold border-white/10 text-white hover:bg-white/5 backdrop-blur-md group rounded-2xl transition-all hover:scale-105 active:scale-95"
          >
            I Have Experience
            <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform text-[var(--accent-primary)]" />
          </Button>
        </div>

        {/* Live Attributes / Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto"
        >
          {liveStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (idx * 0.1) }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card p-4 border-white/5 flex flex-col items-center justify-center gap-2 group hover:border-[var(--accent-primary)]/20 transition-all hover:bg-white/5 shadow-xl"
            >
              <div className="text-[var(--accent-primary)] mb-1 transition-transform group-hover:scale-120 group-hover:rotate-12">
                {stat.icon}
              </div>
              <div className="text-xl font-bold text-white leading-none tracking-tight">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--text-dim)] font-black">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-10 hidden xl:block opacity-20"
      >
        <GraduationCap className="w-16 h-16 text-white" />
      </motion.div>
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 right-10 hidden xl:block opacity-20"
      >
        <Briefcase className="w-16 h-16 text-white" />
      </motion.div>
    </div>
  );
}
