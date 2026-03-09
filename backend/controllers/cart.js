const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add to cart
module.exports.addCart = async (req, res) => {
  if (req.user.isAdmin == true) {
    return res.status(400).send({ error: `Action Forbidden` });
  }
  try {
    // Extract user ID from token (assuming it's stored in req.user)
    const userId = req.user.id;

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    // If no cart found, create a new one
    if (!cart) {
      cart = new Cart({ userId, cartItems: [], totalPrice: 0 });
    }

    // Check if the product already exists in the cart.
    // deconstruct
    const { productId, quantity, subtotal } = req.body;
    const isItemExist = cart.cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (isItemExist !== -1) {
      // If product already exists, update quantity and subtotal base on the request body
      cart.cartItems[isItemExist].quantity += quantity;
      cart.cartItems[isItemExist].subtotal += subtotal;
    } else {
      // If product does not exist, add it to cartItems
      cart.cartItems.push({ productId, quantity, subtotal });
    }

    // Update totalPrice
    cart.totalPrice += subtotal;

    // Save the updated cart
    await cart.save().then((cart) => {
      res.status(201).send({
        message: "Item added to cart successfully",
        cart,
      });
    });
  } catch (saveErr) {
    res.status(500).send({ error: "Internal server error", saveErr });
  }
};
// Get user's cart
module.exports.getCart = (req, res) => {
  if (req.user.isAdmin == true) {
    return res.status(403).send({ error: `Action Forbidden` });
  }

  return Cart.findOne({ userId: req.user.id })
    .then((cart) => {
      if (cart) {
        return res.status(200).send({ cart });
      } else {
        return res.status(404).send({ error: `Cart not found` });
      }
    })
    .catch((findErr) => {
      return res
        .status(500)
        .send({ error: `Failed in finding the cart`, findErr });
    });
};
// Update quantity of cart items and total price
module.exports.updateCart = (req, res) => {
  if (req.user.isAdmin == true) {
    return res.status(403).send({ error: `Admin access is forbidden` });
  }
  const { productId, quantity, subtotal } = req.body;

  //find the cart with the same user id and product id then update the quantity and subtotal
  return Cart.findOne({ userId: req.user.id }).then((cart) => {
    if (!cart) {
      return res.status(404).send({ error: `Cart not found` });
    }
    const item = cart.cartItems;
    const index = item.findIndex(
      (cartItem) => cartItem.productId === productId
    );

    //update quantity and subtotal
    cart.cartItems[index].quantity = quantity;
    cart.cartItems[index].subtotal = subtotal;

    //update total price
    cart.totalPrice = 0;
    for (let x = 0; x < Object.keys(cart.cartItems).length; x++) {
      cart.totalPrice += cart.cartItems[x].subtotal;
    }
    //save the updated cart
    cart
      .save()
      .then((updatedCart) => {
        return res
          .status(200)
          .send({ message: `Item quantity updated successfully`, updatedCart });
      })
      .catch((saveErr) => {
        return res
          .status(500)
          .send({ error: `Failed in updating the cart`, saveErr });
      });
  });
};
// Remove cart items with specific id
module.exports.removeCart = (req, res) => {
  if (req.user.isAdmin == true) {
    return res.status(403).send({ error: `Action is forbidden` });
  }
  return Cart.findOne({ userId: req.user.id })
    .then((cart) => {
      if (!cart) {
        return res.status(404).send({ message: "Cart not found" });
      }

      const item = cart.cartItems;

      const index = item.findIndex(
        (cartItem) => cartItem.productId === req.params.productId
      );

      if (index != -1) {
        const removeCartItem = cart.cartItems.splice(index, 1)[0];
        cart.totalPrice -= removeCartItem.subtotal;

        cart.save().then((updatedCart) => {
          res.status(200).send({
            message: "Item removed from cart successfully",
            updatedCart,
          });
        });
      } else {
        res.status(404).send({ message: "Item not found" });
      }
    })
    .catch((savedErr) => {
      res.status(500).send({ error: "Failed to remove or update the cart" });
    });
};
// Clear user's cart items
module.exports.clearCart = (req, res) => {
  if (req.user.isAdmin == true) {
    return res.status(403).send({ error: `Admin access is forbidden` });
  }
  return Cart.findOne({ userId: req.user.id })
    .then((cart) => {
      if (!cart) {
        return res
          .status(404)
          .send({ message: "Cart not found from the this user" });
      }
      const items = JSON.stringify(cart.cartItems).length;

      // Object.keys and JSON.stringify can convert JSON to numbers

      if (items > 0) {
        cart.cartItems.splice(0, items);
        cart.totalPrice = 0;
        cart.save().then((cart) => {
          res.status(200).send({
            message: "Cart Cleared successfully",
            cart,
          });
        });
      } else {
        res.status(404).send({ message: "Item not found" });
      }
    })
    .catch((savedErr) => {
      res.status(500).send({ error: "Failed to remove or update the cart" });
    });
};
