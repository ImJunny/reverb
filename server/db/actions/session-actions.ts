import { eq } from "drizzle-orm";
import { db } from "..";
import { sessionsTable } from "../schema";

export async function getRefreshToken(userId: string) {
  const refreshToken = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.user_id, userId!))
    .limit(1)
    .then((data) => data[0]!.refresh_token);
  return refreshToken;
}

export async function updateSession(
  userId: string,
  accessToken: string,
  refreshToken: string,
  expiresAt: Date
) {
  return db
    .insert(sessionsTable)
    .values({
      user_id: userId,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    })
    .onConflictDoUpdate({
      target: sessionsTable.user_id,
      set: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: expiresAt,
      },
    });
}
