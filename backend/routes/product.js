const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const { verify, verifyAdmin } = require("../auth");

//Route creating a new product by an admin
router.post("/", verify, verifyAdmin, productController.createProduct);
//Route pulling/getting all products by an admin
router.get("/all", verify, verifyAdmin, productController.getAllProducts);
//Route getting all active products
router.get("/active", productController.getAllActive);
//Route getting a single product
router.get("/:productId", productController.getSingleProduct);
//Route updating a specific product by id, admin users only
router.patch(
  "/:productId/update",
  verify,
  verifyAdmin,
  productController.productUpdate
);
//Route archiving a specific product by id, admin users only
router.patch(
  "/:productId/archive",
  verify,
  verifyAdmin,
  productController.archiveProducts
);
//Route activating a specific product by id, admin users only
router.patch(
  "/:productId/activate",
  verify,
  verifyAdmin,
  productController.activateProduct
);
//Route  getting a specific product by name
router.post("/search-by-name", productController.searchByName);
//Route  getting all products with the price range of( min price and max price)
router.post("/search-by-price", productController.searchByPriceRange);

module.exports = router;
