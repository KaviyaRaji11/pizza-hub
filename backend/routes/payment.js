const express = require('express');
const router = express.Router();

// Mock payment - always succeeds
router.post('/create-order', async (req, res) => {
  console.log('💰 Mock payment for amount:', req.body.amount);
  res.json({
    id: 'mock_order_' + Date.now(),
    amount: req.body.amount * 100,
    currency: 'INR'
  });
});

router.post('/verify', async (req, res) => {
  console.log('✅ Mock payment verified');
  res.json({ success: true });
});

module.exports = router;
