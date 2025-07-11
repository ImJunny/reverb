import axios from "axios";
import * as cheerio from "cheerio";

// Get authorization URL
export function getSpotifyAuthorizationUrl() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = process.env;
  const scopes = encodeURIComponent(
    [
      "user-read-email",
      "user-read-private",
      "user-top-read",
      "playlist-read-private",
    ].join(" ")
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

// Get tokens from authorization code
export async function getSpotifyTokenData(code: string) {
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

// Get user id from access token
export async function getSpotifyCurrentUser(
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

// Get user top tracks from access token
export async function getSpotifyTopTracks(
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

// Get new tokens from refresh token
export async function getSpotifyNewAccessToken(refreshToken: string) {
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

// Get user profile info from user id
export async function getSpotifyCurrentUserProfile(
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

// Get current user playlists
export async function getSpotifyCurrentUserPlaylists(
  accessToken: string
): Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse> {
  const res = await axios.get("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.data;
  return data;
}

// Get playlist info
export async function getSpotifyPlaylistData(
  accessToken: string,
  playlistId: string
): Promise<SpotifyApi.PlaylistObjectFull> {
  const res = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        fields: "id,name,description,images,owner,tracks(total),public",
      },
    }
  );
  const data = await res.data;
  return data;
}

// Get playlist tracks
export async function getSpotifyPlaylistItems(
  accessToken: string,
  playlistId: string,
  limit: number = 50,
  offset: number = 0
): Promise<SpotifyApi.PlaylistTrackResponse> {
  const res = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        fields:
          "items(track(id,name,artists(name),album(name,images),duration_ms))",
        limit,
        offset,
      },
    }
  );
  const data = await res.data;
  return data;
}

// Get track preview url
export async function getSpotifyTrackPreviewUrl(
  url: string
): Promise<string | null> {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  let previewUrl: string | null = null;
  $("*").each((i, element) => {
    if ("attribs" in element && element.attribs) {
      const attrs = element.attribs;
      Object.values(attrs).forEach((value) => {
        if (value && value.includes("p.scdn.co")) {
          previewUrl = value;
          return false;
        }
      });
    }
  });

  return previewUrl;
}

// Get artist monthly listeners
export async function getSpotifyArtistMonthlyListeners(
  url: string
): Promise<number | null> {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    let listeners: number | null = null;

    // Look for any element that contains the text "monthly listeners"
    const textElement = $("*")
      .filter((_, el) =>
        $(el).text().toLowerCase().includes("monthly listeners")
      )
      .first();

    if (textElement.length > 0) {
      const text = textElement.text(); // Example: "7,345,123 monthly listeners"
      const match = text.replace(/,/g, "").match(/(\d+)\s*monthly listeners/i);

      if (match && match[1]) {
        listeners = parseInt(match[1], 10);
      }
    }

    return listeners;
  } catch (error) {
    console.error("Error scraping Spotify:", error);
    return null;
  }
}

// Get track data
export async function getSpotifyTrackData(
  accessToken: string,
  trackId: string
): Promise<SpotifyApi.TrackObjectFull> {
  const res = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.data;
  return data;
}

// Get artist data
export async function getSpotifyArtistData(
  accessToken: string,
  artistId: string
): Promise<SpotifyApi.ArtistObjectFull> {
  const res = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.data;
  return data;
}

// Search song
export async function getSpotifySongSearch(
  accessToken: string,
  query: string,
  limit: number = 7
): Promise<SpotifyApi.SearchResponse> {
  const res = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      q: query,
      type: "track",
      limit,
    },
  });
  const data = await res.data;
  return data;
}
