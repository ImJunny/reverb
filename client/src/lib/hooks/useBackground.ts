import { createContext, useContext } from "react";

export const BackgroundContext = createContext<
  BackgroundContextType | undefined
>(undefined);

export type BackgroundContextType = {
  color: string;
  imageUrl: string;
  setImageUrl: (url: string) => void;
};

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("hooks must be used within a BackgroundProvider");
  }
  return context;
}
