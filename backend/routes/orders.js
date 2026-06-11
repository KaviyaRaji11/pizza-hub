const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Inventory = require('../models/Inventory');
const jwt = require('jsonwebtoken');

// Helper to get user ID from token
const getUserId = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;
  const decoded = jwt.verify(token, 'mysecretkey');
  return decoded.userId;
};

// Map pizza names to their ingredients
const pizzaIngredients = {
  'Margherita': ['Thin Crust', 'Tomato Sauce', 'Mozzarella'],
  'Veggie Supreme': ['Thin Crust', 'Tomato Sauce', 'Mozzarella', 'Capsicum', 'Onion', 'Tomato', 'Corn', 'Olives'],
  'Paneer Tikka': ['Thin Crust', 'Tomato Sauce', 'Mozzarella', 'Paneer'],
  'Pepperoni': ['Thin Crust', 'Tomato Sauce', 'Mozzarella', 'Pepperoni'],
  'Chicken Tikka': ['Thin Crust', 'Tomato Sauce', 'Mozzarella', 'Chicken Tikka'],
  'BBQ Chicken': ['Thin Crust', 'BBQ Sauce', 'Mozzarella', 'BBQ Chicken'],
  'Meat Lovers': ['Thin Crust', 'Tomato Sauce', 'Mozzarella', 'Pepperoni', 'Sausage', 'Bacon'],
  'Vegan Margherita': ['Wheat Thin', 'Tomato Sauce', 'Vegan Cheese'],
  'Jain Margherita': ['Wheat Thin', 'Jain Sauce', 'Jain Cheese'],
  'Tuna Pizza': ['Thin Crust', 'Tomato Sauce', 'Mozzarella', 'Tuna']
};

// Function to reduce stock
async function reduceStock(items) {
  console.log('🟢 Reducing stock for items:', items);
  
  for (let item of items) {
    const inventoryItem = await Inventory.findOne({ name: item.name });
    if (inventoryItem) {
      const oldStock = inventoryItem.stock;
      const newStock = Math.max(0, oldStock - (item.quantity || 1));
      await Inventory.findByIdAndUpdate(inventoryItem._id, { stock: newStock });
      console.log(`📦 Stock updated: ${item.name} - ${oldStock} → ${newStock}`);
      
      if (newStock < inventoryItem.threshold) {
        console.log(`⚠️ LOW STOCK ALERT: ${item.name} - Only ${newStock} left!`);
      }
    } else {
      console.log(`⚠️ Inventory item not found: ${item.name}`);
    }
  }
}

// Create new order
router.post('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    
    const { customPizza, totalAmount, deliveryAddress, menuItems } = req.body;
    
    // Prepare items for stock reduction
    let itemsToReduce = [];
    
    // Handle menu items (regular pizzas from menu)
    if (menuItems && menuItems.length > 0) {
      for (let item of menuItems) {
        const ingredients = pizzaIngredients[item.name];
        if (ingredients) {
          for (let ingredient of ingredients) {
            itemsToReduce.push({ name: ingredient, quantity: item.quantity });
          }
        } else {
          console.log(`⚠️ No ingredient mapping for: ${item.name}`);
        }
      }
    }
    
    // Handle custom pizza
    if (customPizza && customPizza.base?.name !== 'Regular Pizza') {
      if (customPizza.base) itemsToReduce.push({ name: customPizza.base.name, quantity: 1 });
      if (customPizza.sauce) itemsToReduce.push({ name: customPizza.sauce.name, quantity: 1 });
      if (customPizza.cheese) itemsToReduce.push({ name: customPizza.cheese.name, quantity: 1 });
      if (customPizza.veggies) {
        customPizza.veggies.forEach(v => itemsToReduce.push({ name: v.name, quantity: 1 }));
      }
      if (customPizza.meats) {
        customPizza.meats.forEach(m => itemsToReduce.push({ name: m.name, quantity: 1 }));
      }
    }
    
    // Reduce stock
    await reduceStock(itemsToReduce);
    
    // Save order
    const order = new Order({
      userId,
      customPizza: customPizza || {
        base: { name: 'Regular Pizza', price: 0 },
        sauce: { name: 'Standard', price: 0 },
        cheese: { name: 'Mozzarella', price: 0 },
        veggies: [],
        meats: []
      },
      menuItems: menuItems || [],
      totalAmount: totalAmount,
      deliveryAddress: deliveryAddress
    });
    
    await order.save();
    
    // Clear user's cart after order
    await User.findByIdAndUpdate(userId, { cart: [] });
    
    console.log('✅ Order saved and stock reduced!');
    res.status(201).json({ message: 'Order placed successfully!', order });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get my orders
router.get('/my-orders', async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });
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