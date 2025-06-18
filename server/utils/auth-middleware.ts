import { db } from "@server/db";
import { sessionsTable } from "@server/db/schema";
import { eq } from "drizzle-orm";
import { type MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const sessionId = getCookie(c, "session");
  if (!sessionId) return c.text("Unauthorized, no session cookie found.", 401);

  const session = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.user_id, sessionId))
    .limit(1)
    .then((data) => data[0]);

  if (!session) return c.text("Unauthorized, no session found.", 401);

  const now = new Date();
  if (session.expires_at < now)
    return c.text("Unauthorized, session expired.", 401);

  c.set("session", session);
  await next();
};
