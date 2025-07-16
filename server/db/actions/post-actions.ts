import { and, desc, eq, isNull, sql, lt, asc } from "drizzle-orm";
import { db } from "..";
import {
  commentsTable,
  postsTable,
  repliesTable,
  trackSuggestionsTable,
  usersTable,
} from "../schema";
import { v4 as uuidv4 } from "uuid";

export async function createPostDB(
  user_id: string,
  title: string,
  type: "text" | "track_id" | "playlist_id",
  content: string,
  allow_suggestions: boolean
) {
  await db.insert(postsTable).values({
    id: uuidv4(),
    user_id,
    title,
    type,
    content,
    allow_suggestions,
  });
}

export async function getHomePostsDB() {
  const posts = await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      type: postsTable.type,
      content: postsTable.content,
      allow_suggestions: postsTable.allow_suggestions,
      created_at: postsTable.created_at,
      user_id: postsTable.user_id,
      user_image_url: usersTable.image_url,
    })
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.user_id, usersTable.user_id))
    .orderBy(desc(postsTable.created_at));
  return posts;
}

export async function getPostDB(id: string) {
  const post = await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      type: postsTable.type,
      content: postsTable.content,
      allow_suggestions: postsTable.allow_suggestions,
      created_at: postsTable.created_at,
      user_id: postsTable.user_id,
      user_image_url: usersTable.image_url,
    })
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.user_id, usersTable.user_id))
    .where(eq(postsTable.id, id))
    .then((res) => res[0]);
  return post;
}

export async function getPostTrackSuggestionsDB(id: string) {
  const suggestions = await db
    .select()
    .from(trackSuggestionsTable)
    .where(eq(trackSuggestionsTable.post_id, id))
    .orderBy(desc(trackSuggestionsTable.created_at));
  return suggestions;
}

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

export async function getPostCommentsDB(postId: string) {
  const comments = await db
    .select({
      id: commentsTable.id,
      post_id: commentsTable.post_id,
      user_id: commentsTable.user_id,
      text: commentsTable.text,
      created_at: commentsTable.created_at,
      user_image_url: usersTable.image_url,
      reply_count: sql<number>`
  (SELECT COUNT(*) FROM ${repliesTable} WHERE replies.comment_id = ${commentsTable.id})
`,
    })
    .from(commentsTable)
    .innerJoin(usersTable, eq(commentsTable.user_id, usersTable.user_id))
    .where(and(eq(commentsTable.post_id, postId)))
    .orderBy(desc(commentsTable.created_at));
  return comments;
}

export async function createReplyDB(
  commentId: string,
  userId: string,
  text: string,
  tagUserId?: string
) {
  const result = await db
    .insert(repliesTable)
    .values({
      id: uuidv4(),
      comment_id: commentId,
      user_id: userId,
      text,
      created_at: new Date(),
      tag_user_id: tagUserId,
    })
    .returning();
  return result[0];
}

export async function getCommentRepliesDB(
  commentId: string,
  cursor?: string,
  limit: number = 2
) {
  const replies = await db
    .select({
      id: repliesTable.id,
      comment_id: repliesTable.comment_id,
      user_id: repliesTable.user_id,
      text: repliesTable.text,
      created_at: repliesTable.created_at,
      user_image_url: usersTable.image_url,
      tag_user_id: repliesTable.tag_user_id,
    })
    .from(repliesTable)
    .where(
      and(
        eq(repliesTable.comment_id, commentId),
        cursor ? lt(repliesTable.created_at, new Date(cursor)) : sql`true`
      )
    )
    .innerJoin(usersTable, eq(repliesTable.user_id, usersTable.user_id))
    .orderBy(desc(repliesTable.created_at))
    .limit(limit);
  return replies;
}
