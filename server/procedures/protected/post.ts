import {
  createCommentDB,
  createPostDB,
  createReplyDB,
  getCommentRepliesDB,
  getHomePostsDB,
  getPostCommentsDB,
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

export async function createComment(c: ProtectedContext) {
  try {
    const userId = c.get("user_id");
    const body = await c.req.json();
    const { post_id, content } = body;
    if (!post_id || !content)
      return c.json({ message: "Post ID and content are required" }, 400);

    await createCommentDB(post_id, userId, content);
    return c.json(200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to create comment", error: error.message },
      500
    );
  }
}

export async function getPostComments(c: ProtectedContext) {
  try {
    const postId = c.req.param("id");
    if (!postId) return c.json({ message: "Post ID is required" }, 400);

    const comments = await getPostCommentsDB(postId);
    return c.json(comments, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to retrieve comments", error: error.message },
      500
    );
  }
}

export async function createReply(c: ProtectedContext) {
  try {
    const userId = c.get("user_id");
    const body = await c.req.json();
    const { comment_id, content, tag_user_id } = body;
    if (!comment_id || !content)
      return c.json({ message: "Comment ID and content are required" }, 400);

    const result = await createReplyDB(
      comment_id,
      userId,
      content,
      tag_user_id
    );
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to create comment reply", error: error.message },
      500
    );
  }
}

export async function getCommentReplies(c: ProtectedContext) {
  try {
    const commentId = c.req.query("id");
    if (!commentId) return c.json({ message: "Comment ID is required" }, 400);
    const cursor = c.req.query("cursor");
    const limit = parseInt(c.req.query("limit") || "2", 10);
    const replies = await getCommentRepliesDB(commentId, cursor, limit);
    return c.json(replies, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to retrieve comment replies", error: error.message },
      500
    );
  }
}
