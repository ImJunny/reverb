import { getTopTracks } from "@server/lib/spotify-helpers";
import { authMiddleware } from "@server/utils/auth-middleware";
import { Hono } from "hono";

type Variables = {
  access_token: string;
  refresh_token: string;
};

export const app = new Hono<{ Variables: Variables }>()
  .use(authMiddleware)

  .get("/test", (c) => {
    return c.text("Protected route accessed", 200);
  })
  // GET to fetch top tracks
  .get("/feed", async (c) => {
    try {
      const accessToken = c.get("access_token");
      const data = await getTopTracks(accessToken);
      console.log(data);
      return c.json(data, 200);
    } catch (error: any) {
      return c.json(
        { message: "Failed to fetch top tracks", error: error.message },
        500
      );
    }
  });

export const tracksRoute = app;
