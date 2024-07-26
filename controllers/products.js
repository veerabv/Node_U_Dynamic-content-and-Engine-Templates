const Product = require("../Models/product"); // we import the class Product

exports.getAddProducts = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProducts = (req, res, next) => {
  const product = new Product(req.body.title); // create a new instance
  product.save(); // run the method from the instance
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAllProduct((products) =>
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    })
  ); // run the static method from the Class name itself "Product" capital P
};
