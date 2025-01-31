import { Pool } from "pg";
import * as schemas from "./entities/index";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { db } from "./index";

async function main() {
  const testIds = await Promise.all(
    Array(10)
      .fill("")
      .map(async (index) => {
        const dbTest = await db
          .insert(schemas.tests)
          .values({
            name: `Test ${index}`,
            age: 15 + index,
          })
          .returning();

        return dbTest[0].id;
      })
  );

  console.log("Inserted test IDs:", testIds);
}

main().catch((error) => {
  console.error(error);
  process.exit(0);
});
