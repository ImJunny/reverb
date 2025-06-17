// This is the main entry point for the server. RPC should be prioritized over REST.
import { Hono } from "hono";
import { cors } from "hono/cors";
import { postRoute } from "./routes/post";
import { authRoute } from "./routes/auth";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

// main app instance
export const app = new Hono();
app.use(cors());
export default app;

// define RPC routes for /api
const apiRoutes = app
  .basePath("/api")
  .route("/auth", authRoute)
  .route("/posts", postRoute);

export type ApiRoutes = typeof apiRoutes;
