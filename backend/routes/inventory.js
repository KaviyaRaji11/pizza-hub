const express = require('express');
const router = express.Router();
const Inventory = require('./models/Inventory');
const nodemailer = require('nodemailer');

// Email setup (using test email for now)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
// Function to send low stock email
async function sendLowStockEmail(itemName, currentStock, threshold) {
  const mailOptions = {
    to: 'admin@gmail.com',
    subject: `⚠️ LOW STOCK ALERT: ${itemName}`,
    html: `
      <h2 style="color: red;">Low Stock Alert!</h2>
      <p><strong>${itemName}</strong> is running low on stock.</p>
      <p>Current Stock: <strong style="color: red;">${currentStock}</strong></p>
      <p>Threshold Limit: ${threshold}</p>
      <p>Please restock immediately.</p>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent for ${itemName} low stock`);
  } catch (error) {
    console.log('Email not sent (test mode):', error.message);
  }
}

// Get all inventory
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update stock
router.put('/:id', async (req, res) => {
  try {
    const { stock } = req.body;
    const oldItem = await Inventory.findById(req.params.id);
    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );
    
    // Check if stock went below threshold
    if (item.stock < item.threshold && oldItem.stock >= item.threshold) {
      await sendLowStockEmail(item.name, item.stock, item.threshold);
    }
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed inventory
router.post('/seed', async (req, res) => {
  try {
    await Inventory.deleteMany({});
    
    const items = [
      { name: 'Thin Crust', category: 'base', stock: 50, threshold: 20, price: 50 },
      { name: 'Cheese Burst', category: 'base', stock: 50, threshold: 20, price: 80 },
      { name: 'Wheat Thin', category: 'base', stock: 50, threshold: 20, price: 60 },
      { name: 'Pan Pizza', category: 'base', stock: 50, threshold: 20, price: 70 },
      { name: 'Stuffed Crust', category: 'base', stock: 50, threshold: 20, price: 90 },
      { name: 'Tomato Sauce', category: 'sauce', stock: 100, threshold: 20, price: 20 },
      { name: 'Pesto Sauce', category: 'sauce', stock: 100, threshold: 20, price: 30 },
      { name: 'BBQ Sauce', category: 'sauce', stock: 100, threshold: 20, price: 25 },
      { name: 'White Sauce', category: 'sauce', stock: 100, threshold: 20, price: 35 },
      { name: 'Spicy Red Sauce', category: 'sauce', stock: 100, threshold: 20, price: 25 },
      { name: 'Mozzarella', category: 'cheese', stock: 80, threshold: 20, price: 40 },
      { name: 'Cheddar', category: 'cheese', stock: 80, threshold: 20, price: 50 },
      { name: 'Parmesan', category: 'cheese', stock: 80, threshold: 20, price: 45 },
      { name: 'Onion', category: 'veggie', stock: 100, threshold: 20, price: 10 },
      { name: 'Capsicum', category: 'veggie', stock: 100, threshold: 20, price: 10 },
      { name: 'Tomato', category: 'veggie', stock: 100, threshold: 20, price: 10 },
      { name: 'Corn', category: 'veggie', stock: 100, threshold: 20, price: 15 },
      { name: 'Olives', category: 'veggie', stock: 100, threshold: 20, price: 20 },
      { name: 'Pepperoni', category: 'meat', stock: 60, threshold: 15, price: 50 },
      { name: 'Chicken Tikka', category: 'meat', stock: 60, threshold: 15, price: 60 },
      { name: 'Sausage', category: 'meat', stock: 60, threshold: 15, price: 55 }
    ];
    
    await Inventory.insertMany(items);
    res.json({ message: `Added ${items.length} inventory items!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;