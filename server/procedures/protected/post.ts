import {
  createPostDB,
  getHomePostsDB,
  getPostDB,
} from "@server/db/actions/post-actions";
import { getSpotifyPlaylistData } from "@server/lib/spotify-helpers";
import type { ProtectedContext } from "@server/utils/auth-middleware";
import type { PlaylistData, Post } from "shared/types";

// Create post; body validated by zValidator
export async function createPost(c: ProtectedContext) {
  try {
    const userId = c.get("user_id");
    const body = await c.req.json();
    const { title, type, content, allow_suggestions } = body;
    await createPostDB(userId, title, type, content, allow_suggestions);
    return c.json(200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to create post", error: error.message },
      500
    );
  }
}

export async function getHomePosts(c: ProtectedContext) {
  try {
    const posts = await getHomePostsDB();
    return c.json(posts, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to retrieve posts", error: error.message },
      500
    );
  }
}

export async function getPost(c: ProtectedContext) {
  try {
    const postId = c.req.param("id");
    if (!postId) return c.json({ message: "Post ID is required" }, 400);

    const post = await getPostDB(postId);
    if (!post) return c.json({ message: "Post not found" }, 404);
    return c.json(post, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to retrieve post", error: error.message },
      500
    );
  }
}

export async function getPlaylistData(c: ProtectedContext) {
  const playlistId = c.req.param("id");
  if (!playlistId) return c.json({ message: "Playlist ID is required" }, 400);

  try {
    const accessToken = c.get("access_token");
    const playlistData = await getSpotifyPlaylistData(accessToken, playlistId);
    return c.json(playlistData, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to fetch playlist info", error: error.message },
      500
    );
  }
}
