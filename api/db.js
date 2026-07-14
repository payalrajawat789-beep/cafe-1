// ============================================================
// api/db.js — Shared PostgreSQL connection (Neon)
// Automatically ensures all database tables exist before querying
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

// A cached promise to initialize schemas once per cold-start
let schemaInitialized = null;

async function ensureSchema() {
  if (schemaInitialized) return schemaInitialized;

  schemaInitialized = (async () => {
    try {
      // 1. Create reservations table
      await pool.queryRaw(`
        CREATE TABLE IF NOT EXISTS reservations (
          id          SERIAL PRIMARY KEY,
          name        VARCHAR(100) NOT NULL,
          phone       VARCHAR(20)  NOT NULL,
          email       VARCHAR(150) NOT NULL,
          guests      VARCHAR(10)  NOT NULL,
          date        DATE         NOT NULL,
          time        TIME         NOT NULL,
          message     TEXT,
          status      VARCHAR(20)  DEFAULT 'pending',
          created_at  TIMESTAMP    DEFAULT NOW()
        );
      `);

      // 2. Create newsletter table
      await pool.queryRaw(`
        CREATE TABLE IF NOT EXISTS newsletter (
          id          SERIAL PRIMARY KEY,
          email       VARCHAR(150) UNIQUE NOT NULL,
          subscribed_at TIMESTAMP DEFAULT NOW()
        );
      `);

      // 3. Create contact_messages table
      await pool.queryRaw(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id          SERIAL PRIMARY KEY,
          name        VARCHAR(100),
          email       VARCHAR(150),
          message     TEXT,
          created_at  TIMESTAMP DEFAULT NOW()
        );
      `);

      // 4. Create orders table
      await pool.queryRaw(`
        CREATE TABLE IF NOT EXISTS orders (
          id          SERIAL PRIMARY KEY,
          table_num   VARCHAR(20)  NOT NULL,
          items       JSONB        NOT NULL,
          subtotal    INTEGER      NOT NULL,
          tax         INTEGER      NOT NULL,
          total       INTEGER      NOT NULL,
          payment_method VARCHAR(50) NOT NULL,
          status      VARCHAR(20)  DEFAULT 'pending',
          created_at  TIMESTAMP    DEFAULT NOW()
        );
      `);

      console.log('✅ Auto-schema initialization completed successfully.');
    } catch (err) {
      console.error('❌ Auto-schema initialization failed:', err.message);
      schemaInitialized = null; // reset to allow retry on next query
      throw err;
    }
  })();

  return schemaInitialized;
}

// Bind original query method
const originalQuery = pool.query.bind(pool);
pool.queryRaw = originalQuery; // exposing raw query to prevent infinite recursion

pool.query = async function(...args) {
  await ensureSchema();
  return originalQuery(...args);
};

module.exports = pool;
