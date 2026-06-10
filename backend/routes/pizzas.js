const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');

// Get all pizzas
router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single pizza by ID (NEW)
router.get('/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }
    res.json(pizza);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get pizzas by category
router.get('/category/:category', async (req, res) => {
  try {
    const pizzas = await Pizza.find({ category: req.params.category });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed pizzas
router.post('/seed', async (req, res) => {
  try {
    await Pizza.deleteMany({});
    
    const pizzas = [
      { name: "Margherita", price: 199, image: "/images/margherita.jpg", description: "Tomato sauce, mozzarella, fresh basil", category: "vegetarian", isVeg: true, rating: 4.8 },
      { name: "Veggie Supreme", price: 299, image: "/images/veggie_supreme.jpg", description: "Capsicum, onion, tomato, mushroom, olives, corn", category: "vegetarian", isVeg: true, rating: 4.7 },
      { name: "Paneer Tikka", price: 279, image: "/images/paneer_tikka.jpg", description: "Indian-style spiced cottage cheese", category: "vegetarian", isVeg: true, rating: 4.9 },
      { name: "Pepperoni", price: 349, image: "/images/pepperoni.jpg", description: "Classic spicy cured meat", category: "nonVegetarian", isVeg: false, rating: 4.9 },
      { name: "Chicken Tikka", price: 329, image: "/images/chicken_tikka.jpg", description: "Spiced grilled chicken", category: "nonVegetarian", isVeg: false, rating: 4.8 },
      { name: "Create Your Own Pizza", price: 199, image: "/images/custom_pizza.jpg", description: "Build your perfect pizza", category: "customized", isVeg: true, rating: 5.0 }
    ];
    
    await Pizza.insertMany(pizzas);
    res.json({ message: `Added ${pizzas.length} pizzas!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;