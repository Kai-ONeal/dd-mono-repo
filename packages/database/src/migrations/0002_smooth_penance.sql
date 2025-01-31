CREATE TABLE IF NOT EXISTS "locations" (
	"id" integer PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"matched_substrings" jsonb NOT NULL,
	"place_id" varchar(255) NOT NULL,
	"reference" varchar(255) NOT NULL,
	"structured_formatting" jsonb NOT NULL,
	"terms" jsonb NOT NULL,
	"types" jsonb NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "locations_reviews" (
	"id" integer PRIMARY KEY NOT NULL,
	"rating" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar NOT NULL,
	"location_id" integer NOT NULL
);

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "locations_reviews" ADD CONSTRAINT "locations_reviews_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
