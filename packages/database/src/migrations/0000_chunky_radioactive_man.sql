CREATE TABLE IF NOT EXISTS "tests" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"age" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
