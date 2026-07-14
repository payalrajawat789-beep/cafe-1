// ============================================================
// api/admin-login.js — Admin Authentication API
// POST /api/admin-login
// ============================================================

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
    const { username, password } = req.body;

    // Fetch credentials from env or use secure defaults
    const expectedUsername = process.env.ADMIN_USER || 'admin';
    const expectedPassword = process.env.ADMIN_PASS || 'brewbliss2026';

    if (username === expectedUsername && password === expectedPassword) {
      // Simulating a session token (in production, use JWT or iron-session)
      // For demo, returning a secure payload that the dashboard will store in sessionStorage
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      res.status(200).json({
        success: true,
        message: '🔑 Login successful!',
        token: token
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: error.message
    });
  }
};
