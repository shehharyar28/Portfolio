/** Synonym groups — any member maps to the canonical key and related terms. */

export const SYNONYM_GROUPS: string[][] = [
  ["react native", "rn", "react-native", "reactnative"],
  ["mobile apps", "mobile applications", "mobile development", "mobile app", "phone apps", "android apps", "ios apps"],
  ["next.js", "nextjs", "next js", "next"],
  ["react", "react.js", "reactjs"],
  ["artificial intelligence", "ai", "machine learning", "ml", "computer vision"],
  ["ai projects", "ai project", "ai surveillance", "surveillance"],
  ["healthcare", "health care", "hospital", "medical", "clinical"],
  ["logistics", "freight", "shipping", "supply chain", "courier"],
  ["point of sale", "pos", "point-of-sale", "cashier"],
  ["resume", "cv", "curriculum vitae"],
  ["github", "git hub", "gitHub"],
  ["linkedin", "linked in", "linked-in"],
  ["contact", "get in touch", "reach out", "email", "phone"],
  ["web apps", "web applications", "websites", "web projects", "website"],
  ["fastapi", "fast api", "fast-api"],
  ["angular", "angularjs", "angular.js", "ng"],
  ["electron", "electronjs", "desktop exe", "windows exe", "exe"],
  ["costa coffee", "costa", "broadway", "california"],
  ["facilitate", "facilit", "pedro facilit", "facilities management"],
  ["lookclean", "look clean", "look-clean"],
  ["flutter", "dart"],
  ["typescript", "ts"],
  ["javascript", "js"],
  ["firebase", "firestore"],
  ["redux", "redux toolkit", "rtk"],
  ["enterprise", "enterprise software", "enterprise systems"],
  ["backend", "back end", "back-end", "server", "api"],
  ["play store", "google play", "playstore"],
  ["app store", "appstore", "ios store"],
  ["ride sharing", "ride-hailing", "ride hailing", "rideshare", "taxi app"],
  ["ecommerce", "e-commerce", "e commerce", "online store"],
  ["ridelynk", "ride lynk", "ride-lynk", "ridelink", "ride link"],
  ["ridelynk rider", "ride lynk rider", "ridelink rider", "rider app"],
  ["qbid", "q-bid", "q bid"],
  ["mbn", "mbn app", "mbnapp"],
  ["loadnavigator", "load navigator", "load-navigator"],
  ["disc music", "discmusic", "disc-music", "music app", "music streaming"],
  ["youarehere", "you are here", "you-are-here", "travel app"],
];

/** Expand a normalized token/phrase into all synonym relatives. */
export function expandSynonyms(normalized: string): Set<string> {
  const out = new Set<string>([normalized]);
  for (const group of SYNONYM_GROUPS) {
    const hit = group.some(
      (term) => normalized.includes(term) || term.includes(normalized),
    );
    if (hit) {
      for (const term of group) out.add(term);
    }
  }
  return out;
}

/** Map of phrase → all synonyms for quick lookup during scoring. */
export function getSynonymBoostTerms(query: string): string[] {
  const terms = new Set<string>();
  for (const group of SYNONYM_GROUPS) {
    if (group.some((term) => query.includes(term))) {
      for (const term of group) terms.add(term);
    }
  }
  return [...terms];
}
