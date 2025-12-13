import React from "react";
import { FadeIn } from "./FadeIn";
import { SlideIn } from "./SlideIn";
import { TIMING } from "../../lib/timing";

interface SequentialRevealProps {
  children: React.ReactNode[];
  startFrame?: number;
  itemDelay?: number;
  itemDuration?: number;
  animationType?: "fade" | "slide";
  slideDirection?: "left" | "right" | "up" | "down";
  className?: string;
}

export const SequentialReveal: React.FC<SequentialRevealProps> = ({
  children,
  startFrame = 0,
  itemDelay = TIMING.STAGGER_NORMAL,
  itemDuration = TIMING.NORMAL,
  animationType = "fade",
  slideDirection = "up",
  className = "",
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        const delay = index * itemDelay;

        if (animationType === "slide") {
          return (
            <SlideIn
              key={index}
              startFrame={startFrame}
              delay={delay}
              duration={itemDuration}
              direction={slideDirection}
            >
              {child}
            </SlideIn>
          );
        }

        return (
          <FadeIn
            key={index}
            startFrame={startFrame}
            delay={delay}
            duration={itemDuration}
          >
            {child}
          </FadeIn>
        );
      })}
    </div>
  );
};
