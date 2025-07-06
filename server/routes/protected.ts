// This is the main entry point for the server. RPC should be prioritized over REST.
import { Hono } from "hono";
import { getUserProfile } from "../procedures/protected/user";
import {
  getCurrentUserPlaylists,
  getPlaylistData,
  getPlaylistItems,
} from "../procedures/protected/playlist";
import { getTrackData, getTrackPreview } from "../procedures/protected/track";
import { authMiddleware } from "@server/utils/auth-middleware";
import {
  getArtistData,
  getArtistDataFromTrackId,
} from "../procedures/protected/artist";
import {
  getArtistSummary,
  getTrackSummary,
} from "@server/procedures/protected/summary";

// Protected API routes
const usersRoute = new Hono().get("/profile", getUserProfile);
const playlistsRoute = new Hono()
  .get("/current_user_playlists", getCurrentUserPlaylists)
  .get("/playlist_data/:id", getPlaylistData)
  .get("/playlist_items/:id", getPlaylistItems);
const tracksRoute = new Hono()
  .get("/track_preview", getTrackPreview)
  .get("/track_data", getTrackData);
const artistsRoute = new Hono()
  .get("/artist_data", getArtistData)
  .get("/artist_data_from_track_id", getArtistDataFromTrackId);
const summaryRoute = new Hono()
  .get("/track_summary", getTrackSummary)
  .get("/artist_summary", getArtistSummary);

// Protected API
export const protectedApi = new Hono()
  .use(authMiddleware)
  .route("/user", usersRoute)
  .route("/playlist", playlistsRoute)
  .route("/track", tracksRoute)
  .route("/artist", artistsRoute)
  .route("/summary", summaryRoute);
