import { AudioControlsContext } from "@/lib/hooks/useAudioControls";
import { useRef, useState, type ReactNode } from "react";

export function AudioControlsProvider({ children }: { children: ReactNode }) {
  const [trackId, setTrackId] = useState<string | undefined>(undefined);
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
      value={{ trackId, setTrackId, audioRef, togglePlayback }}
    >
      {children}
    </AudioControlsContext.Provider>
  );
}
