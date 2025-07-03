import {
  getArtistData,
  getArtistDataFromTrackId,
} from "@server/lib/spotify-helpers";
import { authMiddleware } from "@server/utils/auth-middleware";
import { Hono } from "hono";

export const artistsRoute = new Hono()
  .use(authMiddleware)

  // GET artist data
  .get("/getArtistData", async (c) => {
    try {
      const id = c.req.query("id");
      const accessToken = c.get("access_token");
      const artistData = await getArtistData(accessToken, id!);
      return c.json(
        {
          id: artistData.id,
          name: artistData.name,
          image_url: artistData.images[0]?.url,
        },
        200
      );
    } catch (error: any) {
      return c.json(
        {
          message: "Failed to fetch artist data",
          error: error.message,
        },
        500
      );
    }
  })

  // GET artist data from track id
  .get("/getArtistDataFromTrackId", async (c) => {
    try {
      const trackId = c.req.query("trackId");
      const accessToken = c.get("access_token");
      const artistData = await getArtistDataFromTrackId(accessToken, trackId!);
      return c.json(
        {
          id: artistData.id,
          name: artistData.name,
          image_url: artistData.images[0]?.url,
        },
        200
      );
    } catch (error: any) {
      return c.json(
        {
          message: "Failed to fetch artist data",
          error: error.message,
        },
        500
      );
    }
  });
