import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { locations } from "./location.entity";
import { z } from "zod";

export const locationsReviews = pgTable("locations_reviews", {
  id: integer("id").primaryKey().notNull(),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: varchar("user_id").notNull(),
  locationId: integer("location_id")
    .notNull()
    .references(() => locations.id),
});

// Schema for inserting a Test - can be used to validate API requests
export const insertLocationReviewSchema = z.object({
  rating: z.number().min(1).max(5), // Ensure rating is between 1 and 5
  createdAt: z.date().optional(), // Auto-generated, may not be included in input
  updatedAt: z.date().optional(), // Auto-generated, may not be included in input
  userId: z.string(), // Matches varchar type for user ID
  locationId: z.number(), // Matches integer type for location ID
});
// Schema for selecting a Test - can be used to validate API responses
export const selectLocationReviewSchema = createSelectSchema(locations);
