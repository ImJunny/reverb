import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import {
  getAuthorizationUrl,
  getTokenData,
  getUserId,
} from "@server/lib/spotify-helpers";
import { updateSession } from "@server/db/actions/session-actions";

const app = new Hono()

  // GET to authorize through Spotify API
  .get("/authorize", (c) => {
    const authUrl = getAuthorizationUrl();
    return c.redirect(authUrl, 302);
  })

  // GET to exchange authorization code for tokens
  .get("/callback", async (c) => {
    const code = c.req.query("code");
    if (!code) return c.text("Authorization code not provided", 400);

    try {
      const tokenData = await getTokenData(code);
      const userId = await getUserId(tokenData.access_token);

      setCookie(c, "session_id", userId, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: 60 * 60 * 24 * 30,
      });

      await updateSession(
        userId,
        tokenData.access_token,
        tokenData.refresh_token,
        new Date(Date.now() + tokenData.expires_in * 1000)
      );

      return c.redirect("http://127.0.0.1:5173/profile", 302);
    } catch (error: any) {
      return c.json(
        { message: "Failed to exchange code for tokens", error: error.message },
        500
      );
    }
  });

export const authRoute = app;
