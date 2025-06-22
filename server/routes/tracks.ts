import { getTrackPreviewUrl } from "@server/lib/spotify-helpers";
import { authMiddleware } from "@server/utils/auth-middleware";
import { Hono } from "hono";

export const tracksRoute = new Hono()
  .use(authMiddleware)

  // GET track preview url
  .get("/getTrackPreview", async (c) => {
    try {
      const url = c.req.query("url");
      const link = await getTrackPreviewUrl(url!);
      console.log(link);
      return c.json(link, 200);
    } catch (error: any) {
      return c.json(
        {
          message: "Failed to fetch track preview url",
          error: error.message,
        },
        500
      );
    }
  });
