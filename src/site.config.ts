/**
 * ────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth
 * ────────────────────────────────────────────────────────────────────────────
 *  Edit this file to make the portfolio your own. Every identity, link,
 *  SEO string, nav entry, and content list is read from here.
 *
 *  After cloning:
 *    1. Update `identity`, `contact`, `assets`, and `socials` below.
 *    2. Edit `seo` defaults and `nav` items.
 *    3. Replace `experiences`, `projects`, `hackathons`, `research`.
 *
 *  Runtime-only values (API keys, etc.) still live in `.env.local`.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type SocialPlatform =
  | "twitter"
  | "github"
  | "linkedin"
  | "leetcode"
  | "tryhackme"
  | "codeforces";

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  identity: {
    name: "Mbuyelo Maluleke",
    firstName: "Mbuyelo",
    title: "Software Professional",
    tagline: "AI & Full-Stack Engineer",
    bio: "AI and full-stack engineer turning ideas into useful software, from LLM-powered applications and autonomous agents to image-AI workflows built with LangChain.",
    intros: [
      "Software Engineer",
      "Full-Stack Engineer",
      "Problem Solver",
      "Tech Geek",
    ],
  },

  // ── Contact & URL ─────────────────────────────────────────────────────────
  contact: {
    email: "newtoneffect0@gmail.com",
    url: "https://buddhsentripathi.com",
    calUrl: "https://mail.google.com/mail/?view=cm&to=newtoneffect0@gmail.com",
  },

  // ── Assets (R2-backed CDN at cdn.buddhsentripathi.com/assets) ─────────────
  // Tiny site-chrome files (favicon, manifest, robots, oneko) stay in /public;
  // everything else is uploaded via scripts/migrate-assets-to-r2.mjs.
  assetsUrl: "https://cdn.buddhsentripathi.com/assets",
  assets: {
    ogImage: "https://cdn.buddhsentripathi.com/assets/default-image.webp",
    blogOgImage: "https://cdn.buddhsentripathi.com/assets/default-image-blogs.webp",
    favicon: "/favicon.svg",
  },

  // ── Socials (platform → username + url) ───────────────────────────────────
  //  Adding/removing entries here updates the hero social buttons automatically.
  socials: {
    leetcode: {
      label: "LeetCode",
      username: "mbuyelo",
      url: "https://leetcode.com/u/mbuyelo",
    },
    tryhackme: {
      label: "TryHackMe",
      username: "mbuyelo",
      url: "https://tryhackme.com/p/mbuyelo",
    },
    codeforces: {
      label: "Codeforces",
      username: "mbuyelo",
      url: "https://codeforces.com/profile/mbuyelo",
    },
    twitter: {
      label: "Twitter",
      username: "tonym_43",
      url: "https://x.com/tonym_43",
    },
    github: {
      label: "Github",
      username: "MbuyeloMich",
      url: "https://github.com/MbuyeloMich",
    },
    linkedin: {
      label: "LinkedIn",
      username: "mbuyelo-maluleke",
      url: "https://www.linkedin.com/in/mbuyelo-maluleke-72705b227/",
    },
  } satisfies Record<SocialPlatform, { label: string; username: string; url: string }>,

  // ── SEO defaults ──────────────────────────────────────────────────────────
  seo: {
    titleTemplate: "%s | Mbuyelo Maluleke",
    defaultTitle: "Mbuyelo Maluleke",
    defaultDescription:
      "Software professional portfolio showcasing projects and skills in generative AI, cloud infrastructure, TypeScript, and full-stack development",
    keywords: [
      "Mbuyelo Maluleke",
      "Software Professional",
      "Generative AI",
      "Cloud Infrastructure",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Web Development",
      "Portfolio",
    ],
    twitterHandle: "@tonym_43",
    locale: "en_US",
    themeColor: "#0B0D0E",
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: [
    { path: "/", name: "About" },
    { path: "/projects", name: "Projects" },
    { path: "/experience", name: "Experience" },
    { path: "/hackathons", name: "Hacks" },
    { path: "/blogs", name: "Blogs" },
  ],

  // ── Content: Experiences ──────────────────────────────────────────────────
  experiences: [
    {
      role: "Front-End Designer",
      year: "Jun 2024 - Present",
      company: "High Hype",
      type: "Freelance",
      logo: "/high-hype-logo.png",
      logoBackground: "bg-neutral-950",
      responsibility: [
        [{ text: "Designed and built front-end experiences for freelance projects." }],
      ],
      techstacks: [
        "Figma",
        "Photoshop",
        "TypeScript",
        "Modern JavaScript (ES6+)",
        "Next.js",
        "React.js",
        "Vue.js",
        "Tailwind CSS",
        "Vercel AI SDK",
      ],
    },
    {
      role: "AI Developer",
      year: "Jun 2024 - Present",
      company: "High Hype",
      type: "Full-Time",
      focus: "Software / AI Agents",
      logo: "/high-hype-logo.png",
      logoBackground: "bg-neutral-950",
      responsibility: [
        [{ text: "Working across Java, TypeScript, UX/UI design, and C#." }],
      ],
      techstacks: [
        "Java",
        "TypeScript",
        "UX/UI Design",
        "C#",
        "LangChain",
        "TensorFlow",
        "Keras",
        "scikit-learn",
        "HuggingFace",
        "OpenAI",
        "RAG",
        "MCP",
      ],
    },
  ],

  // ── Content: Projects ─────────────────────────────────────────────────────
  projects: [
    {
      title: "DeepFind.Me",
      category: "SaaS · OSINT Platform",
      description:
        "Educational OSINT platform offering tools and resources to help users understand and manage their digital footprint.",
      techstacks: ["Next.js", "NestJS", "FastAPI", "PostgreSQL", "Docker", "AWS", "OpenAI API"],
      status: "live",
      link: "https://deepfind.me",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/deepfindme.png",
    },
    {
      title: "Bucket0",
      category: "SaaS · Storage",
      description:
        "Platform to store files and manage all your S3-compatible buckets in a single, powerful interface - now with a native mobile app.",
      techstacks: ["Next.js", "TypeScript", "PostgreSQL", "S3 API", "Expo"],
      status: "live",
      link: "https://bucket0.com",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/bucket0-light.png",
      previewDark: "https://cdn.buddhsentripathi.com/assets/projects/bucket0-dark.png",
    },
    {
      title: "Nimu",
      category: "SaaS · AI Outreach",
      description:
        "AI outreach platform with automated domain authentication, multi-step campaigns, mailbox warm-up, and real-time deliverability monitoring.",
      techstacks: ["TanStack Start", "Hono", "Drizzle ORM", "Supabase", "Cloudflare Queues", "Better Auth", "AWS", "Docker"],
      status: "building",
      link: "https://nimu.app",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/nimu-light.png?v=20260729",
      previewDark: "https://cdn.buddhsentripathi.com/assets/projects/nimu-dark.png?v=20260729",
    },
    {
      title: "OpenVScan",
      category: "Open Source · Security",
      description:
        "Web-based vulnerability scanner that integrates open-source tools with AI to deliver smarter, faster and more reliable pre-production security testing.",
      techstacks: ["TanStack Start", "Drizzle ORM", "Cloudflare Workers", "Cloudflare D1", "Cloudflare R2", "Cloudflare Queues"],
      status: "building",
      link: "https://github.com/MbuyeloMich",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/openvscan-light.png",
      previewDark: "https://cdn.buddhsentripathi.com/assets/projects/openvscan-dark.png",
    },
    {
      title: "openai-api-helper",
      category: "Open Source · npm Package",
      description:
        "Straightforward npm package designed to simplify making calls to the OpenAI API for various text-based prompts and responses.",
      techstacks: ["JavaScript", "TypeScript"],
      status: "active",
      link: "https://github.com/MbuyeloMich",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/npm.png",
    },
    {
      title: "SmartText Enhancer",
      category: "Chrome Extension · AI",
      description:
        "Productivity-focused Chrome extension that uses AI to summarize content and check spelling and grammar.",
      techstacks: ["JavaScript", "HTML", "CSS", "Express", "OpenAI API"],
      status: "active",
      link: "https://chromewebstore.google.com/detail/smarttext-enhancer/chmpfoicecijpgmgcpnfhakmeaofmipm",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/sme.png",
    },
  ],

  // ── Content: Hackathons ───────────────────────────────────────────────────
  hackathons: [
    {
      title: "Hlokomela",
      event: "TCS Sustainathon™ South Africa 2026",
      year: "Sep 2026",
      placement: "Top 10 Finalist · 4th Place",
      college: "South Africa",
      body: [
        { text: "At the " },
        { text: "TCS Sustainathon™ South Africa 2026", bold: true },
        { text: ", our team placed " },
        { text: "4th overall", bold: true },
        { text: " among the top 10 finalists with " },
        { text: "Hlokomela", bold: true },
        { text: " (“to take care of” or “to be vigilant”), an IoT water-intelligence platform. Low-cost sensors capture water-quality and infrastructure telemetry; the system uses " },
        { text: "HiveMQ/MQTT and Apache Kafka", bold: true },
        { text: " for device messaging and event streaming, with " },
        { text: "TimescaleDB/PostgreSQL", bold: true },
        { text: " for time-series data. " },
        { text: "Python and TensorFlow", bold: true },
        { text: " support analytics to identify leak and water-quality anomalies, while " },
        { text: "FastAPI/Spring Boot services", bold: true },
        { text: " deliver insights and alerts to a React community app with Firebase Authentication. We’re developing Hlokomela as a startup and preparing for funding and potential equity investment." },
      ],
      techstacks: [
        "React",
        "Next.js",
        "TypeScript",
        "Python",
        "FastAPI",
        "GrokAI",
        "Vercel",
        "PostgreSQL",
        "Spring Boot",
        "Java",
        "TimescaleDB",
        "HiveMQ",
        "Redis Queue",
        "Firebase Authentication",
        "TensorFlow",
        "Apache Kafka",
        "Apache Airflow",
        "Pandas",
      ],
      link: [
        "https://www.instagram.com/reel/DdYvi-aTrGM/?utm_source=ig_web_copy_link&cplk=NTc4MTIwNjQ2YQ==",
        "https://linkedin.com/showcase/tata-consultancy-services-middle-east-africa/",
      ],
    },
    {
      title: "Project 1",
      event: "Hackathon 1",
      year: "Sep 2026",
      placement: "2nd Place",
      college: "South Africa",
      body: [{ text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam." }],
      techstacks: ["React", "Vite", "Tailwind CSS", "FastAPI", "Python", "OpenRouter", "Neon Postgres", "PRISM"],
      link: "https://github.com/MbuyeloMich",
    },
    {
      title: "Project 2",
      event: "Hackathon 2",
      year: "Jun 2026",
      placement: "2nd Place",
      college: "South Africa",
      body: [{ text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam." }],
      techstacks: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "PostgreSQL", "Pandas"],
      link: "https://github.com/MbuyeloMich",
    },
    {
      title: "Project 3",
      event: "Hackathon 3",
      year: "Jun 2026",
      placement: "1st Place",
      college: "South Africa",
      body: [{ text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam." }],
      techstacks: ["Next.js", "FastAPI", "Gemini", "Cognee", "Kuzu", "React", "TypeScript", "Python"],
      link: "https://github.com/MbuyeloMich",
    },
    {
      title: "Project 4",
      event: "Hackathon 4",
      year: "May 2026",
      placement: "2nd Place",
      college: "South Africa",
      body: [{ text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam." }],
      techstacks: ["Next.js", "FastAPI", "OpenRouter", "Gemini", "ClickHouse", "Datadog"],
      link: "https://github.com/MbuyeloMich",
    },
    {
      title: "Project 5",
      event: "Hackathon 5",
      year: "Apr 2026",
      placement: "1st Place",
      college: "South Africa",
      body: [{ text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam." }],
      techstacks: ["Next.js", "FastAPI", "Langchain", "Docker", "TypeScript", "Python"],
      link: "https://github.com/MbuyeloMich",
    },
    {
      title: "Project 6",
      event: "Hackathon 6",
      year: "Apr 2026",
      placement: "3rd Place",
      college: "South Africa",
      body: [{ text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam." }],
      techstacks: ["Next.js", "TypeScript", "Tailwind CSS", "Drizzle ORM", "Neon Postgres", "Claude API", "Vercel AI SDK", "Leaflet"],
      link: "https://github.com/MbuyeloMich",
    },
  ],

  // ── Content: Research ─────────────────────────────────────────────────────
  research: [] as Array<{
    title: string;
    year: string;
    authors?: string[];
    venue?: string;
    link?: string;
    description?: string;
  }>,
};

export type SiteConfig = typeof siteConfig;