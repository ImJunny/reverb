import {
  getSpotifyArtistData,
  getSpotifyTrackData,
} from "@server/lib/spotify-helpers";
import type { ProtectedContext } from "@server/utils/auth-middleware";
import type { ArtistData } from "shared/types";

// GET artist data by ID
export async function getArtistData(c: ProtectedContext) {
  try {
    const id = c.req.query("id");
    if (!id) return c.json({ message: "Artist ID is required" }, 400);

    const accessToken = c.get("access_token");
    const artistData = await getSpotifyArtistData(accessToken, id!);
    const formattedData: ArtistData = {
      id: artistData.id,
      name: artistData.name,
      image_url: artistData.images[0]?.url,
    };
    return c.json(formattedData, 200);
  } catch (error: any) {
    return c.json(
      {
        message: "Failed to fetch artist data",
        error: error.message,
      },
      500
    );
  }
}

// GET artist data from track ID
export async function getArtistDataFromTrackId(c: ProtectedContext) {
  try {
    const trackId = c.req.query("trackId");
    const accessToken = c.get("access_token");
    if (!trackId || !accessToken)
      return c.json({ message: "Track ID and access token are required" }, 400);

    const trackData = await getSpotifyTrackData(accessToken, trackId);
    const artistId = trackData.artists[0]?.id;
    if (!artistId) return c.json({ message: "Artist not found" }, 404);
    const artistData = await getSpotifyArtistData(accessToken, artistId);
    const formattedData: ArtistData = {
      id: artistData.id,
      name: artistData.name,
      image_url: artistData.images[0]?.url,
    };
    return c.json(formattedData, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to fetch artist data", error: error.message },
      500
    );
  }
}
