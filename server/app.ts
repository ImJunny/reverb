// This is the main entry point for the server. RPC should be prioritized over REST.
import { Hono } from "hono";
import { cors } from "hono/cors";
import { authRoute } from "./routes/auth";
import { usersRoute } from "./routes/users";
import { logger } from "hono/logger";
import { playlistsRoute } from "./routes/playlists";

// Main app instance uses logger for debugging and CORS for cross-origin requests,
// specifically to allow requests from the frontend running on 5173
const app = new Hono();
app.use(logger());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

// Define RPC routes for /api.
// auth:      Handles user authentication
// tracks:    Handles track-related operations | Protected
const apiRoutes = app
  .basePath("/api")
  .route("/auth", authRoute)
  .route("/users", usersRoute)
  .route("/playlists", playlistsRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
