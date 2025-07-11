import { useQuery } from "@tanstack/react-query";
import { getAverageColor } from "../scripts/getAverageColor";
import { increaseSaturation } from "../scripts/increateSaturation";

export function useAverageColor(
  image_url: string | undefined,
  options?: { saturate?: number },
) {
  return useQuery({
    enabled: !!image_url,
    queryKey: ["track-color", image_url],
    queryFn: async () => {
      if (!image_url) throw new Error("No image_url");

      let color = await getAverageColor(image_url);
      if (options?.saturate)
        color = increaseSaturation(color, options.saturate);
      return color;
    },
    staleTime: Infinity,
  });
}
