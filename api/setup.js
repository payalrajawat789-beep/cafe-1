// ============================================================
// api/setup.js — Create database tables (run once)
// Visit: /api/setup to initialize DB
// ============================================================

const pool = require('./db');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // Create reservations table
    await pool.query(`
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

    // Create newsletter table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter (
        id          SERIAL PRIMARY KEY,
        email       VARCHAR(150) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create contact_messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(100),
        email       VARCHAR(150),
        message     TEXT,
        created_at  TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create orders table
    await pool.query(`
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

    res.status(200).json({
      success: true,
      message: '✅ Database tables created successfully!',
      tables: ['reservations', 'newsletter', 'contact_messages', 'orders']
    });

  } catch (error) {
    console.error('DB Setup Error:', error);
    res.status(500).json({
      success: false,
      message: 'Database setup failed',
      error: error.message
    });
  }
};
