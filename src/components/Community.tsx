import React from "react";
import { motion } from "motion/react";
import { Users, MessagesSquare, Trophy, Heart, Send, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const discussions = [
  { 
    user: "Ananya M.", 
    role: "Product Designer", 
    content: "Just landed my first role at a Fintech startup! The software pathway was a lifesaver.", 
    likes: 42, 
    comments: 8, 
    avatar: "AM" 
  },
  { 
    user: "Rahul K.", 
    role: "Aspiring Data Scientist", 
    content: "Are there any study groups for the Google Data Analytics certification? Looking for peers.", 
    likes: 12, 
    comments: 24, 
    avatar: "RK" 
  },
  { 
    user: "Elena S.", 
    role: "Senior Dev", 
    content: "Wrote a small guide on how to prepare for System Design interviews. Check the Skill Lab updates!", 
    likes: 89, 
    comments: 15, 
    avatar: "ES" 
  }
];

const mentors = [
  { name: "Srini J.", field: "Engineering", rating: 4.9, students: "2.4k" },
  { name: "Linda W.", field: "Product Management", rating: 5.0, students: "1.1k" },
  { name: "Arjun P.", field: "Govt Exams Expert", rating: 4.8, students: "8.5k" }
];

export default function Community() {
  return (
    <div className="py-12 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-[var(--text-dim)] bg-clip-text text-transparent">
            Community Hub
          </h1>
          <p className="text-[var(--text-dim)] max-w-2xl">
            Success is never a solo journey. Connect with mentors, find study buddies, 
            and share your milestones with the CareerLens community.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dim)]" />
          <Input 
            placeholder="Search discussions..." 
            className="pl-10 bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 border-white/5 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--accent-secondary)] flex items-center justify-center font-bold text-white">RS</div>
            <div className="flex-1 space-y-4">
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/20 resize-none min-h-[60px]"
                placeholder="Share a thought, resource, or question..."
              />
              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <div className="flex gap-4 text-[var(--text-dim)] hover:text-white transition-colors cursor-pointer text-xs">
                  <span>Photo / Video</span>
                  <span>Poll</span>
                  <span>Schedule</span>
                </div>
                <Button size="sm" className="bg-[var(--accent-primary)] text-black font-bold px-6">
                  Post <Send className="ml-2 w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {discussions.map((post, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass-card border-white/5 p-6 hover:border-white/10 transition-all">
                  <div className="flex gap-4 items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-white">{post.avatar}</div>
                    <div>
                      <div className="text-sm font-bold text-white">{post.user}</div>
                      <div className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest">{post.role}</div>
                    </div>
                  </div>
                  <p className="text-[var(--text-dim)] text-sm leading-relaxed mb-6">
                    {post.content}
                  </p>
                  <div className="flex gap-6 mt-4 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-dim)] hover:text-white cursor-pointer transition-colors">
                      <Heart className="w-4 h-4" /> {post.likes}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-dim)] hover:text-white cursor-pointer transition-colors">
                      <MessagesSquare className="w-4 h-4" /> {post.comments}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-400" /> Top Mentors
            </h2>
            <div className="space-y-4">
              {mentors.map((mentor, idx) => (
                <div key={idx} className="glass-card p-4 border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center font-bold text-[var(--accent-primary)]">
                      {mentor.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-[var(--accent-primary)] transition-colors">{mentor.name}</div>
                      <div className="text-[10px] text-[var(--text-dim)]">{mentor.field}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">{mentor.rating} ⭐</div>
                    <div className="text-[10px] text-[var(--text-dim)]">{mentor.students} mentees</div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-[var(--accent-primary)] text-xs font-bold hover:bg-[var(--accent-primary)]/5">
                View All Mentors
              </Button>
            </div>
          </section>

          <div className="p-6 glass-card border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5">
            <h3 className="text-sm font-bold text-white mb-2">Weekend Networking Event</h3>
            <p className="text-[11px] text-[var(--text-dim)] mb-4 leading-relaxed">
              Join our virtual coffee chat on Sunday to meet builders and explorers from around the world.
            </p>
            <Button className="w-full h-9 bg-white/10 hover:bg-white/20 text-white border-white/10 text-xs font-bold">
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
