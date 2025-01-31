import * as dotenv from "dotenv";
import * as path from "path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const newPath = path.join(__dirname, "../../../../.env");

dotenv.config({ path: newPath });

// see if environment variable DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const sql = neon(process.env.DATABASE_URL);

export * from "./entities/index";
export * from "./drizzle-database.module";

export const db = drizzle(sql);
