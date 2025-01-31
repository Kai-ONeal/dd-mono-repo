import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: "../../.env" });

// see if environment variable DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

export default defineConfig({
  schema: "./src/entities/index.ts",
  dialect: "postgresql",
  out: "./src/migrations",
  dbCredentials: { url: process.env.DATABASE_URL },
});
