import axios from "axios";

// get authorization URL
export function getAuthorizationUrl() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = process.env;
  const scopes = encodeURIComponent(
    ["user-read-email", "user-read-private", "user-top-read"].join(" ")
  );
  const authUrl =
    `https://accounts.spotify.com/authorize?` +
    `client_id=${SPOTIFY_CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${SPOTIFY_REDIRECT_URI}` +
    `&scope=${scopes}` +
    `&show_dialog=true`;
  return authUrl;
}

// get tokens from authorization code
export async function getTokenData(code: string) {
  const { SPOTIFY_REDIRECT_URI, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } =
    process.env;
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
          Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const data = await res.data;
  return data;
}

// get user id from access token
export async function getUserId(accessToken: string) {
  const res = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.data;
  return data.id;
}

// get user top tracks from access token
export async function getTopTracks(
  accessToken: string
): Promise<SpotifyApi.UsersTopTracksResponse> {
  const res = await axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=5",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.data;
  return data;
}

// get new tokens from refresh token
export async function getNewAccessToken(refreshToken: string) {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const data = await res.data;
  return data;
}

// get user profile info from user id
export async function getCurrentUserProfile(
  accessToken: string
): Promise<SpotifyApi.CurrentUsersProfileResponse> {
  const res = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.data;
  return data;
}
