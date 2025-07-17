import { Table } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

// ENUMS
export const summaryTypeEnum = pgEnum("summary_type", ["track", "artist"]);
export const postTypeEnum = pgEnum("post_type", [
  "text",
  "track_id",
  "playlist_id",
]);
export const recentlyViewedTypeEnum = pgEnum("recently_viewed_type", [
  "post",
  "playlist",
  "user",
  "artist",
]);

// TABLES
export const usersTable = pgTable("users", {
  user_id: text().primaryKey(),
  access_token: text().notNull(),
  refresh_token: text().notNull(),
  expires_at: timestamp().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  image_url: text(),
});

export const summariesTable = pgTable("summaries", {
  id: text().primaryKey(),
  type: summaryTypeEnum().notNull(),
  summary: text(),
  created_at: timestamp().defaultNow().notNull(),
});

export const postsTable = pgTable("posts", {
  id: text().primaryKey(),
  title: text().notNull(),
  type: postTypeEnum().notNull(),
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

export const recentlyViewedTable = pgTable(
  "recently_viewed",
  {
    id: text().primaryKey(),
    user_id: text().references(() => usersTable.user_id, {
      onDelete: "cascade",
    }),
    type: recentlyViewedTypeEnum().notNull(),
    content_id: text().notNull(),
    created_at: timestamp().defaultNow().notNull(),
  },
  (table) => ({
    unique_user_view: unique().on(table.user_id, table.content_id),
  })
);

export const commentsTable = pgTable("comments", {
  id: text().primaryKey(),
  post_id: text().references(() => postsTable.id, {
    onDelete: "cascade",
  }),
  user_id: text().references(() => usersTable.user_id, {
    onDelete: "cascade",
  }),
  text: text().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  parent_comment_id: text(), // reference to parent comment (optional)
  tagged_user_id: text().references(() => usersTable.user_id, {
    onDelete: "set null",
  }),
});
