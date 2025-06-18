import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const sessionsTable = pgTable("sessions", {
  user_id: text().primaryKey(),
  access_token: text(),
  refresh_token: text(),
  expires_at: timestamp(),
});
