const Product = require("../Models/product");

exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProducts = (req, res, next) => {
  const id = null;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(id,title, imageUrl, price, description); // create a new instance
  product.save(); // run the method from the instance
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAllProduct((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const isEdit = req.query.edit;
  // console.log(isEdit);
  const productId = req.params.productId;

  Product.getProduct(productId, (product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: isEdit,
      product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const {id,title,description,price,imageUrl} = req.body;
  
  const product = new Product(id,title, imageUrl, price, description); 
  product.save(); 
  res.redirect("/admin/products");
 

};

exports.postDeleteProduct = (req,res,next) => {
const prodId = req.body.id;

Product.deletProduct(prodId);
res.redirect('/')
// Product.fetchAllProduct((products) => {
//   res.render("admin/products", {
//     prods: products,
//     pageTitle: "Admin Products",
//     path: "/admin/products",
//   });
//   res.redirect("/admin/products");

// })


}
