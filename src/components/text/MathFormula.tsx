import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { FadeIn } from "../animation/FadeIn";
import { TIMING } from "../../lib/timing";
import { cn } from "../../lib/utils";

interface MathFormulaProps {
  latex: string;
  inline?: boolean;
  startFrame?: number;
  duration?: number;
  highlightTerms?: string[]; // Terms to emphasize (future feature)
  stepByStep?: boolean; // Reveal term by term (future feature)
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  latex,
  inline = false,
  startFrame = 0,
  duration = TIMING.NORMAL,
  className = "",
}) => {
  const formulaElement = inline ? (
    <span className={cn("inline-math", className)}>
      <InlineMath math={latex} />
    </span>
  ) : (
    <div
      className={cn(
        "block-math my-4 p-4 bg-muted rounded-lg border border",
        className
      )}
    >
      <BlockMath math={latex} />
    </div>
  );

  return (
    <FadeIn startFrame={startFrame} duration={duration}>
      {formulaElement}
    </FadeIn>
  );
};
