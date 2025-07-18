import { useQuery } from "@tanstack/react-query";
import { getAverageColor } from "../scripts/getAverageColor";
import { enhanceColor } from "../scripts/enhanceColor";

export function useAverageColor(
  image_url: string | undefined,
  options?: { enhanceCap?: number },
) {
  return useQuery({
    enabled: !!image_url,
    queryKey: ["track-color", image_url],
    queryFn: async () => {
      if (!image_url) throw new Error("No image_url");

      let color = await getAverageColor(image_url);
      if (options?.enhanceCap) color = enhanceColor(color, options.enhanceCap);
      return color;
    },
    staleTime: Infinity,
  });
}
