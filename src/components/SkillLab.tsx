import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code, Database, Palette, BarChart, ExternalLink, PlayCircle, CheckCircle2, ChevronRight, X, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const initialSkills = [
  { id: "frontend", name: "Frontend Development", category: "Tech", progress: 85, icon: <Code /> },
  { id: "data", name: "Data Analysis (SQL)", category: "Data", progress: 40, icon: <Database /> },
  { id: "design", name: "UI/UX Design", category: "Creative", progress: 60, icon: <Palette /> },
  { id: "business", name: "Business Strategy", category: "Management", progress: 20, icon: <BarChart /> }
];

const featuredCourses = [
  { title: "Advanced React Patterns", provider: "Coursera", duration: "12 Hours", level: "Intermediate", enrolled: false },
  { title: "Machine Learning Foundations", provider: "MIT OpenCourseWare", duration: "40 Hours", level: "Expert", enrolled: false },
  { title: "Financial Modeling", provider: "Udemy", duration: "8 Hours", level: "Beginner", enrolled: false }
];

const quizQuestions = [
  {
    category: "frontend",
    question: "Which hook would you use to sync a component with an external system in React?",
    options: ["useState", "useEffect", "useMemo", "useRef"],
    answer: 1
  },
  {
    category: "data",
    question: "In SQL, which clause is used to filter the results of an aggregate function?",
    options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
    answer: 2
  },
  {
    category: "design",
    question: "What does 'Visual Hierarchy' primarily help a user do?",
    options: ["Increase page speed", "Understand the order of importance", "Reduce CSS file size", "Choose a color palette"],
    answer: 1
  },
  {
    category: "business",
    question: "What is a 'Value Proposition'?",
    options: ["The cost of a product", "The promise of value to be delivered", "A discount offer", "A business loan"],
    answer: 1
  },
  {
    category: "frontend",
    question: "What is the primary benefit of using a Virtual DOM?",
    options: ["Saves server memory", "Avoids full page reloads", "Optimizes rendering by batching updates", "Encrypts user data"],
    answer: 2
  }
];

interface SkillLabProps {
  userData?: any;
}

export default function SkillLab({ userData }: SkillLabProps) {
  const [skills, setSkills] = useState(initialSkills);
  const [courses, setCourses] = useState(featuredCourses);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleEnroll = (idx: number) => {
    const newCourses = [...courses];
    if (newCourses[idx].enrolled) {
      toast.info("You are already enrolled in this course!");
      return;
    }
    newCourses[idx].enrolled = true;
    setCourses(newCourses);
    toast.success(`Enrolled in ${newCourses[idx].title}!`, {
      description: "You can start learning right away from your dashboard.",
    });
  };

  const handleAnswer = (optionIdx: number) => {
    const question = quizQuestions[currentQuestion];
    const isCorrect = optionIdx === question.answer;

    if (isCorrect) {
      setScore(score + 1);
      // Update the specific skill progress
      setSkills(prev => prev.map(skill => {
        if (skill.id === question.category) {
          return { ...skill, progress: Math.min(skill.progress + 5, 100) };
        }
        return skill;
      }));
    }

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
      if (score >= 3) {
        toast.success("Skill Growth Detected!", {
          description: "Your portfolio has been updated based on your quiz results.",
        });
      }
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 text-white">
        <div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-[var(--text-dim)] bg-clip-text text-transparent">
            Skill Lab
          </h1>
          <p className="text-[var(--text-dim)] max-w-2xl">
            {userData?.goal ? `Targeting ${userData.goal}: ` : ""}
            Bridge the gap between your current skills and your target role. 
            Track your progress and access curated learning resources.
          </p>
        </div>
        <div className="flex gap-4 font-mono text-sm">
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
            <span className="text-[var(--text-dim)] mr-2">CREDITS:</span>
            <span className="text-[var(--accent-primary)]">1250</span>
          </div>
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
            <span className="text-[var(--text-dim)] mr-2">LEVEL:</span>
            <span className="text-[var(--accent-primary)]">24</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <PlayCircle className="text-[var(--accent-primary)]" /> My Skill Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, idx) => (
                <motion.div 
                  key={idx} 
                  className="glass-card p-6 border-white/5 hover:border-[var(--accent-primary)]/30 transition-all cursor-default"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center text-[var(--accent-primary)]">
                        {skill.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{skill.name}</div>
                        <div className="text-[10px] uppercase tracking-widest text-[var(--text-dim)]">{skill.category}</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-[var(--accent-primary)]">{skill.progress}%</div>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-[var(--accent-primary)] h-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.progress}%` }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6 text-white">Curated For Your Path</h2>
            <div className="space-y-4">
              {courses.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 glass-card border-white/5 hover:bg-white/5 transition-colors group">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[var(--accent-primary)] transition-colors">{course.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-[var(--text-dim)]">
                      <span>{course.provider}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{course.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[var(--accent-primary)]">{course.level}</span>
                    </div>
                  </div>
                  <Button 
                    variant={course.enrolled ? "outline" : "ghost"} 
                    size="sm" 
                    className={`${course.enrolled ? "border-green-500/50 text-green-400" : "text-[var(--text-dim)] hover:text-white"}`}
                    onClick={() => handleEnroll(idx)}
                  >
                    {course.enrolled ? (
                      <><CheckCircle2 className="mr-2 w-3 h-3" /> Enrolled</>
                    ) : (
                      <>Enroll <ExternalLink className="ml-2 w-3 h-3" /></>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <Card className="glass-card bg-[var(--accent-primary)]/5 border-[var(--accent-primary)]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)]/10 blur-[40px]" />
            <CardHeader>
              <CardTitle className="text-white">Skill Assessment</CardTitle>
              <CardDescription>Verify your knowledge with AI-driven tests and earn certificates.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-[var(--accent-primary)] text-black font-bold h-12 shadow-lg shadow-[var(--accent-primary)]/20"
                onClick={() => setShowQuiz(true)}
              >
                Start Weekly Challenge
              </Button>
            </CardContent>
          </Card>

          <div className="glass-card p-6 border-white/5">
            <h3 className="text-sm font-bold text-white mb-4">Upcoming Live Workshops</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-[var(--accent-primary)] pl-4 py-1 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="text-xs font-bold text-white group-hover:text-[var(--accent-primary)]">System Design for Scale</div>
                <div className="text-[10px] text-[var(--text-dim)]">Tomorrow, 6:00 PM • By Sarah Chen</div>
              </div>
              <div className="border-l-2 border-white/20 pl-4 py-1 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="text-xs font-bold text-white group-hover:text-white">Public Speaking Masterclass</div>
                <div className="text-[10px] text-[var(--text-dim)]">Saturday, 11:00 AM • By David Brooks</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal Overlay */}
      <AnimatePresence>
        {showQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={resetQuiz}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl glass-card bg-[#0a0a0a] border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                {!quizFinished ? (
                  <>
                    <div className="flex justify-between items-center mb-8">
                      <div className="text-xs font-mono text-[var(--accent-primary)]">QUESTION {currentQuestion + 1}/5</div>
                      <button onClick={resetQuiz} className="text-[var(--text-dim)] hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-8 leading-tight">
                      {quizQuestions[currentQuestion].question}
                    </h3>

                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(idx)}
                          className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[var(--accent-primary)]/50 transition-all text-sm text-white flex justify-between items-center group"
                        >
                          {option}
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all text-[var(--accent-primary)]" />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center mx-auto mb-6">
                      <Trophy className="w-8 h-8 text-[var(--accent-primary)]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Challenge Complete!</h3>
                    <p className="text-[var(--text-dim)] mb-8">
                      You scored <span className="text-white font-bold">{score} out of 5</span>.
                      {score === 5 ? " Perfect score! You're dominating this field." : " Great effort! Keep practicing to sharpen your skills."}
                    </p>
                    <div className="flex gap-4">
                      <Button onClick={resetQuiz} variant="outline" className="flex-1 bg-white/5 border-white/10 text-white">
                        Close
                      </Button>
                      <Button onClick={resetQuiz} className="flex-1 bg-[var(--accent-primary)] text-black font-bold">
                        Share Results
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
