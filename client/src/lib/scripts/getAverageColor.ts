import { FastAverageColor } from "fast-average-color";

export async function getAverageColor(url: string): Promise<string> {
  if (url.includes("mosaic.scdn.co")) {
    const fac = new FastAverageColor();
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const color = await fac.getColorAsync(proxyUrl);
    return color.hex;
  }

  const fac = new FastAverageColor();
  const color = await fac.getColorAsync(url);
  return color.hex;
}
