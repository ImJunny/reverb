import {
  createPostDB,
  getHomePostsDB,
  getPostDB,
  getPostTrackSuggestionsDB,
} from "@server/db/actions/post-actions";
import type { ProtectedContext } from "@server/utils/auth-middleware";
import type { TrackSuggestion } from "shared/types";

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

export async function getPostTrackSuggestions(c: ProtectedContext) {
  try {
    const postId = c.req.param("id");
    if (!postId) return c.json({ message: "Post ID is required" }, 400);

    const suggestions = await getPostTrackSuggestionsDB(postId);
    const formattedData: TrackSuggestion[] = suggestions.map((item) => ({
      id: item.id,
      track_id: item.track_id,
      user_id: item.user_id,
    }));
    return c.json(formattedData, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to retrieve track suggestions", error: error.message },
      500
    );
  }
}
