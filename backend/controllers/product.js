const Product = require("../models/Product");

// Create new product by admin
module.exports.createProduct = (req, res) => {
  return Product.findOne({ name: req.body.name })
    .then((product) => {
      let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      });

      if (product) {
        return res.status(409).send({ error: "Product already exists" });
      }

      return newProduct
        .save()
        .then((product) => res.status(201).send({ product }))
        .catch((saveError) => {
          // the error message will be displayed in the terminal
          console.error("Error in saving the Product: ", saveError);

          // this will be sent as a response to the client
          return res.status(500).send({ error: "Failed to save the product" });
        });
    })
    .catch((findErr) => {
      // the error message will be displayed in the terminal
      console.error("Error in finding the product: ", findErr);

      // this will be sent as a response to the client
      return res.status(500).send({ message: "Error in finding the product" });
    });
};
// Get all products by admin
module.exports.getAllProducts = (req, res) => {
  return Product.find({})
    .then((products) => {
      if (products.length > 0) {
        return res.status(200).send({ products });
      } else {
        return res.status(404).send({ message: "No products found." });
      }
    })
    .catch((findErr) => {
      console.error("Error in finding all products: ", findErr);

      return res.status(500).send({ error: "Error finding products." });
    });
};
// Get all active products by admin
module.exports.getAllActive = (req, res) => {
  return Product.find({ isActive: true })
    .then((products) => {
      if (products.length > 0) {
        return res.status(200).send({ products });
      } else {
        return res.status(404).send({ error: "No products found" });
      }
    })
    .catch((findErr) => {
      console.error("Error finding active products: ", findErr);
      return res.status(500).send({ error: "Error finding active products" });
    });
};
// Get specific product by id
module.exports.getSingleProduct = (req, res) => {
  return Product.findById(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({ error: "Product not found " });
      }
      return res.status(200).send({ product });
    })
    .catch((findErr) => {
      console.error("Error finding product: ", findErr);
      return res.status(500).send({ error: "Failed to fetch product" });
    });
};
// Update specific product by an admin with specific product id
module.exports.productUpdate = (req, res) => {
  let productId = req.params.productId;

  let productUpdate = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  return Product.findByIdAndUpdate(productId, productUpdate)
    .then((updatedProduct) => {
      if (updatedProduct) {
        return res.status(200).send({
          message: "Product updated successfully",
          updatedProduct,
        });
      } else {
        return res.status(404).send({ error: "Product not found" });
      }
    })
    .catch((updateErr) => {
      console.error("Error in updating the product: ", updateErr);

      return res.status(500).send({ error: "Error in updating the product" });
    });
};
// Archive a specific product by an admin with specific id
module.exports.archiveProducts = (req, res) => {
  let updateActiveField = {
    isActive: false,
  };

  return Product.findByIdAndUpdate(req.params.productId, updateActiveField)
    .then((archiveProduct) => {
      if (archiveProduct) {
        return res.status(200).send({
          message: "Product archived successfully",
          archiveProduct,
        });
      } else {
        return res.status(404).send({ error: "Product not found" });
      }
    })
    .catch((updateErr) => {
      console.error("Error in archiving the product: ", updateErr);

      return res.status(500).send({ error: "Failed to archive product" });
    });
};
// Activate a specific product by an admin with specific id
module.exports.activateProduct = (req, res) => {
  let updateActiveField = {
    isActive: true,
  };

  return Product.findByIdAndUpdate(req.params.productId, updateActiveField)
    .then((activateProduct) => {
      if (activateProduct) {
        return res.status(200).send({
          message: "Product activated successfully",
          activateProduct,
        });
      } else {
        return res.status(404).send({ error: "Product not found" });
      }
    })
    .catch((updateErr) => {
      console.error("Error in activating the product: ", updateErr);

      return res.status(500).send({ error: "Failed to activating a product" });
    });
};
// Search a specific product by name
module.exports.searchByName = (req, res) => {
  return Product.find({ name: req.body.name })
    .then((product) => {
      if (product.length > 0) {
        return res.status(200).send(product);
      } else {
        return res.status(404).send("product not found");
      }
    })
    .catch((findErr) => {
      console.error("Error in finding the product: ", findErr);

      return res.status(500).send({ error: "Failed to fetch product" });
    });
};
// Search products with a price range (min price and max price)
module.exports.searchByPriceRange = (req, res) => {
  const { minPrice, maxPrice } = req.body;

  if (minPrice === undefined || maxPrice === undefined) {
    return res
      .status(400)
      .send({ message: "minPrice and maxPrice are required" });
  }

  return Product.find({ price: { $gte: minPrice, $lte: maxPrice } })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal Server Error" });
    });
};
