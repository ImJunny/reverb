// This is the main entry point for the server. RPC should be prioritized over REST.
import { Hono } from "hono";
import { cors } from "hono/cors";
import { postRoute } from "./routes/posts";
import { authRoute } from "./routes/auth";
import { tracksRoute } from "./routes/tracks";
import { logger } from "hono/logger";

// main app instance
const app = new Hono();
app.use(logger());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

// define RPC routes for /api
const apiRoutes = app
  .basePath("/api")
  .route("/posts", postRoute)
  .route("/auth", authRoute)
  .route("/tracks", tracksRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
