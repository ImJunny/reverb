import { createContext, useContext } from "react";

export type AudioControlsContextType = {
  url: string | null;
  setUrl: (url: string | null) => void;
};

export const AudioControlsContext = createContext<
  AudioControlsContextType | undefined
>(undefined);

export function useAudioControls() {
  const context = useContext(AudioControlsContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
