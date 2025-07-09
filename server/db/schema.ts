import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const sessionsTable = pgTable("sessions", {
  user_id: text().primaryKey(),
  access_token: text().notNull(),
  refresh_token: text().notNull(),
  expires_at: timestamp().notNull(),
});

export const typeEnum = pgEnum("type", ["track", "artist"]);
export const summariesTable = pgTable("summaries", {
  id: text().primaryKey(),
  type: typeEnum("type").notNull(),
  summary: text().notNull(),
  created_at: timestamp().defaultNow(),
});

export const postTypeEnum = pgEnum("post_type", [
  "text",
  "track_id",
  "playlist_id",
]);
export const postsTable = pgTable("posts", {
  id: text().primaryKey(),
  title: text().notNull(),
  type: postTypeEnum("type").notNull(),
  content: text(),
  allow_suggestions: boolean(),
  created_at: timestamp().defaultNow(),
});
