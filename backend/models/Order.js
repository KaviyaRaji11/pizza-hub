const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  customPizza: {
    base: { type: Object, default: null },
    sauce: { type: Object, default: null },
    cheese: { type: Object, default: null },
    veggies: { type: Array, default: [] },
    meats: { type: Array, default: [] }
  },
  menuItems: { type: Array, default: [] },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'],
    default: 'pending'
  },
  orderDate: { type: Date, default: Date.now },
  deliveryAddress: {
    street: String,
    city: String,
    phone: String
  },
  // Track which inventory items were used
  usedInventory: [{ 
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
    name: String,
    quantity: Number
  }]
});

module.exports = mongoose.model('Order', orderSchema);