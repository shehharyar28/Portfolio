import { knowledge } from "@/data/knowledge";
import type { KnowledgeEntry, SearchResult } from "@/data/types";
import { normalize, tokenize, tokenSimilarity } from "./normalize";
import { expandSynonyms, getSynonymBoostTerms } from "./synonyms";

function scoreEntry(query: string, tokens: string[], entry: KnowledgeEntry): number {
  const haystack = normalize(
    [
      entry.title,
      entry.content,
      entry.category,
      ...(entry.keywords ?? []),
      ...(entry.aliases ?? []),
      ...(entry.technologies ?? []),
    ].join(" "),
  );

  let score = 0;
  const synonymTerms = getSynonymBoostTerms(query);

  // Exact / phrase matches
  if (haystack.includes(query) && query.length > 2) {
    score += 40;
  }

  for (const alias of entry.aliases ?? []) {
    const na = normalize(alias);
    if (query.includes(na) || na.includes(query)) score += 35;
    else if (tokenSimilarity(query, na) > 0.85) score += 25;
  }

  for (const kw of entry.keywords) {
    const nk = normalize(kw);
    if (query.includes(nk)) score += 18;
    else if (haystack.includes(nk) && tokens.some((t) => nk.includes(t))) {
      score += 8;
    }
  }

  // Synonym boosts
  for (const syn of synonymTerms) {
    if (haystack.includes(syn)) score += 14;
  }

  // Fuzzy token overlap
  const entryTokens = new Set(tokenize(haystack));
  for (const token of tokens) {
    const expanded = expandSynonyms(token);
    let best = 0;
    for (const et of entryTokens) {
      for (const candidate of expanded) {
        best = Math.max(best, tokenSimilarity(candidate, et));
      }
    }
    if (best >= 0.95) score += 12;
    else if (best >= 0.8) score += 7;
    else if (best >= 0.72) score += 3;
  }

  // Priority weight
  score += (entry.priority ?? 5) * 0.5;

  return score;
}

export function searchKnowledge(
  rawQuery: string,
  boostEntryIds: string[] = [],
  limit = 5,
): SearchResult[] {
  const query = normalize(rawQuery);
  if (!query) return [];

  const tokens = tokenize(query);
  const boostSet = new Set(boostEntryIds);

  const scored: SearchResult[] = knowledge.entries.map((entry) => {
    let score = scoreEntry(query, tokens, entry);
    if (boostSet.has(entry.id)) score += 15;
    // Soft boost related project entries if topic ids overlap
    if (
      entry.projectIds?.some((pid) =>
        boostEntryIds.some((b) => b.includes(pid) || pid.includes(b)),
      )
    ) {
      score += 8;
    }
    return { entry, score };
  });

  return scored
    .filter((r) => r.score >= 12)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getBestEntry(
  query: string,
  boostEntryIds: string[] = [],
): SearchResult | null {
  const results = searchKnowledge(query, boostEntryIds, 3);
  return results[0] ?? null;
}
