import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const ROOT = path.join(process.cwd(), "client", "src");

const BANNED_SUBSTRINGS = [
  { pattern: /successfully/i, reason: 'Avoid "successfully"' },
];

const BANNED_STARTERS = [
  { pattern: /^oops\b/i, reason: 'Avoid slang starter "Oops"' },
  { pattern: /^awesome\b/i, reason: 'Avoid slang starter "Awesome"' },
  { pattern: /^yay\b/i, reason: 'Avoid slang starter "Yay"' },
  { pattern: /^congrats\b/i, reason: 'Avoid slang starter "Congrats"' },
  { pattern: /^hey\b/i, reason: 'Avoid slang starter "Hey"' },
];

const BANNED_EXCLAMATION = { pattern: /!/, reason: "Avoid exclamation marks" };

const UI_ATTR_NAMES = new Set([
  "title",
  "aria-label",
  "aria-describedby",
  "placeholder",
  "alt",
  "label",
  "description",
  "helperText",
]);

const IGNORE_ATTR_NAMES = new Set([
  "className",
  "class",
  "id",
  "href",
  "to",
  "src",
  "key",
  "type",
  "name",
  "value",
  "variant",
  "size",
  "data-testid",
]);

function looksLikePureClasses(text: string) {
  if (text.length > 200) return true;
  return /\b(bg-|text-|border-|rounded-|shadow-|flex|grid|px-|py-|p-|m-|w-|h-|min-|max-|items-|justify-|gap-)/.test(
    text,
  );
}

function getJsxAttributeName(attr: ts.JsxAttribute): string | null {
  const { name } = attr;
  if (ts.isIdentifier(name)) return name.text;
  return null;
}

function isUiStringLiteral(node: ts.Node): boolean {
  if (ts.isJsxText(node)) return node.getText().trim().length > 0;

  if (!ts.isStringLiteralLike(node) && !ts.isNoSubstitutionTemplateLiteral(node)) return false;

  const text = node.text.trim();
  if (!text) return false;
  if (looksLikePureClasses(text)) return false;

  const parent = node.parent;

  if (ts.isJsxAttribute(parent)) {
    const name = getJsxAttributeName(parent);
    if (!name) return false;
    if (IGNORE_ATTR_NAMES.has(name)) return false;
    if (UI_ATTR_NAMES.has(name)) return true;
  }

  if (ts.isPropertyAssignment(parent)) {
    const propName = ts.isIdentifier(parent.name)
      ? parent.name.text
      : ts.isStringLiteral(parent.name)
        ? parent.name.text
        : null;
    if (!propName) return false;
    if (propName === "className") return false;
    if (propName === "title" || propName === "description" || propName === "label" || propName === "placeholder") {
      return true;
    }
  }

  if (ts.isJsxExpression(parent)) {
    const grand = parent.parent;
    if (ts.isJsxElement(grand) || ts.isJsxFragment(grand) || ts.isJsxSelfClosingElement(grand)) return true;
  }

  return false;
}

function extractText(node: ts.Node): string | null {
  if (ts.isJsxText(node)) return node.getText().trim();

  if (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;

  if (ts.isTemplateExpression(node)) {
    const parts = [node.head.text, ...node.templateSpans.map((s) => s.literal.text)];
    return parts.join("");
  }

  return null;
}

function findViolations(text: string) {
  const trimmed = text.trim();
  const violations: string[] = [];

  if (BANNED_EXCLAMATION.pattern.test(trimmed)) violations.push(BANNED_EXCLAMATION.reason);

  for (const rule of BANNED_SUBSTRINGS) {
    if (rule.pattern.test(trimmed)) violations.push(rule.reason);
  }

  const firstWord = trimmed.split(/\s+/)[0] ?? "";
  for (const rule of BANNED_STARTERS) {
    if (rule.pattern.test(firstWord)) violations.push(rule.reason);
  }

  return violations;
}

async function listFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(full)));
      continue;
    }
    if (entry.isFile() && (full.endsWith(".ts") || full.endsWith(".tsx"))) {
      files.push(full);
    }
  }
  return files;
}

async function lintFile(filePath: string) {
  const sourceText = await fs.readFile(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.ESNext,
    true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  const findings: Array<{ line: number; text: string; violations: string[] }> = [];

  const visit = (node: ts.Node) => {
    if (isUiStringLiteral(node)) {
      const text = extractText(node);
      if (text) {
        const violations = findViolations(text);
        if (violations.length > 0) {
          const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
          findings.push({
            line: line + 1,
            text: text.replace(/\s+/g, " ").slice(0, 120),
            violations,
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return findings;
}

async function main() {
  const files = await listFiles(ROOT);

  let total = 0;
  for (const filePath of files) {
    const findings = await lintFile(filePath);
    if (findings.length === 0) continue;
    total += findings.length;
    const rel = path.relative(process.cwd(), filePath);
    for (const f of findings) {
      console.log(`${rel}:${f.line} ${f.violations.join(", ")} :: ${JSON.stringify(f.text)}`);
    }
  }

  if (total > 0) {
    console.error(`copy lint failed. violations=${total}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

