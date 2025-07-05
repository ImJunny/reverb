import {
  getSpotifyTrackData,
  getSpotifyTrackPreviewUrl,
} from "@server/lib/spotify-helpers";
import type { ProtectedContext } from "@server/utils/auth-middleware";

export async function getTrackData(c: ProtectedContext) {
  const id = c.req.query("id");
  if (!id) return c.json({ message: "Track ID is required" }, 400);

  try {
    const accessToken = c.get("access_token");
    const trackData = await getSpotifyTrackData(accessToken, id);
    return c.json(trackData, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to fetch track data", error: error.message },
      500
    );
  }
}

export async function getTrackPreview(c: ProtectedContext) {
  const id = c.req.query("id");
  if (!id) return c.json({ message: "Track ID is required" }, 400);

  try {
    const accessToken = c.get("access_token");
    const trackData = await getSpotifyTrackData(accessToken, id);
    const url = trackData?.external_urls.spotify;
    const audio_src = await getSpotifyTrackPreviewUrl(url);
    return c.json({ audio_src }, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to fetch track preview", error: error.message },
      500
    );
  }
}
