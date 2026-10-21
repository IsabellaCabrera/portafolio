/**
 * Tolerant parser for the plain-text experience/passion files in /public/content.
 * Never throws; empty or malformed input yields an empty list.
 *
 * Accepted per block (labels in English or Spanish, all optional, any order):
 *   Role: / Cargo: / Rol: / Puesto:
 *   Company: / Empresa:
 *   Period: / Periodo: / Fecha:
 *   Description: / Descripción: / Resumen:   (continuation lines append)
 *   - bullet lines = highlights                (Highlights: / Logros:)
 *   Tags: / Tecnologías: / Stack:             (comma or semicolon separated)
 * Blocks are separated by a line of "---" (or by blank lines when the file has no "---").
 *
 * Unlabeled fallbacks per block:
 *   "2022 • The Motion Beginning" / "• FASHION & SILHOUETTES"  → period + role (portfolio files)
 *   line 1 = role, line 2 = "Company · 2022 – 2024", rest = description
 *   A first single-line block without a period (e.g. "MY JOURNEY | STORYLINE") is the eyebrow.
 */

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface ParsedExperienceFile {
  eyebrow: string | null;
  items: Experience[];
}

export interface NavItem {
  id: string;
  label: string;
  description: string;
  marker?: string;
}

const LABELS: Record<string, keyof Omit<Experience, "id"> | "highlights"> = {
  role: "role",
  cargo: "role",
  rol: "role",
  puesto: "role",
  company: "company",
  empresa: "company",
  period: "period",
  periodo: "period",
  período: "period",
  fecha: "period",
  description: "description",
  descripción: "description",
  descripcion: "description",
  resumen: "description",
  highlights: "highlights",
  logros: "highlights",
  tags: "tags",
  tecnologías: "tags",
  tecnologias: "tags",
  stack: "tags",
};

/** Company/period separators: middle dot, pipe, em dash (never en dash or hyphen). */
const COMPANY_PERIOD_SEP = /\s*(?:·|\||—)\s*/;
/** Header "2022 • Title" or "• Title" (bullet U+2022). */
const BULLET_HEADER = /^(.*?)\s*•\s*(.+)$/;
const BULLET_LINE = /^\s*(?:[-*]|–)\s+(.+)$/;
const LOOKS_LIKE_PERIOD = /(\d{4}|present|presente|actual|hoy|now)/i;

function slug(value: string, index: number): string {
  const base = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return `${base || "item"}-${index}`;
}

function splitBlocks(text: string): string[][] {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const hasRule = lines.some((l) => /^\s*-{3,}\s*$/.test(l));
  const blocks: string[][] = [];
  let current: string[] = [];
  const flush = () => {
    const trimmed = current.map((l) => l.trim()).filter(Boolean);
    if (trimmed.length) blocks.push(trimmed);
    current = [];
  };
  for (const line of lines) {
    if (hasRule ? /^\s*-{3,}\s*$/.test(line) : line.trim() === "") flush();
    else current.push(line);
  }
  flush();
  return blocks;
}

function parseBlock(lines: string[], index: number): Experience | null {
  const exp: Experience = { id: "", role: "", company: "", period: "", description: "", highlights: [], tags: [] };
  let lastField: keyof Experience | null = null;
  const unlabeled: string[] = [];

  for (const line of lines) {
    const labelMatch = /^([\p{L}]+)\s*:\s*(.*)$/u.exec(line);
    const field = labelMatch ? LABELS[labelMatch[1]!.toLowerCase()] : undefined;
    if (labelMatch && field) {
      const value = labelMatch[2]!.trim();
      if (field === "tags") exp.tags = value.split(/[,;]/).map((t) => t.trim()).filter(Boolean);
      else if (field === "highlights") {
        if (value) exp.highlights.push(value);
      } else exp[field] = value;
      lastField = field;
      continue;
    }
    const bullet = BULLET_LINE.exec(line);
    if (bullet) {
      exp.highlights.push(bullet[1]!.trim());
      lastField = "highlights";
      continue;
    }
    if (lastField === "description") {
      exp.description = `${exp.description} ${line}`.trim();
      continue;
    }
    unlabeled.push(line);
  }

  if (unlabeled.length) {
    const [first = "", ...rest] = unlabeled;
    const header = BULLET_HEADER.exec(first);
    if (!exp.role && header && (header[1] === "" || LOOKS_LIKE_PERIOD.test(header[1]!))) {
      // "2022 • Title" / "• TITLE"
      if (!exp.period) exp.period = header[1]!.trim();
      exp.role = header[2]!.trim();
    } else if (!exp.role) {
      exp.role = first;
      const second = rest[0];
      if (second && !exp.company && COMPANY_PERIOD_SEP.test(second) && LOOKS_LIKE_PERIOD.test(second)) {
        const parts = second.split(COMPANY_PERIOD_SEP);
        exp.company = (parts.shift() ?? "").trim();
        if (!exp.period) exp.period = parts.join(" ").trim();
        rest.shift();
      }
    } else {
      rest.unshift(first);
    }
    if (rest.length) exp.description = [exp.description, ...rest].filter(Boolean).join(" ").trim();
  }

  if (!exp.role && !exp.description) return null;
  exp.id = slug(exp.role || exp.description, index);
  return exp;
}

export function parseExperienceFile(text: unknown): ParsedExperienceFile {
  try {
    if (typeof text !== "string" || !text.trim()) return { eyebrow: null, items: [] };
    const blocks = splitBlocks(text);
    let eyebrow: string | null = null;
    const first = blocks[0];
    if (first && first.length === 1 && !BULLET_HEADER.test(first[0]!) && !/:/.test(first[0]!)) {
      eyebrow = first[0]!;
      blocks.shift();
    }
    const items: Experience[] = [];
    blocks.forEach((block, i) => {
      try {
        const exp = parseBlock(block, i);
        if (exp) items.push(exp);
      } catch {
        /* skip malformed block */
      }
    });
    return { eyebrow, items };
  } catch {
    return { eyebrow: null, items: [] };
  }
}

export function parseExperiences(text: unknown): Experience[] {
  return parseExperienceFile(text).items;
}

/** Start year of a period such as "2025 - 2026" or "Aug 2025"; falls back to the period text. */
export function startYear(period: string): string {
  return /\d{4}/.exec(period)?.[0] ?? period;
}

export function toNavItems(experiences: Experience[], marker: "index" | "year" = "index"): NavItem[] {
  return experiences.map((e, i) => ({
    id: e.id,
    label: e.role,
    description: [e.company, e.period].filter(Boolean).join(" · "),
    marker: marker === "year" ? startYear(e.period) : String(i).padStart(2, "0"),
  }));
}
