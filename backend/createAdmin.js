const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {

  const admin = new User({
    name: "Admin",
    email: "admin@gmail.com",
    password: "12345",
    role: "admin",
    isVerified: true
  });

  await admin.save();

  console.log("✅ Admin created");
  process.exit();

})
.catch(err => {
  console.log(err);
});