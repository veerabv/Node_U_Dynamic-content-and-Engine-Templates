const path = require('path');
const express = require("express");
const rootdir = require('../util/path');

const router = express.Router();


// path => "/admin/add-product" method=> get
router.get("/add-product", (req, res, next) => {  // the path will be same for both req "/add-product " but the method is different
 res.sendFile(path.join(rootdir,"views","add-product.html")) //you can use the .. instead of "../" to work in all os 
}); 
// path => "/admin/add-product" method=> post
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
