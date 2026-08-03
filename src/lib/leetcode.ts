import fallbackData from "@/data/leetcode-fallback.json";

export type LeetCodeStats = {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  streak: number;
  totalActiveDays: number;
  lastUpdated: string;
  isLive: boolean;
};

const LEETCODE_USERNAME = "Ace_Star"; 

const QUERY = `
  query($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      userCalendar {
        streak
        totalActiveDays
      }
    }
  }
`;

export async function fetchLeetCodeStats(): Promise<LeetCodeStats> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: LEETCODE_USERNAME } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`LeetCode responded with ${res.status}`);

    const json = await res.json();
    const user = json?.data?.matchedUser;
    const stats = user?.submitStatsGlobal?.acSubmissionNum;
    const calendar = user?.userCalendar;

    if (!Array.isArray(stats)) {
      throw new Error("Unexpected LeetCode response shape");
    }

    const find = (difficulty: string) =>
      stats.find((s: { difficulty: string; count: number }) => s.difficulty === difficulty)
        ?.count ?? 0;

    return {
      totalSolved: find("All"),
      easySolved: find("Easy"),
      mediumSolved: find("Medium"),
      hardSolved: find("Hard"),
      streak: calendar?.streak ?? 0,
      totalActiveDays: calendar?.totalActiveDays ?? 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      isLive: true,
    };
  } catch (err) {
    console.warn("LeetCode fetch failed, using fallback data:", err);
    return { ...fallbackData, isLive: false } as LeetCodeStats;
  }
}