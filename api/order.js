// ============================================================
// api/order.js — Save Food Order API
// POST /api/order
// ============================================================

const pool = require('./db');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { table_num, items, subtotal, tax, total, payment_method } = req.body;

    // Validation
    if (!table_num || !items || !subtotal || !tax || !total || !payment_method) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order details'
      });
    }

    // Insert into PostgreSQL orders table
    const result = await pool.query(
      `INSERT INTO orders (table_num, items, subtotal, tax, total, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, table_num, total, payment_method, status, created_at`,
      [table_num, JSON.stringify(items), subtotal, tax, total, payment_method]
    );

    const order = result.rows[0];

    res.status(201).json({
      success: true,
      message: `🎉 Order placed successfully! Order ID: #BB-${order.id}`,
      order: {
        id: order.id,
        table_num: order.table_num,
        total: order.total,
        payment_method: order.payment_method,
        status: order.status,
        created_at: order.created_at
      }
    });

  } catch (error) {
    console.error('Order Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process order. Please try again.',
      error: error.message
    });
  }
};
