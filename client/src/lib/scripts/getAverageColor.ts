import { FastAverageColor } from "fast-average-color";

export async function getAverageColor(url: string): Promise<string> {
  if (url.includes("mosaic.scdn.co")) return "#5d5d5d";

  const fac = new FastAverageColor();
  const color = await fac.getColorAsync(url);
  return color.hex;
}
