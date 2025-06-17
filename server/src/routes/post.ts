import { Hono } from "hono";

const app = new Hono();

export const postRoute = app.get("/", (c) => {
  return c.json(
    {
      ok: true,
      message: `Hello!`,
    },
    201
  );
});
