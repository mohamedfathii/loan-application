import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { DataSource } from 'typeorm';

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

const distRoot = join(import.meta.dirname, '..');

export default new DataSource({
  type: 'postgres',
  host: requireEnv('DB_HOST'),
  port: Number(requireEnv('DB_PORT')),
  username: requireEnv('DB_USER'),
  password: requireEnv('DB_PASSWORD'),
  database: requireEnv('DB_NAME'),
  uuidExtension: 'pgcrypto',
  entities: [join(distRoot, '**', '*.entity.js')],
  migrations: [join(distRoot, 'migrations', '*.js')],
});
