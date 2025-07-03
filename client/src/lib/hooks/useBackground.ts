import { createContext, useContext } from "react";

type BackgroundContextType = {
  color: string;
  resetColor: () => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
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
