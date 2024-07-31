const Product = require("../Models/product");

exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProducts = (req, res, next) => {
  // console.log(req.user , "::::::::::::::::::::::::::::::::::");
  const id = null;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //this is one way
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId : req.user.id  // this is one way to set the userId from the req we set in the app .js , we can also set the id using magic association method
  // })
  //   .then((product) => res.redirect("/admin/products"))
  //   .catch((err) => console.log(err));

  //  this is anotherWay elequent way

  req.user
    .createProduct({
      // we set the user in app.js middlewhere refer the readme file to know about where we get this "createProduct" suddenly  . the  Product in createProduct is come from the model name we gave
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((product) => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user
    .getProducts({ where: { userId: req.user.id } }) //change this to the particular logged in admin user . display only thr products related to that admin not all products
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const isEdit = req.query.edit;
  // console.log(isEdit);
  const productId = req.params.productId;

  Product.findByPk(productId)

    .then((product) => {
      // here we will find the product and prepopulated in the product form
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: isEdit,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, description, price, imageUrl } = req.body;

  Product.findByPk(id)
    .then((product) => {
      product.title = title;
      product.description = description;
      product.price = price;
      product.imageUrl = imageUrl; // upto this the product changed in our system locally to change this to db use save method
      return product.save(); // this will save the new data to db this also returns the promise so we return it and handle in next then
    })
    .then((result) => {
      console.log("succes", result);

      res.redirect("/admin/products"); // we move this to see the changes in the screnn after the update if it is in the last the old data only show because of js synchronous nature
    })
    .catch((err) => console.log(err));
  // res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  Product.findByPk(prodId)
    .then((product) => {
      // console.log(product, "?????????????????????????");
      return product.destroy(); // find the product using id and use destroy method to delte the method
    })
    .then((prod) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
