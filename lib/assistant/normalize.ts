/** Text normalization utilities for intelligent search. */

const PUNCTUATION_RE = /[^\p{L}\p{N}\s]/gu;

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(PUNCTUATION_RE, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(input: string): string[] {
  const n = normalize(input);
  if (!n) return [];
  return n.split(" ").filter((t) => t.length > 1 || /^\d+$/.test(t));
}

/** Simple Levenshtein distance for fuzzy token similarity. */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const prev = new Array(b.length + 1);
  const curr = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

/** Similarity score 0–1 based on Levenshtein. */
export function tokenSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a || !b) return 0;
  // Prefix / contains boosts
  if (a.includes(b) || b.includes(a)) {
    const shorter = Math.min(a.length, b.length);
    const longer = Math.max(a.length, b.length);
    return 0.75 + (shorter / longer) * 0.2;
  }
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  // Skip expensive compare for very different lengths
  if (Math.abs(a.length - b.length) > 3 && maxLen > 5) return 0;
  const dist = levenshtein(a, b);
  const sim = 1 - dist / maxLen;
  return sim >= 0.72 ? sim : 0;
}
