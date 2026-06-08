const mongoose = require('mongoose');
require('dotenv').config();

const Pizza = require('../models/Pizza'); // We'll create this model

const pizzas = {
  vegetarian: [
    { name: "Margherita", price: 199, image: "margherita.jpg", description: "Tomato sauce, mozzarella, fresh basil", category: "vegetarian", isVeg: true },
    { name: "Veggie Supreme", price: 299, image: "veggie_supreme.jpg", description: "Capsicum, onion, tomato, mushroom, olives, corn", category: "vegetarian", isVeg: true },
    { name: "Corn & Cheese", price: 249, image: "corn_cheese.jpg", description: "Sweet corn with mozzarella", category: "vegetarian", isVeg: true },
    { name: "Paneer Tikka", price: 279, image: "paneer_tikka.jpg", description: "Indian-style spiced cottage cheese", category: "vegetarian", isVeg: true },
    { name: "Mushroom & Olive", price: 269, image: "mushroom_olive.jpg", description: "Earthy mushroom + salty black/green olives", category: "vegetarian", isVeg: true },
    { name: "Cheese Burst", price: 329, image: "cheese_burst.jpg", description: "Extra cheese inside the crust", category: "vegetarian", isVeg: true },
    { name: "Farmhouse", price: 289, image: "farmhouse.jpg", description: "Fresh veggies like zucchini, bell peppers, spinach", category: "vegetarian", isVeg: true }
  ],
  nonVegetarian: [
    { name: "Pepperoni", price: 349, image: "pepperoni.jpg", description: "Classic spicy cured meat", category: "nonVegetarian", isVeg: false },
    { name: "Chicken Tikka", price: 329, image: "chicken_tikka.jpg", description: "Spiced grilled chicken chunks", category: "nonVegetarian", isVeg: false },
    { name: "BBQ Chicken", price: 339, image: "bbq_chicken.jpg", description: "Grilled chicken with tangy BBQ sauce", category: "nonVegetarian", isVeg: false },
    { name: "Meat Lover's", price: 399, image: "meat_lovers.jpg", description: "Pepperoni, sausage, bacon, ham, ground beef", category: "nonVegetarian", isVeg: false },
    { name: "Chicken Sausage", price: 319, image: "chicken_sausage.jpg", description: "Smoked chicken sausage slices", category: "nonVegetarian", isVeg: false },
    { name: "Spicy Chicken", price: 329, image: "spicy_chicken.jpg", description: "Chicken with jalapeños and chili flakes", category: "nonVegetarian", isVeg: false }
  ],
  vegan: [
    { name: "Vegan Margherita", price: 219, image: "vegan_margherita.jpg", description: "Dairy-free cheese, tomato sauce, basil", category: "vegan", isVeg: true, isVegan: true },
    { name: "Veggie Delight (Vegan)", price: 279, image: "vegan_veggie.jpg", description: "Mixed vegetables with vegan cheese", category: "vegan", isVeg: true, isVegan: true },
    { name: "Mushroom & Spinach", price: 259, image: "vegan_mushroom.jpg", description: "No cheese or vegan cheese option", category: "vegan", isVeg: true, isVegan: true },
    { name: "BBQ Tofu", price: 269, image: "bbq_tofu.jpg", description: "Marinated tofu with BBQ sauce", category: "vegan", isVeg: true, isVegan: true },
    { name: "Pesto Veggie", price: 279, image: "pesto_veggie.jpg", description: "Dairy-free pesto with roasted vegetables", category: "vegan", isVeg: true, isVegan: true },
    { name: "Mediterranean Vegan", price: 289, image: "mediterranean_vegan.jpg", description: "Olives, sundried tomatoes, artichokes, herbs", category: "vegan", isVeg: true, isVegan: true }
  ],
  jain: [
    { name: "Jain Margherita", price: 209, image: "jain_margherita.jpg", description: "No onion/garlic in sauce, plain cheese", category: "jain", isVeg: true, isJain: true },
    { name: "Jain Veggie Delight", price: 269, image: "jain_veggie.jpg", description: "Only capsicum, corn, paneer, spinach, tomato", category: "jain", isVeg: true, isJain: true },
    { name: "Jain Paneer Tikka", price: 289, image: "jain_paneer.jpg", description: "Paneer with Jain spices (no onion/garlic paste)", category: "jain", isVeg: true, isJain: true },
    { name: "Jain Cheese Corn", price: 249, image: "jain_corn.jpg", description: "Sweet corn with cheese", category: "jain", isVeg: true, isJain: true },
    { name: "Jain Mushroom Pizza", price: 259, image: "jain_mushroom.jpg", description: "Mushrooms with capsicum and herbs", category: "jain", isVeg: true, isJain: true }
  ],
  pescetarian: [
    { name: "Tuna Pizza", price: 379, image: "tuna.jpg", description: "Canned or fresh tuna with onions and olives", category: "pescetarian", isVeg: false },
    { name: "Shrimp Pizza", price: 399, image: "shrimp.jpg", description: "Garlic shrimp with herbs", category: "pescetarian", isVeg: false },
    { name: "Anchovy Pizza", price: 369, image: "anchovy.jpg", description: "Salty anchovy fillets", category: "pescetarian", isVeg: false },
    { name: "Mixed Seafood", price: 429, image: "mixed_seafood.jpg", description: "Shrimp, squid, mussels, clams", category: "pescetarian", isVeg: false },
    { name: "Salmon Pizza", price: 449, image: "salmon.jpg", description: "Smoked salmon with cream cheese and dill", category: "pescetarian", isVeg: false },
    { name: "Tuna & Corn", price: 389, image: "tuna_corn.jpg", description: "Tuna paired with sweet corn", category: "pescetarian", isVeg: false }
  ]
};

mongoose.connect('mongodb://127.0.0.1:27017/pizza_db');

const addPizzas = async () => {
  try {
    // Clear existing pizzas
    await Pizza.deleteMany({});
    
    let allPizzas = [];
    for (let category in pizzas) {
      allPizzas = [...allPizzas, ...pizzas[category]];
    }
    
    await Pizza.insertMany(allPizzas);
    console.log(`Added ${allPizzas.length} pizzas!`);
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit();
  }
};

addPizzas();