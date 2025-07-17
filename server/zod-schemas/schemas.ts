import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
  type: z.string(),
  allow_suggestions: z.boolean(),
});

export const CreateRecentlyViewedSchema = z.object({
  type: z.enum(["post", "playlist", "user", "artist"]),
  content_id: z.string(),
});
