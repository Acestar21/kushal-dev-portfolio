export type SoftSkill = {
  name: string;
  note?: string; // optional short context, e.g. "self-taught via personal projects"
};

// Add or remove freely — just plain objects, no icons or imports needed.
export const softSkills: SoftSkill[] = [
  { name: "Problem Solving", note: "DSA practice, systems debugging" },
  { name: "Critical Thinking" },
  { name: "Written Communication", note: "documentation, technical writing" },
  { name: "Self-Directed Learning" },
];
