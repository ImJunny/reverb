import { createContext, useContext } from "react";

export const BackgroundColorContext = createContext<
  BackgroundColorContextType | undefined
>(undefined);

export type BackgroundColorContextType = {
  color: string;
  setColor: (color: string) => void;
};

export function useBackgroundColor() {
  const context = useContext(BackgroundColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
