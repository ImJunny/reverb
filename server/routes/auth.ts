import { Hono } from "hono";
import { setCookie, getCookie } from "hono/cookie";
import { db } from "@server/db";
import { sessionsTable } from "@server/db/schema";
import { eq } from "drizzle-orm";
import {
  getAuthorizationUrl,
  getTokenData,
  getTopTracks,
  getUserId,
} from "@server/lib/spotify-helpers";

const app = new Hono()

  // GET to authorize through Spotify API
  .get("/authorize", (c) => {
    const authUrl = getAuthorizationUrl();
    return c.redirect(authUrl, 302);
  })

  // GET to exchange authorization code for tokens
  .get("/callback", async (c) => {
    console.log("callback COOKIE INIT", getCookie(c, "session"));
    const code = c.req.query("code");
    if (!code) return c.text("Authorization code not provided", 400);

    try {
      const tokenData = await getTokenData(code);
      const userId = await getUserId(tokenData.access_token);

      setCookie(c, "session", userId, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: 60 * 60 * 24 * 30,
      });

      await db
        .insert(sessionsTable)
        .values({
          user_id: userId,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_at: new Date(Date.now() + tokenData.expires_in * 1000),
        })
        .onConflictDoUpdate({
          target: sessionsTable.user_id,
          set: {
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
            expires_at: new Date(Date.now() + tokenData.expires_in * 1000),
          },
        });

      return c.redirect("http://127.0.0.1:5173/profile", 302);
    } catch (error: any) {
      return c.json(
        { message: "Failed to exchange code for tokens", error: error.message },
        500
      );
    }
  })

  // GET to fetch top tracks
  .get("/feed", async (c) => {
    const sessionCookie = getCookie(c, "session");
    if (!sessionCookie) return c.text("Unauthorized, no cookie.", 401);

    const session = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.user_id, sessionCookie))
      .limit(1)
      .then((data) => data[0]);
    if (!session) return c.text("Unauthorized, no session found.", 401);

    const accessToken = session.access_token;
    if (!accessToken) return c.text("Unauthorized, no access token", 401);

    try {
      const data = await getTopTracks(accessToken);
      return c.json(data, 200);
    } catch (error: any) {
      return c.json(
        { message: "Failed to fetch top tracks", error: error.message },
        500
      );
    }
  });

export const authRoute = app;
