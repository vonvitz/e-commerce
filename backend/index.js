// basic express js setup
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// allows us to accesss to different routes defined within the application
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

//server set up
const app = express();

//environment set up
const port = 4005;

app.use(cors());
app.use(express.json());
// allows us to receive data/info in other data types aside from strings or arrays.
app.use(express.urlencoded({ extended: true }));

// connects our application to the database
mongoose.connect(
  // "mongodb+srv://admin:admin1234@piyongx2024.ku3ul0q.mongodb.net/Demo-App?retryWrites=true&w=majority&appName=piyongx2024"
  'mongodb+srv://admin:admin1234@vondb.rdyxmaz.mongodb.net/Demo-App?retryWrites=true&w=majority&appName=vonDB',
);

//  Checks the status of our connection and save it in the variable "db"
let db = mongoose.connection;

// failed connection
db.on('error', console.error.bind(console, 'connection error'));
// success connection
db.once('open', () => console.log(`We're connected to the database`));

// backend routes
// group all routes inside the user.js under "/users" endpoint
app.use('/b5/users', userRoutes);
app.use('/b5/products', productRoutes);
app.use('/b5/cart', cartRoutes);
app.use('/b5/orders', orderRoutes);

// server gateway response
if (require.main === module) {
  app.listen(process.env.PORT || port, () => console.log(`API is now online on port ${process.env.PORT || port}`));
}
module.exports = { app, mongoose };
