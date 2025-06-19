import {
  getTopTracks,
  getCurrentUserProfile,
} from "@server/lib/spotify-helpers";
import { authMiddleware } from "@server/utils/auth-middleware";
import { Hono } from "hono";

export const usersRoute = new Hono()
  .use(authMiddleware)

  // GET user profile info
  .get("/getUserProfile", async (c) => {
    try {
      const accessToken = c.get("access_token");
      const userProfileInfo = await getCurrentUserProfile(accessToken);
      return c.json(userProfileInfo, 200);
    } catch (error: any) {
      return c.json(
        { message: "Failed to fetch user profile", error: error.message },
        500
      );
    }
  })

  // GET to fetch top tracks
  .get("/getUserTopTracks", async (c) => {
    try {
      const accessToken = c.get("access_token");
      const tracks = await getTopTracks(accessToken);
      return c.json(tracks, 200);
    } catch (error: any) {
      return c.json(
        { message: "Failed to fetch top tracks", error: error.message },
        500
      );
    }
  });
