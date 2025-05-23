import { neon } from '@neondatabase/serverless';

export const db = neon(import.meta.env.NEON_DATABASE_URL);