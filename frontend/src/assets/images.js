// ========== VEGETARIAN PIZZAS ==========
import margherita from './VegetarianPizzas/margherita.jpg';
import veggieSupreme from './VegetarianPizzas/VeggieSupreme.jpg';
import cornCheese from './VegetarianPizzas/CornCheese.jpeg';
import paneerTikka from './VegetarianPizzas/PaneerTikka.jpeg';
import mushroomOlive from './VegetarianPizzas/MushroomOlive.jpg';
import cheeseBurst from './VegetarianPizzas/CheeseBurst.jpeg';
import farmhouse from './VegetarianPizzas/Farmhouse.jpeg';

// ========== NON-VEGETARIAN PIZZAS ==========
import pepperoni from './NonVegetarianPizza/Pepperoni.jpeg';
import chickenTikka from './NonVegetarianPizza/ChickenTikka.jpg';
import bbqChicken from './NonVegetarianPizza/BBQChicken.jpeg';
import meatLovers from './NonVegetarianPizza/MeatLover\'s.jpeg';
import chickenSausage from './NonVegetarianPizza/ChickenSausage.jpeg';
import beefPepperoni from './NonVegetarianPizza/BeefPepperoni.jpeg';
import spicyChicken from './NonVegetarianPizza/SpicyChicken.jpeg';

// ========== VEGAN PIZZAS ==========
import veganMargherita from './VeganPizza/VeganMargherita.jpeg';
import veggieDelight from './VeganPizza/VeggieDelight.jpeg';
import mushroomSpinach from './VeganPizza/MushroomSpinach.jpeg';
import bbqTofu from './VeganPizza/BBQTofu.jpeg';
import pestoVeggie from './VeganPizza/PestoVeggie.jpeg';
import mediterraneanVegan from './VeganPizza/MediterraneanVegan.jpeg';

// ========== JAIN PIZZAS ==========
import jainMargherita from './JainPizza/JainMargherita.jpeg';
import jainVeggieDelight from './JainPizza/JainVeggieDelight.jpeg';
import jainPaneerTikka from './JainPizza/JainPaneerTikka.jpeg';
import jainCheeseCorn from './JainPizza/JainCheeseCorn.jpeg';
import jainMushroom from './JainPizza/JainMushroomPizza.jpeg';

// ========== PESCATARIAN PIZZAS ==========
// ========== PESCATARIAN PIZZAS ==========
import tunaPizza from './PescetarianPizza/TunaCorn.jpeg';
import shrimpPizza from './PescetarianPizza/ShrimpPizza.jpeg';
import anchovyPizza from './PescetarianPizza/AnchovyPizza.jpeg';
import mixedSeafood from './PescetarianPizza/MixedSeafood.jpeg';
import salmonPizza from './PescetarianPizza/SalmonPizza.jpeg';
import pescatarianDefault from './PescetarianPizza/PescetarianPizza.jpeg';
// Default image
const defaultImage = margherita;

export const pizzaImages = {
  // Vegetarian
  'Margherita': margherita,
  'Veggie Supreme': veggieSupreme,
  'Corn & Cheese': cornCheese,
  'Paneer Tikka': paneerTikka,
  'Mushroom & Olive': mushroomOlive,
  'Cheese Burst': cheeseBurst,
  'Farmhouse': farmhouse,
  
  // Non-Vegetarian
  'Pepperoni': pepperoni,
  'Chicken Tikka': chickenTikka,
  'BBQ Chicken': bbqChicken,
  'Meat Lover\'s': meatLovers,
  'Chicken Sausage': chickenSausage,
  'Beef Pepperoni': beefPepperoni,
  'Spicy Chicken': spicyChicken,
  
  // Vegan (using default images until you add them)
  'Vegan Margherita': veganMargherita,
  'Vegan Veggie Delight': veggieDelight,
  'Vegan Mushroom Spinach': mushroomSpinach,
  'BBQ Tofu': bbqTofu,
  'Vegan Pesto Veggie': pestoVeggie,
  'Mediterranean Vegan': mediterraneanVegan,
  
  // Jain
  'Jain Margherita': jainMargherita,
  'Jain Veggie Delight': jainVeggieDelight,
  'Jain Paneer Tikka': jainPaneerTikka,
  'Jain Cheese Corn': jainCheeseCorn,
  'Jain Mushroom Pizza': jainMushroom,
  
  // Pescetarian
  'Tuna Pizza': tunaPizza,
  'Tuna & Corn': tunaPizza,
  'Shrimp Pizza': shrimpPizza,
  'Anchovy Pizza': anchovyPizza,
  'Mixed Seafood': mixedSeafood,
  'Salmon Pizza': salmonPizza,
  
  // Default
  'default': defaultImage
};

export {
  margherita,
  veggieSupreme,
  paneerTikka,
  pepperoni,
  chickenTikka,
  jainMargherita,
  tunaPizza
};