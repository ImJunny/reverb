import { BackgroundContext } from "@/lib/hooks/useBackground";
import { useState, type ReactNode } from "react";

export function BackgroundColorProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<string>("#6b6b6b");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [type, setType] = useState<"default" | "gradient" | "blur">("default");
  const [moving, setMoving] = useState<boolean>(false);

  const resetColor = () => {
    setColor("#6b6b6b");
  };

  return (
    <BackgroundContext.Provider
      value={{
        color,
        setColor,
        resetColor,
        imageUrl,
        setImageUrl,
        type,
        setType,
        moving,
        setMoving,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}
