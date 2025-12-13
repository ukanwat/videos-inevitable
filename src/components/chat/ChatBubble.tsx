import { cn } from "../../lib/utils";
import { SlideIn } from "../animation/SlideIn";
import { TIMING } from "../../lib/timing";
import { Img } from "remotion";

interface ChatBubbleProps {
  role: "user" | "assistant" | "system";
  message: string;
  startFrame?: number;
  avatar?: string;
  className?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  message,
  startFrame = 0,
  avatar,
  className = "",
}) => {
  // Styling based on role
  const roleStyles = {
    user: {
      container: "justify-end",
      bubble: "bg-primary text-primary-foreground",
      direction: "right" as const,
    },
    assistant: {
      container: "justify-start",
      bubble: "bg-[hsl(var(--yellow)/0.1)] text-foreground border-2 border-[hsl(var(--yellow)/0.5)]",
      direction: "left" as const,
    },
    system: {
      container: "justify-center",
      bubble: "bg-secondary text-secondary-foreground",
      direction: "up" as const,
    },
  };

  const style = roleStyles[role];

  return (
    <div className={cn("flex w-full", style.container, className)}>
      <SlideIn
        startFrame={startFrame}
        direction={style.direction}
        duration={TIMING.NORMAL}
        distance={20}
      >
        <div className="flex items-start gap-2 max-w-[80%]">
          {avatar && role !== "user" && (
            <Img
              src={avatar}
              alt={role}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
          )}
          <div
            className={cn(
              "px-4 py-3 rounded-2xl shadow-sm",
              style.bubble,
              role === "user" && "rounded-tr-sm",
              role === "assistant" && "rounded-tl-sm"
            )}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message}
            </p>
          </div>
          {avatar && role === "user" && (
            <Img
              src={avatar}
              alt={role}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
          )}
        </div>
      </SlideIn>
    </div>
  );
};
