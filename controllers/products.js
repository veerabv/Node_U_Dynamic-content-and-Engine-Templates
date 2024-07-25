const Product = require('../Models/product');



exports.getAddProducts = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
  
    });
}

exports.postAddProducts = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/');
  };

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAllProduct();
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  }