import { Hono } from "hono";
import axios from "axios";
import { setCookie } from "hono/cookie";
import { db } from "@server/db";
import { sessionsTable } from "@server/db/schema";

const app = new Hono();

// GET to authorize through Spotify API
app.get("/authorize", (c) => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = process.env;

  const scopes = encodeURIComponent(
    ["user-read-email", "user-read-private"].join(" ")
  );
  const authUrl =
    `https://accounts.spotify.com/authorize?` +
    `client_id=${"test123"}` +
    `&response_type=code` +
    `&redirect_uri=${SPOTIFY_REDIRECT_URI}` +
    `&scope=${scopes}` +
    `&show_dialog=true`;

  return c.redirect(authUrl, 301);
});

// GET to exchange authorization code for tokens
app.get("/callback", async (c) => {
  const { SPOTIFY_REDIRECT_URI, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } =
    process.env;

  const code = c.req.query("code");
  if (!code) {
    return c.text("Authorization code not provided", 400);
  }

  try {
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI!,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const tokenData = await res.data;
    const userId = await getUserId(tokenData.access_token);
    // store userId in session cookie and database
    await setCookie(c, "session", userId, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    // await db
    //   .insert(sessionsTable)
    //   .values({
    //     user_id: userId,
    //     access_token: tokenData.access_token,
    //     refresh_token: tokenData.refresh_token,
    //     expires_at: new Date(Date.now() + tokenData.expires_in * 1000),
    //   })
    //   .onConflictDoUpdate({
    //     target: sessionsTable.user_id,
    //     set: {
    //       access_token: tokenData.access_token,
    //       refresh_token: tokenData.refresh_token,
    //       expires_at: new Date(Date.now() + tokenData.expires_in * 1000),
    //     },
    //   });

    return c.json({ tokenData, user_id: userId }, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to exchange code for tokens", error: error.message },
      500
    );
  }
});

async function getUserId(accessToken: string) {
  const res = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.data;
  return data.id;
}

export const authRoute = app;
