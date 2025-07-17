import { and, desc, eq } from "drizzle-orm";
import { db } from "..";
import { postsTable, recentlyViewedTable, usersTable } from "../schema";
import { v4 as uuidv4 } from "uuid";

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
  imageUrl: string | null,
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

export async function createRecentlyViewedDB(
  userId: string,
  type: "post" | "playlist" | "user" | "artist",
  contentId: string
) {
  await db
    .insert(recentlyViewedTable)
    .values({
      id: uuidv4(),
      user_id: userId,
      type,
      content_id: contentId,
    })
    .onConflictDoUpdate({
      target: [recentlyViewedTable.user_id, recentlyViewedTable.content_id],
      set: {
        created_at: new Date(),
      },
    });
}

export async function getRecentlyViewedDB(
  userId: string,
  type: "post" | "playlist" | "user" | "artist",
  limit: number = 10
) {
  const recentlyViewed = await db
    .select()
    .from(recentlyViewedTable)
    .where(
      and(
        eq(recentlyViewedTable.user_id, userId),
        eq(recentlyViewedTable.type, type)
      )
    )
    .orderBy(desc(recentlyViewedTable.created_at))
    .limit(limit);
  return recentlyViewed;
}

export async function getRecentlyViewedPostsDB(
  userId: string,
  limit: number = 10
) {
  const recents = await db
    .select({
      id: recentlyViewedTable.id,
      user_id: recentlyViewedTable.user_id,
      post_id: recentlyViewedTable.content_id,
      post_title: postsTable.title,
      created_at: recentlyViewedTable.created_at,
      user_image_url: usersTable.image_url,
    })
    .from(recentlyViewedTable)
    .where(eq(recentlyViewedTable.user_id, userId))
    .innerJoin(usersTable, eq(recentlyViewedTable.user_id, usersTable.user_id))
    .innerJoin(postsTable, eq(recentlyViewedTable.content_id, postsTable.id))
    .orderBy(desc(recentlyViewedTable.created_at))
    .limit(limit);
  return recents;
}
