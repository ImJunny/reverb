import { db } from "..";
import { postsTable } from "../schema";
import { v4 as uuidv4 } from "uuid";

export async function createPostDB(
  title: string,
  type: "text" | "track_id" | "playlist_id",
  content: string,
  allow_suggestions: boolean
) {
  await db.insert(postsTable).values({
    id: uuidv4(),
    title,
    type,
    content,
    allow_suggestions,
  });
}
