const express = require('express');
const router = express.Router();
const SideItem = require('../models/SideItem');

router.get('/', async (req, res) => {
  try {
    const items = await SideItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/seed', async (req, res) => {
  try {
    await SideItem.deleteMany({});
    
    const items = [
      // Juices
      { name: "Fresh Orange Juice", type: "juice", price: 99, image: "/images/orange_juice.jpg", description: "Fresh squeezed orange juice" },
      { name: "Apple Juice", type: "juice", price: 89, image: "/images/apple_juice.jpg", description: "100% pure apple juice" },
      { name: "Mango Shake", type: "juice", price: 129, image: "/images/mango_shake.jpg", description: "Creamy mango milkshake" },
      { name: "Cold Drink", type: "juice", price: 49, image: "/images/cold_drink.jpg", description: "Chilled carbonated beverage" },
      { name: "Lemonade", type: "juice", price: 59, image: "/images/lemonade.jpg", description: "Fresh lemon juice with mint" },
      { name: "Buttermilk", type: "juice", price: 49, image: "/images/buttermilk.jpg", description: "Spiced chaas" },
      
      // Mayonnaise & Sauces
      { name: "Garlic Mayo", type: "sauce", price: 39, image: "/images/garlic_mayo.jpg", description: "Creamy garlic mayonnaise" },
      { name: "Spicy Mayo", type: "sauce", price: 39, image: "/images/spicy_mayo.jpg", description: "Spicy chipotle mayo" },
      { name: "Tandoori Mayo", type: "sauce", price: 39, image: "/images/tandoori_mayo.jpg", description: "Indian spiced mayonnaise" },
      { name: "Herb Mayo", type: "sauce", price: 39, image: "/images/herb_mayo.jpg", description: "Herbs infused mayonnaise" },
      { name: "Cheese Dip", type: "sauce", price: 49, image: "/images/cheese_dip.jpg", description: "Warm cheese dipping sauce" },
      { name: "Hot Sauce", type: "sauce", price: 29, image: "/images/hot_sauce.jpg", description: "Spicy chili sauce" }
    ];
    
    await SideItem.insertMany(items);
    res.json({ message: `Added ${items.length} side items!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;