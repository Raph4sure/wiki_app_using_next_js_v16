import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import { strict as assert } from 'node:assert';

dotenv.config({
  path: '.env.local',
});

assert(process.env.DATABASE_URL, 'Database URL is needed');

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
