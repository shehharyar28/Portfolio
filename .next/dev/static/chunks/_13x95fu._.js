(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/assistant/actions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoExecuteFromIntent",
    ()=>autoExecuteFromIntent,
    "executeAction",
    ()=>executeAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/knowledge.ts [app-client] (ecmascript)");
;
function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
function highlightSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("assistant-highlight");
    scrollToId(id);
    window.setTimeout(()=>{
        el.classList.remove("assistant-highlight");
    }, 2600);
}
function downloadResume() {
    const { path, fileName } = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["knowledge"].resume;
    const a = document.createElement("a");
    a.href = path;
    a.download = fileName;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
}
function openUrl(url) {
    window.open(url, "_blank", "noopener,noreferrer");
}
function executeAction(action) {
    switch(action.type){
        case "download_resume":
            downloadResume();
            break;
        case "scroll_projects":
            scrollToId(action.targetId ?? "projects");
            break;
        case "scroll_mobile":
            scrollToId(action.targetId ?? "mobile");
            break;
        case "scroll_web":
            scrollToId(action.targetId ?? "web");
            break;
        case "scroll_ai":
            scrollToId(action.targetId ?? "ai");
            break;
        case "scroll_healthcare":
            scrollToId(action.targetId ?? "healthcare");
            break;
        case "scroll_logistics":
            scrollToId(action.targetId ?? "logistics");
            break;
        case "scroll_contact":
            scrollToId(action.targetId ?? "contact");
            break;
        case "highlight_logistics":
            highlightSection(action.targetId ?? "logistics");
            break;
        case "highlight_ai":
            highlightSection(action.targetId ?? "ai");
            break;
        case "highlight_healthcare":
            highlightSection(action.targetId ?? "healthcare");
            break;
        case "open_github":
            openUrl(action.href ?? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["knowledge"].social.github);
            break;
        case "open_linkedin":
            openUrl(action.href ?? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["knowledge"].social.linkedin);
            break;
        case "open_play_store":
        case "open_external":
            if (action.href) openUrl(action.href);
            break;
        default:
            break;
    }
}
function autoExecuteFromIntent(query, actions) {
    const q = query.toLowerCase();
    const shouldAuto = /download|open|show|view|go to|navigate|scroll|contact|github|linkedin|cv|resume/.test(q);
    if (!shouldAuto || !actions?.length) return;
    const primary = actions[0];
    // Small delay so the user sees the answer first
    window.setTimeout(()=>executeAction(primary), 450);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/assistant/memory.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createMemory",
    ()=>createMemory,
    "enrichQueryWithMemory",
    ()=>enrichQueryWithMemory,
    "needsContext",
    ()=>needsContext,
    "pushTurn",
    ()=>pushTurn,
    "updateMemoryFromMatch",
    ()=>updateMemoryFromMatch
]);
const PRONOUN_RE = /\b(it|that|this|those|these|them|they|one|ones|the biggest|the largest|the main one|how many|which one|what about)\b/i;
function createMemory() {
    return {
        turns: [],
        lastTopics: [],
        lastProjectIds: [],
        lastTechnologies: []
    };
}
function pushTurn(memory, role, content) {
    return {
        ...memory,
        turns: [
            ...memory.turns,
            {
                role,
                content,
                timestamp: Date.now()
            }
        ].slice(-20)
    };
}
function updateMemoryFromMatch(memory, opts) {
    return {
        ...memory,
        lastTopics: opts.entryIds.slice(0, 5),
        lastProjectIds: opts.projectIds?.length ? opts.projectIds : memory.lastProjectIds,
        lastTechnologies: opts.technologies?.length ? opts.technologies : memory.lastTechnologies,
        lastCategory: opts.category ?? memory.lastCategory
    };
}
function needsContext(query) {
    const q = query.trim();
    if (q.length < 28 && PRONOUN_RE.test(q)) return true;
    if (/^(and|also|what about|how many|which)\b/i.test(q)) return true;
    return false;
}
function enrichQueryWithMemory(query, memory) {
    if (!needsContext(query)) return query;
    const hints = [];
    if (memory.lastCategory) hints.push(memory.lastCategory);
    if (memory.lastTechnologies[0]) hints.push(memory.lastTechnologies[0]);
    if (memory.lastTopics[0]) hints.push(memory.lastTopics[0].replace(/-/g, " "));
    // Pull last user topical question for context
    const lastUser = [
        ...memory.turns
    ].reverse().find((t)=>t.role === "user" && !needsContext(t.content));
    if (lastUser) hints.push(lastUser.content);
    if (!hints.length) return query;
    return `${query} (context: ${hints.slice(0, 3).join(", ")})`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/assistant/normalize.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "levenshtein",
    ()=>levenshtein,
    "normalize",
    ()=>normalize,
    "tokenSimilarity",
    ()=>tokenSimilarity,
    "tokenize",
    ()=>tokenize
]);
/** Text normalization utilities for intelligent search. */ const PUNCTUATION_RE = /[^\p{L}\p{N}\s]/gu;
function normalize(input) {
    return input.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(PUNCTUATION_RE, " ").replace(/\s+/g, " ").trim();
}
function tokenize(input) {
    const n = normalize(input);
    if (!n) return [];
    return n.split(" ").filter((t)=>t.length > 1 || /^\d+$/.test(t));
}
function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const prev = new Array(b.length + 1);
    const curr = new Array(b.length + 1);
    for(let j = 0; j <= b.length; j++)prev[j] = j;
    for(let i = 1; i <= a.length; i++){
        curr[0] = i;
        for(let j = 1; j <= b.length; j++){
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j] + cost);
        }
        for(let j = 0; j <= b.length; j++)prev[j] = curr[j];
    }
    return prev[b.length];
}
function tokenSimilarity(a, b) {
    if (a === b) return 1;
    if (!a || !b) return 0;
    // Prefix / contains boosts
    if (a.includes(b) || b.includes(a)) {
        const shorter = Math.min(a.length, b.length);
        const longer = Math.max(a.length, b.length);
        return 0.75 + shorter / longer * 0.2;
    }
    const maxLen = Math.max(a.length, b.length);
    if (maxLen === 0) return 1;
    // Skip expensive compare for very different lengths
    if (Math.abs(a.length - b.length) > 3 && maxLen > 5) return 0;
    const dist = levenshtein(a, b);
    const sim = 1 - dist / maxLen;
    return sim >= 0.72 ? sim : 0;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/assistant/synonyms.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Synonym groups — any member maps to the canonical key and related terms. */ __turbopack_context__.s([
    "SYNONYM_GROUPS",
    ()=>SYNONYM_GROUPS,
    "expandSynonyms",
    ()=>expandSynonyms,
    "getSynonymBoostTerms",
    ()=>getSynonymBoostTerms
]);
const SYNONYM_GROUPS = [
    [
        "react native",
        "rn",
        "react-native",
        "reactnative"
    ],
    [
        "mobile apps",
        "mobile applications",
        "mobile development",
        "mobile app",
        "phone apps",
        "android apps",
        "ios apps"
    ],
    [
        "next.js",
        "nextjs",
        "next js",
        "next"
    ],
    [
        "react",
        "react.js",
        "reactjs"
    ],
    [
        "artificial intelligence",
        "ai",
        "machine learning",
        "ml",
        "computer vision"
    ],
    [
        "ai projects",
        "ai project",
        "ai surveillance",
        "surveillance"
    ],
    [
        "healthcare",
        "health care",
        "hospital",
        "medical",
        "clinical"
    ],
    [
        "logistics",
        "freight",
        "shipping",
        "supply chain",
        "courier"
    ],
    [
        "point of sale",
        "pos",
        "point-of-sale",
        "cashier"
    ],
    [
        "resume",
        "cv",
        "curriculum vitae"
    ],
    [
        "github",
        "git hub",
        "gitHub"
    ],
    [
        "linkedin",
        "linked in",
        "linked-in"
    ],
    [
        "contact",
        "get in touch",
        "reach out",
        "email",
        "phone"
    ],
    [
        "web apps",
        "web applications",
        "websites",
        "web projects",
        "website"
    ],
    [
        "fastapi",
        "fast api",
        "fast-api"
    ],
    [
        "angular",
        "angularjs",
        "angular.js",
        "ng"
    ],
    [
        "electron",
        "electronjs",
        "desktop exe",
        "windows exe",
        "exe"
    ],
    [
        "costa coffee",
        "costa",
        "broadway",
        "california"
    ],
    [
        "facilitate",
        "facilit",
        "pedro facilit",
        "facilities management"
    ],
    [
        "lookclean",
        "look clean",
        "look-clean"
    ],
    [
        "flutter",
        "dart"
    ],
    [
        "typescript",
        "ts"
    ],
    [
        "javascript",
        "js"
    ],
    [
        "firebase",
        "firestore"
    ],
    [
        "redux",
        "redux toolkit",
        "rtk"
    ],
    [
        "enterprise",
        "enterprise software",
        "enterprise systems"
    ],
    [
        "backend",
        "back end",
        "back-end",
        "server",
        "api"
    ],
    [
        "play store",
        "google play",
        "playstore"
    ],
    [
        "app store",
        "appstore",
        "ios store"
    ],
    [
        "ride sharing",
        "ride-hailing",
        "ride hailing",
        "rideshare",
        "taxi app"
    ],
    [
        "ecommerce",
        "e-commerce",
        "e commerce",
        "online store"
    ],
    [
        "ridelynk",
        "ride lynk",
        "ride-lynk",
        "ridelink",
        "ride link"
    ],
    [
        "ridelynk rider",
        "ride lynk rider",
        "ridelink rider",
        "rider app"
    ],
    [
        "qbid",
        "q-bid",
        "q bid"
    ],
    [
        "mbn",
        "mbn app",
        "mbnapp"
    ],
    [
        "loadnavigator",
        "load navigator",
        "load-navigator"
    ],
    [
        "disc music",
        "discmusic",
        "disc-music",
        "music app",
        "music streaming"
    ],
    [
        "youarehere",
        "you are here",
        "you-are-here",
        "travel app"
    ]
];
function expandSynonyms(normalized) {
    const out = new Set([
        normalized
    ]);
    for (const group of SYNONYM_GROUPS){
        const hit = group.some((term)=>normalized.includes(term) || term.includes(normalized));
        if (hit) {
            for (const term of group)out.add(term);
        }
    }
    return out;
}
function getSynonymBoostTerms(query) {
    const terms = new Set();
    for (const group of SYNONYM_GROUPS){
        if (group.some((term)=>query.includes(term))) {
            for (const term of group)terms.add(term);
        }
    }
    return [
        ...terms
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/assistant/search.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBestEntry",
    ()=>getBestEntry,
    "searchKnowledge",
    ()=>searchKnowledge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/knowledge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assistant/normalize.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$synonyms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assistant/synonyms.ts [app-client] (ecmascript)");
;
;
;
function scoreEntry(query, tokens, entry) {
    const haystack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])([
        entry.title,
        entry.content,
        entry.category,
        ...entry.keywords ?? [],
        ...entry.aliases ?? [],
        ...entry.technologies ?? []
    ].join(" "));
    let score = 0;
    const synonymTerms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$synonyms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSynonymBoostTerms"])(query);
    // Exact / phrase matches
    if (haystack.includes(query) && query.length > 2) {
        score += 40;
    }
    for (const alias of entry.aliases ?? []){
        const na = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(alias);
        if (query.includes(na) || na.includes(query)) score += 35;
        else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenSimilarity"])(query, na) > 0.85) score += 25;
    }
    for (const kw of entry.keywords){
        const nk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(kw);
        if (query.includes(nk)) score += 18;
        else if (haystack.includes(nk) && tokens.some((t)=>nk.includes(t))) {
            score += 8;
        }
    }
    // Synonym boosts
    for (const syn of synonymTerms){
        if (haystack.includes(syn)) score += 14;
    }
    // Fuzzy token overlap
    const entryTokens = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenize"])(haystack));
    for (const token of tokens){
        const expanded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$synonyms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandSynonyms"])(token);
        let best = 0;
        for (const et of entryTokens){
            for (const candidate of expanded){
                best = Math.max(best, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenSimilarity"])(candidate, et));
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
function searchKnowledge(rawQuery, boostEntryIds = [], limit = 5) {
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(rawQuery);
    if (!query) return [];
    const tokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tokenize"])(query);
    const boostSet = new Set(boostEntryIds);
    const scored = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["knowledge"].entries.map((entry)=>{
        let score = scoreEntry(query, tokens, entry);
        if (boostSet.has(entry.id)) score += 15;
        // Soft boost related project entries if topic ids overlap
        if (entry.projectIds?.some((pid)=>boostEntryIds.some((b)=>b.includes(pid) || pid.includes(b)))) {
            score += 8;
        }
        return {
            entry,
            score
        };
    });
    return scored.filter((r)=>r.score >= 12).sort((a, b)=>b.score - a.score).slice(0, limit);
}
function getBestEntry(query, boostEntryIds = []) {
    const results = searchKnowledge(query, boostEntryIds, 3);
    return results[0] ?? null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/assistant/respond.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateResponse",
    ()=>generateResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/knowledge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$memory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assistant/memory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assistant/normalize.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$search$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assistant/search.ts [app-client] (ecmascript)");
;
;
;
;
function projectRefsFromIds(ids = []) {
    return ids.map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["knowledge"].projects.find((p)=>p.id === id)).filter(Boolean).map((p)=>({
            id: p.id,
            name: p.name
        }));
}
function formatAnswer(entry) {
    return {
        text: entry.content,
        technologies: entry.technologies,
        projectRefs: projectRefsFromIds(entry.projectIds),
        actions: entry.actions,
        matchedEntryIds: [
            entry.id
        ]
    };
}
function notFoundResponse() {
    return {
        text: "I couldn't find that information in Baber's portfolio. That detail hasn't been added yet — try asking about his React Native work, logistics projects, AI surveillance, POS software, or how to contact him.",
        matchedEntryIds: [],
        actions: [
            {
                type: "scroll_projects",
                label: "View Projects",
                targetId: "projects"
            },
            {
                type: "scroll_contact",
                label: "Contact",
                targetId: "contact"
            }
        ]
    };
}
/** Resolve pronoun / comparative follow-ups using memory. */ function handleFollowUp(query, memory) {
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$normalize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(query);
    if (/\b(biggest|largest|main|flagship|most important)\b/.test(q)) {
        const ids = memory.lastProjectIds;
        if (ids.length) {
            const projects = ids.map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["knowledge"].projects.find((p)=>p.id === id)).filter(Boolean);
            const featured = projects.find((p)=>p.featured) ?? projects[0] ?? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["knowledge"].projects.find((p)=>p.featured);
            if (featured) {
                return {
                    text: `Among the related work, ${featured.name} stands out as one of Baber's strongest showcases. ${featured.description}`,
                    technologies: featured.technologies,
                    projectRefs: [
                        {
                            id: featured.id,
                            name: featured.name
                        }
                    ],
                    matchedEntryIds: [
                        `project-${featured.id}`
                    ],
                    actions: featured.liveUrl ? [
                        {
                            type: "open_external",
                            label: `Open ${featured.name}`,
                            href: featured.liveUrl
                        }
                    ] : featured.playStoreUrl ? [
                        {
                            type: "open_external",
                            label: "Open on Play Store",
                            href: featured.playStoreUrl
                        }
                    ] : [
                        {
                            type: "scroll_projects",
                            label: "View Projects",
                            targetId: "projects"
                        }
                    ]
                };
            }
        }
    }
    if (/\bhow many\b/.test(q) && memory.lastTechnologies.length) {
        const tech = memory.lastTechnologies[0];
        if (/react native|rn|mobile/i.test(tech) || memory.lastTopics.includes("react-native")) {
            const best = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$search$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBestEntry"])("how many apps published react native");
            if (best) return formatAnswer(best.entry);
        }
    }
    if (/\b(apps?|projects?|ones?)\b/.test(q) && memory.lastProjectIds.length && q.length < 40) {
        const names = memory.lastProjectIds.map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["knowledge"].projects.find((p)=>p.id === id)?.name).filter(Boolean);
        if (names.length) {
            return {
                text: `Continuing from that context — Baber's related projects include ${names.join(", ")}. He has shipped commercial work across mobile and web in those areas.`,
                projectRefs: projectRefsFromIds(memory.lastProjectIds),
                matchedEntryIds: memory.lastTopics,
                actions: [
                    {
                        type: "scroll_projects",
                        label: "View Projects",
                        targetId: "projects"
                    }
                ]
            };
        }
    }
    return null;
}
function generateResponse(rawQuery, memory) {
    const followUp = handleFollowUp(rawQuery, memory);
    if (followUp) {
        const nextMemory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$memory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMemoryFromMatch"])(memory, {
            entryIds: followUp.matchedEntryIds,
            projectIds: followUp.projectRefs?.map((p)=>p.id),
            technologies: followUp.technologies
        });
        return {
            response: followUp,
            memory: nextMemory
        };
    }
    const enriched = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$memory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enrichQueryWithMemory"])(rawQuery, memory);
    const results = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$search$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchKnowledge"])(enriched, memory.lastTopics, 4);
    const best = results[0];
    if (!best || best.score < 14) {
        return {
            response: notFoundResponse(),
            memory
        };
    }
    // Merge secondary tech/project hints from near ties
    const response = formatAnswer(best.entry);
    const near = results.filter((r)=>r.score >= best.score * 0.85).slice(0, 3);
    const tech = new Set(response.technologies ?? []);
    const projects = new Set(response.projectRefs?.map((p)=>p.id) ?? []);
    for (const r of near){
        r.entry.technologies?.forEach((t)=>tech.add(t));
        r.entry.projectIds?.forEach((id)=>projects.add(id));
    }
    response.technologies = tech.size ? [
        ...tech
    ].slice(0, 8) : undefined;
    response.projectRefs = projectRefsFromIds([
        ...projects
    ]).slice(0, 5);
    response.matchedEntryIds = near.map((r)=>r.entry.id);
    const nextMemory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$memory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMemoryFromMatch"])(memory, {
        entryIds: response.matchedEntryIds,
        projectIds: response.projectRefs?.map((p)=>p.id),
        technologies: response.technologies,
        category: best.entry.category
    });
    return {
        response,
        memory: nextMemory
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/context/AssistantContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantProvider",
    ()=>AssistantProvider,
    "useAssistant",
    ()=>useAssistant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/knowledge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assistant/actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$memory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assistant/memory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$respond$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assistant/respond.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const AssistantContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function uid() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function AssistantProvider({ children }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isThinking, setIsThinking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AssistantProvider.useState": ()=>[
                {
                    id: "welcome",
                    role: "assistant",
                    content: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WELCOME_MESSAGE"],
                    timestamp: Date.now()
                }
            ]
    }["AssistantProvider.useState"]);
    const memoryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$memory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMemory"])());
    const streamTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AssistantProvider.useCallback[open]": ()=>setIsOpen(true)
    }["AssistantProvider.useCallback[open]"], []);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AssistantProvider.useCallback[close]": ()=>setIsOpen(false)
    }["AssistantProvider.useCallback[close]"], []);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AssistantProvider.useCallback[toggle]": ()=>setIsOpen({
                "AssistantProvider.useCallback[toggle]": (v)=>!v
            }["AssistantProvider.useCallback[toggle]"])
    }["AssistantProvider.useCallback[toggle]"], []);
    const runAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AssistantProvider.useCallback[runAction]": (action)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["executeAction"])(action);
        }
    }["AssistantProvider.useCallback[runAction]"], []);
    const streamAssistantReply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AssistantProvider.useCallback[streamAssistantReply]": (response, userQuery)=>{
            const id = uid();
            const full = response.text;
            const started = {
                id,
                role: "assistant",
                content: "",
                timestamp: Date.now(),
                technologies: response.technologies,
                projectRefs: response.projectRefs,
                actions: response.actions,
                isStreaming: true
            };
            setMessages({
                "AssistantProvider.useCallback[streamAssistantReply]": (prev)=>[
                        ...prev,
                        started
                    ]
            }["AssistantProvider.useCallback[streamAssistantReply]"]);
            setIsThinking(false);
            let i = 0;
            const step = {
                "AssistantProvider.useCallback[streamAssistantReply].step": ()=>{
                    i += Math.max(1, Math.floor(full.length / 80));
                    const slice = full.slice(0, i);
                    setMessages({
                        "AssistantProvider.useCallback[streamAssistantReply].step": (prev)=>prev.map({
                                "AssistantProvider.useCallback[streamAssistantReply].step": (m)=>m.id === id ? {
                                        ...m,
                                        content: slice,
                                        isStreaming: i < full.length
                                    } : m
                            }["AssistantProvider.useCallback[streamAssistantReply].step"])
                    }["AssistantProvider.useCallback[streamAssistantReply].step"]);
                    if (i < full.length) {
                        streamTimerRef.current = window.setTimeout(step, 16);
                    } else {
                        memoryRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$memory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushTurn"])(memoryRef.current, "assistant", full);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autoExecuteFromIntent"])(userQuery, response.actions);
                    }
                }
            }["AssistantProvider.useCallback[streamAssistantReply].step"];
            streamTimerRef.current = window.setTimeout(step, 40);
        }
    }["AssistantProvider.useCallback[streamAssistantReply]"], []);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AssistantProvider.useCallback[sendMessage]": (text)=>{
            const trimmed = text.trim();
            if (!trimmed) return;
            if (streamTimerRef.current) {
                window.clearTimeout(streamTimerRef.current);
                streamTimerRef.current = null;
            }
            const userMsg = {
                id: uid(),
                role: "user",
                content: trimmed,
                timestamp: Date.now()
            };
            setMessages({
                "AssistantProvider.useCallback[sendMessage]": (prev)=>[
                        ...prev,
                        userMsg
                    ]
            }["AssistantProvider.useCallback[sendMessage]"]);
            memoryRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$memory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushTurn"])(memoryRef.current, "user", trimmed);
            setIsThinking(true);
            // Simulate brief thinking delay for premium feel
            window.setTimeout({
                "AssistantProvider.useCallback[sendMessage]": ()=>{
                    const { response, memory } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2f$respond$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateResponse"])(trimmed, memoryRef.current);
                    memoryRef.current = memory;
                    streamAssistantReply(response, trimmed);
                }
            }["AssistantProvider.useCallback[sendMessage]"], 420 + Math.random() * 280);
        }
    }["AssistantProvider.useCallback[sendMessage]"], [
        streamAssistantReply
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AssistantProvider.useMemo[value]": ()=>({
                isOpen,
                isThinking,
                messages,
                open,
                close,
                toggle,
                sendMessage,
                runAction
            })
    }["AssistantProvider.useMemo[value]"], [
        isOpen,
        isThinking,
        messages,
        open,
        close,
        toggle,
        sendMessage,
        runAction
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssistantContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AssistantContext.tsx",
        lineNumber: 178,
        columnNumber: 5
    }, this);
}
_s(AssistantProvider, "2AD4Y2PQ0kMQqGGl534Ex3lOQBY=");
_c = AssistantProvider;
function useAssistant() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AssistantContext);
    if (!ctx) {
        throw new Error("useAssistant must be used within AssistantProvider");
    }
    return ctx;
}
_s1(useAssistant, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AssistantProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/assistant/AssistantButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantButton",
    ()=>AssistantButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/m/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-will-change/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.mjs [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AssistantContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
/** Isolated loop layers — not re-created when parent context re-renders. */ const FabPulseRings = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_s(function FabPulseRings() {
    _s();
    const willChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWillChange"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["m"].span, {
                className: "absolute inset-0 rounded-full bg-white/50",
                style: {
                    willChange
                },
                animate: {
                    scale: [
                        1,
                        1.55,
                        1
                    ],
                    opacity: [
                        0.65,
                        0,
                        0.65
                    ]
                },
                transition: {
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeOut"
                }
            }, void 0, false, {
                fileName: "[project]/components/assistant/AssistantButton.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["m"].span, {
                className: "absolute -inset-1 rounded-full bg-cyan-200/35",
                style: {
                    willChange
                },
                animate: {
                    scale: [
                        1,
                        1.35,
                        1
                    ],
                    opacity: [
                        0.45,
                        0,
                        0.45
                    ]
                },
                transition: {
                    duration: 2.2,
                    repeat: Infinity,
                    delay: 0.35,
                    ease: "easeOut"
                }
            }, void 0, false, {
                fileName: "[project]/components/assistant/AssistantButton.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}, "vQ+3uUJY7Kl1rU9yBCnmUtKZkVc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWillChange"]
    ];
}));
_c = FabPulseRings;
const ChipSheen = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_s1(function ChipSheen() {
    _s1();
    const willChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWillChange"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["m"].span, {
        className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent",
        style: {
            willChange
        },
        animate: {
            x: [
                "-120%",
                "120%"
            ]
        },
        transition: {
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1
        }
    }, void 0, false, {
        fileName: "[project]/components/assistant/AssistantButton.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}, "vQ+3uUJY7Kl1rU9yBCnmUtKZkVc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWillChange"]
    ];
}));
_c1 = ChipSheen;
function AssistantButtonComponent() {
    _s2();
    const { toggle, isOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"])();
    const willChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWillChange"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-5 right-4 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: !isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["m"].button, {
                    type: "button",
                    onClick: toggle,
                    initial: {
                        opacity: 0,
                        x: 12,
                        scale: 0.96
                    },
                    animate: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        y: [
                            0,
                            -4,
                            0
                        ]
                    },
                    exit: {
                        opacity: 0,
                        x: 8,
                        scale: 0.96
                    },
                    transition: {
                        opacity: {
                            duration: 0.2
                        },
                        x: {
                            duration: 0.25
                        },
                        y: {
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    },
                    style: {
                        willChange
                    },
                    whileTap: {
                        scale: 0.97
                    },
                    className: "relative max-w-[220px] overflow-hidden rounded-2xl border border-white/40 bg-white px-3.5 py-2.5 text-left shadow-[0_8px_28px_rgba(0,0,0,0.4)] sm:max-w-none",
                    "aria-label": "Open Baber's AI Portfolio Assistant",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChipSheen, {}, void 0, false, {
                            fileName: "[project]/components/assistant/AssistantButton.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-10 flex items-start gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#030712] text-cyan-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/assistant/AssistantButton.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/assistant/AssistantButton.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-display text-xs font-bold tracking-wide text-[#030712] sm:text-[13px]",
                                            children: "Ask Sheharyar's AI"
                                        }, void 0, false, {
                                            fileName: "[project]/components/assistant/AssistantButton.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-0.5 text-[10px] font-semibold leading-snug text-slate-600",
                                            children: "Chat about experience, apps & skills"
                                        }, void 0, false, {
                                            fileName: "[project]/components/assistant/AssistantButton.tsx",
                                            lineNumber: 85,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/assistant/AssistantButton.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/assistant/AssistantButton.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this)
                    ]
                }, "assistant-label", true, {
                    fileName: "[project]/components/assistant/AssistantButton.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/components/assistant/AssistantButton.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["m"].button, {
                type: "button",
                onClick: toggle,
                "aria-label": isOpen ? "Close Baber's AI Portfolio Assistant" : "Open Baber's AI Portfolio Assistant",
                className: "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:h-16 sm:w-16",
                style: {
                    willChange
                },
                whileTap: {
                    scale: 0.94
                },
                animate: {
                    y: [
                        0,
                        -5,
                        0
                    ]
                },
                transition: {
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FabPulseRings, {}, void 0, false, {
                        fileName: "[project]/components/assistant/AssistantButton.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white text-[#030712] shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:h-16 sm:w-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["m"].span, {
                            animate: isOpen ? {
                                rotate: 90
                            } : {
                                rotate: 0
                            },
                            transition: {
                                duration: 0.25
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "h-6 w-6 text-cyan-600 sm:h-7 sm:w-7"
                            }, void 0, false, {
                                fileName: "[project]/components/assistant/AssistantButton.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/assistant/AssistantButton.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/assistant/AssistantButton.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/assistant/AssistantButton.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/assistant/AssistantButton.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s2(AssistantButtonComponent, "7ZqtUVopJvsCAB+cPeeIqrsmsEY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWillChange"]
    ];
});
_c2 = AssistantButtonComponent;
const AssistantButton = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(AssistantButtonComponent);
_c3 = AssistantButton;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "FabPulseRings");
__turbopack_context__.k.register(_c1, "ChipSheen");
__turbopack_context__.k.register(_c2, "AssistantButtonComponent");
__turbopack_context__.k.register(_c3, "AssistantButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/assistant/ChatInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatInput",
    ()=>ChatInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SendHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send-horizontal.mjs [app-client] (ecmascript) <export default as SendHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AssistantContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ChatInputComponent() {
    _s();
    const { sendMessage, isThinking } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"])();
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const onSubmit = (e)=>{
        e.preventDefault();
        if (!value.trim() || isThinking) return;
        sendMessage(value);
        setValue("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: onSubmit,
        className: "border-t border-cyan-400/15 bg-black/30 px-3 py-3 sm:px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-950/20 px-3 py-2 focus-within:border-cyan-300/50 focus-within:shadow-[0_0_16px_rgba(34,211,238,0.15)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: value,
                    onChange: (e)=>setValue(e.target.value),
                    placeholder: "Query Baber's portfolio systems…",
                    disabled: isThinking,
                    className: "min-w-0 flex-1 bg-transparent font-mono text-sm text-slate-100 outline-none placeholder:text-slate-500 disabled:opacity-60",
                    "aria-label": "Message Baber's Portfolio Assistant"
                }, void 0, false, {
                    fileName: "[project]/components/assistant/ChatInput.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    disabled: isThinking || !value.trim(),
                    className: "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.4)] transition hover:brightness-110 disabled:opacity-40",
                    "aria-label": "Send message",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SendHorizontal$3e$__["SendHorizontal"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/components/assistant/ChatInput.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/assistant/ChatInput.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/assistant/ChatInput.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/assistant/ChatInput.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(ChatInputComponent, "/S6120udq0FeFZ55uIeS0VLTdMM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"]
    ];
});
_c = ChatInputComponent;
const ChatInput = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(ChatInputComponent);
_c1 = ChatInput;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatInputComponent");
__turbopack_context__.k.register(_c1, "ChatInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/assistant/MessageBubble.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageBubble",
    ()=>MessageBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/m/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AssistantContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function formatTime(ts) {
    return new Date(ts).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}
function MessageBubbleComponent({ message }) {
    _s();
    const { runAction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"])();
    const isUser = message.role === "user";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["m"].div, {
        initial: {
            opacity: 0,
            y: 8
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.25,
            ease: "easeOut"
        },
        className: `flex w-full ${isUser ? "justify-end" : "justify-start"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[85%] ${isUser ? "rounded-br-md bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.25)]" : "rounded-bl-md border border-cyan-400/20 bg-white/[0.04] text-slate-100 shadow-[inset_0_0_20px_rgba(34,211,238,0.06)] backdrop-blur-md"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "whitespace-pre-wrap",
                    children: [
                        message.content,
                        message.isStreaming ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-cyan-300 align-middle shadow-[0_0_6px_#22d3ee]"
                        }, void 0, false, {
                            fileName: "[project]/components/assistant/MessageBubble.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/assistant/MessageBubble.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                !isUser && !message.isStreaming && message.technologies?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-cyan-400/70",
                            children: "Technologies"
                        }, void 0, false, {
                            fileName: "[project]/components/assistant/MessageBubble.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1.5",
                            children: message.technologies.map((tech)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 font-mono text-[11px] text-cyan-100",
                                    children: tech
                                }, tech, false, {
                                    fileName: "[project]/components/assistant/MessageBubble.tsx",
                                    lineNumber: 47,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/assistant/MessageBubble.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/assistant/MessageBubble.tsx",
                    lineNumber: 41,
                    columnNumber: 11
                }, this) : null,
                !isUser && !message.isStreaming && message.projectRefs?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-teal-400/70",
                            children: "Projects"
                        }, void 0, false, {
                            fileName: "[project]/components/assistant/MessageBubble.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1.5",
                            children: message.projectRefs.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded border border-teal-500/25 bg-teal-500/10 px-2 py-0.5 font-mono text-[11px] text-teal-100",
                                    children: p.name
                                }, p.id, false, {
                                    fileName: "[project]/components/assistant/MessageBubble.tsx",
                                    lineNumber: 65,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/assistant/MessageBubble.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/assistant/MessageBubble.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, this) : null,
                !isUser && !message.isStreaming && message.actions?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 flex flex-wrap gap-2",
                    children: message.actions.map((action)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>runAction(action),
                            className: "btn-holo rounded-lg border border-cyan-400/35 bg-cyan-400/10 px-2.5 py-1 font-mono text-[11px] font-medium text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-400/20 hover:shadow-[0_0_12px_rgba(34,211,238,0.3)]",
                            children: action.label
                        }, `${action.type}-${action.label}`, false, {
                            fileName: "[project]/components/assistant/MessageBubble.tsx",
                            lineNumber: 79,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/assistant/MessageBubble.tsx",
                    lineNumber: 77,
                    columnNumber: 11
                }, this) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `mt-1.5 font-mono text-[10px] ${isUser ? "text-white/70" : "text-slate-500"}`,
                    children: formatTime(message.timestamp)
                }, void 0, false, {
                    fileName: "[project]/components/assistant/MessageBubble.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/assistant/MessageBubble.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/assistant/MessageBubble.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(MessageBubbleComponent, "ithCl+uO/39yMKlVhBUZ5ey2zrE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"]
    ];
});
_c = MessageBubbleComponent;
const MessageBubble = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(MessageBubbleComponent);
_c1 = MessageBubble;
var _c, _c1;
__turbopack_context__.k.register(_c, "MessageBubbleComponent");
__turbopack_context__.k.register(_c1, "MessageBubble");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/assistant/ThinkingIndicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThinkingIndicator",
    ()=>ThinkingIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/m/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-will-change/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ThinkingIndicatorComponent() {
    _s();
    const willChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWillChange"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-start",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-3.5 py-2.5",
            children: [
                [
                    0,
                    1,
                    2
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["m"].span, {
                        className: "h-1.5 w-1.5 rounded-full bg-cyan-300/80",
                        style: {
                            willChange
                        },
                        animate: {
                            opacity: [
                                0.35,
                                1,
                                0.35
                            ],
                            y: [
                                0,
                                -3,
                                0
                            ]
                        },
                        transition: {
                            duration: 0.9,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut"
                        }
                    }, i, false, {
                        fileName: "[project]/components/assistant/ThinkingIndicator.tsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ml-1 text-[11px] text-zinc-400",
                    children: "Thinking…"
                }, void 0, false, {
                    fileName: "[project]/components/assistant/ThinkingIndicator.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/assistant/ThinkingIndicator.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/assistant/ThinkingIndicator.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(ThinkingIndicatorComponent, "vQ+3uUJY7Kl1rU9yBCnmUtKZkVc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWillChange"]
    ];
});
_c = ThinkingIndicatorComponent;
const ThinkingIndicator = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(ThinkingIndicatorComponent);
_c1 = ThinkingIndicator;
var _c, _c1;
__turbopack_context__.k.register(_c, "ThinkingIndicatorComponent");
__turbopack_context__.k.register(_c1, "ThinkingIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/assistant/MessageList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageList",
    ()=>MessageList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AssistantContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$MessageBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/assistant/MessageBubble.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$ThinkingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/assistant/ThinkingIndicator.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function MessageListComponent() {
    _s();
    const { messages, isThinking } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"])();
    const endRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageListComponent.useEffect": ()=>{
            endRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["MessageListComponent.useEffect"], [
        messages,
        isThinking
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-3 sm:px-4",
        children: [
            messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$MessageBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageBubble"], {
                    message: m
                }, m.id, false, {
                    fileName: "[project]/components/assistant/MessageList.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)),
            isThinking ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$ThinkingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThinkingIndicator"], {}, void 0, false, {
                fileName: "[project]/components/assistant/MessageList.tsx",
                lineNumber: 21,
                columnNumber: 21
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: endRef
            }, void 0, false, {
                fileName: "[project]/components/assistant/MessageList.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/assistant/MessageList.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(MessageListComponent, "Ky0bvYYC0VBOc8iWY32q3t1/nWE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"]
    ];
});
_c = MessageListComponent;
const MessageList = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(MessageListComponent);
_c1 = MessageList;
var _c, _c1;
__turbopack_context__.k.register(_c, "MessageListComponent");
__turbopack_context__.k.register(_c1, "MessageList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/assistant/SuggestedChips.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SuggestedChips",
    ()=>SuggestedChips
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/knowledge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AssistantContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SuggestedChipsComponent() {
    _s();
    const { sendMessage, isThinking } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-2 overflow-x-auto px-3 pb-2 pt-1 scrollbar-none sm:px-4",
        children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$knowledge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUGGESTED_QUESTIONS"].map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: isThinking,
                onClick: ()=>sendMessage(q),
                className: "shrink-0 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3 py-1 font-mono text-[11px] text-cyan-100/90 transition hover:border-cyan-300/50 hover:bg-cyan-400/15 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] disabled:opacity-50",
                children: q
            }, q, false, {
                fileName: "[project]/components/assistant/SuggestedChips.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/assistant/SuggestedChips.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_s(SuggestedChipsComponent, "Sbtdpsz3M2XAIRsTjpVg+CSB9Fc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"]
    ];
});
_c = SuggestedChipsComponent;
const SuggestedChips = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(SuggestedChipsComponent);
_c1 = SuggestedChips;
var _c, _c1;
__turbopack_context__.k.register(_c, "SuggestedChipsComponent");
__turbopack_context__.k.register(_c1, "SuggestedChips");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/assistant/ChatWindow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatWindow",
    ()=>ChatWindow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/m/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-will-change/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.mjs [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radio.mjs [app-client] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AssistantContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/assistant/ChatInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$MessageList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/assistant/MessageList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$SuggestedChips$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/assistant/SuggestedChips.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function ChatWindowComponent() {
    _s();
    const { isOpen, close } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"])();
    const willChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWillChange"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$m$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["m"].div, {
            initial: {
                opacity: 0,
                y: 20,
                scale: 0.96
            },
            animate: {
                opacity: 1,
                y: 0,
                scale: 1
            },
            exit: {
                opacity: 0,
                y: 12,
                scale: 0.97
            },
            transition: {
                duration: 0.28,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            },
            style: {
                willChange
            },
            className: "fixed bottom-24 right-4 z-50 flex h-[min(660px,calc(100dvh-7.5rem))] w-[min(410px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#040b16] shadow-[0_0_40px_rgba(34,211,238,0.15)] sm:right-6",
            role: "dialog",
            "aria-label": "Baber's Portfolio Assistant",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.1),transparent_55%)]"
                }, void 0, false, {
                    fileName: "[project]/components/assistant/ChatWindow.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "relative z-10 flex items-center justify-between border-b border-cyan-400/15 px-4 py-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-teal-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                            className: "h-5 w-5 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/components/assistant/ChatWindow.tsx",
                                            lineNumber: 34,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/assistant/ChatWindow.tsx",
                                            lineNumber: 35,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/assistant/ChatWindow.tsx",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-display text-sm tracking-wide text-slate-50",
                                            children: "Portfolio Assistant"
                                        }, void 0, false, {
                                            fileName: "[project]/components/assistant/ChatWindow.tsx",
                                            lineNumber: 38,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "flex items-center gap-1 font-mono text-[10px] text-cyan-300/80",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/assistant/ChatWindow.tsx",
                                                    lineNumber: 42,
                                                    columnNumber: 19
                                                }, this),
                                                "Baber's holographic uplink"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/assistant/ChatWindow.tsx",
                                            lineNumber: 41,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/assistant/ChatWindow.tsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/assistant/ChatWindow.tsx",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: close,
                            className: "rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-100",
                            "aria-label": "Close assistant",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/assistant/ChatWindow.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/assistant/ChatWindow.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/assistant/ChatWindow.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex min-h-0 flex-1 flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$MessageList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageList"], {}, void 0, false, {
                            fileName: "[project]/components/assistant/ChatWindow.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$SuggestedChips$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuggestedChips"], {}, void 0, false, {
                            fileName: "[project]/components/assistant/ChatWindow.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatInput"], {}, void 0, false, {
                            fileName: "[project]/components/assistant/ChatWindow.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/assistant/ChatWindow.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this)
            ]
        }, "chat-window", true, {
            fileName: "[project]/components/assistant/ChatWindow.tsx",
            lineNumber: 18,
            columnNumber: 9
        }, this) : null
    }, void 0, false, {
        fileName: "[project]/components/assistant/ChatWindow.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(ChatWindowComponent, "xbvR/A3WZ4q3Kvl+Qbo0kNm3cSo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistant"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWillChange"]
    ];
});
_c = ChatWindowComponent;
const ChatWindow = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(ChatWindowComponent);
_c1 = ChatWindow;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatWindowComponent");
__turbopack_context__.k.register(_c1, "ChatWindow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/assistant/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PortfolioAssistant",
    ()=>PortfolioAssistant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AssistantContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$AssistantButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/assistant/AssistantButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$ChatWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/assistant/ChatWindow.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function PortfolioAssistant() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AssistantContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssistantProvider"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$ChatWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatWindow"], {}, void 0, false, {
                fileName: "[project]/components/assistant/index.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$assistant$2f$AssistantButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssistantButton"], {}, void 0, false, {
                fileName: "[project]/components/assistant/index.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/assistant/index.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = PortfolioAssistant;
var _c;
__turbopack_context__.k.register(_c, "PortfolioAssistant");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/assistant/index.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/assistant/index.tsx [app-client] (ecmascript)"));
}),
"[project]/node_modules/lucide-react/dist/esm/icons/message-circle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MessageCircle
]);
/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
            key: "1sd12s"
        }
    ]
];
const MessageCircle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("message-circle", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/message-circle.mjs [app-client] (ecmascript) <export default as MessageCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/bot.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Bot
]);
/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 8V4H8",
            key: "hb8ula"
        }
    ],
    [
        "rect",
        {
            width: "16",
            height: "12",
            x: "4",
            y: "8",
            rx: "2",
            key: "enze0r"
        }
    ],
    [
        "path",
        {
            d: "M2 14h2",
            key: "vft8re"
        }
    ],
    [
        "path",
        {
            d: "M20 14h2",
            key: "4cs60a"
        }
    ],
    [
        "path",
        {
            d: "M15 13v2",
            key: "1xurst"
        }
    ],
    [
        "path",
        {
            d: "M9 13v2",
            key: "rq6x2g"
        }
    ]
];
const Bot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("bot", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/bot.mjs [app-client] (ecmascript) <export default as Bot>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Bot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/radio.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Radio
]);
/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M16.247 7.761a6 6 0 0 1 0 8.478",
            key: "1fwjs5"
        }
    ],
    [
        "path",
        {
            d: "M19.075 4.933a10 10 0 0 1 0 14.134",
            key: "ehdyv1"
        }
    ],
    [
        "path",
        {
            d: "M4.925 19.067a10 10 0 0 1 0-14.134",
            key: "1q22gi"
        }
    ],
    [
        "path",
        {
            d: "M7.753 16.239a6 6 0 0 1 0-8.478",
            key: "r2q7qm"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "2",
            key: "1c9p78"
        }
    ]
];
const Radio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("radio", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/radio.mjs [app-client] (ecmascript) <export default as Radio>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Radio",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radio.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/send-horizontal.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>SendHorizontal
]);
/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
            key: "117uat"
        }
    ],
    [
        "path",
        {
            d: "M6 12h16",
            key: "s4cdu5"
        }
    ]
];
const SendHorizontal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("send-horizontal", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/send-horizontal.mjs [app-client] (ecmascript) <export default as SendHorizontal>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SendHorizontal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send-horizontal.mjs [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_13x95fu._.js.map