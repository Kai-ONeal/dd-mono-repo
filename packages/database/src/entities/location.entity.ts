import { integer, pgTable, varchar, text, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Define the locations table
export const locations = pgTable("locations", {
  id: integer("id").primaryKey().notNull(),
  description: text("description").notNull(),
  matchedSubstrings: jsonb("matched_substrings").notNull(),
  placeId: varchar("place_id", { length: 255 }).notNull(),
  reference: varchar("reference", { length: 255 }).notNull(),
  structuredFormatting: jsonb("structured_formatting").notNull(),
  terms: jsonb("terms").notNull(),
  types: jsonb("types").notNull(),
});

// Schema for inserting a Test - can be used to validate API requests
export const insertLocationSchema = createInsertSchema(locations);

// Schema for selecting a Test - can be used to validate API responses
export const selectLocationSchema = createSelectSchema(locations);
