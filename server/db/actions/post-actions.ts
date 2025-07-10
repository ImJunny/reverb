import { and, desc, eq } from "drizzle-orm";
import { db } from "..";
import { postsTable, trackSuggestionsTable } from "../schema";
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
    .select()
    .from(postsTable)
    .orderBy(desc(postsTable.created_at));
  return posts;
}

export async function getPostDB(id: string) {
  const post = await db
    .select()
    .from(postsTable)
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
