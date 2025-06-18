// This is the main entry point for the server. RPC should be prioritized over REST.
import { Hono } from "hono";
import { cors } from "hono/cors";
import { postRoute } from "./routes/post";
import { authRoute } from "./routes/auth";

// main app instance
const app = new Hono();
app.use(cors());

// define RPC routes for /api
const apiRoutes = app
  .basePath("/api")
  .route("/posts", postRoute)
  .route("/auth", authRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
