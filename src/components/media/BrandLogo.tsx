import { useState } from "react";
import { Img, staticFile } from "remotion";
import { cn } from "../../lib/utils";
import { FadeIn } from "../animation/FadeIn";
import { ScaleIn } from "../animation/ScaleIn";
import { TIMING } from "../../lib/timing";
import { BRANDFETCH_API_KEY } from "../../config/env";

interface BrandLogoProps {
  domain: string; // e.g., "openai.com", "anthropic.com"
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "icon" | "logo"; // icon = square logo, logo = full logo with text (not used with CDN)
  startFrame?: number;
  animateIn?: "fade" | "scale" | "none";
  className?: string;
  fallbackText?: string; // Text to show if logo fails to load
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

const localMap: Record<string, string> = {
  "google.com": "assets/logos/google.png",
  "openai.com": "assets/logos/openai.png",
  "anthropic.com": "assets/logos/anthropic.svg",
  "langchain.com": "assets/logos/langchain.png",
  "booking.com": "assets/logos/booking.png",
  "tripadvisor.com": "assets/logos/tripadvisor.svg",
  "openweathermap.org": "assets/logos/openweathermap.png",
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  domain,
  size = "md",
  startFrame = 0,
  animateIn = "scale",
  className = "",
  fallbackText,
}) => {
  const [imageError, setImageError] = useState(false);

  // Use local file if available, otherwise fallback to Brandfetch
  // We prioritize local assets to avoid API rate limits and ensure 4K quality
  const localSrc = localMap[domain];
  const logoUrl = localSrc
    ? staticFile(localSrc)
    : `https://cdn.brandfetch.io/${domain}?c=${BRANDFETCH_API_KEY}`;

  const logoElement = (
    <div className={cn("flex items-center justify-center", sizeClasses[size], className)}>
      {!imageError ? (
        <Img
          src={logoUrl}
          alt={domain}
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
        />
      ) : fallbackText ? (
        <div className="flex items-center justify-center w-full h-full bg-muted rounded-lg">
          <span className="text-muted-foreground font-semibold text-center px-2 text-xs">
            {fallbackText}
          </span>
        </div>
      ) : (
        <div className="w-full h-full bg-muted rounded-lg" />
      )}
    </div>
  );

  // Apply animation
  if (animateIn === "scale") {
    return (
      <ScaleIn startFrame={startFrame} duration={TIMING.NORMAL} from={0.8}>
        {logoElement}
      </ScaleIn>
    );
  }

  if (animateIn === "fade") {
    return (
      <FadeIn startFrame={startFrame} duration={TIMING.NORMAL}>
        {logoElement}
      </FadeIn>
    );
  }

  return logoElement;
};
