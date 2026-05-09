import React, { useState, useRef } from "react";
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2, Upload, FileText, Loader2 } from "lucide-react";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface AssessmentProps {
  mode: "beginner" | "intermediate";
  onComplete: (data: any) => void;
}

export default function Assessment({ mode, onComplete }: AssessmentProps) {
  const [step, setStep] = useState(1);
  const [isParsing, setIsParsing] = useState(false);
  const [formData, setFormData] = useState({
    interests: "",
    education: "",
    qualification: "",
    percentage: "",
    cvText: "",
  });

  const totalSteps = mode === "beginner" ? 3 : 1;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    onComplete({ ...formData, mode });
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    try {
      if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          fullText += strings.join(" ") + "\n";
        }
        updateField("cvText", fullText);
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.endsWith(".docx") || file.name.endsWith(".doc")
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        updateField("cvText", result.value);
      } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        const text = await file.text();
        updateField("cvText", text);
      } else {
        alert("Unsupported file type. Please upload a PDF, Word, or Text file.");
      }
    } catch (error) {
      console.error("Error parsing file:", error);
      alert("Failed to parse the file. Please try pasting the text instead.");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[var(--text-dim)]">
            {mode === "beginner" ? "Beginner Track" : "Intermediate Track"} — Step {step} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-[var(--accent-primary)]">{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="bg-[var(--accent-primary)] h-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass-card overflow-hidden">
            <div className="p-8 border-b border-[var(--glass-border)]">
              {mode === "beginner" ? (
                <>
                  {step === 1 && (
                    <>
                      <h2 className="text-2xl font-bold mb-2 text-white">What do you love doing?</h2>
                      <p className="text-[var(--text-dim)] text-sm">Tell us about your interests, hobbies, or what you enjoy in your free time.</p>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <h2 className="text-2xl font-bold mb-2 text-white">Tell us about your education</h2>
                      <p className="text-[var(--text-dim)] text-sm">What subjects did you study? What did you like or find easy in school/college?</p>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <h2 className="text-2xl font-bold mb-2 text-white">Current Qualification</h2>
                      <p className="text-[var(--text-dim)] text-sm">What is your latest degree or status for our records?</p>
                    </>
                  )}
                </>
              ) : (
                <>
                  {step === 1 && (
                    <>
                      <h2 className="text-2xl font-bold mb-2 text-white">Professional Background</h2>
                      <p className="text-[var(--text-dim)] text-sm">Upload your professional CV (PDF, Word, or Text). No other questions required!</p>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="p-8 space-y-6">
              {mode === "beginner" ? (
                <>
                  {step === 1 && (
                    <div className="space-y-2">
                      <Label htmlFor="interests" className="text-white">Interests & Hobbies</Label>
                      <Textarea 
                        id="interests"
                        placeholder="e.g., Playing cricket, drawing, reading about space, social work, gaming..."
                        className="min-h-[120px] bg-white/5 border-[var(--glass-border)] text-white placeholder:text-white/20 focus:bg-white/10"
                        value={formData.interests}
                        onChange={(e) => updateField("interests", e.target.value)}
                      />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-2">
                      <Label htmlFor="education" className="text-white">Educational Details</Label>
                      <Textarea 
                        id="education"
                        placeholder="e.g., I studied Science in 12th, I enjoyed Math, I was good at organizing events..."
                        className="min-h-[120px] bg-white/5 border-[var(--glass-border)] text-white placeholder:text-white/20 focus:bg-white/10"
                        value={formData.education}
                        onChange={(e) => updateField("education", e.target.value)}
                      />
                    </div>
                  )}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="qualification" className="text-white">Highest Qualification</Label>
                        <Input 
                          id="qualification"
                          placeholder="e.g. 12th Pass, Bachelor's in Arts, MBA, PhD..."
                          className="bg-white/5 border-[var(--glass-border)] text-white placeholder:text-white/20 focus:bg-white/10"
                          value={formData.qualification}
                          onChange={(e) => updateField("qualification", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="percentage" className="text-white">Percentage / CGPA</Label>
                        <Input 
                          id="percentage"
                          placeholder="e.g. 85%, 9.2 CGPA..."
                          className="bg-white/5 border-[var(--glass-border)] text-white placeholder:text-white/20 focus:bg-white/10"
                          value={formData.percentage}
                          onChange={(e) => updateField("percentage", e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {step === 1 && (
                    <div className="space-y-6">
                      <div 
                        className={`flex flex-col items-center justify-center border-2 border-dashed border-[var(--glass-border)] bg-white/5 p-10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all ${isParsing ? "opacity-50 pointer-events-none" : ""}`} 
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {isParsing ? (
                          <Loader2 className="w-10 h-10 text-[var(--accent-primary)] mb-4 animate-spin" />
                        ) : (
                          <Upload className="w-10 h-10 text-[var(--accent-primary)] mb-4" />
                        )}
                        <span className="text-white font-medium">{isParsing ? "Reading your CV..." : "Upload Professional CV"}</span>
                        <span className="text-[var(--text-dim)] text-xs mt-1">Supports .pdf, .docx, .txt formats</span>
                        <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
                        {formData.cvText && !isParsing && <div className="mt-2 text-green-400 text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> CV Loaded Successfully</div>}
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-[var(--glass-border)]"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-[var(--bg-deep)] px-3 text-sm text-[var(--text-dim)]">OR PASTE TEXT</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvText" className="text-white">Experience Details</Label>
                        <Textarea 
                          id="cvText"
                          placeholder="If you don't have a file, list your years of experience, current role, and key skills here..."
                          className="min-h-[250px] bg-white/5 border-[var(--glass-border)] text-white placeholder:text-white/20 focus:bg-white/10"
                          value={formData.cvText}
                          onChange={(e) => updateField("cvText", e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="p-8 flex justify-between border-t border-[var(--glass-border)] bg-white/5">
              <Button 
                variant="ghost" 
                onClick={prevStep} 
                disabled={step === 1}
                className="gap-2 text-[var(--text-dim)] hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              {step < totalSteps ? (
                <Button onClick={nextStep} className="gap-2 bg-[var(--accent-primary)] text-black hover:bg-[var(--accent-primary)]/90">
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="gap-2 bg-[var(--accent-primary)] text-black hover:bg-[var(--accent-primary)]/90">
                  Generate My Path <Sparkles className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
