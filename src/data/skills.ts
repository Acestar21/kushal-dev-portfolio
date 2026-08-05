import {
    SiPython,
    SiC,
    SiCplusplus,
    SiFastapi,
    SiSqlite,
    SiPostgresql,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiOllama,
    SiLangchain,
    SiGit,
    SiDocker,
    SiLinux,
    SiTauri,
    SiRust,
    SiNodedotjs,
    SiHtml5,
    SiCss,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type SkillTier =
    "Comfortable" | "Working knowledge" | "Currently learning";
export type SkillDomain =
    "Backend" | "Frontend" | "AI/Agentic" | "Security" | "Tools" | "Languages";

export type Skill = {
    name: string;
    domain: SkillDomain[];
    tier: SkillTier;
    icon: IconType;
    color?: string; // optional brand color override; falls back to a neutral tone if omitted
    projectRefs?: string[];
};

// To add a new skill: import its icon above (check react-icons.github.io/react-icons
// for the exact name, usually "Si" + the tech name), then add one entry below.
// That's the entire process — no other files need to change.
export const skills: Skill[] = [
    {
        name: "Python",
        domain: ["Backend", "Languages"],
        tier: "Comfortable",
        icon: SiPython,
        color: "#3776AB",
        projectRefs: ["rag-pdf"],
    },
    {
        name: "C++",
        domain: ["Languages"],
        tier: "Comfortable",
        icon: SiCplusplus,
        color: "#3776AB",
    },
    {
        name: "C",
        domain: ["Languages"],
        tier: "Comfortable",
        icon: SiC,
        color: "#3776AB",
    },
    {
        name: "FastAPI",
        domain: ["Backend"],
        tier: "Comfortable",
        icon: SiFastapi,
        color: "#009688",
        projectRefs: ["nexus", "rag-pdf"],
    },
    {
        name: "SQLite",
        domain: ["Backend"],
        tier: "Comfortable",
        icon: SiSqlite,
        color: "#003B57",
        projectRefs: ["nexus", "rag-pdf"],
    },
    {
        name: "PostgreSQL",
        domain: ["Backend"],
        tier: "Currently learning",
        icon: SiPostgresql,
        color: "#4169E1",
    },
    
    {
        name: "TypeScript",
        domain: ["Frontend", "Backend", "Languages"],
        tier: "Comfortable",
        icon: SiTypescript,
        color: "#3178C6",
    },
    {
        name: "React",
        domain: ["Frontend"],
        tier: "Comfortable",
        icon: SiReact,
        color: "#61DAFB",
        projectRefs: ["nexus", "ciphervault"],
    },
    {
        name: "Next.js",
        domain: ["Frontend"],
        tier: "Working knowledge",
        icon: SiNextdotjs,
        color: "#ffffff",
    },
    {
        name: "Tailwind CSS",
        domain: ["Frontend"],
        tier: "Working knowledge",
        icon: SiTailwindcss,
        color: "#06B6D4",
    },
    {
        name: "HTML5",
        domain: ["Frontend", "Languages"],
        tier: "Comfortable",
        icon: SiHtml5,
        color: "#E34F26",
    },
    {
        name: "CSS3",
        domain: ["Frontend", "Languages"],
        tier: "Comfortable",
        icon: SiCss,
        color: "#1572B6",
    },
    
    {
        name: "Ollama",
        domain: ["AI/Agentic", "Tools"],
        tier: "Working knowledge",
        icon: SiOllama,
        color: "#ffffff",
        projectRefs: ["nexus", "rag-pdf", "mcp-v1"],
    },
    {
        name: "LangChain",
        domain: ["AI/Agentic"],
        tier: "Currently learning",
        icon: SiLangchain,
        color: "#1C3C3C",
    },
    
    {
        name: "Git",
        domain: ["Tools"],
        tier: "Comfortable",
        icon: SiGit,
        color: "#F05032",
    },
    {
        name: "Docker",
        domain: ["Tools"],
        tier: "Currently learning",
        icon: SiDocker,
        color: "#2496ED",
    },
    {
        name: "Linux",
        domain: ["Tools"],
        tier: "Working knowledge",
        icon: SiLinux,
        color: "#FCC624",
    },
    {
        name: "Tauri",
        domain: ["Tools", "Frontend"],
        tier: "Working knowledge",
        icon: SiTauri,
        color: "#FFC131",
        projectRefs: ["acestar-nexus", "mcp-v1"],
    },
    {
        name: "Rust",
        domain: ["Languages", "Tools"],
        tier: "Currently learning",
        icon: SiRust,
        color: "#ffffff",
        projectRefs: ["acestar-nexus", "mcp-v1"],
    },
    {
        name: "Node.js",
        domain: ["Backend", "Tools"],
        tier: "Comfortable",
        icon: SiNodedotjs,
        color: "#5FA04E",
    },
];
