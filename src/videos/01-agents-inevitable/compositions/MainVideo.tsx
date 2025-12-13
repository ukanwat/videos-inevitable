import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { Opening } from "./Opening";
import { Section1Attention } from "./Section1Attention";
import { Section2RLHF } from "./Section2RLHF";
import { Section3FunctionCalling } from "./Section3FunctionCalling";
import { Section4Workflows } from "./Section4Workflows";
import { Section5Agents } from "./Section5Agents";
import { Closing } from "./Closing";

/**
 * MainVideo - Complete "Why AI Agents Were Inevitable" video
 * Total Duration: ~18:24 minutes (33,126 frames at 30fps)
 *
 * Timeline (based on voiceover transcription):
 * - Opening: 0-1729 (0:00-0:57.64s) - Introduction & Timeline
 * - Section 1 (Attention): 1729-10592 (0:57.64-5:53.07s) - How attention works
 * - Section 2 (RLHF): 10592-16293 (5:53.07-9:03.10s) - Teaching models what we want
 * - Section 3 (Function Calling): 16293-20232 (9:03.10-11:14.40s) - Giving models hands
 * - Section 4 (Workflows): 20232-24365 (11:14.40-13:32.17s) - Breaking down complexity
 * - Section 5 (Agents): 24305-30657 (13:30.17-17:01.90s) - When systems start thinking
 * - Closing: 30657-33126 (17:01.90-18:24.20s) - Complete chain & Thanks
 */
export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill className="bg-background">
      {/* Voiceover audio - plays from start until closing credits */}
      <Audio src={staticFile("voiceover.mp3")} />

      {/* Opening (0:00-0:57.76, 1733 frames) */}
      <Sequence durationInFrames={1733}>
        <Opening />
      </Sequence>

      {/* Section 1: Attention (0:57.76-5:53.18, 8862 frames) */}
      <Sequence from={1733} durationInFrames={8862}>
        <Section1Attention />
      </Sequence>

      {/* Section 2: RLHF (5:53.18-9:03.22, 5702 frames) */}
      <Sequence from={10595} durationInFrames={5702}>
        <Section2RLHF />
      </Sequence>

      {/* Section 3: Function Calling (9:03.22-11:14.52, 3939 frames) */}
      <Sequence from={16297} durationInFrames={3939}>
        <Section3FunctionCalling />
      </Sequence>

      {/* Section 4: Workflows (11:14.52-13:30.18, 4069 frames) */}
      <Sequence from={20236} durationInFrames={4069}>
        <Section4Workflows />
      </Sequence>

      {/* Section 5: Agents (13:30.17-17:01.90, 6352 frames) */}
      <Sequence from={24305} durationInFrames={6352}>
        <Section5Agents />
      </Sequence>

      {/* Closing: The Chain (17:01.90-18:24.20, 2469 frames) */}
      <Sequence from={30657} durationInFrames={2469}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
