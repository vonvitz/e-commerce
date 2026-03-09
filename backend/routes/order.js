const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const { verify, verifyAdmin } = require("../auth");

//Checkout the cart of a user
router.post("/checkout", verify, orderController.checkOut);
//Get the order details of a user
router.get("/my-orders", verify, orderController.getOrder);
//Getting all list of order details by the admin
router.get("/all-orders", verify, verifyAdmin, orderController.getAllOrders);
//Route for get username
router.post("/getorders", orderController.getOrdesListByOrderId);

module.exports = router;
