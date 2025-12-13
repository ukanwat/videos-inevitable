import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { TitleWithBackground } from "../../../components/text/TitleWithBackground";
import { BackgroundMedia } from "../../../components/media/BackgroundMedia";
import { TransformerDiagram } from "../../../components/diagram/TransformerDiagram";
import { TokenPredictionFlow } from "../components/AttentionPredictionFlow";
import { QKVComputation } from "../components/QKVComputation";
import { TemperatureComparison } from "../components/TemperatureComparison";
import { SequentialGeneration } from "../components/SequentialGeneration";
import { ChatBubble } from "../../../components/chat/ChatBubble";
import { FadeIn } from "../../../components/animation/FadeIn";

/**
 * Section 1: The Foundation - How Attention Actually Works
 * (30.96-206.84s, 8,815 frames total) - ALIGNED TO VOICEOVER
 *
 * Voiceover breakdown from transcription.csv:
 * 30.96-35.60s (139 frames): Title
 * 36.06-63.62s (826 frames): Decoder Overview
 * 64.28-93.92s (889 frames): Sentence Example
 * 94.98-134.34s (1181 frames): Q/K/V Computation
 * 135.64-182.18s (1397 frames): Attention Visualization
 * 182.90-241.24s (1750 frames): Temperature
 * 242.22-325.52s (2499 frames): GPT-3 Limitation (MASSIVELY EXPANDED)
 */
export const Section1Attention: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  return (
    <AbsoluteFill className="bg-background">
      {/* Part 1: Title (0-139 frames) */}
      {frame < 139 && (
        <TitleWithBackground
          title="The Foundation: How Attention Actually Works"
          backgroundType="image"
          backgroundSrc="assets/diagrams/s1-diagram-backpropagation.png"
          titleVariant="main"
          titleAnimation="slideUp"
          startFrame={0}
          durationInFrames={139}
          kenBurns={{ enabled: true, from: 1.0, to: 1.05 }}
          overlayOpacity={0.3}
        />
      )}

      {/* Part 2: Decoder Overview (160-986 frames) */}
      {frame >= 160 && frame < 986 && (
        <div className="absolute inset-0 flex items-center justify-center p-16">
          {/* Transformer Diagram (160-680) */}
          {frame < 680 && (
            <div
              style={{
                opacity: interpolate(frame, [160, 190, 650, 680], [0, 1, 1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div className="flex flex-col items-center space-y-12">
                <div className="flex-1 flex items-center justify-center">
                  <TransformerDiagram
                    startFrame={160}
                    highlightLayer={
                      frame > 450 && frame < 650 ? "decoder" : frame >= 650 ? "attention" : null
                    }
                  />
                </div>

                {/* Explanation text */}
                {frame >= 400 && frame < 650 && (
                  <FadeIn startFrame={400} duration={30}>
                    <p className="text-3xl text-center text-muted-foreground max-w-3xl">
                      Generate text{" "}
                      <span className="text-primary font-semibold">one word at a time</span>
                    </p>
                  </FadeIn>
                )}
              </div>
            </div>
          )}

          {/* Attention mechanism callout (700-986) - NO OVERLAY */}
          {frame >= 700 && (
            <FadeIn startFrame={700} duration={30}>
              <div className="text-center space-y-4">
                <p className="text-4xl font-bold text-primary">
                  Inside the decoder: The Attention Mechanism
                </p>
                <p className="text-2xl text-muted-foreground">
                  How does it know which previous words matter?
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      )}

      {/* Part 3: Sentence Example (1004-1893 frames) - NEW SEGMENT */}
      {frame >= 1004 && frame < 1893 && (
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <FadeIn startFrame={1004} duration={30}>
            <div className="max-w-6xl space-y-16">
              {/* The sentence */}
              <div className="text-center">
                <p className="text-6xl font-bold text-foreground mb-8 ">
                  "The cat sat on the mat"
                </p>
                <p className="text-3xl text-muted-foreground">
                  We're at the last word:{" "}
                  <span className="text-primary font-semibold">"mat"</span>
                </p>
              </div>

              {/* Word importance visualization */}
              {frame >= 1200 && (
                <div className="grid grid-cols-4 gap-6">
                  {[
                    { word: "cat", important: false, reason: "Probably Not" },
                    { word: "sat", important: false, reason: "Probably Not" },
                    { word: "on", important: true, reason: "Very Important" },
                    { word: "the", important: true, reason: "Very Important" },
                  ].map(({ word, important, reason }, i) => (
                    <div
                      key={word}
                      style={{
                        opacity: interpolate(
                          frame,
                          [1200 + i * 60, 1200 + i * 60 + 40],
                          [0, 1],
                          {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                          }
                        ),
                      }}
                    >
                      <div
                        className={`p-8 rounded-xl border-2 transition-all ${
                          important
                            ? "bg-primary/20 border-primary"
                            : "bg-muted/10 border-muted opacity-40"
                        }`}
                      >
                        <p className="text-4xl font-mono font-bold text-center mb-4">
                          "{word}"
                        </p>
                        <p
                          className={`text-xl text-center font-semibold ${
                            important ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {important ? "✓" : "×"} {reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Key insight */}
              {frame >= 1620 && (
                <FadeIn startFrame={1620} duration={30}>
                  <p className="text-3xl text-center text-primary font-semibold">
                    That's what attention solves: figuring out which words to focus on
                  </p>
                </FadeIn>
              )}
            </div>
          </FadeIn>
        </div>
      )}

      {/* Part 4: Q/K/V Computation (1893-3074 frames) */}
      {frame >= 1893 && frame < 3074 && (
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div
            style={{
              opacity: interpolate(frame, [1893, 1923, 3044, 3074], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div className="max-w-6xl">
              <div className="text-center mb-8">
                <p className="text-3xl font-semibold text-foreground">
                  Computing Attention: Query, Key, Value
                </p>
              </div>
              <QKVComputation
                token="mat"
                previousTokens={["the", "on", "sat", "cat"]}
                startFrame={1893}
              />
            </div>
          </div>
        </div>
      )}

      {/* Part 5: Attention Visualization (3119-4516 frames) - FIXED OVERLAY */}
      {frame >= 3119 && frame < 4516 && (
        <div className="absolute inset-0 flex items-center justify-center p-16">
          {/* Visualization fades out first (3119-3950) */}
          {frame < 3950 && (
            <div
              style={{
                opacity: interpolate(frame, [3119, 3150, 3850, 3950], [0, 1, 1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <TokenPredictionFlow startFrame={3119} />
            </div>
          )}

          {/* Then learned patterns text appears (3900-4516) - NO OVERLAY */}
          {frame >= 3900 && (
            <div
              className="max-w-5xl"
              style={{
                opacity: interpolate(frame, [3900, 3960], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div className="space-y-12">
                <p className="text-4xl text-center text-foreground font-semibold">
                  The model learned from{" "}
                  <span className="text-primary">billions of examples</span>
                </p>

                <div className="bg-muted/20 border-2 border-muted rounded-2xl p-12">
                  <div className="flex items-center justify-center gap-8 text-3xl font-mono mb-6">
                    <span className="text-foreground">"on the mat"</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-foreground">"on the floor"</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-foreground">"on the table"</span>
                  </div>
                  <p className="text-2xl text-center text-muted-foreground">
                    → After "on the", expect a surface
                  </p>
                </div>

                <p className="text-3xl text-center text-primary italic">
                  No explicit rules. Just patterns emerging from data.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Part 6: Temperature (4561-6311 frames) */}
      {frame >= 4561 && frame < 6311 && (
        <div className="absolute inset-0">
          {/* B-roll intro (4561-4650) */}
          {frame < 4650 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <BackgroundMedia
                type="video"
                src="assets/b-roll/data-flowing.mp4"
                startFrame={4561}
                durationInFrames={89}
                overlay={{ enabled: true, opacity: 0.2 }}
                kenBurns={{ enabled: true, from: 1.0, to: 1.1 }}
                video={{ loop: true, muted: true, startFrom: 0 }}
              />
              <div className="relative z-10 text-center">
                <p className="text-5xl text-white font-bold drop-shadow-lg">
                  But when you generate, you're sampling from probabilities
                </p>
              </div>
            </div>
          )}

          {/* Temperature Comparison (4650-5850) */}
          {frame >= 4650 && frame < 5850 && (
            <div className="absolute inset-0 flex items-center justify-center p-16">
              <div
                style={{
                  opacity: interpolate(frame, [4650, 4680, 5820, 5850], [0, 1, 1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <TemperatureComparison startFrame={4650} />
              </div>
            </div>
          )}

          {/* Sequential Generation (5850-6311) */}
          {frame >= 5850 && (
            <div className="absolute inset-0 flex items-center justify-center p-16">
              <div
                style={{
                  opacity: interpolate(frame, [5850, 5880], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <SequentialGeneration startFrame={5850} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Part 7: GPT-3 Limitation (6333-8832 frames) - MASSIVELY EXPANDED */}
      {frame >= 6333 && (
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div
            style={{
              opacity: interpolate(frame, [6333, 6363], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div className="max-w-6xl space-y-12">
              {/* Impressive examples (6333-6700) - ACTUAL code and styles */}
              {frame < 6700 && (
                <div className="space-y-10">
                  <p className="text-4xl text-center text-foreground font-bold">
                    GPT-3 was impressive
                  </p>

                  {/* Code completion example */}
                  {frame >= 6400 && (
                    <FadeIn startFrame={6400} duration={30}>
                      <div className="bg-black/90 rounded-lg p-6 font-mono text-lg">
                        <span className="text-gray-400"># Complete this function</span>
                        <br />
                        <span className="text-blue-400">def</span>{" "}
                        <span className="text-yellow-300">fibonacci</span>
                        <span className="text-white">(n):</span>
                        <br />
                        <span className="text-green-400">
                          {"    "}if n &lt;= 1: return n
                        </span>
                        <br />
                        <span className="text-green-400">
                          {"    "}return fibonacci(n-1) + fibonacci(n-2)
                        </span>
                      </div>
                    </FadeIn>
                  )}

                  {/* Writing styles example */}
                  {frame >= 6500 && (
                    <FadeIn startFrame={6500} duration={30}>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="bg-accent/10 rounded-xl p-6 border-2 border-accent">
                          <p className="text-sm text-muted-foreground mb-2">Formal</p>
                          <p className="text-xl text-foreground">
                            "The weather is quite pleasant today."
                          </p>
                        </div>
                        <div className="bg-accent/10 rounded-xl p-6 border-2 border-accent">
                          <p className="text-sm text-muted-foreground mb-2">Casual</p>
                          <p className="text-xl text-foreground">"Weather's nice today!"</p>
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>
              )}

              {/* Question appears (6700-7100) - just the chat, no redundant text */}
              {frame >= 6700 && frame < 7100 && (
                <FadeIn startFrame={6700} duration={30}>
                  <div className="space-y-8">
                    <p className="text-3xl text-center text-muted-foreground">
                      But then you ask a simple question...
                    </p>
                    <div className="flex justify-start">
                      <ChatBubble
                        role="user"
                        message="What's the capital of France?"
                        startFrame={6700}
                      />
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Unhelpful response (7100-7700) */}
              {frame >= 7100 && frame < 7700 && (
                <div className="space-y-6">
                  <div className="flex justify-start">
                    <ChatBubble
                      role="user"
                      message="What's the capital of France?"
                      startFrame={7100}
                    />
                  </div>
                  <FadeIn startFrame={7150} duration={30}>
                    <div className="flex justify-end">
                      <ChatBubble
                        role="assistant"
                        message="What's the capital of Spain? What's the capital of Germany? The weather is nice today. Did you know France has excellent wine? Speaking of wine, I once read about..."
                        startFrame={7150}
                      />
                    </div>
                  </FadeIn>
                  {frame >= 7400 && (
                    <FadeIn startFrame={7400} duration={30}>
                      <p className="text-2xl text-center text-destructive font-semibold">
                        Not exactly helpful...
                      </p>
                    </FadeIn>
                  )}
                </div>
              )}

              {/* Training objective (7700-8100) - minimal, not redundant */}
              {frame >= 7700 && frame < 8100 && (
                <FadeIn startFrame={7700} duration={30}>
                  <div className="space-y-8">
                    <p className="text-3xl text-center text-muted-foreground">
                      Because it was trained with one objective:
                    </p>
                    <div className="p-12 bg-muted/20 border-4 border-primary rounded-2xl">
                      <p className="text-5xl font-mono text-primary text-center font-bold">
                        Predict next word
                      </p>
                      <p className="text-2xl text-center text-muted-foreground mt-6">
                        Based on:{" "}
                        <span className="font-semibold text-foreground">
                          all previous words
                        </span>
                      </p>
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Forum thread example (8100-8500) - SHOW the rambling */}
              {frame >= 8100 && frame < 8500 && (
                <FadeIn startFrame={8100} duration={30}>
                  <div className="space-y-6">
                    <p className="text-3xl text-center text-muted-foreground">
                      And it learned from internet text like this:
                    </p>
                    <div className="bg-muted/10 border-2 border-muted rounded-xl p-8 space-y-6">
                      {/* First post */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                          👤
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">
                            User123 · 2 hours ago
                          </p>
                          <p className="text-lg text-foreground">
                            What's the capital of France?
                          </p>
                        </div>
                      </div>

                      {/* Second post - starts rambling */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-xl">
                          👤
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">
                            RandomGuy · 1 hour ago
                          </p>
                          <p className="text-lg text-foreground">
                            I think it's Paris but I'm not 100% sure. Speaking of France, has
                            anyone tried French wine? I went to Bordeaux last year and...
                          </p>
                        </div>
                      </div>

                      {/* Third post - completely off topic */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center text-xl">
                          👤
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">
                            TopicDrifter · 30 min ago
                          </p>
                          <p className="text-lg text-foreground">
                            Bordeaux is great! But have you been to Spain? Madrid is amazing.
                            Also what's the weather like in Germany this time of year?
                          </p>
                        </div>
                      </div>

                      <p className="text-base text-destructive italic text-center pt-4 border-t border-muted">
                        ← This is what the model learned from
                      </p>
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Core limitation (8500+) - clean visual */}
              {frame >= 8500 && (
                <FadeIn startFrame={8500} duration={40}>
                  <div className="space-y-12 text-center">
                    <div className="inline-block px-12 py-6 bg-destructive/20 border-4 border-destructive rounded-2xl">
                      <p className="text-5xl font-bold text-destructive">Limitation #1</p>
                    </div>

                    <div className="space-y-8">
                      <p className="text-6xl font-bold text-foreground">Prediction Engine</p>
                      <p className="text-5xl text-muted-foreground">≠</p>
                      <p className="text-6xl font-bold text-primary">Helpful Assistant</p>
                    </div>

                    {frame >= 8650 && (
                      <FadeIn startFrame={8650} duration={30}>
                        <p className="text-3xl text-muted-foreground italic max-w-4xl mx-auto">
                          It just predicts what's likely to come next based on internet text.
                          Not what would actually help you.
                        </p>
                      </FadeIn>
                    )}
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
