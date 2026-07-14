// ============================================================
// api/reserve.js — Table Reservation API
// POST /api/reserve
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
    const { name, phone, email, guests, date, time, message } = req.body;

    // Validation
    if (!name || !phone || !email || !guests || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled'
      });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Insert into database
    const result = await pool.query(
      `INSERT INTO reservations (name, phone, email, guests, date, time, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, email, date, time, guests`,
      [name, phone, email, guests, date, time, message || null]
    );

    const reservation = result.rows[0];

    res.status(201).json({
      success: true,
      message: `🎉 Table reserved successfully! Reservation ID: #${reservation.id}`,
      reservation: {
        id: reservation.id,
        name: reservation.name,
        email: reservation.email,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests
      }
    });

  } catch (error) {
    console.error('Reservation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process reservation. Please try again.',
      error: error.message
    });
  }
};
