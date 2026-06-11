const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['base', 'sauce', 'cheese', 'veggie', 'meat', 'vegan', 'jain', 'seafood'],
    required: true 
  },
  stock: { type: Number, required: true, default: 50 },
  threshold: { type: Number, required: true, default: 20 },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Inventory', inventorySchema);