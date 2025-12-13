import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "../../lib/utils";

interface TimelineEvent {
  marker: React.ReactNode; // Can be year text, logo, icon, or any component
  title: React.ReactNode; // Can be text or component
  content: React.ReactNode; // Can be text or component
}

interface TimelineProps {
  events: TimelineEvent[];
  startFrame?: number;
  eventDelay?: number;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  events,
  startFrame = 0,
  eventDelay = 25,
  className = "",
}) => {
  const frame = useCurrentFrame();

  // Vertical spacing for events
  const EVENT_HEIGHT = 320;
  const VIEWPORT_HEIGHT = 1080;
  const INITIAL_OFFSET = (VIEWPORT_HEIGHT / 2) - 100;

  // Camera pan animation
  const cameraY = interpolate(
    frame,
    [
      startFrame,
      startFrame + eventDelay,
      startFrame + eventDelay * 2,
      startFrame + eventDelay * 3,
      startFrame + eventDelay * 4,
    ],
    [
      INITIAL_OFFSET,
      INITIAL_OFFSET - EVENT_HEIGHT,
      INITIAL_OFFSET - EVENT_HEIGHT * 2,
      INITIAL_OFFSET - EVENT_HEIGHT * 3,
      INITIAL_OFFSET - EVENT_HEIGHT * 4,
    ],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Line drawing animation
  const lineHeight = interpolate(
    frame,
    [startFrame, startFrame + 60],
    [0, events.length * EVENT_HEIGHT],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Camera container */}
      <div
        className="absolute inset-0 flex items-start justify-center"
        style={{
          transform: `translateY(${cameraY}px)`,
        }}
      >
        <div className="relative w-full max-w-6xl px-20">
          {/* Vertical line */}
          <div
            className="absolute left-72 top-0 w-1 bg-gradient-to-b from-primary/30 via-primary to-accent"
            style={{ height: lineHeight }}
          />

          {/* Events */}
          {events.map((event, index) => {
            const eventStartFrame = startFrame + index * eventDelay;

            const eventOpacity = interpolate(
              frame,
              [eventStartFrame, eventStartFrame + 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const eventX = interpolate(
              frame,
              [eventStartFrame, eventStartFrame + 30],
              [-50, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const eventScale = interpolate(
              frame,
              [eventStartFrame, eventStartFrame + 20, eventStartFrame + 30],
              [0.9, 1.05, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={index}
                className="absolute left-0 right-0 flex items-start gap-24 pt-8"
                style={{
                  top: index * EVENT_HEIGHT,
                  opacity: eventOpacity,
                  transform: `translateX(${eventX}px) scale(${eventScale})`,
                }}
              >
                {/* Left - Marker (year, logo, icon, etc.) */}
                <div className="relative flex-shrink-0 w-64 flex items-start justify-end pr-6">
                  {event.marker}
                </div>

                {/* Right - Content */}
                <div className="flex-1 pt-1 pl-8">
                  <div className="mb-4">
                    {event.title}
                  </div>
                  <div>
                    {event.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
