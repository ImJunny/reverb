import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
  type: z.string(),
  allow_suggestions: z.boolean(),
});
