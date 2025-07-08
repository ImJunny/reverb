import { BackgroundContext } from "@/lib/hooks/useBackground";
import { getAverageColor } from "@/lib/scripts/getAverageColor";
import { useEffect, useState, type ReactNode } from "react";

export function BackgroundColorProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<string>("#1f1f1f");
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
    setColor("#1f1f1f");
  };

  return (
    <BackgroundContext.Provider
      value={{ color, resetColor, imageUrl, setImageUrl }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}
