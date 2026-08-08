export type TimelineCategory =
  | "Education"
  | "Project"
  | "Work"
  | "Learning"
  | "Achievement";

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
    description: "Pursuing Computer Science & Engineering",
    category: "Education",
    kind: "major",
    highlight: true,
  },
  {
    date: "2025",
    title: "Started Data Structures",
    description:
      "Began the C++ problem-solving journey that would later fed Neetcode and interview prep.",
    category: "Learning",
    kind: "minor",
  },
  {
    date: "Dec 2025",
    title: "MCP V1",
    description:
      "Built my first local LLM Tooling Client based on Model Context Protocol.",
    category: "Project",
    kind: "major",
  },
  {
    date: "May 2026",
    title: "Nexus",
    description:
      "Built a priority first dashboard with minimalistic visuals and reduced noise. Focusing on what matters",
    category: "Project",
    kind: "major",
    highlight: true,
  },
  {
    date: "July 2026",
    title: "Neetcode 150 In-Progress",
    description:
      "The full 150-problem set grind day by day. Currently at 55/150",
    category: "Learning",
    kind: "minor",
  },
  {
    date: "July 2026",
    title: "Searching for Internships",
    description: "Currently Searching for Internships in preferred domains",
    category: "Learning",
    kind: "minor",
    highlight: true,
  },
];
