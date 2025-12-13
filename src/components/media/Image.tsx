import { cn } from "../../lib/utils";
import { FadeIn } from "../animation/FadeIn";
import { ScaleIn } from "../animation/ScaleIn";
import { SlideIn } from "../animation/SlideIn";
import { TIMING } from "../../lib/timing";
import { Img } from "remotion";

interface ImageProps {
  src: string;
  alt: string;
  source?: string; // "Source: OpenAI"
  caption?: string; // Bottom caption
  variant?: "rounded" | "straight";
  fit?: "cover" | "contain";
  startFrame?: number;
  animateIn?: "fade" | "scale" | "slide";
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  source,
  caption,
  variant = "rounded",
  fit = "cover",
  startFrame = 0,
  animateIn = "fade",
  className = "",
}) => {
  const imageElement = (
    <div className={cn("relative overflow-hidden", className)}>
      <Img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full",
          fit === "cover" ? "object-cover" : "object-contain",
          variant === "rounded" ? "rounded-lg" : ""
        )}
      />

      {/* Source attribution overlay - top-left */}
      {source && (
        <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
          {source}
        </div>
      )}

      {/* Caption overlay - bottom */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-3 text-center text-sm text-foreground border-t border">
          {caption}
        </div>
      )}
    </div>
  );

  // Apply animation
  if (animateIn === "scale") {
    return (
      <ScaleIn startFrame={startFrame} duration={TIMING.NORMAL} from={0.95}>
        {imageElement}
      </ScaleIn>
    );
  }

  if (animateIn === "slide") {
    return (
      <SlideIn startFrame={startFrame} duration={TIMING.NORMAL} direction="up">
        {imageElement}
      </SlideIn>
    );
  }

  return (
    <FadeIn startFrame={startFrame} duration={TIMING.NORMAL}>
      {imageElement}
    </FadeIn>
  );
};
