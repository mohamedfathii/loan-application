import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { DataSource } from 'typeorm';

// Used only by the TypeORM CLI (migrations). The Nest app configures its own
// connection in AppModule. The CLI runs against the compiled files in dist/,
// because Node can't load TypeScript decorators directly.

// Locally, read .env; in production the variables come from the environment.
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
}

// dist/database -> dist
const distRoot = join(import.meta.dirname, '..');

export default new DataSource({
  type: 'postgres',
  host: requireEnv('DB_HOST'),
  port: Number(requireEnv('DB_PORT')),
  username: requireEnv('DB_USER'),
  password: requireEnv('DB_PASSWORD'),
  database: requireEnv('DB_NAME'),
  // Use Postgres' built-in gen_random_uuid() instead of the uuid-ossp extension.
  uuidExtension: 'pgcrypto',
  entities: [join(distRoot, '**', '*.entity.js')],
  migrations: [join(distRoot, 'migrations', '*.js')],
});
