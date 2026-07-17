import { knowledge } from "@/data/knowledge";
import type { AssistantAction } from "@/data/types";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function highlightSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add("assistant-highlight");
  scrollToId(id);
  window.setTimeout(() => {
    el.classList.remove("assistant-highlight");
  }, 2600);
}

function downloadResume() {
  const { path, fileName } = knowledge.resume;
  const a = document.createElement("a");
  a.href = path;
  a.download = fileName;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function openUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

/** Execute a smart action from the assistant. */
export function executeAction(action: AssistantAction): void {
  switch (action.type) {
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
      openUrl(action.href ?? knowledge.social.github);
      break;
    case "open_linkedin":
      openUrl(action.href ?? knowledge.social.linkedin);
      break;
    case "open_play_store":
    case "open_external":
      if (action.href) openUrl(action.href);
      break;
    default:
      break;
  }
}

/** Infer and auto-run primary navigation actions from intent. */
export function autoExecuteFromIntent(query: string, actions?: AssistantAction[]) {
  const q = query.toLowerCase();
  const shouldAuto =
    /download|open|show|view|go to|navigate|scroll|contact|github|linkedin|cv|resume/.test(
      q,
    );

  if (!shouldAuto || !actions?.length) return;

  const primary = actions[0];
  // Small delay so the user sees the answer first
  window.setTimeout(() => executeAction(primary), 450);
}
