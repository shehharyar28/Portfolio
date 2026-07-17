import { knowledge } from "@/data/knowledge";
import type {
  AssistantResponse,
  ConversationMemory,
  KnowledgeEntry,
} from "@/data/types";
import {
  enrichQueryWithMemory,
  updateMemoryFromMatch,
} from "./memory";
import { normalize } from "./normalize";
import { getBestEntry, searchKnowledge } from "./search";

function projectRefsFromIds(ids: string[] = []) {
  return ids
    .map((id) => knowledge.projects.find((p) => p.id === id))
    .filter(Boolean)
    .map((p) => ({ id: p!.id, name: p!.name }));
}

function formatAnswer(entry: KnowledgeEntry): AssistantResponse {
  return {
    text: entry.content,
    technologies: entry.technologies,
    projectRefs: projectRefsFromIds(entry.projectIds),
    actions: entry.actions,
    matchedEntryIds: [entry.id],
  };
}

function notFoundResponse(): AssistantResponse {
  return {
    text: "I couldn't find that information in Baber's portfolio. That detail hasn't been added yet — try asking about his React Native work, logistics projects, AI surveillance, POS software, or how to contact him.",
    matchedEntryIds: [],
    actions: [
      { type: "scroll_projects", label: "View Projects", targetId: "projects" },
      { type: "scroll_contact", label: "Contact", targetId: "contact" },
    ],
  };
}

/** Resolve pronoun / comparative follow-ups using memory. */
function handleFollowUp(
  query: string,
  memory: ConversationMemory,
): AssistantResponse | null {
  const q = normalize(query);

  if (/\b(biggest|largest|main|flagship|most important)\b/.test(q)) {
    const ids = memory.lastProjectIds;
    if (ids.length) {
      const projects = ids
        .map((id) => knowledge.projects.find((p) => p.id === id))
        .filter(Boolean);
      const featured =
        projects.find((p) => p!.featured) ??
        projects[0] ??
        knowledge.projects.find((p) => p.featured);
      if (featured) {
        return {
          text: `Among the related work, ${featured.name} stands out as one of Baber's strongest showcases. ${featured.description}`,
          technologies: featured.technologies,
          projectRefs: [{ id: featured.id, name: featured.name }],
          matchedEntryIds: [`project-${featured.id}`],
          actions: featured.liveUrl
            ? [
                {
                  type: "open_external",
                  label: `Open ${featured.name}`,
                  href: featured.liveUrl,
                },
              ]
            : featured.playStoreUrl
              ? [
                  {
                    type: "open_external",
                    label: "Open on Play Store",
                    href: featured.playStoreUrl,
                  },
                ]
              : [{ type: "scroll_projects", label: "View Projects", targetId: "projects" }],
        };
      }
    }
  }

  if (/\bhow many\b/.test(q) && memory.lastTechnologies.length) {
    const tech = memory.lastTechnologies[0];
    if (/react native|rn|mobile/i.test(tech) || memory.lastTopics.includes("react-native")) {
      const best = getBestEntry("how many apps published react native");
      if (best) return formatAnswer(best.entry);
    }
  }

  if (
    /\b(apps?|projects?|ones?)\b/.test(q) &&
    memory.lastProjectIds.length &&
    q.length < 40
  ) {
    const names = memory.lastProjectIds
      .map((id) => knowledge.projects.find((p) => p.id === id)?.name)
      .filter(Boolean);
    if (names.length) {
      return {
        text: `Continuing from that context — Baber's related projects include ${names.join(", ")}. He has shipped commercial work across mobile and web in those areas.`,
        projectRefs: projectRefsFromIds(memory.lastProjectIds),
        matchedEntryIds: memory.lastTopics,
        actions: [
          { type: "scroll_projects", label: "View Projects", targetId: "projects" },
        ],
      };
    }
  }

  return null;
}

export interface GenerateResult {
  response: AssistantResponse;
  memory: ConversationMemory;
}

export function generateResponse(
  rawQuery: string,
  memory: ConversationMemory,
): GenerateResult {
  const followUp = handleFollowUp(rawQuery, memory);
  if (followUp) {
    const nextMemory = updateMemoryFromMatch(memory, {
      entryIds: followUp.matchedEntryIds,
      projectIds: followUp.projectRefs?.map((p) => p.id),
      technologies: followUp.technologies,
    });
    return { response: followUp, memory: nextMemory };
  }

  const enriched = enrichQueryWithMemory(rawQuery, memory);
  const results = searchKnowledge(enriched, memory.lastTopics, 4);
  const best = results[0];

  if (!best || best.score < 14) {
    return { response: notFoundResponse(), memory };
  }

  // Merge secondary tech/project hints from near ties
  const response = formatAnswer(best.entry);
  const near = results.filter((r) => r.score >= best.score * 0.85).slice(0, 3);
  const tech = new Set(response.technologies ?? []);
  const projects = new Set(response.projectRefs?.map((p) => p.id) ?? []);
  for (const r of near) {
    r.entry.technologies?.forEach((t) => tech.add(t));
    r.entry.projectIds?.forEach((id) => projects.add(id));
  }
  response.technologies = tech.size ? [...tech].slice(0, 8) : undefined;
  response.projectRefs = projectRefsFromIds([...projects]).slice(0, 5);
  response.matchedEntryIds = near.map((r) => r.entry.id);

  const nextMemory = updateMemoryFromMatch(memory, {
    entryIds: response.matchedEntryIds,
    projectIds: response.projectRefs?.map((p) => p.id),
    technologies: response.technologies,
    category: best.entry.category,
  });

  return { response, memory: nextMemory };
}
