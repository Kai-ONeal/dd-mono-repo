import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schemas from "./entities/index";
import * as dotenv from "dotenv";
import * as path from "path";

const newPath = path.resolve(__dirname, "../../.env");

dotenv.config({ path: newPath });

export const DATABASE_CONNECTION = Symbol("DATABASE_CONNECTION");
export const entities = schemas;
export type DrizzleDB = NodePgDatabase<typeof schemas>;

NodePgDatabase<typeof schemas>;
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const pool: Pool = new Pool({
          connectionString: configService.getOrThrow<string>("DATABASE_URL"),
          ssl: true,
        });

        return drizzle(pool, { schema: schemas }) as NodePgDatabase<typeof schemas>;
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DrizzleDatabaseModule {}
