import { strict } from "node:assert";
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

dotenv.config({
  path: ".env.local",
});

strict(process.env.DATABASE_URL, "DATABASE_URL is needed");

export const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql, { schema });

export default db;
