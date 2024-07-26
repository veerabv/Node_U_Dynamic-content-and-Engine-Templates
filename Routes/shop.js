const path = require("path");
const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products",shopController.getProducts);

router.get("/products/:productId" ,shopController.getProduct )

// router.get("products/delete")  // if we have a route like this then we will place this above the same structured dynamic routes , because this route will not react because the delete is assigned as a value to the dynamic route
router.get("/cart" , shopController.getCart)

router.get("/orders" , shopController.getOrders)

router.get("/checkout" , shopController.getCheckout)


module.exports = router;
