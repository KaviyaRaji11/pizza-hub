const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_4X4JpLQyRS8nTw',
  key_secret: 'waVgBoM3LGiwykAafQQTqg0u'
});

// Create order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: 'receipt_' + Date.now()
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post('/verify', async (req, res) => {
  res.json({ success: true });
});

module.exports = router;