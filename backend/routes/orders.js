const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

// Create new order - SIMPLE VERSION
router.post('/', async (req, res) => {
  try {
    console.log('Order request received');
    
    const { customPizza, totalAmount, deliveryAddress, menuItems } = req.body;
    
    // Get user ID from token
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token:', token ? 'Present' : 'Missing');
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const decoded = jwt.verify(token, 'mysecretkey');
    const userId = decoded.userId;
    console.log('User ID:', userId);
    
    const order = new Order({
      userId: userId,
      customPizza: customPizza || {
        base: { name: 'Regular Pizza', price: 0 },
        sauce: { name: 'Standard', price: 0 },
        cheese: { name: 'Mozzarella', price: 0 },
        veggies: [],
        meats: []
      },
      menuItems: menuItems || [],
      totalAmount: totalAmount,
      deliveryAddress: deliveryAddress,
      status: 'pending'
    });
    
    await order.save();
    console.log('✅ Order saved!');
    res.status(201).json({ message: 'Order placed successfully!', order });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get MY orders
router.get('/my-orders', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const decoded = jwt.verify(token, 'mysecretkey');
    const userId = decoded.userId;
    
    const orders = await Order.find({ userId: userId }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get ALL orders (admin)
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;