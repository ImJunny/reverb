import { eq } from "drizzle-orm";
import { db } from "..";
import { usersTable } from "../schema";

export async function getRefreshTokenDB(userId: string) {
  const refreshToken = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.user_id, userId!))
    .limit(1)
    .then((data) => data[0]!.refresh_token);
  return refreshToken;
}

export async function createUserDB(
  userId: string,
  accessToken: string,
  refreshToken: string,
  expiresAt: Date
) {
  await db
    .insert(usersTable)
    .values({
      user_id: userId,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    })
    .onConflictDoUpdate({
      target: usersTable.user_id,
      set: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: expiresAt,
      },
    });
}

export async function updateUserTokensDB(
  userId: string,
  accessToken: string,
  expiresAt: Date
) {
  await db
    .update(usersTable)
    .set({
      access_token: accessToken,
      expires_at: expiresAt,
    })
    .where(eq(usersTable.user_id, userId));
}

export async function getUserDB(userId: string) {
  const session = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.user_id, userId))
    .limit(1)
    .then((data) => data[0]);
  return session;
}
