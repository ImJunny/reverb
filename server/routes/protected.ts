import { authMiddleware } from "@server/utils/auth-middleware";
import { Hono } from "hono";

const app = new Hono();
app.use(authMiddleware);

app.get("/test", (c) => {
  return c.text("Protected route accessed", 200);
});

export const protectedRoute = app;
