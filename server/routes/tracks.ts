import { getTrackData, getTrackPreviewUrl } from "@server/lib/spotify-helpers";
import { authMiddleware } from "@server/utils/auth-middleware";
import { Hono } from "hono";

export const tracksRoute = new Hono()
  .use(authMiddleware)

  // GET track preview (url)
  .get("/getTrackPreview", async (c) => {
    try {
      const id = c.req.query("id");
      const accessToken = c.get("access_token");
      const trackData = await getTrackData(accessToken, id!);
      const url = trackData?.external_urls.spotify;
      const link = await getTrackPreviewUrl(url);
      return c.json({ link }, 200);
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
