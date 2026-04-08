import { marked } from "marked";
import hljs from "highlight.js";
import { readdir, readFile, writeFile, mkdir, copyFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// Configure marked with syntax highlighting
marked.setOptions({
  gfm: true,
  breaks: false,
});

const markedExtension = {
  renderer: {
    code(code: string, lang: string | undefined): string {
      const text = code ?? "";
      const language = lang || "plaintext";
      const validLang = hljs.getLanguage(language) ? language : "plaintext";
      const highlighted = hljs.highlight(text, { language: validLang }).value;
      return `<pre><code class="hljs language-${validLang}">${highlighted}</code></pre>`;
    },
  },
};
marked.use(markedExtension);

const ROOT = path.resolve(import.meta.dir, "..");
const PROBLEMS_DIR = path.join(ROOT, "problems");
const DIST_DIR = path.join(ROOT, "dist");
const PUBLIC_DIR = path.join(ROOT, "public");

interface ProblemMeta {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  slug: string;
  url: string;
}

interface Problem extends ProblemMeta {
  content: string;
  excerpt: string;
}

function parseFrontmatter(raw: string): { meta: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match?.[1] || !match[2]) return { meta: {}, body: raw };

  const metaLines = match[1].split("\n");
  const meta: Record<string, unknown> = {};
  for (const line of metaLines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      meta[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    } else {
      meta[key] = value.replace(/^["']|["']$/g, "");
    }
  }
  return { meta, body: match[2] };
}

function problemPage(problem: Problem, allProblems: ProblemMeta[]): string {
  const htmlBody = marked(problem.content) as string;
  const difficultyClass = problem.difficulty.toLowerCase();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${problem.id}. ${problem.title} - LeetCode TypeScript Solutions</title>
  <meta name="description" content="${problem.excerpt}">
  <link rel="stylesheet" href="/leetcode-typescript/css/style.css">
  <link rel="stylesheet" href="/leetcode-typescript/css/highlight.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav-container">
      <a href="/leetcode-typescript/" class="logo">LeetCode TypeScript</a>
      <span class="nav-hint">Solutions</span>
    </nav>
  </header>

  <main class="main-content">
    <article class="problem-article">
      <div class="problem-header">
        <div class="problem-meta-row">
          <span class="problem-number">#${problem.id}</span>
          <span class="difficulty ${difficultyClass}">${problem.difficulty}</span>
          ${problem.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
        <h1 class="problem-title">${problem.title}</h1>
        <a href="${problem.url}" target="_blank" rel="noopener" class="leetcode-link">
          View on LeetCode →
        </a>
      </div>

      <div class="problem-body">
        ${htmlBody}
      </div>
    </article>

    <aside class="problem-list-sidebar">
      <h2>All Solutions</h2>
      <ul class="sidebar-list">
        ${allProblems
          .map(
            (p) =>
              `<li class="${p.id === problem.id ? "active" : ""}">
            <a href="/leetcode-typescript/problems/${p.slug}/">
              <span class="list-num">${p.id}.</span>
              <span class="list-title">${p.title}</span>
              <span class="list-diff ${p.difficulty.toLowerCase()}">${p.difficulty}</span>
            </a>
          </li>`
          )
          .join("\n        ")}
      </ul>
    </aside>
  </main>

  <footer class="site-footer">
    <p>TypeScript solutions · Hosted on GitHub Pages · <a href="https://github.com" target="_blank">View source</a></p>
  </footer>
</body>
</html>`;
}

function indexPage(problems: ProblemMeta[]): string {
  const rows = problems
    .map(
      (p) => `
    <tr>
      <td class="col-id">${p.id}</td>
      <td class="col-title"><a href="/leetcode-typescript/problems/${p.slug}/">${p.title}</a></td>
      <td class="col-diff"><span class="difficulty ${p.difficulty.toLowerCase()}">${p.difficulty}</span></td>
      <td class="col-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join(" ")}</td>
    </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LeetCode TypeScript Solutions</title>
  <meta name="description" content="LeetCode algorithm problems solved in TypeScript, with detailed explanations and complexity analysis.">
  <link rel="stylesheet" href="/leetcode-typescript/css/style.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav-container">
      <a href="/leetcode-typescript/" class="logo">LeetCode TypeScript</a>
      <span class="nav-hint">Solutions</span>
    </nav>
  </header>

  <main class="main-content index-main">
    <div class="hero">
      <h1>LeetCode TypeScript Solutions</h1>
      <p>LeetCode problems solved in TypeScript, with approach breakdowns, complexity analysis, and annotated code.</p>
      <div class="stats">
        <span><strong>${problems.length}</strong> problems</span>
        <span><strong>${problems.filter((p) => p.difficulty === "Easy").length}</strong> Easy</span>
        <span><strong>${problems.filter((p) => p.difficulty === "Medium").length}</strong> Medium</span>
        <span><strong>${problems.filter((p) => p.difficulty === "Hard").length}</strong> Hard</span>
      </div>
    </div>

    <div class="table-container">
      <table class="problems-table">
        <thead>
          <tr>
            <th class="col-id">#</th>
            <th class="col-title">Problem</th>
            <th class="col-diff">Difficulty</th>
            <th class="col-tags">Tags</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  </main>

  <footer class="site-footer">
    <p>TypeScript solutions · Hosted on GitHub Pages · <a href="https://github.com" target="_blank">View source</a></p>
  </footer>
</body>
</html>`;
}

async function copyDir(src: string, dest: string) {
  if (!existsSync(src)) return;
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

async function build() {
  console.log("Building site...");

  await mkdir(DIST_DIR, { recursive: true });

  // Copy public assets
  await copyDir(PUBLIC_DIR, DIST_DIR);

  // Read all problems
  const problemDirs = (await readdir(PROBLEMS_DIR, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  const problems: Problem[] = [];

  for (const dir of problemDirs) {
    const mdPath = path.join(PROBLEMS_DIR, dir, "index.md");
    if (!existsSync(mdPath)) continue;

    const raw = await readFile(mdPath, "utf-8");
    const { meta, body: rawBody } = parseFrontmatter(raw);

    // Inline solution.ts into the <<solution>> placeholder if present
    const solutionPath = path.join(PROBLEMS_DIR, dir, "solution.ts");
    const solutionCode = existsSync(solutionPath)
      ? await readFile(solutionPath, "utf-8")
      : null;
    const body = solutionCode
      ? rawBody.replace(
          "<<solution>>",
          "```typescript\n" + solutionCode.trimEnd() + "\n```",
        )
      : rawBody.replace("<<solution>>", "```typescript\n// TODO\n```");

    const excerpt = body
      .replace(/#{1,6}\s.*/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120);

    problems.push({
      id: Number(meta.id),
      title: String(meta.title),
      difficulty: meta.difficulty as "Easy" | "Medium" | "Hard",
      tags: (meta.tags as string[]) || [],
      slug: String(meta.slug),
      url: String(meta.url),
      content: body,
      excerpt,
    });
  }

  problems.sort((a, b) => a.id - b.id);

  const allMeta: ProblemMeta[] = problems.map(({ content: _c, excerpt: _e, ...rest }) => rest);

  // Generate problem pages
  for (const problem of problems) {
    const outDir = path.join(DIST_DIR, "problems", problem.slug);
    await mkdir(outDir, { recursive: true });
    const html = problemPage(problem, allMeta);
    await writeFile(path.join(outDir, "index.html"), html, "utf-8");
    console.log(`  ✓ problems/${problem.slug}/`);
  }

  // Generate index
  const indexHtml = indexPage(allMeta);
  await writeFile(path.join(DIST_DIR, "index.html"), indexHtml, "utf-8");
  console.log("  ✓ index.html");

  console.log(`\nBuild complete → dist/ (${problems.length} problems)`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
