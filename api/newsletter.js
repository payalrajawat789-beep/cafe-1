// ============================================================
// api/newsletter.js — Newsletter Subscription API
// POST /api/newsletter
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
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    // Insert (ignore duplicate)
    await pool.query(
      `INSERT INTO newsletter (email) VALUES ($1)
       ON CONFLICT (email) DO NOTHING`,
      [email]
    );

    res.status(200).json({
      success: true,
      message: '🎉 You are subscribed! Exclusive offers coming your way.'
    });

  } catch (error) {
    console.error('Newsletter Error:', error);
    res.status(500).json({
      success: false,
      message: 'Subscription failed. Please try again.',
      error: error.message
    });
  }
};
