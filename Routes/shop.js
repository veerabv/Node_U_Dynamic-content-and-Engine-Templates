const path = require("path"); // this the global module to work with path
const express = require("express");
const router = express.Router();

const rootdir = require("../util/path");
const adminProducts = require("../Routes/admin");

router.get("/", (req, res, next) => {
    console.log("shop" , adminProducts.products);
  res.sendFile(path.join(rootdir, "views", "shop.html"));
});

module.exports = router;
