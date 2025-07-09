import { eq } from "drizzle-orm";
import { db } from "..";
import { sessionsTable } from "../schema";

export async function getRefreshTokenDB(userId: string) {
  const refreshToken = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.user_id, userId!))
    .limit(1)
    .then((data) => data[0]!.refresh_token);
  return refreshToken;
}

export async function createSessionDB(
  userId: string,
  accessToken: string,
  refreshToken: string,
  expiresAt: Date
) {
  await db
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

export async function updateSessionDB(
  userId: string,
  accessToken: string,
  expiresAt: Date
) {
  await db
    .update(sessionsTable)
    .set({
      access_token: accessToken,
      expires_at: expiresAt,
    })
    .where(eq(sessionsTable.user_id, userId));
}

export async function getSessionDB(userId: string) {
  const session = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.user_id, userId))
    .limit(1)
    .then((data) => data[0]);
  return session;
}
