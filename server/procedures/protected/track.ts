import {
  getSpotifySongSearch,
  getSpotifyTrackData,
  getSpotifyTrackPreviewUrl,
} from "@server/lib/spotify-helpers";
import type { ProtectedContext } from "@server/utils/auth-middleware";
import type { Track, TrackSearchResult } from "shared/types";

export async function getTrackData(c: ProtectedContext) {
  const id = c.req.query("id");
  if (!id) return c.json({ message: "Track ID is required" }, 400);

  try {
    const accessToken = c.get("access_token");
    const trackData = await getSpotifyTrackData(accessToken, id);
    const formattedData: Track = {
      id: trackData.id,
      name: trackData.name,
      artists: trackData.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
      })),
      album: {
        id: trackData.album.id,
        name: trackData.album.name,
        image_url: trackData.album.images[0]?.url || "",
      },
      duration_ms: trackData.duration_ms,
      external_urls: trackData.external_urls,
    };
    return c.json(formattedData, 200);
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

export async function getTrackSearch(c: ProtectedContext) {
  const query = c.req.query("query");
  if (!query) return c.json({ message: "Query is required" }, 400);

  try {
    const accessToken = c.get("access_token");
    const searchResults = await getSpotifySongSearch(accessToken, query);
    const formattedData: TrackSearchResult[] = (
      searchResults.tracks?.items ?? []
    ).map((item) => ({
      id: item.id,
      name: item.name,
      artists: item.artists.map((artist) => ({
        name: artist.name,
      })),
      image_url: item.album.images[0]?.url || "",
    }));
    return c.json(formattedData, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to search for tracks", error: error.message },
      500
    );
  }
}
