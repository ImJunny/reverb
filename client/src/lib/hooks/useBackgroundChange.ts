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
    moving,
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

  if (affectBackground) {
    if (color) setColor(color);
    if (imageUrl) setImageUrl(imageUrl);
    if (type) setType(type);
    if (moving) setMoving(true);
    if (resetColor) resetBackgroundColor();
  }

  return { color };
}
