// ============================================================
// api/admin-data.js — Fetch and Manage Admin Dashboard Data
// GET /api/admin-data (Fetch reservations, orders, subscribers, and stats)
// POST /api/admin-data (Update statuses of reservations or orders)
// ============================================================

const pool = require('./db');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Secure validation
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access Denied: Missing Authorization Header' });
  }

  // --- 1. GET Request: Fetch all data and calculate stats ---
  if (req.method === 'GET') {
    try {
      // Fetch reservations
      const resResult = await pool.query('SELECT * FROM reservations ORDER BY created_at DESC LIMIT 150');
      
      // Fetch orders
      const orderResult = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 150');
      
      // Fetch newsletter subscribers
      const newsResult = await pool.query('SELECT * FROM newsletter ORDER BY subscribed_at DESC LIMIT 150');

      // Calculate stats
      const totalBookings = resResult.rowCount;
      const totalOrders = orderResult.rowCount;
      const totalSubscribers = newsResult.rowCount;
      
      // Sum of revenue (for completed or paid orders)
      const revenueResult = await pool.query("SELECT SUM(total) as revenue FROM orders WHERE status != 'cancelled'");
      const totalRevenue = revenueResult.rows[0].revenue || 0;

      res.status(200).json({
        success: true,
        stats: {
          totalRevenue,
          totalBookings,
          totalOrders,
          totalSubscribers
        },
        reservations: resResult.rows,
        orders: orderResult.rows,
        subscribers: newsResult.rows
      });

    } catch (error) {
      console.error('Admin Data Fetch Error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve admin dashboard data',
        error: error.message
      });
    }
  } 
  // --- 2. POST Request: Update status of a reservation or order ---
  else if (req.method === 'POST') {
    try {
      const { type, id, status } = req.body;

      if (!type || !id || !status) {
        return res.status(400).json({ success: false, message: 'Missing type, id, or status in request body' });
      }

      if (type === 'reservation') {
        const result = await pool.query(
          'UPDATE reservations SET status = $1 WHERE id = $2 RETURNING id, status',
          [status, id]
        );
        if (result.rowCount === 0) {
          return res.status(404).json({ success: false, message: 'Reservation not found' });
        }
        return res.status(200).json({ success: true, message: `Reservation #${id} updated to ${status}`, data: result.rows[0] });
      } 
      else if (type === 'order') {
        const result = await pool.query(
          'UPDATE orders SET status = $1 WHERE id = $2 RETURNING id, status',
          [status, id]
        );
        if (result.rowCount === 0) {
          return res.status(404).json({ success: false, message: 'Order not found' });
        }
        return res.status(200).json({ success: true, message: `Order #${id} updated to ${status}`, data: result.rows[0] });
      } 
      else {
        return res.status(400).json({ success: false, message: 'Invalid update type specified' });
      }

    } catch (error) {
      console.error('Admin Data Update Error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update status',
        error: error.message
      });
    }
  } 
  else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
