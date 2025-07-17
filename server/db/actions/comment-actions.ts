import { db } from "..";
import { commentsTable, usersTable } from "../schema";
import { and, asc, desc, eq, gt, isNull, lt, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function createCommentDB(
  postId: string,
  userId: string,
  text: string
) {
  await db.insert(commentsTable).values({
    id: uuidv4(),
    post_id: postId,
    user_id: userId,
    text,
    created_at: new Date(),
  });
}

export async function getCommentsDB(postId: string) {
  const comments = await db
    .select({
      id: commentsTable.id,
      post_id: commentsTable.post_id,
      user_id: commentsTable.user_id,
      text: commentsTable.text,
      created_at: commentsTable.created_at,
      user_image_url: usersTable.image_url,
      reply_count: sql<number>`(
        SELECT COUNT(*)
        FROM ${commentsTable} AS replies
        WHERE replies.parent_comment_id = ${commentsTable.id}
      )`,
      parent_comment_id: commentsTable.parent_comment_id,
    })
    .from(commentsTable)
    .innerJoin(usersTable, eq(commentsTable.user_id, usersTable.user_id))
    .where(
      and(
        eq(commentsTable.post_id, postId),
        isNull(commentsTable.parent_comment_id)
      )
    )
    .orderBy(desc(commentsTable.created_at));
  return comments;
}

export async function createReplyDB(
  commentId: string,
  userId: string,
  text: string
) {
  const result = await db
    .insert(commentsTable)
    .values({
      id: uuidv4(),
      parent_comment_id: commentId,
      user_id: userId,
      text,
      created_at: new Date(),
    })
    .returning();
  return result[0];
}

export async function getRepliesDB(
  commentId: string,
  cursor?: string,
  limit: number = 2
) {
  const replies = await db
    .select({
      id: commentsTable.id,
      parent_comment_id: commentsTable.parent_comment_id,
      user_id: commentsTable.user_id,
      text: commentsTable.text,
      created_at: commentsTable.created_at,
      user_image_url: usersTable.image_url,
      reply_count: sql<number>`NULL`,
    })
    .from(commentsTable)
    .innerJoin(usersTable, eq(commentsTable.user_id, usersTable.user_id))
    .where(
      and(
        eq(commentsTable.parent_comment_id, commentId),
        cursor ? gt(commentsTable.created_at, new Date(cursor)) : sql`TRUE`
      )
    )
    .orderBy(asc(commentsTable.created_at))
    .limit(limit);
  return replies;
}
