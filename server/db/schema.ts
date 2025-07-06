import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

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
