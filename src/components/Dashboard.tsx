import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  DollarSign, 
  ChevronRight, 
  ExternalLink, 
  Loader2,
  BookOpen,
  PlayCircle,
  FileText,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CareerRecommendation, 
  LearningPath, 
  getCareerRecommendations, 
  getLearningPath 
} from "@/src/lib/gemini";

interface DashboardProps {
  userData: any;
}

export default function Dashboard({ userData }: DashboardProps) {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null);
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loadingPath, setLoadingPath] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recs = await getCareerRecommendations(userData);
        setRecommendations(recs);
        if (recs.length > 0) {
          setSelectedCareer(recs[0]);
          fetchPath(recs[0].title);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userData]);

  const fetchPath = async (title: string) => {
    setLoadingPath(true);
    try {
      const path = await getLearningPath(title, userData);
      setLearningPath(path);
    } catch (error) {
      console.error("Error fetching learning path:", error);
    } finally {
      setLoadingPath(false);
    }
  };

  const handleCareerSelect = (career: CareerRecommendation) => {
    setSelectedCareer(career);
    fetchPath(career.title);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-xl font-medium animate-pulse">Analyzing your profile and market trends...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Recommendations */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[var(--accent-primary)]" />
            Top Recommendations
          </h2>
          <div className="space-y-4">
            {recommendations.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className={`glass-card p-4 cursor-pointer transition-all hover:bg-white/5 ${
                    selectedCareer?.title === career.title ? "border-[var(--accent-primary)] ring-1 ring-[var(--accent-primary)]/20 bg-white/5" : ""
                  }`}
                  onClick={() => handleCareerSelect(career)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 border-none">
                      {career.matchPercentage}% Match
                    </Badge>
                    <DollarSign className="w-4 h-4 text-[var(--text-dim)]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{career.title}</h3>
                  <p className="line-clamp-2 text-xs text-[var(--text-dim)]">
                    {career.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content: Path Details */}
        <div className="lg:col-span-8">
          {selectedCareer && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2 text-white">{selectedCareer.title}</h1>
                  <p className="text-[var(--text-dim)] max-w-2xl">{selectedCareer.description}</p>
                </div>
                <div className="flex flex-col gap-2 min-w-[200px] glass-card p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-white">Avg. Salary: {selectedCareer.salaryRange}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span className="text-white">Outlook: {selectedCareer.outlook}</span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="roadmap" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-white/5 border border-[var(--glass-border)] p-1 rounded-xl">
                  <TabsTrigger value="roadmap" className="data-[state=active]:bg-[var(--accent-primary)] data-[state=active]:text-black rounded-lg">Achievement Guide</TabsTrigger>
                  <TabsTrigger value="skills" className="data-[state=active]:bg-[var(--accent-primary)] data-[state=active]:text-black rounded-lg">Requirements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="roadmap" className="mt-6">
                  {loadingPath ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 w-full glass-card animate-pulse" />
                      ))}
                    </div>
                  ) : learningPath ? (
                    <div className="relative space-y-6 pl-10 before:absolute before:inset-0 before:left-[19px] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--glass-border)] before:to-transparent">
                      {learningPath.steps.map((step, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative"
                        >
                          {/* Icon */}
                          <div className="absolute -left-[31px] top-0 flex items-center justify-center w-6 h-6 rounded-full border border-[var(--accent-primary)] bg-[var(--bg-deep)] text-[var(--accent-primary)] shadow-[0_0_10px_rgba(56,189,248,0.3)] z-10">
                            <span className="text-[10px] font-bold">{index + 1}</span>
                          </div>
                          
                          {/* Card */}
                          <div className="glass-card p-6 hover:bg-white/5 transition-all">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                              <h3 className="font-bold text-lg text-white">{step.title}</h3>
                              <Badge variant="outline" className="w-fit text-[10px] border-[var(--glass-border)] text-[var(--text-dim)]">
                                {step.estimatedTime}
                              </Badge>
                            </div>
                            <p className="text-sm text-[var(--text-dim)] mb-4 leading-relaxed">{step.description}</p>
                            
                            <div className="space-y-3">
                              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-dim)]">Curated Resources</p>
                              <div className="flex flex-wrap gap-2">
                                {step.resources.map((res, i) => (
                                  <a 
                                    key={i} 
                                    href={res.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white text-xs hover:bg-white/10 transition-colors border border-[var(--glass-border)] group/link"
                                  >
                                    {res.type === 'video' && <PlayCircle className="w-3.5 h-3.5 text-red-400" />}
                                    {res.type === 'course' && <GraduationCap className="w-3.5 h-3.5 text-blue-400" />}
                                    {res.type === 'article' && <FileText className="w-3.5 h-3.5 text-green-400" />}
                                    {res.type === 'book' && <BookOpen className="w-3.5 h-3.5 text-amber-400" />}
                                    <span className="max-w-[150px] truncate">{res.title}</span>
                                    <ExternalLink className="w-3 h-3 opacity-30 group-hover/link:opacity-100 transition-opacity" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[var(--text-dim)] text-center py-10">No learning path available.</p>
                  )}
                </TabsContent>

                <TabsContent value="skills" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCareer.requiredSkills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 glass-card hover:bg-white/5 transition-all">
                        <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-[var(--accent-primary)]" />
                        </div>
                        <span className="font-medium text-white">{skill}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
