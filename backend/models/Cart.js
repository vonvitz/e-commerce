const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "name is required"],
  },
  cartItems: [
    {
      productId: {
        type: String,
        required: [true, "productId is required"],
      },
      quantity: {
        type: Number,
        required: [true, "quantity is required"],
      },
      subtotal: {
        type: Number,
        required: [true, "subtotal is required"],
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: [true, "Total Price is required"],
  },
  orderedOn: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Cart", cartSchema);
