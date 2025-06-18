import { serve } from "@hono/node-server";
import app from "./app";

const HOSTNAME = "127.0.0.1";
const PORT = 3000;

serve({
  fetch: app.fetch,
  port: PORT,
  hostname: HOSTNAME,
});

console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
