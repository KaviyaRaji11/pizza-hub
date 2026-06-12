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

// MongoDB connection - READ FROM ENV VARIABLE
const MONGODB_URI = process.env.MONGODB_URI;
console.log('MONGODB_URI exists?', MONGODB_URI ? 'YES' : 'NO');

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected to Atlas'))
  .catch(err => console.log('❌ MongoDB Error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});