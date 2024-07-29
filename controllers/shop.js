const Product = require("../Models/product"); // we import the class Product
const Cart = require("../Models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAllProduct()
  .then((data) => {
    // here data contains nested array , simply log and see
    res.render("shop/product-list", {
      prods: data[0],
      pageTitle: "All Products",
      path: "/products",
    });
  })
  .catch((err) => console.log(err));

  
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.getProduct(id)
    .then((data) => {
      console.log(data[0]);
      res.render("shop/product-detail", {
        product: data[0][0], // here View we take the object only  , data[0] is an array so we take the object out from it
        pageTitle: data[0][0].title,
        path: "/products",
      });
    })
    .catch(err => console.log(err))

  };

exports.getIndex = (req, res, next) => {
  Product.fetchAllProduct()
    .then((data) => {
      // here data contains nested array , simply log and see
      res.render("shop/index", {
        prods: data[0],
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.getProduct(prodId, (product) => {
    Cart.addToCart(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAllProduct((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postDeleteCart = (req, res, next) => {
  const id = req.body.productId;

  Product.getProduct(id, (product) => {
    Cart.deleteById(id, product.price);

    res.redirect("/cart");
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


// <------------------------------------------OLD CODE------------------------------------------------------>
// const Product = require("../Models/product"); // we import the class Product
// const Cart = require("../Models/cart");

// exports.getProducts = (req, res, next) => {
//   Product.fetchAllProduct((products) => {
//     res.render("shop/product-list", {
//       prods: products,
//       pageTitle: "All Products",
//       path: "/products",
//     });
//   }); // run the static method from the Class name itself "Product" capital P
// };

// exports.getProduct = (req, res, next) => {
//   const id = req.params.productId;
//   Product.getProduct(id, (product) => {
//     res.render("shop/product-detail", {
//       product: product,
//       pageTitle: product.pageTitle,
//       path: "/products",
//     });
//   });
// };

// exports.getIndex = (req, res, next) => {
//   Product.fetchAllProduct((products) => {
//     res.render("shop/index", {
//       prods: products,
//       pageTitle: "Shop",
//       path: "/",
//     });
//   });
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.getProduct(prodId, (product) => {
//     Cart.addToCart(prodId, product.price);
//   });
//   res.redirect("/cart");
// };

// exports.getCart = (req, res, next) => {
//   Cart.getCart((cart) => {
//     Product.fetchAllProduct((products) => {
//       const cartProducts = [];
//       for(let product of products){
//         const cartProductData = cart.products.find(
//           prod => prod.id === product.id
//         );
//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.qty });
//         }

//       }
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: cartProducts
//       });
//     });
//   });

// };

// exports.postDeleteCart = (req,res,next) => {
//   const id = req.body.productId;

//   Product.getProduct(id,(product) => {
//     Cart.deleteById(id,product.price)
    
//     res.redirect("/cart")
   
//   })



// }

// exports.getOrders = (req, res, next) => {
//   res.render("shop/orders", {
//     path: "/orders",
//     pageTitle: "Your Orders",
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "checkout",
//     pageTitle: "checkout",
//   });
// };
