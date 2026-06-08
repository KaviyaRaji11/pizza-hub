const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Pizza API Running');
});

app.listen(5000, () => {
  console.log('Server Running on Port 5000');
});