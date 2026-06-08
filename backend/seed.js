const mongoose = require('mongoose');
const Pizza = require('./models/Pizza');

mongoose.connect('mongodb://127.0.0.1:27017/pizza_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error:', err));

const pizzas = [
  { name: "Margherita", price: 199, image: "/images/margherita.jpg", description: "Tomato sauce, mozzarella, fresh basil", category: "vegetarian", isVeg: true },
  { name: "Veggie Supreme", price: 299, image: "/images/veggie_supreme.jpg", description: "Capsicum, onion, tomato, mushroom, olives, corn", category: "vegetarian", isVeg: true },
  { name: "Paneer Tikka", price: 279, image: "/images/paneer_tikka.jpg", description: "Indian-style spiced cottage cheese", category: "vegetarian", isVeg: true },
  { name: "Pepperoni", price: 349, image: "/images/pepperoni.jpg", description: "Classic spicy cured meat", category: "nonVegetarian", isVeg: false },
  { name: "Chicken Tikka", price: 329, image: "/images/chicken_tikka.jpg", description: "Spiced grilled chicken chunks", category: "nonVegetarian", isVeg: false },
  { name: "Vegan Margherita", price: 219, image: "/images/vegan_margherita.jpg", description: "Dairy-free cheese", category: "vegan", isVeg: true },
  { name: "Jain Margherita", price: 209, image: "/images/jain_margherita.jpg", description: "No onion/garlic", category: "jain", isVeg: true },
  { name: "Tuna Pizza", price: 379, image: "/images/tuna.jpg", description: "Tuna with onions", category: "pescetarian", isVeg: false }
];

async function seed() {
  try {
    await Pizza.deleteMany({});
    await Pizza.insertMany(pizzas);
    console.log(`✅ Successfully added ${pizzas.length} pizzas!`);
    process.exit();
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit();
  }
}

seed();