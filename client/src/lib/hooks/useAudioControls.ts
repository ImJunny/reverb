import { createContext, useContext, type RefObject } from "react";

export const AudioControlsContext = createContext<
  | {
      audioRef: RefObject<HTMLAudioElement | null>;
      togglePlayback: () => void;
      trackInfo: {
        id: string;
        name: string;
        artists: string[];
        imageUrl: string;
      };
      setTrackInfo: (info: {
        id: string;
        name: string;
        artists: string[];
        imageUrl: string;
      }) => void;
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
