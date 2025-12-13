import { AbsoluteFill } from "remotion";
import { cn } from "../../lib/utils";
import { Title } from "../text/Title";
import { FadeIn } from "../animation/FadeIn";
import { TIMING } from "../../lib/timing";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  background?: "default" | "gradient" | "custom";
  backgroundGradient?: string;
  startFrame?: number;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  background = "default",
  backgroundGradient,
  startFrame = 0,
  className = "",
}) => {
  const getBackgroundStyle = () => {
    switch (background) {
      case "gradient":
        return backgroundGradient || "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)";
      case "custom":
        return backgroundGradient;
      default:
        return undefined;
    }
  };

  return (
    <AbsoluteFill
      className={cn("p-12", className)}
      style={{
        background: getBackgroundStyle(),
        backgroundColor: background === "default" ? "hsl(var(--background))" : undefined,
      }}
    >
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
        {title && (
          <div className="mb-8">
            <Title
              text={title}
              variant="main"
              animationType="slideUp"
              startFrame={startFrame}
            />
            {subtitle && (
              <FadeIn startFrame={startFrame + TIMING.QUICK} duration={TIMING.NORMAL}>
                <p className="mt-2 text-xl text-muted-foreground">
                  {subtitle}
                </p>
              </FadeIn>
            )}
          </div>
        )}
        <FadeIn startFrame={startFrame + TIMING.NORMAL} duration={TIMING.NORMAL}>
          <div className="flex-1">{children}</div>
        </FadeIn>
      </div>
    </AbsoluteFill>
  );
};
