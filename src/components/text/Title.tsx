import { cn } from "../../lib/utils";
import { FadeIn } from "../animation/FadeIn";
import { SlideIn } from "../animation/SlideIn";
import { TIMING } from "../../lib/timing";

interface TitleProps {
  text: string;
  variant?: "main" | "section" | "inline" | "vibrant";
  animationType?: "fade" | "slideUp" | "slideLeft";
  startFrame?: number;
  duration?: number;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({
  text,
  variant = "section",
  animationType = "slideUp",
  startFrame = 0,
  duration,
  className = "",
}) => {
  // Default durations based on variant
  const defaultDuration =
    variant === "main" || variant === "vibrant"
      ? TIMING.SLOW
      : variant === "section"
        ? TIMING.NORMAL
        : TIMING.QUICK;

  const effectiveDuration = duration ?? defaultDuration;

  // Variant-specific styling (using DM Sans)
  const variantStyles = {
    main: "text-6xl font-bold text-primary tracking-tight",
    section: "text-5xl font-semibold text-foreground tracking-tight",
    inline: "text-2xl font-medium text-foreground",
    vibrant: "text-6xl font-bold text-[hsl(var(--electric-blue))] tracking-tight",
  };

  const titleElement = (
    <h1 className={cn(variantStyles[variant], "text-center", className)}>{text}</h1>
  );

  // Apply animation based on type
  if (animationType === "fade") {
    return (
      <FadeIn startFrame={startFrame} duration={effectiveDuration}>
        {titleElement}
      </FadeIn>
    );
  }

  if (animationType === "slideUp") {
    return (
      <SlideIn
        direction="up"
        startFrame={startFrame}
        duration={effectiveDuration}
        distance={30}
      >
        {titleElement}
      </SlideIn>
    );
  }

  if (animationType === "slideLeft") {
    return (
      <SlideIn
        direction="left"
        startFrame={startFrame}
        duration={effectiveDuration}
        distance={30}
      >
        {titleElement}
      </SlideIn>
    );
  }

  return titleElement;
};
