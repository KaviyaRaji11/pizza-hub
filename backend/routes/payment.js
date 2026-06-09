const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_SzdDSSaq6K5LVU',
  key_secret: 'nJhJR8RPQUVoqt4a5UVPqbx1'
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
    console.error('Razorpay error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post('/verify', async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    console.log('Payment verified:', { order_id, payment_id });
    res.json({ success: true, message: 'Payment verified successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;