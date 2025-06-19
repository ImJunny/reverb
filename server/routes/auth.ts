import { Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import {
  getAuthorizationUrl,
  getTokenData,
  getUserId,
} from "@server/lib/spotify-helpers";
import { createSession } from "@server/db/actions/session-actions";

export const authRoute = new Hono()
  // GET to authorize through Spotify API
  .get("/authorize", (c) => {
    const authUrl = getAuthorizationUrl();
    return c.redirect(authUrl, 302);
  })

  // GET to exchange authorization code for tokens
  .get("/callback", async (c) => {
    const code = c.req.query("code");
    if (!code) return c.redirect("http://127.0.0.1:5173/signin", 302);

    try {
      const tokenData = await getTokenData(code);
      const userId = await getUserId(tokenData.access_token);

      setCookie(c, "user_id", userId, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: 60 * 60 * 24 * 30,
      });

      await createSession(
        userId,
        tokenData.access_token,
        tokenData.refresh_token,
        new Date(Date.now() + tokenData.expires_in * 1000)
      );

      return c.redirect("http://127.0.0.1:5173/", 302);
    } catch (error: any) {
      return c.json({ error: error }, 500);
    }
  })

  // POST to sign user out
  .post("/signout", (c) => {
    try {
      deleteCookie(c, "user_id");
      return c.json(200);
    } catch (error: any) {
      return c.json(error, 401);
    }
  })

  // GET session data; error if no session is found
  .get("/session", async (c) => {
    const userId = getCookie(c, "user_id");
    if (!userId) return c.json({ userId: null }, 200);
    return c.json({ userId }, 200);
  });
