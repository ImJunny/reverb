import { queryOptions } from "@tanstack/react-query";
import { api } from "../utils/client";
import type { CreatePost, CreateView } from "shared/types";

export const currentUserProfileQueryOptions = queryOptions({
  queryKey: ["current-user-profile"],
  queryFn: async () => {
    const res = await api.protected.user.profile.$get();
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return res.json();
  },
});

export const currentUserPlaylistsQueryOptions = queryOptions({
  queryKey: ["current-user-playlists"],
  queryFn: async () => {
    const res = await api.protected.playlist.current_user_playlists.$get();
    if (!res.ok) throw new Error("Failed to fetch current user playlists");
    return res.json();
  },
});

export const playlistDataQueryOptions = (playlistId: string) =>
  queryOptions({
    queryKey: ["playlist-info", playlistId],
    queryFn: async () => {
      const res = await api.protected.playlist.playlist_data[":id"].$get({
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
      const res = await api.protected.playlist.playlist_items[":id"].$get({
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
      const res = await api.protected.track.track_preview.$get({
        query: { id: trackId },
      });
      if (!res.ok) throw new Error("Failed to fetch track preview");
      return res.json();
    },
    staleTime: Infinity,
  });

export const trackDataQueryOptions = (trackId: string | undefined) =>
  queryOptions({
    queryKey: ["track-data", trackId],
    queryFn: async () => {
      if (!trackId) throw new Error("Track ID is required");
      const res = await api.protected.track.track_data.$get({
        query: { id: trackId },
      });
      if (!res.ok) throw new Error("Failed to fetch track data");
      return res.json();
    },
    staleTime: Infinity,
  });

export const artistDataQueryOptions = (artistId: string | undefined) =>
  queryOptions({
    queryKey: ["artist-data", artistId],
    queryFn: async () => {
      if (!artistId) throw new Error("Artist ID is required");
      const res = await api.protected.artist.artist_data.$get({
        query: { id: artistId },
      });
      if (!res.ok) throw new Error("Failed to fetch artist data");
      return res.json();
    },
    staleTime: Infinity,
  });

export const artistDataFromTrackIdQueryOptions = (
  trackId: string | undefined,
) =>
  queryOptions({
    queryKey: ["artist-data-from-track", trackId],
    queryFn: async () => {
      if (!trackId) throw new Error("Track ID is required");
      const res = await api.protected.artist.artist_data_from_track_id.$get({
        query: { trackId },
      });
      if (!res.ok) throw new Error("Failed to fetch artist data from track ID");
      return res.json();
    },
    staleTime: Infinity,
  });

export const trackSummaryQueryOptions = (
  trackId: string | undefined,
  trackName: string | undefined,
  artistName: string | undefined,
) =>
  queryOptions({
    queryKey: ["track-summary", trackName],
    queryFn: async () => {
      if (!trackName || !trackId) throw new Error("Missing track information");
      const res = await api.protected.summary.track_summary.$get({
        query: { trackId, trackName, artistName },
      });
      if (!res.ok) throw new Error("Failed to fetch track summary");
      return res.json();
    },
    staleTime: Infinity,
  });

export const artistSummaryQueryOptions = (
  trackName: string | undefined,
  artistId: string | undefined,
  artistName: string | undefined,
) =>
  queryOptions({
    queryKey: ["artist-summary", artistName],
    queryFn: async () => {
      if (!artistName || !artistId)
        throw new Error("Missing artist information");
      const res = await api.protected.summary.artist_summary.$get({
        query: { trackName, artistId, artistName },
      });
      if (!res.ok) throw new Error("Failed to fetch artist summary");
      return res.json();
    },
    staleTime: Infinity,
  });

export const trackSearchQueryOptions = (query: string) =>
  queryOptions({
    queryKey: ["track-search", query],
    queryFn: async () => {
      if (!query) throw new Error("Query is required");
      const res = await api.protected.track.track_search.$get({
        query: { query },
      });
      if (!res.ok) throw new Error("Failed to search for tracks");
      return res.json();
    },
  });

export const createPostMutationOptions = () => {
  return {
    mutationKey: ["create-post"],
    mutationFn: async (data: CreatePost) => {
      const res = await api.protected.post.create.$post({
        json: {
          title: data.title,
          type: data.type,
          allow_suggestions: data.allow_suggestions,
          content: data.content,
        },
      });
      if (!res.ok) throw new Error("Failed to create post");
      return res.json();
    },
  };
};

export const createRecentlyViewedMutationOptions = () => {
  return {
    mutationKey: ["create-recently-viewed"],
    mutationFn: async (data: CreateView) => {
      const res = await api.protected.user.create_view.$post({
        json: {
          type: data.type,
          content_id: data.content_id,
        },
      });
      if (!res.ok) throw new Error("Failed to create recently viewed item");
      return res.json();
    },
  };
};

export const homePostsQueryOptions = () =>
  queryOptions({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const res = await api.protected.post.home_posts.$get();
      if (!res.ok) throw new Error("Failed to fetch home posts");
      return res.json();
    },
  });

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["post", postId],
    queryFn: async () => {
      if (!postId) throw new Error("Post ID is required");
      const res = await api.protected.post.post[":id"].$get({
        param: { id: postId },
      });
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json();
    },
  });

export const postTrackSuggestionsQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["post-track-suggestions", postId],
    queryFn: async () => {
      if (!postId) throw new Error("Post ID is required");
      const res = await api.protected.post.track_suggestions[":id"].$get({
        param: { id: postId },
      });
      if (!res.ok) throw new Error("Failed to fetch track suggestions");
      return res.json();
    },
  });

export const recentlyViewedQueryOptions = (
  type: "post" | "playlist" | "user" | "artist",
  limit?: number,
) =>
  queryOptions({
    queryKey: ["recently-viewed", type, limit],
    queryFn: async () => {
      const res = await api.protected.user.recently_viewed.$get({
        query: { type, limit },
      });
      if (!res.ok) throw new Error("Failed to fetch recently viewed items");
      return res.json();
    },
  });

export const recentlyViewedPostsQueryOptions = (limit?: number) =>
  queryOptions({
    queryKey: ["recently-viewed-posts"],
    queryFn: async () => {
      const res = await api.protected.user.recently_viewed_posts.$get({
        query: { limit },
      });
      if (!res.ok) throw new Error("Failed to fetch recently viewed posts");
      return res.json();
    },
  });

export const commentsQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["post-comments", postId],
    queryFn: async () => {
      if (!postId) throw new Error("Post ID is required");
      const res = await api.protected.comment.comments[":id"].$get({
        param: { id: postId },
      });
      if (!res.ok) throw new Error("Failed to fetch post comments");
      return res.json();
    },
  });

export const createCommentMutationOptions = () => {
  return {
    mutationKey: ["create-comment"],
    mutationFn: async (data: { postId: string; content: string }) => {
      const res = await api.protected.comment.create_comment.$post({
        json: {
          post_id: data.postId,
          content: data.content,
        },
      });
      if (!res.ok) throw new Error("Failed to create comment");
      return res.json();
    },
  };
};

export const createReplyMutationOptions = () => {
  return {
    mutationKey: ["create-reply"],
    mutationFn: async (data: { commentId: string; content: string }) => {
      const res = await api.protected.comment.create_reply.$post({
        json: {
          comment_id: data.commentId,
          content: data.content,
        },
      });
      if (!res.ok) throw new Error("Failed to create reply");
      return res.json();
    },
  };
};

export const repliesQueryOptions = (
  commentId: string,
  cursor?: string,
  limit?: number,
) =>
  queryOptions({
    queryKey: ["comment-replies", commentId],
    queryFn: async () => {
      if (!commentId) throw new Error("Comment ID is required");
      const res = await api.protected.comment.comment_replies.$get({
        query: {
          id: commentId,
          limit,
          cursor,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch comment replies");
      return res.json();
    },
  });
