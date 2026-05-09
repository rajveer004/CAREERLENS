import React from "react";
import { motion } from "motion/react";
import { TrendingUp, Users, DollarSign, Briefcase, Info } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const salaryData = [
  { year: "2020", salary: 45000 },
  { year: "2021", salary: 52000 },
  { year: "2022", salary: 68000 },
  { year: "2023", salary: 75000 },
  { year: "2024", salary: 88000 },
  { year: "2025", salary: 95000 },
  { year: "2026 Prediction", salary: 110000 },
];

const demandData = [
  { role: "AI Engineer", demand: 95 },
  { role: "Cyber Security", demand: 88 },
  { role: "Sustainability", demand: 75 },
  { role: "Health Tech", demand: 82 },
  { role: "FinTech", demand: 78 },
];

export default function MarketTrends() {
  return (
    <div className="py-12 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-[var(--text-dim)] bg-clip-text text-transparent">
          Market Trends
        </h1>
        <p className="text-[var(--text-dim)] max-w-2xl">
          Real-time insights into global job markets, salary growth, and industry demand. 
          Stay ahead by understanding where the market is moving.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" /> Avg. Salary Growth
            </CardDescription>
            <CardTitle className="text-2xl text-white">+18.5% <span className="text-xs font-normal text-green-400 ml-1">YoY</span></CardTitle>
          </CardHeader>
        </Card>
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" /> Remote Roles
            </CardDescription>
            <CardTitle className="text-2xl text-white">45% <span className="text-xs font-normal text-[var(--text-dim)] ml-1">Market Share</span></CardTitle>
          </CardHeader>
        </Card>
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" /> AI Disruption
            </CardDescription>
            <CardTitle className="text-2xl text-white">High <span className="text-xs font-normal text-[var(--text-dim)] ml-1">Risk/Opportunity</span></CardTitle>
          </CardHeader>
        </Card>
        <Card className="glass-card border-white/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-yellow-400" /> Top Sector
            </CardDescription>
            <CardTitle className="text-2xl text-white">Clean Tech</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card border-white/5 p-6 h-[400px]">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
            <DollarSign className="text-green-400" /> Salary Trajectory (USD)
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={salaryData}>
              <defs>
                <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="year" stroke="#94a3b860" style={{ fontSize: '10px' }} />
              <YAxis stroke="#94a3b860" style={{ fontSize: '10px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="salary" stroke="#22c55e" fillOpacity={1} fill="url(#colorSalary)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass-card border-white/5 p-6 h-[400px]">
          <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
            <TrendingUp className="text-blue-400" /> Job Demand Index (0-100)
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={demandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="role" stroke="#94a3b860" style={{ fontSize: '10px' }} />
              <YAxis stroke="#94a3b860" style={{ fontSize: '10px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="demand" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-12 glass-card p-8 border-white/5 flex items-start gap-6 bg-white/5">
        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
          <Info className="text-blue-400" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-2">AI Pulse Observation: 2026</h4>
          <p className="text-[var(--text-dim)] leading-relaxed">
            We've detected a significant shift towards "Hybrid Intelligence" roles—where professionals manage AI systems 
            rather than performing manual data entry. Salaries in these segments are outpacing generic tech roles by 25%. 
            <span className="text-[var(--accent-primary)] ml-1 font-medium cursor-pointer hover:underline">
              Download Full Report →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
