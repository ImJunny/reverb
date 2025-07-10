import {
  getSpotifyCurrentUserPlaylists,
  getSpotifyPlaylistData,
  getSpotifyPlaylistItems,
} from "@server/lib/spotify-helpers";
import type { ProtectedContext } from "@server/utils/auth-middleware";
import type {
  PlaylistItem,
  PlaylistData,
  GeneralPlaylistData,
} from "shared/types";

// Fetch current user's playlists
export async function getCurrentUserPlaylists(c: ProtectedContext) {
  try {
    const userId = c.get("user_id");
    const accessToken = c.get("access_token");
    if (!userId || !accessToken)
      return c.json({ message: "User ID and access token are required" }, 400);

    const playlists = await getSpotifyCurrentUserPlaylists(accessToken);
    const formattedData: GeneralPlaylistData[] = playlists.items.map(
      (playlist) => ({
        id: playlist.id,
        name: playlist.name,
        image_url: playlist.images[0]?.url,
        public: playlist.public!,
        total: playlist.tracks.total,
        self: playlist.owner.id === userId,
      })
    );
    return c.json(formattedData, 200);
  } catch (error: any) {
    return c.json(
      {
        message: "Failed to fetch current user's playlists",
        error: error.message,
      },
      500
    );
  }
}

// Fetch playlist data by ID
export async function getPlaylistData(c: ProtectedContext) {
  const playlistId = c.req.param("id");
  if (!playlistId) return c.json({ message: "Playlist ID is required" }, 400);

  try {
    const accessToken = c.get("access_token");
    const playlistData = await getSpotifyPlaylistData(accessToken, playlistId);
    const formattedData: PlaylistData = {
      id: playlistData.id,
      name: playlistData.name,
      image_url: playlistData.images[0]?.url,
      public: playlistData.public!,
      total: playlistData.tracks.total,
      owner: {
        id: playlistData.owner.id,
        display_name: playlistData.owner.display_name!,
        external_urls: playlistData.owner.external_urls,
      },
    };
    return c.json(formattedData, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to fetch playlist info", error: error.message },
      500
    );
  }
}

// Fetch playlist items by ID
export async function getPlaylistItems(c: ProtectedContext) {
  const playlistId = c.req.param("id");
  if (!playlistId) return c.json({ message: "Playlist ID is required" }, 400);

  try {
    const accessToken = c.get("access_token");
    const playlistItems = await getSpotifyPlaylistItems(
      accessToken,
      playlistId
    );
    const formattedData: PlaylistItem[] = playlistItems.items.map((item) => ({
      id: item.track!.id,
      name: item.track!.name,
      artists: item.track!.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        external_urls: artist.external_urls,
      })),
      duration_ms: item.track!.duration_ms,
      album: {
        id: item.track!.album.id,
        name: item.track!.album.name,
        image_url: item.track!.album.images[0]?.url ?? "",
      },
    }));

    return c.json(formattedData, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to fetch full playlist info", error: error.message },
      500
    );
  }
}
