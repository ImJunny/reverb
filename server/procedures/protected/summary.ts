import {
  insertSummary,
  selectSummary,
} from "@server/db/actions/summary-actions";
import {
  generateArtistSummary,
  generateTrackSummary,
} from "@server/lib/groq-helpers";
import {
  getSpotifyArtistData,
  getSpotifyArtistMonthlyListeners,
} from "@server/lib/spotify-helpers";
import type { ProtectedContext } from "@server/utils/auth-middleware";

// Get track and artist summaries used in the listening panel
export async function getTrackSummary(c: ProtectedContext) {
  try {
    const trackId = c.req.query("trackId");
    const trackName = c.req.query("trackName");
    const artistName = c.req.query("artistName");

    if (!trackName || !trackId)
      return c.json({ message: "Missing track information" }, 400);

    let trackSummaryEntry = await selectSummary(trackId);
    let summary: string | null | undefined = trackSummaryEntry?.summary;
    if (!trackSummaryEntry) {
      summary = await generateTrackSummary(trackName!, artistName!);
      await insertSummary(trackId, "track", summary!);
    }

    return c.json({ summary }, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to fetch summaries", error: error.message },
      500
    );
  }
}

export async function getArtistSummary(c: ProtectedContext) {
  try {
    const trackName = c.req.query("trackName");
    const artistId = c.req.query("artistId");
    const artistName = c.req.query("artistName");
    const accessToken = c.get("access_token");

    if (!artistName || !artistId || !trackName || !accessToken)
      return c.json(
        { message: "Missing artist information or access token" },
        400
      );

    let artistSummaryEntry = await selectSummary(artistId);
    let summary: string | null | undefined = artistSummaryEntry?.summary;
    if (!artistSummaryEntry) {
      summary = await generateArtistSummary(trackName!, artistName!);
      await insertSummary(artistId, "artist", summary!);
    }
    const artistData = await getSpotifyArtistData(accessToken, artistId);
    const monthlyListeners = await getSpotifyArtistMonthlyListeners(
      artistData.external_urls.spotify
    );
    return c.json({ summary, monthly_listeners: monthlyListeners }, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to fetch artist summary", error: error.message },
      500
    );
  }
}
