import {
  getRefreshToken,
  getSession,
  updateSession,
} from "@server/db/actions/session-actions";
import { getNewAccessToken } from "@server/lib/spotify-helpers";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

type Variables = {
  access_token: string;
  user_id: string;
};

export const authMiddleware = createMiddleware<{ Variables: Variables }>(
  async (c, next) => {
    const userId = getCookie(c, "user_id");
    if (!userId) return c.text("Unauthorized, no session cookie found.", 401);

    const session = await getSession(userId);
    if (!session) return c.text("Unauthorized, no session found.", 401);

    if (session.expires_at < new Date()) {
      const refreshToken = await getRefreshToken(userId!);
      const tokenData = await getNewAccessToken(refreshToken);

      await updateSession(
        userId,
        tokenData.access_token,
        new Date(Date.now() + tokenData.expires_in * 1000)
      );

      c.set("access_token", tokenData.access_token);
    } else {
      c.set("access_token", session.access_token);
    }
    c.set("user_id", userId);
    await next();
  }
);
