const Product = require("../Models/product");

exports.getAddProducts = (req, res, next) => {
    res.render("admin/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
    });
  };
  
  exports.postAddProducts = (req, res, next) => {
    const product = new Product(req.body.title); // create a new instance
    product.save(); // run the method from the instance
    res.redirect("/");
  };


  exports.getProducts = (req,res,next) => {
    Product.fetchAllProduct((products) => {
        res.render("admin/products", {
          prods: products,
          pageTitle: "Admin Products",
          path: "/admin/products",
        });
      });
  }
  