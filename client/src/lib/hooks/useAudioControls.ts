import { createContext, useContext, type RefObject } from "react";

export const AudioControlsContext = createContext<
  | {
      trackId: string | undefined;
      setTrackId: (songId: string | undefined) => void;
      audioRef: RefObject<HTMLAudioElement | null>;
      togglePlayback: () => void;
    }
  | undefined
>(undefined);

export function useAudioControls() {
  const context = useContext(AudioControlsContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
