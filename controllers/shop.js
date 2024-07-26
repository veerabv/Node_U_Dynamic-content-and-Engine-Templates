const Product = require("../Models/product"); // we import the class Product


exports.getProducts = (req, res, next) => {
  Product.fetchAllProduct((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  }); // run the static method from the Class name itself "Product" capital P
};


exports.getIndex = (req,res,next) => {
  Product.fetchAllProduct((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
}

exports.getCart = (req,res,next) => {
res.render('shop/cart' , {
  path : '/cart',
  pageTitle : 'Your Cart'
})
}

exports.getCheckout = (req,res,next) => {
  res.render('shop/checkout',{
    path : 'checkout',
    pageTitle : 'checkout'
  })
}
