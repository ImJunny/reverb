import { BackgroundContext } from "@/lib/hooks/useBackground";
import { useState, type ReactNode } from "react";

export function BackgroundColorProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<string>("#6b6b6b");
  const [imageUrl, setImageUrl] = useState<string>("");

  const resetColor = () => {
    setColor("#6b6b6b");
  };

  return (
    <BackgroundContext.Provider
      value={{ color, setColor, resetColor, imageUrl, setImageUrl }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}
