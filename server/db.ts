import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Database configuration - direct connection string using standard PostgreSQL driver
const DATABASE_URL = "postgresql://neondb_owner:npg_U5BGfge7jDub@ep-noisy-darkness-ab1xiq1p-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require";

export const pool = new Pool({ 
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});
export const db = drizzle(pool, { schema });
