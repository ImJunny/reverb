import { db } from "@server/db";
import {
  getRefreshToken,
  updateSession,
} from "@server/db/actions/session-actions";
import { sessionsTable } from "@server/db/schema";
import { getNewTokens } from "@server/lib/spotify-helpers";
import { eq } from "drizzle-orm";
import { type MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const sessionId = getCookie(c, "session_id");
  if (!sessionId) return c.text("Unauthorized, no session cookie found.", 401);

  const session = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.user_id, sessionId))
    .limit(1)
    .then((data) => data[0]);

  if (!session) return c.text("Unauthorized, no session found.", 401);

  if (session.expires_at < new Date()) {
    const userId = getCookie(c, "session_id");
    const refreshToken = await getRefreshToken(userId!);
    const tokenData = await getNewTokens(refreshToken);

    await updateSession(
      userId!,
      tokenData.access_token,
      tokenData.refresh_token,
      new Date(Date.now() + tokenData.expires_in * 1000)
    );

    c.set("access_token", tokenData.access_token);
  } else {
    c.set("access_token", session.access_token);
  }
  await next();
};
