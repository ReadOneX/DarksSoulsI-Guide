import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.PG_POOL_MAX ?? 10),
  idleTimeoutMillis: 30_000,
});

export async function checkDatabase(): Promise<{ ok: boolean; message: string }> {
  if (!process.env.DATABASE_URL) {
    return {
      ok: false,
      message: 'DATABASE_URL is not configured',
    };
  }

  try {
    await pool.query('SELECT 1');
    return {
      ok: true,
      message: 'PostgreSQL connection is healthy',
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'PostgreSQL connection failed',
    };
  }
}
