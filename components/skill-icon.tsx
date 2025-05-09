"use client"

import type React from "react"

import { motion } from "framer-motion"
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiGraphql,
  SiGit,
  SiGithub,
  SiDocker,
  SiJest,
  SiCypress,
  SiFigma,
  SiVercel,
  SiAmazonwebservices,
} from "react-icons/si"
import { FaServer } from "react-icons/fa"

interface SkillIconProps {
  name: string
  index: number
}

const iconComponents: Record<string, React.ElementType> = {
  HTML5: SiHtml5,
  CSS3: SiCss3,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Framer Motion": SiFramer,
  Redux: SiRedux,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Firebase: SiFirebase,
  GraphQL: SiGraphql,
  "REST API": FaServer,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  Jest: SiJest,
  Cypress: SiCypress,
  Figma: SiFigma,
  Vercel: SiVercel,
  AWS: SiAmazonwebservices,
}

const iconColors: Record<string, string> = {
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  React: "#61DAFB",
  "Next.js": "#000000",
  "Tailwind CSS": "#06B6D4",
  "Framer Motion": "#0055FF",
  Redux: "#764ABC",
  "Node.js": "#339933",
  Express: "#000000",
  MongoDB: "#47A248",
  PostgreSQL: "#4169E1",
  Firebase: "#FFCA28",
  GraphQL: "#E10098",
  "REST API": "#FF6C37",
  Git: "#F05032",
  GitHub: "#181717",
  Docker: "#2496ED",
  Jest: "#C21325",
  Cypress: "#17202C",
  Figma: "#F24E1E",
  Vercel: "#000000",
  AWS: "#FF9900",
}

export default function SkillIcon({ name, index }: SkillIconProps) {
  const Icon = iconComponents[name] || SiJavascript
  const color = iconColors[name] || "#666"

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.5 },
      }}
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-background shadow-lg p-3 border border-muted">
        <Icon size={36} color={color} className="transition-all duration-300" />
      </div>
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  )
}
