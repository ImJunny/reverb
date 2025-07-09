import { BackgroundContext } from "@/lib/hooks/useBackground";
import { getAverageColor } from "@/lib/scripts/getAverageColor";
import { useEffect, useState, type ReactNode } from "react";

export function BackgroundColorProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<string>("#6b6b6b");
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (imageUrl) {
        const avgColor = await getAverageColor(imageUrl);
        setColor(avgColor);
      }
    })();
  }, [imageUrl]);

  const resetColor = () => {
    setColor("#6b6b6b");
  };

  return (
    <BackgroundContext.Provider
      value={{ color, resetColor, imageUrl, setImageUrl }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}
