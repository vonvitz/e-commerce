const Order = require("../models/Order");
const Cart = require("../models/Cart");

//Get user's order
module.exports.getOrder = (req, res) => {
  if (req.user.isAdmin == true) {
    return res.status(403).send({ error: `Action is forbidden` });
  }
  return Order.find({ userId: req.user.id })
    .then((orders) => {
      if (!orders) {
        return res.status(404).send({ error: `No orders found` });
      }
      return res.status(200).send({ orders });
    })
    .catch((findErr) => {
      console.log({ error: `Failed in fethcing an order` });
      return res
        .status(500)
        .send({ error: `Failed in finding an order from the user` });
    });
};
//Checkout user's cart
module.exports.checkOut = (req, res) => {
  if (req.user.isAdmin == true) {
    return res.status(403).send({ error: `Action is forbidden` });
  }
  return Cart.findOne({ userId: req.user.id }).then((cart) => {
    //check if ther is a cart
    if (!cart) {
      return res.status(404).send({ error: `No cart found` });
    }
    if (cart.cartItems.length === 0) {
      return res.status(404).send({ error: `No items in cart` });
    }
    const cartItem = cart.cartItems;
    //check if there are items in cart items
    const size = Object.keys(cartItem).length;
    if (size < 0) {
      return res.status(404).send({ error: `No items to checkout` });
    }
    //create a new order
    let newOrder = new Order({
      userId: req.user.id,
      productsOrdered: cartItem,
      totalPrice: cart.totalPrice,
    });
    const cartId = cart.id;
    //save the new order
    return newOrder
      .save()
      .then((order) => {
        //delete the cart
        return Cart.findByIdAndDelete(cartId).then((deletedCart) => {
          return res.status(201).send({ message: "Ordered Successfully" });
        });
      })
      .catch((saveErr) =>
        res.status(500).send({ error: `Failed to save the new order` })
      );
  });
};
//Get list of orders by admin
module.exports.getAllOrders = (req, res) => {
  return Order.find().then((orders) => {
    if (!orders) {
      return res.status(404).send({ error: `No orders found` });
    }
    return res.status(200).send({ orders });
  });
};
//Get list of orders by admin
module.exports.getOrdesListByOrderId = (req, res) => {
  console.log(req.body.orderId);
  return Order.findById(req.body.orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).send({ error: `Order not found` });
      } else {
        return res.status(200).send({ order });
      }
    })
    .catch((findErr) => {
      console.error("Error in fetching order: ", findErr);
      return res.status(500).send({ error: "Failed to fetch user orders." });
    });
};
