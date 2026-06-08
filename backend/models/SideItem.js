const mongoose = require('mongoose');

const sideItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['juice', 'sauce'], required: true },
  price: { type: Number, required: true },
  image: String,
  description: String
});

module.exports = mongoose.model('SideItem', sideItemSchema);