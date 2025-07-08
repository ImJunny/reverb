import {
  createContext,
  useContext,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import type { TrackInfoItem } from "shared/types";

type AudioContextType =
  | {
      audioRef: RefObject<HTMLAudioElement | null>;
      trackInfo: TrackInfoItem | null;
      setTrackInfo: Dispatch<SetStateAction<TrackInfoItem | null>>;
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
