import { useCurrentFrame } from "remotion";
import { useEffect, useRef } from "react";
import { annotate, RoughAnnotation } from "rough-notation";
import { cn } from "../../lib/utils";
import {
  splitByCharacter,
  splitByWord,
  splitByLine,
  getStaggeredOpacity,
  getStaggeredBlur,
  getStaggeredSlide,
  getTypewriterProgress,
  getCursorBlink,
} from "../../utils/textAnimations";

type AnimationType =
  | "characterReveal"
  | "wordReveal"
  | "lineReveal"
  | "blur"
  | "blurByCharacter"
  | "typewriter"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "slideUpByWord"
  | "slideDownByWord"
  | "roughNotation";

type RoughNotationType =
  | "underline"
  | "box"
  | "circle"
  | "highlight"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface AnimatedTextProps {
  children: string;
  animation?: AnimationType;
  by?: "character" | "word" | "line"; // For reveal animations
  startFrame?: number;
  staggerDelay?: number; // Frames between each unit
  duration?: number; // Duration for each unit's animation
  className?: string;

  // Typewriter specific
  showCursor?: boolean;
  cursorStyle?: "line" | "block" | "underscore";
  charsPerFrame?: number;

  // Rough notation specific
  roughType?: RoughNotationType;
  roughColor?: string;
  roughStrokeWidth?: number;
  roughAnimationDuration?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  animation = "characterReveal",
  by = "character",
  startFrame = 0,
  staggerDelay = 3,
  duration = 15,
  className = "",
  showCursor = true,
  cursorStyle = "line",
  charsPerFrame = 0.5,
  roughType = "underline",
  roughColor = "hsl(var(--yellow))",
  roughStrokeWidth = 2,
  roughAnimationDuration = 60,
}) => {
  const frame = useCurrentFrame();
  const textRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);

  // Rough notation animation
  useEffect(() => {
    if (animation === "roughNotation" && textRef.current) {
      const progress = Math.min(
        Math.max(0, (frame - startFrame) / roughAnimationDuration),
        1
      );

      // Clean up previous annotation
      if (annotationRef.current) {
        annotationRef.current.remove();
      }

      // Create new annotation
      if (progress > 0) {
        const annotation = annotate(textRef.current, {
          type: roughType,
          color: roughColor,
          strokeWidth: roughStrokeWidth,
          animate: false, // We'll control animation with Remotion
        });

        // Show annotation based on progress
        if (progress >= 1) {
          annotation.show();
        }

        annotationRef.current = annotation;
      }
    }

    return () => {
      if (annotationRef.current) {
        annotationRef.current.remove();
      }
    };
  }, [animation, frame, startFrame, roughType, roughColor, roughStrokeWidth, roughAnimationDuration]);

  // Character Reveal
  if (animation === "characterReveal") {
    const chars = splitByCharacter(children);
    return (
      <span className={className}>
        {chars.map((char, index) => {
          const opacity = getStaggeredOpacity(frame, startFrame, index, staggerDelay, duration);
          return (
            <span
              key={index}
              style={{ opacity, display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    );
  }

  // Word Reveal
  if (animation === "wordReveal") {
    const words = splitByWord(children);
    return (
      <span className={className}>
        {words.map((word, index) => {
          const opacity = getStaggeredOpacity(frame, startFrame, index, staggerDelay, duration);
          return (
            <span key={index} style={{ opacity, display: "inline-block" }}>
              {word}
            </span>
          );
        })}
      </span>
    );
  }

  // Line Reveal
  if (animation === "lineReveal") {
    const lines = splitByLine(children);
    return (
      <span className={className}>
        {lines.map((line, index) => {
          const opacity = getStaggeredOpacity(frame, startFrame, index, staggerDelay, duration);
          return (
            <span key={index} style={{ opacity, display: "block" }}>
              {line}
            </span>
          );
        })}
      </span>
    );
  }

  // Blur (whole text)
  if (animation === "blur") {
    const blur = getStaggeredBlur(frame, startFrame, 0, 0, duration, 10);
    return (
      <span className={className} style={{ filter: `blur(${blur}px)` }}>
        {children}
      </span>
    );
  }

  // Blur by Character
  if (animation === "blurByCharacter") {
    const chars = splitByCharacter(children);
    return (
      <span className={className}>
        {chars.map((char, index) => {
          const blur = getStaggeredBlur(frame, startFrame, index, staggerDelay, duration, 10);
          const opacity = getStaggeredOpacity(frame, startFrame, index, staggerDelay, duration);
          return (
            <span
              key={index}
              style={{
                filter: `blur(${blur}px)`,
                opacity,
                display: "inline-block",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    );
  }

  // Typewriter
  if (animation === "typewriter") {
    const visibleChars = getTypewriterProgress(frame, startFrame, children.length, charsPerFrame);
    const showCursorNow = getCursorBlink(frame);
    const displayText = children.substring(0, visibleChars);

    const cursorStyles = {
      line: "inline-block w-[2px] h-[1em] bg-current ml-[2px]",
      block: "inline-block w-[0.6em] h-[1em] bg-current ml-[2px]",
      underscore: "inline-block w-[0.6em] h-[2px] bg-current ml-[2px] align-bottom",
    };

    return (
      <span className={className}>
        {displayText}
        {showCursor && showCursorNow && (
          <span className={cursorStyles[cursorStyle]} />
        )}
      </span>
    );
  }

  // Slide Up
  if (animation === "slideUp") {
    const chars = splitByCharacter(children);
    return (
      <span className={className}>
        {chars.map((char, index) => {
          const offset = getStaggeredSlide(frame, startFrame, index, staggerDelay, duration, 20, "up");
          const opacity = getStaggeredOpacity(frame, startFrame, index, staggerDelay, duration);
          return (
            <span
              key={index}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                opacity,
                display: "inline-block",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    );
  }

  // Slide Down
  if (animation === "slideDown") {
    const chars = splitByCharacter(children);
    return (
      <span className={className}>
        {chars.map((char, index) => {
          const offset = getStaggeredSlide(frame, startFrame, index, staggerDelay, duration, 20, "down");
          const opacity = getStaggeredOpacity(frame, startFrame, index, staggerDelay, duration);
          return (
            <span
              key={index}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                opacity,
                display: "inline-block",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    );
  }

  // Slide Left
  if (animation === "slideLeft") {
    const chars = splitByCharacter(children);
    return (
      <span className={className}>
        {chars.map((char, index) => {
          const offset = getStaggeredSlide(frame, startFrame, index, staggerDelay, duration, 20, "left");
          const opacity = getStaggeredOpacity(frame, startFrame, index, staggerDelay, duration);
          return (
            <span
              key={index}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                opacity,
                display: "inline-block",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    );
  }

  // Slide Right
  if (animation === "slideRight") {
    const chars = splitByCharacter(children);
    return (
      <span className={className}>
        {chars.map((char, index) => {
          const offset = getStaggeredSlide(frame, startFrame, index, staggerDelay, duration, 20, "right");
          const opacity = getStaggeredOpacity(frame, startFrame, index, staggerDelay, duration);
          return (
            <span
              key={index}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                opacity,
                display: "inline-block",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    );
  }

  // Slide Up By Word
  if (animation === "slideUpByWord") {
    const words = splitByWord(children);
    return (
      <span className={className}>
        {words.map((word, index) => {
          const offset = getStaggeredSlide(frame, startFrame, index, staggerDelay, duration, 20, "up");
          const opacity = getStaggeredOpacity(frame, startFrame, index, staggerDelay, duration);
          return (
            <span
              key={index}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                opacity,
                display: "inline-block",
              }}
            >
              {word}
            </span>
          );
        })}
      </span>
    );
  }

  // Slide Down By Word
  if (animation === "slideDownByWord") {
    const words = splitByWord(children);
    return (
      <span className={className}>
        {words.map((word, index) => {
          const offset = getStaggeredSlide(frame, startFrame, index, staggerDelay, duration, 20, "down");
          const opacity = getStaggeredOpacity(frame, startFrame, index, staggerDelay, duration);
          return (
            <span
              key={index}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                opacity,
                display: "inline-block",
              }}
            >
              {word}
            </span>
          );
        })}
      </span>
    );
  }

  // Rough Notation
  if (animation === "roughNotation") {
    return (
      <span ref={textRef} className={className}>
        {children}
      </span>
    );
  }

  // Default (no animation)
  return <span className={className}>{children}</span>;
};
