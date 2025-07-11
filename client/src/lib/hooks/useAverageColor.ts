import { useQuery } from "@tanstack/react-query";
import { getAverageColor } from "../scripts/getAverageColor";

export function useAverageColor(image_url: string | undefined) {
  return useQuery({
    enabled: !!image_url,
    queryKey: ["track-color", image_url],
    queryFn: async () => {
      if (!image_url) throw new Error("No image_url");
      return getAverageColor(image_url);
    },
    staleTime: Infinity,
  });
}
