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

// Get pizzas by category
router.get('/category/:category', async (req, res) => {
  try {
    const pizzas = await Pizza.find({ category: req.params.category });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add sample pizzas
router.post('/seed', async (req, res) => {
  try {
    await Pizza.deleteMany({});
    
    const pizzas = [
      { name: "Margherita", price: 199, image: "/images/margherita.jpg", description: "Tomato sauce, mozzarella, fresh basil", category: "vegetarian", isVeg: true, rating: 4.8 },
      { name: "Veggie Supreme", price: 299, image: "/images/veggie_supreme.jpg", description: "Capsicum, onion, tomato, mushroom, olives, corn", category: "vegetarian", isVeg: true, rating: 4.7 },
      { name: "Paneer Tikka", price: 279, image: "/images/paneer_tikka.jpg", description: "Indian-style spiced cottage cheese", category: "vegetarian", isVeg: true, rating: 4.9 },
      { name: "Pepperoni", price: 349, image: "/images/pepperoni.jpg", description: "Classic spicy cured meat", category: "nonVegetarian", isVeg: false, rating: 4.9 },
      { name: "Chicken Tikka", price: 329, image: "/images/chicken_tikka.jpg", description: "Spiced grilled chicken chunks", category: "nonVegetarian", isVeg: false, rating: 4.8 },
      { name: "Vegan Margherita", price: 219, image: "/images/vegan_margherita.jpg", description: "Dairy-free cheese, tomato sauce, basil", category: "vegan", isVeg: true, isVegan: true, rating: 4.5 },
      { name: "Jain Margherita", price: 209, image: "/images/jain_margherita.jpg", description: "No onion/garlic in sauce", category: "jain", isVeg: true, isJain: true, rating: 4.8 },
      { name: "Tuna Pizza", price: 379, image: "/images/tuna.jpg", description: "Canned or fresh tuna with onions and olives", category: "pescetarian", isVeg: false, rating: 4.5 },
      { name: "Create Your Own Pizza", price: 199, image: "/images/custom_pizza.jpg", description: "Build your perfect pizza with unlimited ingredients!", category: "customized", isVeg: true, rating: 5.0 }
    ];
    
    await Pizza.insertMany(pizzas);
    res.json({ message: `Added ${pizzas.length} pizzas!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;