import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface CareerRecommendation {
  title: string;
  description: string;
  matchPercentage: number;
  requiredSkills: string[];
  salaryRange: string;
  outlook: string;
}

export interface LearningStep {
  title: string;
  description: string;
  resources: { title: string; url: string; type: 'course' | 'article' | 'video' | 'book' }[];
  estimatedTime: string;
}

export interface LearningPath {
  careerTitle: string;
  overview: string;
  steps: LearningStep[];
}

export const getCareerRecommendations = async (userData: {
  interests?: string;
  education?: string;
  qualification?: string;
  percentage?: string;
  cvText?: string;
  careerContext?: string;
  keyAmbition?: string;
  mode: "beginner" | "intermediate";
}) => {
  let prompt = "";
  
  if (userData.mode === "beginner") {
    prompt = `You are an expert career guidance counselor for FRESHER students who are confused about their goals.
    
    User Profile:
    - Interests & Hobbies: ${userData.interests}
    - Educational Background: ${userData.education}
    - Highest Qualification: ${userData.qualification}
    - Percentage/Grade: ${userData.percentage}
    
    Based on this, recommend 3-5 specific and concrete career paths. 
    IMPORTANT: These users are fresh graduates or students. They need guidance on where they fit best.
    Recommend roles across ALL sectors: Government (IAS, Bank PO, Defense), Private (MNCs, Startups), Entrepreneurship, and Creative fields.
    DO NOT limit to tech. Provide STRICT, formal job titles.`;
  } else {
    prompt = `You are a high-level Career Strategy Expert for professionals.
    
    Professional Profile (from CV/Experience):
    ${userData.cvText}
    
    Based ONLY on their existing professional foundation provided in the CV, analyze their strengths, experience, and potential. 
    Provide 3-5 strategic career paths, pivots, or advancement opportunities that would be a natural or high-impact next step for them.
    Focus on growth, leadership, or transition strategies. Provide formal job titles and explain the strategic match based on their CV.`;
  }

  prompt += `\nProvide the response in JSON format.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                matchPercentage: { type: Type.NUMBER },
                requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                salaryRange: { type: Type.STRING },
                outlook: { type: Type.STRING },
              },
              required: ["title", "description", "matchPercentage", "requiredSkills", "salaryRange", "outlook"],
            },
          },
        },
        required: ["recommendations"],
      },
    },
  });

  return JSON.parse(response.text).recommendations as CareerRecommendation[];
};

export const getLearningPath = async (careerTitle: string, userData: any) => {
  let prompt = "";
  
  if (userData.mode === "beginner") {
    prompt = `Create a comprehensive 'Full Achievement Guide' for a FRESHER wanting to become a ${careerTitle}.
    Their educational background is: ${userData.education}.
    Their current qualification is: ${userData.qualification}.
    
    Provide a detailed step-by-step roadmap for a beginner to actually ACHIEVE this job.`;
  } else {
    prompt = `Create a high-level strategic roadmap for a professional transitioning or advancing into the role of ${careerTitle}.
    Their existing background: ${userData.cvText}
    Their specific target: ${careerTitle}
    
    Provide a detailed step-by-step roadmap to achieve this transition/advancement, focusing on high-impact certifications, leadership switches, or industry pivots.`;
  }
  
  prompt += `
  Include:
  1. Specific exams or high-level certifications if applicable.
  2. Skill development steps.
  3. Networking and application strategies for this level.
  
  Provide real-world resources (e.g., official exam websites, top course platforms like Coursera/edX/LinkedIn Learning, or industry books).
  
  Provide the response in JSON format.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          careerTitle: { type: Type.STRING },
          overview: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                estimatedTime: { type: Type.STRING },
                resources: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      url: { type: Type.STRING },
                      type: { type: Type.STRING, enum: ['course', 'article', 'video', 'book'] },
                    },
                    required: ["title", "url", "type"],
                  },
                },
              },
              required: ["title", "description", "estimatedTime", "resources"],
            },
          },
        },
        required: ["careerTitle", "overview", "steps"],
      },
    },
  });

  return JSON.parse(response.text) as LearningPath;
};

export const getCareerAdvice = async (message: string, context: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a professional career mentor. 
    Context about the user: ${context}
    User question: ${message}`,
    config: {
      systemInstruction: "Provide concise, encouraging, and actionable career advice. Use markdown for formatting.",
    },
  });

  return response.text;
};
