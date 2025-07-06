import { eq } from "drizzle-orm";
import { db } from "..";
import { summariesTable } from "../schema";

export async function selectSummary(id: string) {
  const data = await db
    .select()
    .from(summariesTable)
    .where(eq(summariesTable.id, id))
    .then((rows) => {
      return rows[0];
    });
  return data;
}

export async function insertSummary(
  id: string,
  type: "track" | "artist",
  summary: string
) {
  await db
    .insert(summariesTable)
    .values({
      id,
      type,
      summary,
    })
    .onConflictDoUpdate({
      target: summariesTable.id,
      set: {
        summary,
        created_at: new Date(),
      },
    });
}
