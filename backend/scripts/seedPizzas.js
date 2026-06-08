const mongoose = require('mongoose');
const Pizza = require('../models/Pizza');

mongoose.connect('mongodb://127.0.0.1:27017/pizza_db');

const allPizzas = [
  // ========== VEGETARIAN PIZZAS (7) ==========
  { name: "Margherita", price: 199, image: "/images/margherita.jpg", description: "Tomato sauce, mozzarella, fresh basil", category: "vegetarian", isVeg: true, ingredients: ["Tomato Sauce", "Mozzarella", "Basil"], rating: 4.8 },
  { name: "Veggie Supreme", price: 299, image: "/images/veggie_supreme.jpg", description: "Capsicum, onion, tomato, mushroom, olives, corn", category: "vegetarian", isVeg: true, ingredients: ["Capsicum", "Onion", "Tomato", "Mushroom", "Olives", "Corn"], rating: 4.7 },
  { name: "Corn & Cheese", price: 249, image: "/images/corn_cheese.jpg", description: "Sweet corn with mozzarella", category: "vegetarian", isVeg: true, ingredients: ["Sweet Corn", "Mozzarella"], rating: 4.6 },
  { name: "Paneer Tikka", price: 279, image: "/images/paneer_tikka.jpg", description: "Indian-style spiced cottage cheese", category: "vegetarian", isVeg: true, ingredients: ["Paneer", "Tikka Masala", "Capsicum", "Onion"], rating: 4.9 },
  { name: "Mushroom & Olive", price: 269, image: "/images/mushroom_olive.jpg", description: "Earthy mushroom + salty black/green olives", category: "vegetarian", isVeg: true, ingredients: ["Mushroom", "Black Olives", "Green Olives"], rating: 4.5 },
  { name: "Cheese Burst", price: 329, image: "/images/cheese_burst.jpg", description: "Extra cheese inside the crust", category: "vegetarian", isVeg: true, ingredients: ["Mozzarella", "Cheddar", "Parmesan"], rating: 4.9 },
  { name: "Farmhouse", price: 289, image: "/images/farmhouse.jpg", description: "Fresh veggies like zucchini, bell peppers, spinach", category: "vegetarian", isVeg: true, ingredients: ["Zucchini", "Bell Peppers", "Spinach", "Mushroom"], rating: 4.7 },

  // ========== NON-VEGETARIAN PIZZAS (7) ==========
  { name: "Pepperoni", price: 349, image: "/images/pepperoni.jpg", description: "Classic spicy cured meat", category: "nonVegetarian", isVeg: false, ingredients: ["Pepperoni", "Mozzarella", "Tomato Sauce"], rating: 4.9 },
  { name: "Chicken Tikka", price: 329, image: "/images/chicken_tikka.jpg", description: "Spiced grilled chicken chunks", category: "nonVegetarian", isVeg: false, ingredients: ["Chicken Tikka", "Capsicum", "Onion"], rating: 4.8 },
  { name: "BBQ Chicken", price: 339, image: "/images/bbq_chicken.jpg", description: "Grilled chicken with tangy BBQ sauce", category: "nonVegetarian", isVeg: false, ingredients: ["Grilled Chicken", "BBQ Sauce", "Red Onion"], rating: 4.7 },
  { name: "Meat Lover's", price: 399, image: "/images/meat_lovers.jpg", description: "Pepperoni, sausage, bacon, ham, ground beef", category: "nonVegetarian", isVeg: false, ingredients: ["Pepperoni", "Sausage", "Bacon", "Ham", "Ground Beef"], rating: 4.9 },
  { name: "Chicken Sausage", price: 319, image: "/images/chicken_sausage.jpg", description: "Smoked chicken sausage slices", category: "nonVegetarian", isVeg: false, ingredients: ["Chicken Sausage", "Capsicum", "Onion"], rating: 4.6 },
  { name: "Beef Pepperoni", price: 359, image: "/images/beef_pepperoni.jpg", description: "Beef-based pepperoni (Halal/Kosher version)", category: "nonVegetarian", isVeg: false, ingredients: ["Beef Pepperoni", "Mozzarella"], rating: 4.8 },
  { name: "Spicy Chicken", price: 329, image: "/images/spicy_chicken.jpg", description: "Chicken with jalapeños and chili flakes", category: "nonVegetarian", isVeg: false, ingredients: ["Spicy Chicken", "Jalapenos", "Chili Flakes"], rating: 4.8 },

  // ========== VEGAN PIZZAS (6) ==========
  { name: "Vegan Margherita", price: 219, image: "/images/vegan_margherita.jpg", description: "Dairy-free cheese, tomato sauce, basil", category: "vegan", isVeg: true, isVegan: true, ingredients: ["Vegan Cheese", "Tomato Sauce", "Basil"], rating: 4.5 },
  { name: "Veggie Delight (Vegan)", price: 279, image: "/images/vegan_veggie.jpg", description: "Mixed vegetables with vegan cheese", category: "vegan", isVeg: true, isVegan: true, ingredients: ["Mixed Veggies", "Vegan Cheese"], rating: 4.6 },
  { name: "Mushroom & Spinach", price: 259, image: "/images/vegan_mushroom.jpg", description: "No cheese or vegan cheese option", category: "vegan", isVeg: true, isVegan: true, ingredients: ["Mushroom", "Spinach"], rating: 4.4 },
  { name: "BBQ Tofu", price: 269, image: "/images/bbq_tofu.jpg", description: "Marinated tofu with BBQ sauce", category: "vegan", isVeg: true, isVegan: true, ingredients: ["Tofu", "BBQ Sauce"], rating: 4.5 },
  { name: "Pesto Veggie", price: 279, image: "/images/pesto_veggie.jpg", description: "Dairy-free pesto with roasted vegetables", category: "vegan", isVeg: true, isVegan: true, ingredients: ["Dairy-Free Pesto", "Roasted Veggies"], rating: 4.7 },
  { name: "Mediterranean Vegan", price: 289, image: "/images/mediterranean_vegan.jpg", description: "Olives, sundried tomatoes, artichokes, herbs", category: "vegan", isVeg: true, isVegan: true, ingredients: ["Olives", "Sundried Tomatoes", "Artichokes", "Herbs"], rating: 4.6 },

  // ========== JAIN PIZZAS (5) ==========
  { name: "Jain Margherita", price: 209, image: "/images/jain_margherita.jpg", description: "No onion/garlic in sauce, plain cheese", category: "jain", isVeg: true, isJain: true, ingredients: ["Jain Cheese", "Jain Tomato Sauce"], rating: 4.8 },
  { name: "Jain Veggie Delight", price: 269, image: "/images/jain_veggie.jpg", description: "Only capsicum, corn, paneer, spinach, tomato", category: "jain", isVeg: true, isJain: true, ingredients: ["Capsicum", "Corn", "Paneer", "Spinach", "Tomato"], rating: 4.7 },
  { name: "Jain Paneer Tikka", price: 289, image: "/images/jain_paneer.jpg", description: "Paneer with Jain spices (no onion/garlic paste)", category: "jain", isVeg: true, isJain: true, ingredients: ["Paneer", "Jain Tikka Masala"], rating: 4.9 },
  { name: "Jain Cheese Corn", price: 249, image: "/images/jain_corn.jpg", description: "Sweet corn with cheese", category: "jain", isVeg: true, isJain: true, ingredients: ["Sweet Corn", "Jain Cheese"], rating: 4.6 },
  { name: "Jain Mushroom Pizza", price: 259, image: "/images/jain_mushroom.jpg", description: "Mushrooms with capsicum and herbs", category: "jain", isVeg: true, isJain: true, ingredients: ["Mushroom", "Capsicum", "Jain Herbs"], rating: 4.5 },

  // ========== PESCATARIAN PIZZAS (6) ==========
  { name: "Tuna Pizza", price: 379, image: "/images/tuna.jpg", description: "Canned or fresh tuna with onions and olives", category: "pescetarian", isVeg: false, ingredients: ["Tuna", "Onion", "Olives"], rating: 4.5 },
  { name: "Shrimp Pizza", price: 399, image: "/images/shrimp.jpg", description: "Garlic shrimp with herbs", category: "pescetarian", isVeg: false, ingredients: ["Shrimp", "Garlic", "Herbs"], rating: 4.7 },
  { name: "Anchovy Pizza", price: 369, image: "/images/anchovy.jpg", description: "Salty anchovy fillets", category: "pescetarian", isVeg: false, ingredients: ["Anchovies", "Capers", "Olives"], rating: 4.3 },
  { name: "Mixed Seafood", price: 429, image: "/images/mixed_seafood.jpg", description: "Shrimp, squid, mussels, clams", category: "pescetarian", isVeg: false, ingredients: ["Shrimp", "Squid", "Mussels", "Clams"], rating: 4.8 },
  { name: "Salmon Pizza", price: 449, image: "/images/salmon.jpg", description: "Smoked salmon with cream cheese and dill", category: "pescetarian", isVeg: false, ingredients: ["Smoked Salmon", "Cream Cheese", "Dill"], rating: 4.9 },
  { name: "Tuna & Corn", price: 389, image: "/images/tuna_corn.jpg", description: "Tuna paired with sweet corn", category: "pescetarian", isVeg: false, ingredients: ["Tuna", "Sweet Corn"], rating: 4.6 },

  // ========== CUSTOMIZED PIZZA (1) ==========
  { 
    name: "🎨 Create Your Own Pizza", 
    price: 199, 
    image: "/images/custom_pizza.jpg", 
    description: "Build your perfect pizza with unlimited ingredients! Choose from 30+ toppings including all veggies, meats, cheeses, and sauces", 
    category: "customized", 
    isVeg: true, 
    ingredients: ["Base", "Sauce", "Cheese", "Veggies", "Non-Veg Toppings", "Vegan Options"],
    rating: 5.0 
  }
];

async function seedPizzas() {
  try {
    await Pizza.deleteMany({});
    await Pizza.insertMany(allPizzas);
    console.log(`✅ Added ${allPizzas.length} pizzas to database!`);
    console.log("📊 Breakdown:");
    console.log(`   - Vegetarian: 7 pizzas`);
    console.log(`   - Non-Vegetarian: 7 pizzas`);
    console.log(`   - Vegan: 6 pizzas`);
    console.log(`   - Jain: 5 pizzas`);
    console.log(`   - Pescetarian: 6 pizzas`);
    console.log(`   - Customized: 1 pizza`);
    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit();
  }
}

seedPizzas();