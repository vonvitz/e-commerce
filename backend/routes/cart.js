const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const { verify, verifyAdmin } = require("../auth");

//Route for adding cart items
router.post("/add-to-cart", verify, cartController.addCart);
//Route for pulling/getting user's cart information
router.get("/get-cart", verify, cartController.getCart);
//Route for updating a quantity and totalprice of a specific product added by the user
router.patch("/update-cart-quantity", verify, cartController.updateCart);
//Route for removing a product from the user's cart items
router.patch("/:productId/remove-from-cart", verify, cartController.removeCart);
//Route removing cart items/product from the user's cart
router.put("/clear-cart", verify, cartController.clearCart);

module.exports = router;
