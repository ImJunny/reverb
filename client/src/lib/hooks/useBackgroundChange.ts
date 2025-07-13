import { useEffect } from "react";
import { useAverageColor } from "./useAverageColor";
import { useBackground } from "./useBackground";

export function useBackgroundChange(options: {
  imageUrl?: string | undefined;
  type?: "default" | "blur" | "gradient";
  saturate?: number;
  affectBackground?: boolean;
  moving?: boolean;
  resetColor?: boolean;
}) {
  const {
    imageUrl,
    type,
    affectBackground = true,
    moving = false,
    resetColor,
  } = options;
  const {
    setColor,
    setImageUrl,
    setType,
    setMoving,
    resetColor: resetBackgroundColor,
  } = useBackground();
  const { data: color } = useAverageColor(imageUrl, options);

  useEffect(() => {
    if (affectBackground && color) setColor(color);
  }, [color, affectBackground, setColor]);

  useEffect(() => {
    if (affectBackground && imageUrl) setImageUrl(imageUrl);
  }, [imageUrl, affectBackground, setImageUrl]);

  useEffect(() => {
    if (affectBackground && type) setType(type);
  }, [type, affectBackground, setType]);

  useEffect(() => {
    if (affectBackground) setMoving(moving);
  }, [moving, affectBackground, setMoving]);

  useEffect(() => {
    if (affectBackground && resetColor) resetBackgroundColor();
  }, [resetColor, affectBackground, resetBackgroundColor]);

  return { color };
}
