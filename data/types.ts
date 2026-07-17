/** Strongly typed knowledge base contracts for Baber's Portfolio Assistant. */

export type ProjectCategory =
  | "mobile"
  | "web"
  | "ai"
  | "healthcare"
  | "logistics"
  | "fintech"
  | "ecommerce"
  | "social"
  | "enterprise"
  | "pos"
  | "ride-sharing";

export type ActionType =
  | "download_resume"
  | "scroll_projects"
  | "scroll_mobile"
  | "scroll_web"
  | "scroll_ai"
  | "scroll_healthcare"
  | "scroll_logistics"
  | "scroll_contact"
  | "open_github"
  | "open_linkedin"
  | "open_play_store"
  | "open_external"
  | "highlight_logistics"
  | "highlight_ai"
  | "highlight_healthcare";

export interface AssistantAction {
  type: ActionType;
  label: string;
  /** Optional URL for external opens */
  href?: string;
  /** Optional DOM section id for scroll/highlight */
  targetId?: string;
}

export interface KnowledgeEntry {
  id: string;
  category: string;
  title: string;
  content: string;
  /** Keywords and phrases that boost ranking for this entry */
  keywords: string[];
  /** Related synonym groups / aliases */
  aliases?: string[];
  technologies?: string[];
  projectIds?: string[];
  actions?: AssistantAction[];
  priority?: number;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  description: string;
  categories: ProjectCategory[];
  technologies: string[];
  role?: string;
  highlights?: string[];
  playStoreUrl?: string;
  appStoreUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  imageUrls?: string[];
  featured?: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  details?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year?: string;
  url?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  whatsapp?: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  portfolio?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  aliases?: string[];
}

export interface LiveApp {
  id: string;
  name: string;
  type: "website" | "portal" | "pos" | "webapp";
  url: string;
  description: string;
}

export interface StoreApp {
  id: string;
  name: string;
  platform: "play_store" | "app_store";
  url: string;
  packageId?: string;
  description: string;
}

export interface KnowledgeBase {
  about: {
    name: string;
    fullName: string;
    title: string;
    tagline: string;
    introduction: string;
    heroSummary?: string;
    yearsExperience: number;
    location: string;
  };
  experience: Experience[];
  skills: {
    primary: string[];
    secondary: string[];
    tools: string[];
  };
  projects: Project[];
  technologies: string[];
  industries: string[];
  education: Education[];
  achievements: string[];
  liveApps: LiveApp[];
  playStoreApps: StoreApp[];
  appStoreApps: StoreApp[];
  certificates: Certificate[];
  resume: {
    path: string;
    fileName: string;
  };
  availability: {
    status: string;
    message: string;
  };
  services: Service[];
  contact: ContactInfo;
  social: SocialLinks;
  faqs: FAQ[];
  /** Indexed searchable entries derived + handcrafted */
  entries: KnowledgeEntry[];
}

export interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ConversationMemory {
  turns: ConversationTurn[];
  /** Last resolved topic ids / project ids for pronoun resolution */
  lastTopics: string[];
  lastProjectIds: string[];
  lastTechnologies: string[];
  lastCategory?: string;
}

export interface SearchResult {
  entry: KnowledgeEntry;
  score: number;
}

export interface AssistantResponse {
  text: string;
  technologies?: string[];
  projectRefs?: { id: string; name: string }[];
  actions?: AssistantAction[];
  matchedEntryIds: string[];
}
