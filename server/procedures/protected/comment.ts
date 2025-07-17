import {
  createCommentDB,
  createReplyDB,
  getCommentsDB,
  getRepliesDB,
} from "@server/db/actions/comment-actions";
import {} from "@server/db/actions/post-actions";
import type { ProtectedContext } from "@server/utils/auth-middleware";

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

export async function getComments(c: ProtectedContext) {
  try {
    const postId = c.req.param("id");
    if (!postId) return c.json({ message: "Post ID is required" }, 400);

    const comments = await getCommentsDB(postId);
    return c.json(comments, 200);
  } catch (error: any) {
    console.log(error);
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
    const { comment_id, content, tagged_user_id } = body;
    if (!comment_id || !content)
      return c.json({ message: "Comment ID and content are required" }, 400);

    const result = await createReplyDB(
      comment_id,
      userId,
      content,
      tagged_user_id
    );
    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to create comment reply", error: error.message },
      500
    );
  }
}

export async function getReplies(c: ProtectedContext) {
  try {
    const commentId = c.req.query("id");
    if (!commentId) return c.json({ message: "Comment ID is required" }, 400);
    const cursor = c.req.query("cursor");
    const limit = parseInt(c.req.query("limit") || "2", 10);
    const replies = await getRepliesDB(commentId, cursor, limit);
    return c.json(replies, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to retrieve comment replies", error: error.message },
      500
    );
  }
}
