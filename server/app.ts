// This is the main entry point for the server. RPC should be prioritized over REST.
import { Hono } from "hono";
import { cors } from "hono/cors";
import { postRoute } from "./routes/post";
import { authRoute } from "./routes/auth";

// main app instance
const app = new Hono();
app.use(
  cors({
    origin: "http://127.0.0.1:5173", // Allow requests from the frontend
    credentials: true, // Allow credentials for cookie-based auth
  })
);

// define RPC routes for /api
const apiRoutes = app
  .basePath("/api")
  .route("/posts", postRoute)
  .route("/auth", authRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
