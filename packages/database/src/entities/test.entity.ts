import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const tests = pgTable("tests", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }),
  age: integer(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Schema for inserting a Test - can be used to validate API requests
export const insertTestSchema = createInsertSchema(tests);

// Schema for selecting a Test - can be used to validate API responses
export const selectTestSchema = createSelectSchema(tests);
