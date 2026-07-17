import type { ConversationMemory, ConversationTurn } from "@/data/types";

const PRONOUN_RE =
  /\b(it|that|this|those|these|them|they|one|ones|the biggest|the largest|the main one|how many|which one|what about)\b/i;

export function createMemory(): ConversationMemory {
  return {
    turns: [],
    lastTopics: [],
    lastProjectIds: [],
    lastTechnologies: [],
  };
}

export function pushTurn(
  memory: ConversationMemory,
  role: ConversationTurn["role"],
  content: string,
): ConversationMemory {
  return {
    ...memory,
    turns: [...memory.turns, { role, content, timestamp: Date.now() }].slice(
      -20,
    ),
  };
}

export function updateMemoryFromMatch(
  memory: ConversationMemory,
  opts: {
    entryIds: string[];
    projectIds?: string[];
    technologies?: string[];
    category?: string;
  },
): ConversationMemory {
  return {
    ...memory,
    lastTopics: opts.entryIds.slice(0, 5),
    lastProjectIds: opts.projectIds?.length
      ? opts.projectIds
      : memory.lastProjectIds,
    lastTechnologies: opts.technologies?.length
      ? opts.technologies
      : memory.lastTechnologies,
    lastCategory: opts.category ?? memory.lastCategory,
  };
}

/** Detect follow-up questions that need prior context. */
export function needsContext(query: string): boolean {
  const q = query.trim();
  if (q.length < 28 && PRONOUN_RE.test(q)) return true;
  if (/^(and|also|what about|how many|which)\b/i.test(q)) return true;
  return false;
}

/** Enrich a follow-up query with remembered topics for better search. */
export function enrichQueryWithMemory(
  query: string,
  memory: ConversationMemory,
): string {
  if (!needsContext(query)) return query;

  const hints: string[] = [];
  if (memory.lastCategory) hints.push(memory.lastCategory);
  if (memory.lastTechnologies[0]) hints.push(memory.lastTechnologies[0]);
  if (memory.lastTopics[0]) hints.push(memory.lastTopics[0].replace(/-/g, " "));

  // Pull last user topical question for context
  const lastUser = [...memory.turns]
    .reverse()
    .find((t) => t.role === "user" && !needsContext(t.content));
  if (lastUser) hints.push(lastUser.content);

  if (!hints.length) return query;
  return `${query} (context: ${hints.slice(0, 3).join(", ")})`;
}
