import { MotionProvider } from "@/components/motion/MotionProvider";
import { PortfolioShell } from "@/components/PortfolioShell";
import { LazyPortfolioAssistant } from "@/components/assistant/LazyPortfolioAssistant";

export default function Home() {
  return (
    <MotionProvider>
      <PortfolioShell />
      <LazyPortfolioAssistant />
    </MotionProvider>
  );
}
