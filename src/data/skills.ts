export type SkillTier = "Comfortable" | "Working knowledge" | "Currently learning";
export type SkillDomain = "Backend" | "Frontend" | "AI/Agentic" | "Security" | "Tools";

export type Skill = {
  name: string;
  domain: SkillDomain;
  tier: SkillTier;
  projectRefs?: string[]; // project slugs, matches content/projects/*.mdx filenames
};

export const skills: Skill[] = [
  { name: "Python", domain: "Backend", tier: "Comfortable", projectRefs: ["rag-pdf"] },
  { name: "FastAPI", domain: "Backend", tier: "Comfortable", projectRefs: ["nexus", "rag-pdf"] },
  { name: "SQLite", domain: "Backend", tier: "Comfortable", projectRefs: ["nexus", "rag-pdf"] },
  { name: "REST APIs", domain: "Backend", tier: "Comfortable" },
  { name: "PostgreSQL", domain: "Backend", tier: "Currently learning" },

  { name: "TypeScript", domain: "Frontend", tier: "Comfortable" },
  { name: "React", domain: "Frontend", tier: "Comfortable", projectRefs: ["nexus", "ciphervault"] },
  { name: "Next.js", domain: "Frontend", tier: "Working knowledge" },
  { name: "HTML/CSS", domain: "Frontend", tier: "Comfortable" },

  { name: "MCP Protocol", domain: "AI/Agentic", tier: "Working knowledge", projectRefs: ["nexus", "mcp-v1"] },
  { name: "Ollama", domain: "AI/Agentic", tier: "Working knowledge", projectRefs: ["nexus", "rag-pdf", "mcp-v1"] },
  { name: "RAG", domain: "AI/Agentic", tier: "Working knowledge", projectRefs: ["rag-pdf"] },
  { name: "Prompt Engineering", domain: "AI/Agentic", tier: "Working knowledge" },
  { name: "sentence-transformers", domain: "AI/Agentic", tier: "Currently learning", projectRefs: ["rag-pdf"] },

  { name: "AES-256-GCM", domain: "Security", tier: "Working knowledge", projectRefs: ["ciphervault"] },
  { name: "Web Crypto API", domain: "Security", tier: "Working knowledge", projectRefs: ["ciphervault"] },
  { name: "Cryptography fundamentals", domain: "Security", tier: "Currently learning" },

  { name: "Git", domain: "Tools", tier: "Comfortable" },
  { name: "Tauri", domain: "Tools", tier: "Working knowledge", projectRefs: ["acestar-nexus", "mcp-v1"] },
  { name: "Rust", domain: "Tools", tier: "Currently learning", projectRefs: ["acestar-nexus", "mcp-v1"] },
  { name: "Docker", domain: "Tools", tier: "Currently learning" },
  { name: "Linux", domain: "Tools", tier: "Working knowledge" },
];