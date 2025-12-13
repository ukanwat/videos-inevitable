import { useCurrentFrame, interpolate } from "remotion";
import { codeToHtml } from "shiki";
import { useEffect, useState } from "react";
import { TIMING } from "../../lib/timing";
import { cn } from "../../lib/utils";

interface CodeBlockProps {
  code: string;
  language: string;
  startFrame?: number;
  linesToShow?: number[]; // Show only specific lines (1-indexed)
  highlightLines?: number[]; // Highlight these lines (1-indexed)
  lineDelay?: number; // Frames between each line reveal
  caption?: string; // Optional label
  showLineNumbers?: boolean;
  theme?: "github-dark" | "github-light";
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  startFrame = 0,
  linesToShow,
  highlightLines = [],
  lineDelay = TIMING.LINE_DELAY,
  caption,
  showLineNumbers = true,
  theme = "github-light",
  className = "",
}) => {
  const frame = useCurrentFrame();
  const [highlightedLines, setHighlightedLines] = useState<string[]>([]);

  // Generate syntax-highlighted HTML for each line separately
  useEffect(() => {
    const lines = code.split("\n");
    Promise.all(
      lines.map((line) =>
        codeToHtml(line, {
          lang: language,
          theme,
        }).then((html) => {
          // Extract just the inner content, preserving whitespace
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const codeElement = doc.querySelector("code");
          return codeElement?.innerHTML || line;
        })
      )
    ).then(setHighlightedLines);
  }, [code, language, theme]);

  const lines = code.split("\n");
  const displayLines = linesToShow
    ? lines.filter((_, i) => linesToShow.includes(i + 1))
    : lines;

  return (
    <div className={cn("code-block-container", className)}>
      {caption && (
        <div className="mb-2 text-sm font-medium text-muted-foreground">
          {caption}
        </div>
      )}
      <div className="relative overflow-hidden rounded-lg bg-muted border border">
        <div className="p-4 font-mono text-sm">
          {displayLines.map((line, displayIndex) => {
            // Get the original line index
            const originalLineIndex = linesToShow
              ? linesToShow[displayIndex] - 1
              : displayIndex;
            const lineNumber = linesToShow ? linesToShow[displayIndex] : displayIndex + 1;
            const isHighlighted = highlightLines.includes(lineNumber);

            // Calculate opacity for line-by-line reveal
            const opacity = interpolate(
              frame,
              [
                startFrame + displayIndex * lineDelay,
                startFrame + displayIndex * lineDelay + TIMING.QUICK,
              ],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            // Get highlighted HTML or fallback to plain text
            const lineHTML = highlightedLines[originalLineIndex] || line;

            return (
              <div
                key={displayIndex}
                className={cn(
                  "flex items-start transition-colors",
                  isHighlighted && "bg-[hsl(var(--purple)/0.15)] -mx-2 px-2 rounded border-l-2 border-[hsl(var(--purple))]"
                )}
                style={{ opacity }}
              >
                {showLineNumbers && (
                  <span className="inline-block w-8 text-right text-muted-foreground/50 select-none mr-4">
                    {lineNumber}
                  </span>
                )}
                <span
                  className="flex-1 whitespace-pre"
                  dangerouslySetInnerHTML={{
                    __html: lineHTML,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
