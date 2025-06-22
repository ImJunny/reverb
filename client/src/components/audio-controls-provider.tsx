import { AudioControlsContext } from "@/lib/hooks/useAudioControls";
import { useState, type ReactNode } from "react";

export function AudioControlsProvider({ children }: { children: ReactNode }) {
  const [url, setUrl] = useState<string | null>(null);

  return (
    <AudioControlsContext.Provider value={{ url, setUrl }}>
      {children}
    </AudioControlsContext.Provider>
  );
}
