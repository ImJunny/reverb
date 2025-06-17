import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
dotenv.config({
  path: "../../../.env",
});

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  throw new Error(
    `DATABASE_URL is not defined in the environment variables. Current value: ${DATABASE_URL}`
  );
}

export const db = drizzle(DATABASE_URL);
