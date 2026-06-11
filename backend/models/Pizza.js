const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['vegetarian', 'nonVegetarian', 'vegan', 'jain', 'pescetarian', 'customized'],
    required: true 
  },
  isVeg: { type: Boolean, default: true },
  isVegan: { type: Boolean, default: false },
  isJain: { type: Boolean, default: false },
  ingredients: [{ type: String }],
  rating: { type: Number, default: 4.5 }
});
// Get single pizza by ID
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

module.exports = mongoose.model('Pizza', pizzaSchema);