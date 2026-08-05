export type TimelineCategory = "Education" | "Project" | "Work" | "Learning" | "Achievement";

export type TimelineKind = "major" | "minor";

export type TimelineEntry = {
  date: string;
  title: string;
  description: string;
  category: TimelineCategory;
  kind: TimelineKind;
  highlight?: boolean;
};

export const timelineEntries: TimelineEntry[] = [
  {
    date: "2024 - Present",
    title: "BTech CSE",
    description: "Pursuing Computer Science & Engineering with a backend and AI-focused portfolio.",
    category: "Education",
    kind: "major",
    highlight: true,
  },
  {
    date: "2024",
    title: "Started Competitive Programming",
    description: "Began the C++ problem-solving journey that later fed Neetcode and interview prep.",
    category: "Learning",
    kind: "minor",
  },
  {
    date: "2025",
    title: "MCP V1",
    description: "Built the first Tauri and Ollama prototype that led into the Nexus architecture.",
    category: "Project",
    kind: "major",
  },
  {
    date: "2025 - 2026",
    title: "Nexus",
    description: "Expanded the local-first dashboard into the strongest documented portfolio project.",
    category: "Project",
    kind: "major",
    highlight: true,
  },
  {
    date: "Jun 2026",
    title: "Neetcode 150 Complete",
    description: "Completed the full 150-problem set and locked in a structured interview prep loop.",
    category: "Learning",
    kind: "minor",
  },
  {
    date: "Jul 2026",
    title: "3 Merged OSS PRs",
    description: "Contributed multiple open-source patches and kept the cadence intentionally small and consistent.",
    category: "Achievement",
    kind: "minor",
  },
  {
    date: "Aug 2026",
    title: "Building Nexus",
    description: "Currently sharpening the local-first developer dashboard with MCP support and polished data views.",
    category: "Project",
    kind: "major",
    highlight: true,
  },
];