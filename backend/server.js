const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/pizzas', require('./routes/pizzas'));
app.use('/api/payment', require('./routes/payment'));

mongoose.connect('mongodb+srv://pizzaadmin:Pizza123456@cluster0.jdvuuj9.mongodb.net/pizza_db?retryWrites=true&w=majority')
  .then(() => console.log('✅ MongoDB Connected to Atlas Cloud'))
  .catch(err => console.log('❌ MongoDB Error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});