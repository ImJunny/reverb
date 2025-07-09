import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// ENUMS
const summaryTypeEnum = pgEnum("type", ["track", "artist"]);
const postTypeEnum = pgEnum("post_type", ["text", "track_id", "playlist_id"]);

// TABLES
export const usersTable = pgTable("users", {
  user_id: text().primaryKey(),
  access_token: text().notNull(),
  refresh_token: text().notNull(),
  expires_at: timestamp().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});

export const summariesTable = pgTable("summaries", {
  id: text().primaryKey(),
  type: summaryTypeEnum("type").notNull(),
  summary: text().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});

export const postsTable = pgTable("posts", {
  id: text().primaryKey(),
  title: text().notNull(),
  type: postTypeEnum("type").notNull(),
  content: text(),
  allow_suggestions: boolean(),
  created_at: timestamp().defaultNow().notNull(),
  user_id: text().references(() => usersTable.user_id, {
    onDelete: "set null",
  }),
});

export const trackSuggestionsTable = pgTable("track_suggestions", {
  id: text().primaryKey(),
  user_id: text().references(() => usersTable.user_id, {
    onDelete: "set null",
  }),
  post_id: text().references(() => postsTable.id, {
    onDelete: "cascade",
  }),
  track_id: text().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});
