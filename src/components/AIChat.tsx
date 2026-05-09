import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, User, Bot, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCareerAdvice } from "@/src/lib/gemini";

interface AIChatProps {
  context: string;
}

export default function AIChat({ context }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hi! I'm your AI Career Mentor. How can I help you today? Whether it's interview prep, skill advice, or industry insights, I'm here for you." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getCareerAdvice(userMsg, context);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-card w-[350px] md:w-[400px] h-[500px] flex flex-col shadow-2xl mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--glass-border)] flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/20 flex items-center justify-center border border-[var(--accent-primary)]/30">
                  <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Career Mentor</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider font-semibold">Online</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-[var(--text-dim)] hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" viewportRef={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                        msg.role === 'user' ? 'bg-[var(--accent-secondary)]' : 'bg-[var(--accent-primary)]'
                      }`}>
                        {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-black" />}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-[var(--accent-primary)] text-black' 
                          : 'bg-white/5 border border-[var(--glass-border)] text-white'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 max-w-[85%]">
                      <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)] flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-black" />
                      </div>
                      <div className="p-3 rounded-2xl bg-white/5 border border-[var(--glass-border)]">
                        <Loader2 className="w-4 h-4 animate-spin text-[var(--accent-primary)]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-[var(--glass-border)] bg-white/5">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your mentor..."
                  className="flex-1 bg-white/5 border border-[var(--glass-border)] rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="bg-[var(--accent-primary)] text-black hover:bg-[var(--accent-primary)]/90 h-9 w-9">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-2xl bg-[var(--accent-primary)] text-black hover:bg-[var(--accent-primary)]/90 border-none group"
      >
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </Button>
    </div>
  );
}
