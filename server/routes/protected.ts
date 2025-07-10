// This is the main entry point for the server. RPC should be prioritized over REST.
import { Hono } from "hono";
import { getUserProfile } from "../procedures/protected/user";
import {
  getCurrentUserPlaylists,
  getPlaylistData,
  getPlaylistItems,
} from "../procedures/protected/playlist";
import {
  getTrackData,
  getTrackPreview,
  getTrackSearch,
} from "../procedures/protected/track";
import { authMiddleware } from "@server/utils/auth-middleware";
import {
  getArtistData,
  getArtistDataFromTrackId,
} from "../procedures/protected/artist";
import {
  getArtistSummary,
  getTrackSummary,
} from "@server/procedures/protected/summary";
import {
  createPost,
  getHomePosts,
  getPost,
  getPostTrackSuggestions,
} from "@server/procedures/protected/post";
import { zValidator } from "@hono/zod-validator";
import { CreatePostSchema } from "@server/zod-schemas/schemas";

// Protected API routes
const usersRoute = new Hono().get("/profile", getUserProfile);
const playlistsRoute = new Hono()
  .get("/current_user_playlists", getCurrentUserPlaylists)
  .get("/playlist_data/:id", getPlaylistData)
  .get("/playlist_items/:id", getPlaylistItems);
const tracksRoute = new Hono()
  .get("/track_preview", getTrackPreview)
  .get("/track_data", getTrackData)
  .get("/track_search", getTrackSearch);
const artistsRoute = new Hono()
  .get("/artist_data", getArtistData)
  .get("/artist_data_from_track_id", getArtistDataFromTrackId);
const summaryRoute = new Hono()
  .get("/track_summary", getTrackSummary)
  .get("/artist_summary", getArtistSummary);
const postsRoute = new Hono()
  .post("/create", zValidator("json", CreatePostSchema), createPost)
  .get("/home_posts", getHomePosts)
  .get("/post/:id", getPost)
  .get("/track_suggestions/:id", getPostTrackSuggestions);

// Protected API
export const protectedApi = new Hono()
  .use(authMiddleware)
  .route("/user", usersRoute)
  .route("/playlist", playlistsRoute)
  .route("/track", tracksRoute)
  .route("/artist", artistsRoute)
  .route("/summary", summaryRoute)
  .route("/post", postsRoute);
