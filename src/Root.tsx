import "./index.css";
import { Composition } from "remotion";
import { AgentsInevitableVideo, agentsInevitableMetadata } from "./videos";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video 1: Why AI Agents Were Inevitable */}
      <Composition
        id={agentsInevitableMetadata.id}
        component={AgentsInevitableVideo}
        durationInFrames={agentsInevitableMetadata.durationInFrames}
        fps={agentsInevitableMetadata.fps}
        width={agentsInevitableMetadata.width}
        height={agentsInevitableMetadata.height}
      />
    </>
  );
};
