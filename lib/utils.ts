import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const generateUUID = () => crypto.randomUUID();

const interviewCovers = [
  "/covers/adobe.png",
  "/covers/amazon.png",
  "/covers/facebook.png",
  "/covers/hostinger.png",
  "/covers/pinterest.png",
  "/covers/quora.png",
  "/covers/reddit.png",
  "/covers/skype.png",
  "/covers/spotify.png",
  "/covers/telegram.png",
  "/covers/tiktok.png",
  "/covers/yahoo.png",
];

export const getRandomCover = () =>
  interviewCovers[Math.floor(Math.random() * interviewCovers.length)];

export const getStableCover = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return interviewCovers[Math.abs(hash) % interviewCovers.length];
};

const techMappings: Record<string, string> = {
  "react.js": "react", reactjs: "react", react: "react",
  "next.js": "nextjs", nextjs: "nextjs", next: "nextjs",
  "vue.js": "vuejs", vuejs: "vuejs", vue: "vuejs",
  "node.js": "nodejs", nodejs: "nodejs", node: "nodejs",
  typescript: "typescript", ts: "typescript",
  javascript: "javascript", js: "javascript",
  python: "python", django: "django", flask: "flask",
  mongodb: "mongodb", postgresql: "postgresql", mysql: "mysql",
  docker: "docker", aws: "aws", firebase: "firebase",
  tailwindcss: "tailwindcss", tailwind: "tailwindcss",
  html5: "html5", html: "html5", css3: "css3", css: "css3",
  angular: "angular", sass: "sass", git: "git",
  graphql: "graphql", redis: "redis", prisma: "prisma",
  figma: "figma", redux: "redux", jest: "jest",
};

const techIconBaseURL =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const getTechLogos = (techArray: string[]) => {
  return techArray.map((tech) => {
    const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
    const normalized = techMappings[key];
    return {
      tech,
      url: normalized
        ? `${techIconBaseURL}/${normalized}/${normalized}-original.svg`
        : "/tech.svg",
    };
  });
};

export const getScoreColor = (score: number) => {
  if (score > 70) return "green";
  if (score > 49) return "yellow";
  return "red";
};

export const getScoreLabel = (score: number) => {
  if (score > 70) return "Strong";
  if (score > 49) return "Good Start";
  return "Needs Work";
};
