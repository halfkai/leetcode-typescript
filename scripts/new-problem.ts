/**
 * Usage:
 *   bun run new <url>                                         # auto-fetch from LeetCode CN
 *   bun run new <id> <slug> <title> <difficulty> [tags...]   # manual
 *
 * Examples:
 *   bun run new https://leetcode.com/problems/3sum-closest/
 *   bun run new 1 two-sum "Two Sum" Easy "Array" "Hash Table"
 */

import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";

// ─── HTML → Markdown ─────────────────────────────────────────────────────────

function htmlToMarkdown(html: string): string {
  let md = html;

  // Code blocks: <pre><code>...</code></pre> — process FIRST before any inline rules
  md = md.replace(
    /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_, code) => {
      return (
        "\n```\n" +
        decodeEntities(stripTags(code)).replace(/\n$/, "") +
        "\n```\n"
      );
    },
  );

  // Inline code: decode entities and strip nested tags (e.g. <sup>) before wrapping.
  // Use a placeholder to protect backtick spans from subsequent tag-stripping.
  const codeSpans: string[] = [];
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, code) => {
    const inner = decodeEntities(stripTags(code)).replace(/\n/g, " ").trim();
    const idx = codeSpans.push(`\`${inner}\``) - 1;
    return `\x00CODE${idx}\x00`;
  });

  // Superscript (after code so it doesn't interfere with inline code)
  md = md.replace(/<sup[^>]*>(.*?)<\/sup>/gi, "^$1^");

  // Bold / italic
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*");
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");

  // Headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n");
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n");
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n");

  // Links
  md = md.replace(/<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");

  // Images (drop)
  md = md.replace(/<img[^>]*\/?>/gi, "");

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, "\n");

  // Horizontal rule
  md = md.replace(/<hr\s*\/?>/gi, "\n---\n");

  // Lists — process leaf <li> items, then the list wrapper
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => {
    let i = 0;
    const items = inner.replace(
      /[ \t]*<li[^>]*>([\s\S]*?)<\/li>/gi,
      (_m: string, c: string) => {
        i++;
        return `${i}. ${c.trim()}\n`;
      },
    );
    return "\n" + items.trim() + "\n";
  });

  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) => {
    const items = inner.replace(
      /[ \t]*<li[^>]*>([\s\S]*?)<\/li>/gi,
      (_m: string, c: string) => `- ${c.trim()}\n`,
    );
    return "\n" + items.trim() + "\n";
  });

  // Blockquote
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) => {
    return inner
      .trim()
      .split("\n")
      .map((l: string) => `> ${l}`)
      .join("\n");
  });

  // Paragraphs
  md = md.replace(
    /<p[^>]*>([\s\S]*?)<\/p>/gi,
    (_, inner) => `${inner.trim()}\n\n`,
  );

  // Remove any remaining HTML tags
  md = md.replace(/<[^>]+>/g, "");

  // Decode remaining HTML entities
  md = decodeEntities(md);

  // Restore protected code spans
  md = md.replace(/\x00CODE(\d+)\x00/g, (_, i) => codeSpans[Number(i)] ?? "");

  // Collapse 3+ blank lines → 2
  md = md.replace(/\n{3,}/g, "\n\n");

  return md.trim();
}

/** Strip all HTML tags from a string, preserving <sup> as ^N notation. */
function stripTags(str: string): string {
  return str.replace(/<sup[^>]*>(.*?)<\/sup>/gi, "^$1").replace(/<[^>]+>/g, "");
}

function decodeEntities(str: string): string {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
}

// ─── LeetCode CN GraphQL ──────────────────────────────────────────────────────

interface LCTag {
  name: string;
}

interface LCCodeSnippet {
  langSlug: string;
  code: string;
}

interface LCQuestion {
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  difficulty: string;
  content: string;
  topicTags: LCTag[];
  codeSnippets: LCCodeSnippet[];
  exampleTestcaseList: string[];
  metaData: string;
}

async function fetchProblem(slug: string): Promise<LCQuestion> {
  const query = `
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionFrontendId
        title
        titleSlug
        difficulty
        content
        topicTags { name }
        codeSnippets { langSlug code }
        exampleTestcaseList
        metaData
      }
    }
  `;

  const res = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
      Referer: `https://leetcode.com/problems/${slug}/`,
    },
    body: JSON.stringify({ query, variables: { titleSlug: slug } }),
  });

  if (!res.ok) {
    throw new Error(`LeetCode API responded with HTTP ${res.status}`);
  }

  const json = (await res.json()) as {
    data?: { question?: LCQuestion };
    errors?: unknown[];
  };

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  const q = json.data?.question;
  if (!q) {
    throw new Error(`Problem not found: "${slug}"`);
  }

  return q;
}

function buildTestFromQuestion(q: LCQuestion): string | null {
  try {
    const meta = JSON.parse(q.metaData) as LCMetaData;
    if (!meta.name || !meta.params?.length || !q.exampleTestcaseList?.length) return null;
    return buildTestFile(meta.name, meta, q.exampleTestcaseList);
  } catch {
    return null;
  }
}

// ─── File generation ──────────────────────────────────────────────────────────

function buildMarkdown(
  id: number,
  title: string,
  slug: string,
  difficulty: string,
  tags: string[],
  url: string,
  bodyMd: string,
  codeSnippet: string,
): string {
  return `---
id: ${id}
title: "${title}"
difficulty: ${difficulty}
tags: [${tags.map((t) => `"${t}"`).join(", ")}]
slug: ${slug}
url: ${url}
---

## Problem

> Original: [${id}. ${title}](${url})

${bodyMd}

## Approach

<!-- Explain the key insight and algorithm here -->

## Solution

### Code

> [solution.ts](./solution.ts)

<<solution>>

### Complexity

- **Time**: O(?)
- **Space**: O(?)
`;
}

const DEFAULT_SNIPPET = "// TODO";

// ─── Test file generation ─────────────────────────────────────────────────────

interface LCMetaData {
  name: string;
  params: { name: string; type: string }[];
  return: { type: string };
}

/** Map LeetCode type strings to TypeScript types. */
function lcTypeToTs(t: string): string {
  if (t === "integer" || t === "long" || t === "double" || t === "float") return "number";
  if (t === "integer[]" || t === "long[]" || t === "double[]") return "number[]";
  if (t === "integer[][]" || t === "long[][]") return "number[][]";
  if (t === "string") return "string";
  if (t === "string[]") return "string[]";
  if (t === "string[][]") return "string[][]";
  if (t === "boolean") return "boolean";
  if (t === "character") return "string";
  if (t === "character[]") return "string[]";
  return "unknown";
}

/**
 * Build a standalone test.ts that imports the solution and runs each example
 * test case using Bun's built-in test runner.
 */
function buildTestFile(
  fnName: string,
  meta: LCMetaData,
  exampleTestcaseList: string[],
): string {
  const paramTypes = meta.params.map((p) => lcTypeToTs(p.type));
  const returnType = lcTypeToTs(meta.return.type);

  // Parse each test case: each entry in exampleTestcaseList is one arg per line
  const cases = exampleTestcaseList.map((raw, idx) => {
    const lines = raw.trim().split("\n");
    const args = lines.map((line, i) => {
      const tsType = paramTypes[i];
      // Arrays and nested arrays are already JSON-compatible in LeetCode format
      if (tsType?.includes("[]") || line.trim().startsWith("[")) return line.trim();
      // Strings that aren't quoted
      if (tsType === "string" && !line.trim().startsWith('"')) return JSON.stringify(line.trim());
      return line.trim();
    });
    return { idx: idx + 1, args };
  });

  const paramList = meta.params
    .map((p, i) => `${p.name}: ${paramTypes[i]}`)
    .join(", ");

  const caseLines = cases
    .map(({ idx, args }) => {
      const argsStr = args.join(", ");
      return `  test("example ${idx}", () => {
    const result = ${fnName}(${argsStr});
    // TODO: replace with expected output
    expect(result).toEqual(result satisfies ${returnType});
  });`;
    })
    .join("\n\n");

  return `import { describe, test, expect } from "bun:test";
import { ${fnName} } from "./solution";

// Params: (${paramList}) => ${returnType}

describe("${fnName}", () => {
${caseLines}
});
`;
}

function extractTsSnippet(snippets: LCCodeSnippet[]): string {
  return (
    snippets.find((s) => s.langSlug === "typescript")?.code ??
    snippets.find((s) => s.langSlug === "javascript")?.code ??
    DEFAULT_SNIPPET
  );
}

async function createProblem(
  id: number,
  title: string,
  slug: string,
  difficulty: string,
  tags: string[],
  url: string,
  bodyMd: string,
  codeSnippet: string,
  testContent: string | null,
) {
  const dir = `problems/${String(id).padStart(4, "0")}-${slug}`;

  if (existsSync(dir)) {
    console.error(`Directory already exists: ${dir}`);
    process.exit(1);
  }

  const md = buildMarkdown(id, title, slug, difficulty, tags, url, bodyMd, codeSnippet);

  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.md`, md, "utf-8");
  // Prefix top-level function declarations with `export` so test.ts can import them
  const solutionContent = codeSnippet.replace(/^(function\s)/m, "export $1") + "\n";
  await writeFile(`${dir}/solution.ts`, solutionContent, "utf-8");
  if (testContent) await writeFile(`${dir}/solution.test.ts`, testContent, "utf-8");

  console.log(`✓ Created: ${dir}/index.md`);
  console.log(`✓ Created: ${dir}/solution.ts`);
  if (testContent) console.log(`✓ Created: ${dir}/solution.test.ts`);
  console.log(`  Edit solution.ts, then run: bun test ${dir}`);
}

// ─── Entry point ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error(
    "Usage:\n" +
      "  bun run new <leetcode-cn-url>\n" +
      "  bun run new <id> <slug> <title> <difficulty> [tags...]\n\n" +
      "Examples:\n" +
      "  bun run new https://leetcode.com/problems/3sum-closest/\n" +
      '  bun run new 1 two-sum "Two Sum" Easy Array "Hash Table"',
  );
  process.exit(1);
}

// Auto-fetch mode: first arg looks like a URL
if (args[0]!.startsWith("http")) {
  const url = args[0]!.replace(/\/$/, "");
  const match = url.match(/\/problems\/([^/]+)/);
  if (!match) {
    console.error(`Cannot extract problem slug from URL: ${url}`);
    process.exit(1);
  }

  const slug = match[1]!;
  const canonicalUrl = `https://leetcode.com/problems/${slug}/`;

  console.log(`Fetching "${slug}" from LeetCode...`);

  let q: LCQuestion;
  try {
    q = await fetchProblem(slug);
  } catch (err) {
    console.error(`Failed to fetch problem: ${(err as Error).message}`);
    process.exit(1);
  }

  const id = Number(q.questionFrontendId);
  const tags = q.topicTags.map((t) => t.name);
  const bodyMd = q.content
    ? htmlToMarkdown(q.content)
    : "<!-- paste problem description here -->";
  const codeSnippet = extractTsSnippet(q.codeSnippets);
  const testContent = buildTestFromQuestion(q);

  await createProblem(id, q.title, q.titleSlug, q.difficulty, tags, canonicalUrl, bodyMd, codeSnippet, testContent);
} else {
  // Manual mode: bun run new <id> <slug> <title> <difficulty> [tags...]
  const [idStr, slug, title, difficulty, ...tags] = args;

  if (!idStr || !slug || !title || !difficulty) {
    console.error(
      "Usage: bun run new <id> <slug> <title> <difficulty> [tags...]\n" +
        '  bun run new 1 two-sum "Two Sum" Easy Array "Hash Table"',
    );
    process.exit(1);
  }

  const id = Number(idStr);
  const url = `https://leetcode.com/problems/${slug}/`;

  console.log(`Fetching "${slug}" from LeetCode...`);
  let bodyMd = "<!-- paste problem description here -->";
  let codeSnippet = DEFAULT_SNIPPET;
  let testContent: string | null = null;
  try {
    const q = await fetchProblem(slug);
    if (q.content) bodyMd = htmlToMarkdown(q.content);
    codeSnippet = extractTsSnippet(q.codeSnippets);
    testContent = buildTestFromQuestion(q);
  } catch (err) {
    console.warn(`Could not fetch problem content: ${(err as Error).message}`);
    console.warn("Continuing with empty template.");
  }

  await createProblem(id, title, slug, difficulty, tags, url, bodyMd, codeSnippet, testContent);
}
