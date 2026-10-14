import { siteConfig } from "@/site.config";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_REST_ENDPOINT = "https://api.github.com";

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const GRAPH_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

async function githubGraphQL(token, query, variables) {
  const res = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(3000),
  });
  if (!res.ok) return null;
  return res.json();
}

function buildFallbackContributionData() {
  const today = new Date();
  const contributions = [];

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setUTCDate(date.getUTCDate() - i);

    const dayOfWeek = date.getUTCDay();
    const month = date.getUTCMonth();
    const count = (dayOfWeek + month) % 6 === 0 ? 0 : ((dayOfWeek * 2 + month + 3) % 5);

    contributions.push({
      date: date.toISOString().slice(0, 10),
      count,
      level: count === 0 ? "NONE" : count >= 4 ? "FOURTH_QUARTILE" : count >= 3 ? "THIRD_QUARTILE" : count >= 2 ? "SECOND_QUARTILE" : "FIRST_QUARTILE",
    });
  }

  return contributions.map((day) => ({
    date: day.date,
    count: day.count,
    level: LEVEL_MAP[day.level] ?? 0,
  }));
}

export async function fetchGitHubContributions(username = siteConfig.socials.github.username) {
  const token = process.env.GITHUB_TOKEN;
  const now = new Date();
  const from = new Date(
    Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate())
  );

  if (!token) {
    const fallback = buildFallbackContributionData();
    return { contributions: fallback, lifetimeTotal: fallback.reduce((sum, d) => sum + d.count, 0) };
  }

  try {
    const graphJson = await githubGraphQL(token, GRAPH_QUERY, {
      username,
      from: from.toISOString(),
      to: now.toISOString(),
    });
    const calendar =
      graphJson?.data?.user?.contributionsCollection?.contributionCalendar;

    const contributions = calendar
      ? calendar.weeks.flatMap((week) =>
          week.contributionDays.map((day) => ({
            date: day.date,
            count: day.contributionCount ?? 0,
            level: LEVEL_MAP[day.contributionLevel] ?? 0,
          }))
        )
      : buildFallbackContributionData();

    const lifetimeTotal =
      calendar?.totalContributions ??
      contributions.reduce((sum, day) => sum + day.count, 0);

    return { contributions, lifetimeTotal };
  } catch {
    const fallback = buildFallbackContributionData();
    return { contributions: fallback, lifetimeTotal: fallback.reduce((sum, d) => sum + d.count, 0) };
  }
}

export async function fetchGitHubStars(repoFullName) {
  if (!repoFullName) return null;
  try {
    const res = await fetch(
      `${GITHUB_REST_ENDPOINT}/repos/${repoFullName}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}
