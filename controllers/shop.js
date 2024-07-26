const Product = require("../Models/product"); // we import the class Product
const Cart = require("../Models/cart")

exports.getProducts = (req, res, next) => {
  Product.fetchAllProduct((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  }); // run the static method from the Class name itself "Product" capital P
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.getProduct(id, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.pageTitle,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAllProduct((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.getProduct(prodId , (product) => {
    Cart.addToCart(prodId , product.price)
  })
  res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "checkout",
    pageTitle: "checkout",
  });
};
