import { BackgroundContext } from "@/lib/hooks/useBackground";
import { getAverageColor } from "@/lib/scripts/getAverageColor";
import { useEffect, useState, type ReactNode } from "react";

export function BackgroundColorProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<string>("#565656");
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (imageUrl) {
        const avgColor = await getAverageColor(imageUrl);
        setColor(avgColor);
      }
    })();
  }, [setColor, imageUrl]);

  return (
    <BackgroundContext.Provider value={{ color, imageUrl, setImageUrl }}>
      {children}
    </BackgroundContext.Provider>
  );
}
