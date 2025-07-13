import { createContext, useContext } from "react";

type BackgroundContextType = {
  color: string;
  setColor: (color: string) => void;
  resetColor: () => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  type: "default" | "gradient" | "blur";
  setType: (type: "default" | "gradient" | "blur") => void;
  moving: boolean;
  setMoving: (moving: boolean) => void;
};

export const BackgroundContext = createContext<
  BackgroundContextType | undefined
>(undefined);

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("hooks must be used within a BackgroundProvider");
  }
  return context;
}
