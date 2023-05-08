import * as Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite, { logger: true });

migrate(db, { migrationsFolder: "./libs/db/src/lib/drizzle" });
