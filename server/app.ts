// This is the main entry point for the server. RPC should be prioritized over REST.
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { publicApi } from "./routes/public";
import { protectedApi } from "./routes/protected";

// App uses logger for debugging and CORS for cross-origin requests with 5173
// Mount public and protected APIs
const app = new Hono()
  .use(logger())
  .use(
    cors({
      origin: "http://127.0.0.1:5173",
      credentials: true,
    })
  )
  .basePath("/api")
  .route("/public", publicApi)
  .route("/protected", protectedApi);

export default app;
export type ApiRoutes = typeof app;
