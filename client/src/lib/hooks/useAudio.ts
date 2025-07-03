import { createContext, useContext, type RefObject } from "react";

type AudioContextType =
  | {
      audioRef: RefObject<HTMLAudioElement | null>;
      trackInfo: {
        id: string;
        name: string;
        artists: string[];
        imageUrl: string;
      } | null;

      setTrackInfo: (
        info: {
          id: string;
          name: string;
          artists: string[];
          imageUrl: string;
        } | null,
      ) => void;
      playing: boolean;
      setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
      currentTime: number;
      setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    }
  | undefined;

export const AudioContext = createContext<AudioContextType>(undefined);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
