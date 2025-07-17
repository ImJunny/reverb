import { type Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import {
  getSpotifyAuthorizationUrl,
  getSpotifyTokenData,
  getSpotifyCurrentUser,
} from "@server/lib/spotify-helpers";
import { createUserDB } from "@server/db/actions/user-actions";

// Generate authorization URL and redirect user to Spotify for login
export async function authorize(c: Context) {
  const authUrl = getSpotifyAuthorizationUrl();
  return c.redirect(authUrl, 302);
}

// Handle the callback redirect from Spotify after user login
export async function handleCallback(c: Context) {
  const code = c.req.query("code");
  if (!code) return c.redirect("http://127.0.0.1:5173/signin", 302);

  try {
    const tokenData = await getSpotifyTokenData(code);
    const userData = await getSpotifyCurrentUser(tokenData.access_token);

    setCookie(c, "user_id", userData.id, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 60 * 60 * 24 * 30,
    });

    await createUserDB(
      userData.id,
      userData.images?.[0]?.url || null,
      tokenData.access_token,
      tokenData.refresh_token,
      new Date(Date.now() + tokenData.expires_in * 1000)
    );

    return c.redirect("http://127.0.0.1:5173/", 302);
  } catch (error: any) {
    return c.json({ error: error }, 500);
  }
}

// Delete the session cookie
export async function signOut(c: Context) {
  try {
    deleteCookie(c, "user_id");
    return c.json(200);
  } catch (error: any) {
    return c.json(error, 401);
  }
}

// Get the current session user ID from the cookie
export async function getSession(c: Context) {
  const userId = getCookie(c, "user_id");
  if (!userId) return c.json({ userId: null }, 200);
  return c.json({ userId }, 200);
}
