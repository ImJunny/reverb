import { Hono } from "hono";
import axios from "axios";

const app = new Hono();

// GET to authorize through Spotify API
app.get("/authorize", (c) => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = process.env;

  const scopes = encodeURIComponent(
    ["user-read-email", "user-read-private"].join(" ")
  );
  const authUrl =
    `https://accounts.spotify.com/authorize?` +
    `client_id=${SPOTIFY_CLIENT_ID}` +
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
        client_id: SPOTIFY_CLIENT_ID!,
        client_secret: SPOTIFY_CLIENT_SECRET!,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const tokenData = await res.data;
    return c.json(tokenData);
  } catch (error) {
    return c.text("Failed to exchange code for tokens", 500);
  }
});

export const authRoute = app;
