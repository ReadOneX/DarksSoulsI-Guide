import fs from 'node:fs/promises';
import path from 'node:path';
import { pool } from './pool';

async function migrate(): Promise<void> {
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const schema = await fs.readFile(schemaPath, 'utf8');
  await pool.query(schema);
  console.log('Database schema migrated successfully');
  await pool.end();
}

migrate().catch(async (error: unknown) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
