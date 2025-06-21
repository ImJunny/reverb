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

export const playlistInfoQueryOptions = (playlistId: string) =>
  queryOptions({
    queryKey: ["playlist-info", playlistId],
    queryFn: async () => {
      const res = await api.playlists.getPlaylistInfo[":id"].$get({
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
