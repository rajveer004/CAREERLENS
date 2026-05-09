import React from "react";
import { GraduationCap, Github, Twitter, Linkedin, Mail, Shield, FileText, Send } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] py-8 mt-12 bg-white/[0.01] backdrop-blur-sm relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[var(--accent-primary)]/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">CareerLens</span>
          </div>

          {/* Links & Social */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-6">
              <Dialog>
                <DialogTrigger className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--accent-primary)] transition-all">
                  Privacy
                </DialogTrigger>
                <DialogContent className="glass-card border-white/10 text-white max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Shield className="text-[var(--accent-primary)]" /> Privacy Policy
                    </DialogTitle>
                    <DialogDescription className="text-[var(--text-dim)]">
                      Last updated: May 2026
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 text-sm text-[var(--text-dim)] max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                    <p>Your privacy is important to us. It is CareerLens's policy to respect your privacy regarding any information we may collect from you across our website.</p>
                    <h5 className="text-white font-bold">1. Information We Collect</h5>
                    <p>We collect information you provide directly to us when using our assessment tools, such as interests, educational background, and career goals.</p>
                    <h5 className="text-white font-bold">2. Data Usage</h5>
                    <p>Our AI models analyze your data to generate personalized roadmaps. We do not sell your personal data to third parties.</p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--accent-primary)] transition-all">
                  Terms
                </DialogTrigger>
                <DialogContent className="glass-card border-white/10 text-white max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <FileText className="text-[var(--accent-secondary)]" /> Terms of Service
                    </DialogTitle>
                    <DialogDescription className="text-[var(--text-dim)]">
                      Please read these terms carefully
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 text-sm text-[var(--text-dim)] max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                    <p>By accessing the website at CareerLens, you are agreeing to be bound by these terms of service.</p>
                    <h5 className="text-white font-bold">1. Disclaimer</h5>
                    <p>The materials on CareerLens's website are provided on an 'as is' basis. CareerLens makes no warranties, expressed or implied.</p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--accent-primary)] transition-all">
                  Contact
                </DialogTrigger>
                <DialogContent className="glass-card border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                      <Mail className="text-blue-400" /> Get in Touch
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[var(--text-dim)] tracking-wider">Email Address</label>
                      <Input placeholder="name@example.com" className="bg-white/5 border-white/10 h-9" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[var(--text-dim)] tracking-wider">Message</label>
                      <Textarea placeholder="How can we help you?" className="bg-white/5 border-white/10 h-24" />
                    </div>
                    <Button className="w-full bg-[var(--accent-primary)] text-black font-bold h-10">
                      Send Message <Send className="ml-2 w-3.5 h-3.5" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="h-4 w-[1px] bg-white/10 hidden md:block" />

            <div className="flex gap-4">
              <a href="#" className="text-[var(--text-dim)] hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-[var(--text-dim)] hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-[var(--text-dim)] hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 shrink-0">
            <p className="text-[10px] text-[var(--text-dim)] font-mono tracking-wider">
              © 2026 CAREERLENS LABS
            </p>
            <div className="flex items-center gap-1.5 text-[9px] text-[var(--text-dim)] uppercase tracking-tight">
              <span className="w-1 h-1 rounded-full bg-green-400" />
              System Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
