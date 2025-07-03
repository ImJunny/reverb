import {
  getCurrentUserPlaylists,
  getPlaylistInfo,
  getPlaylistItems,
} from "@server/lib/spotify-helpers";
import { authMiddleware } from "@server/utils/auth-middleware";
import { Hono } from "hono";

export const playlistsRoute = new Hono()
  .use(authMiddleware)

  // GET current user playlists
  .get("/getCurrentUserPlaylists", async (c) => {
    try {
      const accessToken = c.get("access_token");
      const playlists = await getCurrentUserPlaylists(accessToken);
      return c.json(playlists, 200);
    } catch (error: any) {
      return c.json(
        {
          message: "Failed to fetch current user's playlists",
          error: error.message,
        },
        500
      );
    }
  })

  // GET playlist info
  .get("/getPlaylistInfo/:id", async (c) => {
    const playlistId = c.req.param("id");
    if (!playlistId) {
      return c.json({ message: "Playlist ID is required" }, 400);
    }

    try {
      const accessToken = c.get("access_token");
      const playlistInfo = await getPlaylistInfo(accessToken, playlistId);
      return c.json(playlistInfo, 200);
    } catch (error: any) {
      return c.json(
        { message: "Failed to fetch playlist info", error: error.message },
        500
      );
    }
  })

  // GET playlist items
  .get("/getPlaylistItems/:id", async (c) => {
    const playlistId = c.req.param("id");
    if (!playlistId) {
      return c.json({ message: "Playlist ID is required" }, 400);
    }

    try {
      const accessToken = c.get("access_token");
      const playlistItems = await getPlaylistItems(accessToken, playlistId);
      return c.json(playlistItems, 200);
    } catch (error: any) {
      return c.json(
        { message: "Failed to fetch full playlist info", error: error.message },
        500
      );
    }
  });
