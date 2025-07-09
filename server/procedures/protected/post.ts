import { createPostDB } from "@server/db/actions/post-actions";
import type { ProtectedContext } from "@server/utils/auth-middleware";

export async function createPost(c: ProtectedContext) {
  try {
    const body = await c.req.json();
    const { title, type, content, allow_suggestions } = body;

    if (!title || !type || !content || !allow_suggestions)
      return c.json({ message: "Missing values" }, 400);
    await createPostDB(title, type, content, allow_suggestions);
    return c.json(null, 200);
  } catch (error: any) {
    return c.json(
      { message: "Failed to create post", error: error.message },
      500
    );
  }
}
