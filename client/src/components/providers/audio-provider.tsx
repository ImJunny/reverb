import { AudioContext } from "@/lib/hooks/useAudio";
import { useRef, useState, type ReactNode } from "react";

export function AudioProvider({ children }: { children: ReactNode }) {
  const [trackInfo, setTrackInfo] = useState<{
    id: string;
    name: string;
    artists: string[];
    imageUrl: string;
  } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        trackInfo,
        setTrackInfo,
        playing,
        setPlaying,
        currentTime,
        setCurrentTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
