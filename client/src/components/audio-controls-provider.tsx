import { AudioControlsContext } from "@/lib/hooks/useAudioControls";
import { useRef, useState, type ReactNode } from "react";

export function AudioControlsProvider({ children }: { children: ReactNode }) {
  const [trackInfo, setTrackInfo] = useState<{
    id: string;
    name: string;
    artists: string[];
    imageUrl: string;
  }>({
    id: "",
    name: "",
    artists: [],
    imageUrl: "",
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const togglePlayback = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <AudioControlsContext.Provider
      value={{
        audioRef,
        togglePlayback,
        trackInfo,
        setTrackInfo,
      }}
    >
      {children}
    </AudioControlsContext.Provider>
  );
}
