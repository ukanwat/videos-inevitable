import { useCurrentFrame, interpolate } from "remotion";
import { TIMING } from "../../lib/timing";
import { cn } from "../../lib/utils";

interface TransformerDiagramProps {
  startFrame?: number;
  highlightLayer?: "encoder" | "decoder" | "attention" | null;
  className?: string;
}

export const TransformerDiagram: React.FC<TransformerDiagramProps> = ({
  startFrame = 0,
  highlightLayer = null,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  // Main diagram fade in
  const opacity = interpolate(
    relativeFrame,
    [0, TIMING.NORMAL],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Zoom effect when highlighting attention
  const scale = highlightLayer === "attention"
    ? interpolate(
      relativeFrame,
      [TIMING.NORMAL, TIMING.NORMAL + TIMING.SLOW],
      [1, 1.4],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    )
    : highlightLayer === "decoder"
      ? interpolate(
        relativeFrame,
        [TIMING.NORMAL, TIMING.NORMAL + TIMING.QUICK],
        [1, 1.1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }
      )
      : 1;

  // Token generation animation
  const tokensVisible = Math.floor(
    interpolate(relativeFrame, [0, 180], [0, 7], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const tokens = ["The", "cat", "sat", "on", "the", "mat", ""];

  return (
    <div
      className={cn("flex flex-col items-center justify-center w-full", className)}
      style={{ opacity }}
    >
      {/* Token generation flow */}
      <div className="mb-16">
        <div className="flex items-center gap-3">
          {tokens.slice(0, tokensVisible).map((token, i) => (
            <div
              key={i}
              className="relative"
              style={{
                opacity: interpolate(
                  relativeFrame,
                  [i * 25, i * 25 + 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                transform: `translateY(${interpolate(
                  relativeFrame,
                  [i * 25, i * 25 + 20],
                  [20, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )}px)`,
              }}
            >
              <div className="px-4 py-2 bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/40 rounded-lg backdrop-blur-sm">
                <span className="font-mono text-sm font-semibold text-foreground">
                  {token || "..."}
                </span>
              </div>
              {/* Arrow to next token */}
              {i < tokensVisible - 1 && (
                <div
                  className="absolute -right-2.5 top-1/2 -translate-y-1/2 text-primary/60"
                  style={{
                    opacity: interpolate(
                      relativeFrame,
                      [(i + 1) * 25 - 5, (i + 1) * 25],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    ),
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M4 2 L8 6 L4 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-center mt-4 text-sm text-muted-foreground">
          Left-to-right generation, one token at a time
        </p>
      </div>

      {/* Decoder block */}
      <div
        className="relative transition-transform duration-500"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        {/* Main decoder container */}
        <div
          className={cn(
            "relative p-8 rounded-2xl border-2 transition-all duration-500",
            highlightLayer === "decoder"
              ? "bg-primary/10 border-primary shadow-2xl shadow-primary/20"
              : "bg-card/50 border-border backdrop-blur-sm"
          )}
          style={{
            width: "480px",
          }}
        >
          {/* Title */}
          <div className="mb-6 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              Decoder Block
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Processes tokens sequentially
            </p>
          </div>

          {/* Attention layer */}
          <div
            className={cn(
              "relative p-6 rounded-xl mb-4 transition-all duration-500",
              highlightLayer === "attention"
                ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-2 border-yellow-500 shadow-lg shadow-yellow-500/20"
                : "bg-muted/30 border border-border"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">
                Self-Attention
              </span>
              {highlightLayer === "attention" && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                    Active
                  </span>
                </div>
              )}
            </div>

            {/* Attention mechanism visualization */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span className="text-xs text-muted-foreground">Query (Q)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-chart-1" />
                  <span className="text-xs text-muted-foreground">Key (K)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-chart-2" />
                  <span className="text-xs text-muted-foreground">Value (V)</span>
                </div>
              </div>
              <div
                className="text-2xl text-muted-foreground"
                style={{
                  opacity: highlightLayer === "attention" ? 1 : 0.3,
                }}
              >
                →
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/40 flex items-center justify-center">
                  <span className="text-xs font-mono font-semibold">
                    Attention
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Forward layer */}
          <div className="p-4 rounded-xl bg-muted/20 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Feed Forward
              </span>
              <div className="text-xl text-muted-foreground/50">⚡</div>
            </div>
          </div>

          {/* Data flow indicators */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <svg width="2" height="24" className="mb-1">
              <line x1="1" y1="0" x2="1" y2="24" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="4 2" />
            </svg>
            <div className="px-3 py-1 bg-background border border-border rounded-full">
              <span className="text-xs font-mono text-muted-foreground">Input</span>
            </div>
          </div>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="px-3 py-1 bg-background border border-border rounded-full">
              <span className="text-xs font-mono text-muted-foreground">Output</span>
            </div>
            <svg width="2" height="24" className="mt-1">
              <line x1="1" y1="0" x2="1" y2="24" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="4 2" />
            </svg>
          </div>

          {/* Glow effect when highlighted */}
          {(highlightLayer === "decoder" || highlightLayer === "attention") && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: `0 0 60px ${highlightLayer === "attention"
                    ? "rgba(234, 179, 8, 0.3)"
                    : "rgba(59, 130, 246, 0.2)"
                  }`,
                opacity: interpolate(
                  relativeFrame,
                  [TIMING.NORMAL, TIMING.NORMAL + TIMING.QUICK],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
              }}
            />
          )}
        </div>

        {/* Stack indicator (showing this is one of many layers) */}
        <div className="absolute left-2 top-2 -z-10 w-full h-full rounded-2xl bg-card/20 border border-border/50" />
        <div className="absolute left-4 top-4 -z-20 w-full h-full rounded-2xl bg-card/10 border border-border/30" />
      </div>
    </div>
  );
};
