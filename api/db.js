// ============================================================
// api/db.js — Shared PostgreSQL connection (Neon)
// ============================================================

const { Pool } = require('pg');

// Use DATABASE_URL from environment (set in Vercel dashboard)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

module.exports = pool;
