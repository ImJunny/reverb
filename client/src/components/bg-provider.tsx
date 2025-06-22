import { BackgroundColorContext } from "@/lib/hooks/useBackgroundColor";
import { useState, type ReactNode } from "react";

export function BackgroundColorProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<string>("#000000");

  return (
    <BackgroundColorContext.Provider value={{ color, setColor }}>
      {children}
    </BackgroundColorContext.Provider>
  );
}
