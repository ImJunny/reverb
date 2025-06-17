import { Hono } from "hono";

const app = new Hono();

export const authRoute = app.post("/", (c) => {
  return c.json(
    {
      ok: true,
      message: `Hello!`,
    },
    201
  );
});
