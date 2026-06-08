const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Get all inventory
router.get('/inventory', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update stock
router.put('/inventory/:id', async (req, res) => {
  try {
    const { stock } = req.body;
    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get low stock items (below threshold)
router.get('/low-stock', async (req, res) => {
  try {
    const items = await Inventory.find({
      $expr: { $lt: ["$stock", "$threshold"] }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;