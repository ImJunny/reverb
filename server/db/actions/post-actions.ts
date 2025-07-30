import { desc, eq, sql } from "drizzle-orm";
import { db } from "..";
import {
  postsTable,
  postTagsTable,
  tagTypesTable,
  usersTable,
} from "../schema";
import { v4 as uuidv4 } from "uuid";
import type { CategoryValue, Tag } from "shared/types";

export async function createPostDB(
  user_id: string,
  title: string,
  type: "text" | "track_id" | "playlist_id",
  content: string,
  allow_suggestions: boolean,
  category: CategoryValue,
  tags: Tag["value"][]
) {
  const postId = uuidv4();

  // Create the post
  await db.insert(postsTable).values({
    id: postId,
    user_id,
    title,
    type,
    content,
    allow_suggestions,
    category,
  });

  // If tags are provided, insert them into the database
  if (tags.length > 0) {
    for (const tag of tags) {
      await db
        .insert(postTagsTable)
        .values({
          id: uuidv4(),
          post_id: postId,
          tag_type: tag,
        })
        .onConflictDoNothing();
    }
  }
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
      category: postsTable.category,
      tags: sql<Tag[]>`(
        SELECT json_agg(json_build_object(
          'value', ${postTagsTable.tag_type},
          'label', ${tagTypesTable.label}
        ))
        FROM ${postTagsTable}
        INNER JOIN ${tagTypesTable} ON ${postTagsTable.tag_type} = ${tagTypesTable.value}
        WHERE ${postTagsTable.post_id} = ${postsTable.id}
      )`,
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
      category: postsTable.category,
      tags: sql<Tag[]>`(
        SELECT json_agg(json_build_object(
          'value', ${postTagsTable.tag_type},
          'label', ${tagTypesTable.label}
        ))
        FROM ${postTagsTable}
        INNER JOIN ${tagTypesTable} ON ${postTagsTable.tag_type} = ${tagTypesTable.value}
        WHERE ${postTagsTable.post_id} = ${postsTable.id}
      )`,
    })
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.user_id, usersTable.user_id))
    .where(eq(postsTable.id, id))
    .then((res) => res[0]);
  return post;
}
