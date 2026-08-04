const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

export type ContributionDay = {
  date: string;
  count: number;
};

export type GitHubStats = {
  totalContributions: number;
  weeks: ContributionDay[][];
  contributionsThisWeek: number;
};

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function fetchGitHubContributions(): Promise<GitHubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    console.warn("GITHUB_TOKEN or GITHUB_USERNAME not set — skipping fetch");
    return null;
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`GitHub API responded with status ${res.status}`);
      return null;
    }

    const json = await res.json();
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) return null;

    const weeks: ContributionDay[][] = calendar.weeks.map(
      (week: { contributionDays: { date: string; contributionCount: number }[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }))
    );

    // Sum up the most recent 7 days across the flattened day list
    const allDays = weeks.flat();
    const contributionsThisWeek = allDays.slice(-7).reduce((sum, day) => sum + day.count, 0);

    return {
      totalContributions: calendar.totalContributions,
      weeks,
      contributionsThisWeek,
    };
  } catch (err) {
    console.warn("Failed to fetch GitHub contributions:", err);
    return null;
  }
}

export type LanguageStat = {
  name: string;
  percentage: number;
  color: string;
};

const LANGUAGES_QUERY = `
  query($username: String!) {
    user(login: $username) {
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
        nodes {
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

// Aggregates language usage (by byte size) across all your owned,
// non-forked repos, returning the top languages by overall share.
export async function fetchGitHubLanguages(): Promise<LanguageStat[] | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) return null;

  try {
    const res = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: LANGUAGES_QUERY, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const repos = json?.data?.user?.repositories?.nodes;

    if (!Array.isArray(repos)) return null;

    const totals = new Map<string, { size: number; color: string }>();

    for (const repo of repos) {
      const edges = repo?.languages?.edges ?? [];
      for (const edge of edges) {
        const name = edge.node.name;
        const existing = totals.get(name);
        totals.set(name, {
          size: (existing?.size ?? 0) + edge.size,
          color: edge.node.color ?? "#888888",
        });
      }
    }

    const totalSize = Array.from(totals.values()).reduce((sum, v) => sum + v.size, 0);
    if (totalSize === 0) return null;

    return Array.from(totals.entries())
      .map(([name, { size, color }]) => ({
        name,
        percentage: Math.round((size / totalSize) * 100),
        color,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
  } catch (err) {
    console.warn("Failed to fetch GitHub languages:", err);
    return null;
  }
}