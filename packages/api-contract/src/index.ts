import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { selectTestSchema, insertTestSchema } from "@repo/drizzle-database"; // Import from your Drizzle ORM library

const c = initContract();

// Use the selectTestSchema directly to define the schema for your API responses
export const TestSchema = selectTestSchema;

// Create Schema for inserting a Test (API request validation)
export const TestCreateSchema = insertTestSchema;

// Update Schema for patching (optional fields)
export const TestPatchSchema = TestCreateSchema.partial();

// Infer TypeScript types from schemas
export type TestEntity = z.infer<typeof TestSchema>;
export type TestCreateEntity = z.infer<typeof TestCreateSchema>;

// Define your contract
export const contract = c.router(
  {
    tests: {
      create: {
        method: "POST",
        path: "/tests",
        body: TestCreateSchema,
        responses: {
          201: z.any(),
          500: z.object({
            message: z.string(),
          }),
        },
      },
      findAll: {
        method: "GET",
        path: "/tests",
        query: z.object({
          name: z.string().optional(),
        }),
        responses: {
          200: z.array(TestSchema),
          404: z.object({
            message: z.string(),
          }),
        },
      },
      update: {
        method: "PATCH",
        path: "/tests/:id",
        pathParams: z.object({
          id: z.number().int(),
        }),
        body: TestPatchSchema,
        responses: {
          200: TestSchema,
          404: z.object({
            message: z.string(),
          }),
        },
      },
      delete: {
        method: "DELETE",
        path: "/tests/:id",
        pathParams: z.object({
          id: z.number().int(),
        }),
        responses: {
          204: z.undefined(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
  {
    pathPrefix: "api/v1",
    strictStatusCodes: true,
  }
);
