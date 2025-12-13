import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { TitleWithBackground } from "../../../components/text/TitleWithBackground";
import { BackgroundMedia } from "../../../components/media/BackgroundMedia";
import { SplitView } from "../../../components/layout/SplitView";
import { ChatBubble } from "../../../components/chat/ChatBubble";
import { RLHFPipelineClean } from "../components/RLHFPipeline";
import { PPOObjectiveExplainer } from "../components/PPOObjectiveExplainer";
import { FadeIn } from "../../../components/animation/FadeIn";
import { XCircle, CheckCircle, Star, ThumbsUp, ArrowRight } from "lucide-react";

/**
 * Section 2: Teaching Models What We Want - RLHF
 * (5:51.00-9:01.46, 5,654 frames total) - WITH VOICEOVER
 *
 * Voiceover breakdown:
 * 353.18-360.28s: Introduction
 * 361.18-380.76s: Problem setup - why loss functions don't work
 * 381.74-400.20s: Comparison insight - humans vs absolute scales
 * 401.20-430.10s: Process explanation - building reward model
 * 431.10-452.40s: Three stages of RLHF
 * 453.20-508.30s: PPO, constraints, KL divergence
 * 508.30-541.64s: Before/After RLHF examples, limitation two
 *
 * Part 1 (0-218): Title screen
 * Part 2 (218-833): Problem Setup - Just background
 * Part 3 (862-1416): Comparison Insight - Visual comparison
 * Part 4 (1446-2313): Process Explanation - Simple flow
 * Part 5 (2343-2982): Three Stages of RLHF - Full pipeline
 * Part 6 (3006-4659): PPO Math with constraints
 * Part 7 (4659-5659): Before/After + Limitation two
 */
export const Section2RLHF: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-background p-16" style={{ opacity: fadeIn }}>
      {/* ========== PART 1: Title Screen (0-218 frames) ========== */}
      {frame < 218 && (
        <TitleWithBackground
          title="Teaching Models What We Want"
          backgroundType="image"
          backgroundSrc="assets/screenshots/s1-screenshot-gpt3-response.png"
          titleVariant="main"
          titleAnimation="slideUp"
          startFrame={0}
          durationInFrames={218}
          kenBurns={{ enabled: true, from: 1.0, to: 1.08 }}
          overlayOpacity={0.25}
        />
      )}

      {/* ========== PART 2: Problem Setup (218-833 frames) ========== */}
      {/* Voiceover: "You can't just write a loss function... human preferences" */}
      {frame >= 218 && frame < 833 && (
        <div className="absolute inset-0">
          <BackgroundMedia
            type="image"
            src="assets/screenshots/s1-screenshot-gpt3-response.png"
            startFrame={218}
            durationInFrames={615}
            overlay={{ enabled: true, opacity: 0.6 }}
            kenBurns={{ enabled: true, from: 1.0, to: 1.1 }}
          />
        </div>
      )}

      {/* ========== PART 3: Comparison Insight (862-1416 frames) ========== */}
      {/* Voiceover: "Humans terrible at absolute scales... excellent at comparisons" */}
      {frame >= 862 && frame < 1416 && (
        <div className="absolute inset-0 flex items-center justify-center px-16">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-2 gap-16">
              {/* Left: Absolute rating - show confused rating */}
              <div className="flex flex-col items-center justify-center">
                <FadeIn startFrame={920} duration={30}>
                  <div className="space-y-8">
                    <div className="flex justify-center">
                      <XCircle size={64} className="text-destructive" strokeWidth={2} />
                    </div>

                    {/* Show response to rate */}
                    <div className="bg-accent/20 border-2 border-accent rounded-xl p-6">
                      <ChatBubble
                        role="assistant"
                        message="Paris is the capital of France."
                        startFrame={920}
                      />
                    </div>

                    {/* Rating confusion */}
                    <div className="bg-destructive/10 border-2 border-destructive rounded-xl p-8">
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(10)].map((_, i) => (
                          <Star
                            key={i}
                            size={28}
                            className={
                              i < 7 ? "text-yellow-500 fill-yellow-500" :
                              i === 7 ? "text-yellow-500/50 fill-yellow-500/50" :
                              "text-gray-400"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-3xl text-center text-destructive font-bold">7? 8?</p>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Right: Comparison - show two responses side by side */}
              <div className="flex flex-col items-center justify-center">
                {frame >= 1120 && (
                  <FadeIn startFrame={1120} duration={30}>
                    <div className="space-y-8">
                      <div className="flex justify-center">
                        <CheckCircle size={64} className="text-green-600" strokeWidth={2} />
                      </div>

                      {/* Response A - Good */}
                      <div className="bg-green-500/10 border-2 border-green-600 rounded-xl p-6 relative">
                        <ChatBubble
                          role="assistant"
                          message="Paris is the capital of France."
                          startFrame={1120}
                        />
                        <div className="absolute -top-3 -right-3 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                          <ThumbsUp size={24} />
                        </div>
                      </div>

                      <p className="text-2xl text-center font-bold text-green-600">vs</p>

                      {/* Response B - Bad */}
                      <div className="bg-muted/30 border border-muted rounded-xl p-6 opacity-60">
                        <ChatBubble
                          role="assistant"
                          message="What's the capital of Spain? What's the capital of Germany?..."
                          startFrame={1120}
                        />
                      </div>
                    </div>
                  </FadeIn>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== PART 4: Process Explanation (1446-2313 frames) ========== */}
      {/* Voiceover: "Generate two responses... train reward model... RLHF" */}
      {frame >= 1446 && frame < 2313 && (
        <div className="absolute inset-0 flex items-center justify-center px-16">
          <div className="max-w-5xl w-full">
            {/* Simple visual flow */}
            <FadeIn startFrame={1446} duration={30}>
              <div className="flex items-center justify-between gap-8">
                {/* Step 1: Question → Two responses */}
                <div className="flex-1 bg-accent/10 rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <div className="text-xl text-foreground font-semibold mb-3">Question</div>
                  <div className="flex gap-3 justify-center mt-6">
                    <div className="bg-primary/10 rounded-lg p-4 flex-1">A</div>
                    <div className="bg-primary/10 rounded-lg p-4 flex-1">B</div>
                  </div>
                </div>

                <ArrowRight size={48} className="text-primary flex-shrink-0" strokeWidth={2} />

                {/* Step 2: Human picks */}
                <div className="flex-1 bg-accent/10 rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">👤</div>
                  <div className="text-xl text-foreground font-semibold mb-3">Human picks</div>
                  <div className="flex gap-3 justify-center mt-6">
                    <div className="bg-green-500/20 border-2 border-green-600 rounded-lg p-4 flex-1">A ✓</div>
                    <div className="bg-muted/30 rounded-lg p-4 flex-1 opacity-50">B</div>
                  </div>
                </div>

                <ArrowRight size={48} className="text-primary flex-shrink-0" strokeWidth={2} />

                {/* Step 3: Train model */}
                <div className="flex-1 bg-accent/10 rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">🧠</div>
                  <div className="text-xl text-foreground font-semibold mb-3">Reward Model</div>
                  <div className="text-sm text-muted-foreground mt-6">
                    Learns human preferences
                  </div>
                </div>
              </div>

              {/* RLHF Label */}
              {frame >= 2166 && (
                <div
                  className="mt-16 text-center"
                  style={{
                    opacity: interpolate(frame, [2166, 2196], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <h2 className="text-7xl font-bold text-primary mb-4">RLHF</h2>
                  <p className="text-2xl text-muted-foreground">
                    Reinforcement Learning from Human Feedback
                  </p>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      )}

      {/* ========== PART 5: Three Stages (2343-2982 frames) ========== */}
      {/* Voiceover: "Three stages. Stage one... Stage two... Stage three..." */}
      {frame >= 2343 && frame < 2982 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <RLHFPipelineClean startFrame={2343} />
        </div>
      )}

      {/* ========== PART 6: PPO Deep Dive (3006-4659 frames) ========== */}
      {/* Voiceover: "But here's the catch... KL divergence... beta parameter..." */}
      {frame >= 3006 && frame < 4659 && (
        <div className="absolute inset-0 p-12 flex items-center justify-center">
          <PPOObjectiveExplainer startFrame={3006} />
        </div>
      )}

      {/* ========== PART 7: Before/After + Limitation (4659-5659 frames) ========== */}
      {/* Voiceover: "Before RLHF... After RLHF... can't check weather... Limitation two" */}
      {frame >= 4659 && (
        <div className="absolute inset-0 flex items-center justify-center px-16">
          {/* Before/After comparison - stays visible */}
          {frame < 5225 && (
            <SplitView
              left={
                <div className="space-y-5">
                  <h3 className="text-2xl font-semibold text-muted-foreground text-center mb-8">
                    Before RLHF
                  </h3>
                  <ChatBubble
                    role="user"
                    message="What's the weather?"
                    startFrame={frame - 4659}
                  />
                  <ChatBubble
                    role="assistant"
                    message="The weather is the state of the atmosphere..."
                    startFrame={frame - 4659 + 50}
                  />
                  <div className="flex items-center justify-center gap-2 mt-5">
                    <XCircle size={20} className="text-destructive" />
                    <p className="text-base text-destructive font-medium">Unhelpful</p>
                  </div>
                </div>
              }
              right={
                frame >= 4969 ? (
                  <div className="space-y-5">
                    <h3 className="text-2xl font-semibold text-primary text-center mb-8">
                      After RLHF
                    </h3>
                    <ChatBubble
                      role="user"
                      message="What's the weather?"
                      startFrame={frame - 4969}
                    />
                    <ChatBubble
                      role="assistant"
                      message="I don't have access to current weather data, but I can help you find it. What location are you asking about?"
                      startFrame={frame - 4969 + 50}
                    />
                    <div className="flex items-center justify-center gap-2 mt-5">
                      <CheckCircle size={20} className="text-green-600" />
                      <p className="text-base text-green-600 font-medium">Helpful</p>
                    </div>
                  </div>
                ) : (
                  <div />
                )
              }
              startFrame={4659}
            />
          )}

          {/* Limitation - fades in and replaces the comparison */}
          {frame >= 5225 && (
            <FadeIn startFrame={5225} duration={40}>
              <div className="text-center max-w-3xl space-y-8">
                <div className="space-y-4">
                  <p className="text-3xl text-destructive font-semibold">
                    Limitation #2
                  </p>
                  <p className="text-5xl font-bold text-foreground">
                    Can't take real actions
                  </p>
                </div>
                <p className="text-2xl text-muted-foreground">
                  It's still just generating text
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
