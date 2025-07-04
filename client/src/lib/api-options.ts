import { queryOptions } from "@tanstack/react-query";
import { api } from "../utils/client";

export const userTopTracksQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: async () => {
    const res = await api.users.getUserTopTracks.$get();
    if (!res.ok) throw new Error("Failed to fetch top tracks");
    return res.json();
  },
});

export const currentUserProfileQueryOptions = queryOptions({
  queryKey: ["current-user-profile"],
  queryFn: async () => {
    const res = await api.users.getUserProfile.$get();
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return res.json();
  },
});

export const currentUserPlaylistsQueryOptions = queryOptions({
  queryKey: ["current-user-playlists"],
  queryFn: async () => {
    const res = await api.playlists.getCurrentUserPlaylists.$get();
    if (!res.ok) throw new Error("Failed to fetch current user playlists");
    return res.json();
  },
});

export const playlistDataQueryOptions = (playlistId: string) =>
  queryOptions({
    queryKey: ["playlist-info", playlistId],
    queryFn: async () => {
      const res = await api.playlists.getplaylistData[":id"].$get({
        param: { id: playlistId },
      });
      if (!res.ok) throw new Error("Failed to fetch playlist info");
      return res.json();
    },
  });

export const playlistItemsQueryOptions = (playlistId: string) =>
  queryOptions({
    queryKey: ["playlist-items", playlistId],
    queryFn: async () => {
      const res = await api.playlists.getPlaylistItems[":id"].$get({
        param: { id: playlistId },
      });
      if (!res.ok) throw new Error("Failed to fetch playlist items");
      return res.json();
    },
  });

export const trackPreviewQueryOptions = (trackId: string | undefined) =>
  queryOptions({
    queryKey: ["track-preview", trackId],
    queryFn: async () => {
      if (!trackId) throw new Error("Track ID is required");
      const res = await api.tracks.getTrackPreview.$get({
        query: { id: trackId },
      });
      if (!res.ok) throw new Error("Failed to fetch track preview");
      return res.json();
    },
  });

export const artistDataQueryOptions = (artistId: string | undefined) =>
  queryOptions({
    queryKey: ["artist-data", artistId],
    queryFn: async () => {
      if (!artistId) throw new Error("Artist ID is required");
      const res = await api.artists.getArtistData.$get({
        query: { id: artistId },
      });
      if (!res.ok) throw new Error("Failed to fetch artist data");
      return res.json();
    },
  });

export const artistDataFromTrackIdQueryOptions = (
  trackId: string | undefined,
) =>
  queryOptions({
    queryKey: ["artist-data-from-track", trackId],
    queryFn: async () => {
      if (!trackId) throw new Error("Track ID is required");
      const res = await api.artists.getArtistDataFromTrackId.$get({
        query: { trackId },
      });
      if (!res.ok) throw new Error("Failed to fetch artist data from track ID");
      return res.json();
    },
  });
