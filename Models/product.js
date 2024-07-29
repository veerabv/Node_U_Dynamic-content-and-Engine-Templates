const Sequelize = require("sequelize"); //import sequelize

const sequelize = require("../util/database"); // import the connection we created using sequelize

//  define () => used to create a table or schema
// define(param1 , param2) => used to
// param1 => is the name of the table / Model
// param 2 => object with col definition

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER, // this is from the package
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING, //this is the shortcut notation of the above object if we have to define only one prop
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;

// <---------------------SQL Code------------------------------->
// const Cart = require("./cart");
// const db = require('../util/database');

// module.exports = class Product {
//   constructor(id, title, imageUrl, price, description) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//   }
//   save() {
//    return db.execute("INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)",[this.title,this.price,this.description,this.imageUrl])  // this will insert the data into the product table

//   //  (title,price,description,imageUrl) should match the column order in the db
//   // "INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)",[this.title,this.price,this.description,this.imageUrl]  this is called parameteroized query to avoid sql injection

//   }

//   static fetchAllProduct() {
//     return db.execute("SELECT * FROM products");
//   }

//   static getProduct(id) {
//     return db.execute("SELECT * FROM products WHERE products.id = ?",[id]);

//   }

//   static deletProduct(id) {

//   }
// };

// <-------------------------------------------old COde before db connections Promise----------------------------------------------------->
// const rootDir = require("../util/path");

// const path = require("path");
// const fs = require("fs");

// const Cart = require("./cart");

// const p = path.join(rootDir, "data", "product.json");

// const getProductFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       if (!fileContent || fileContent.length === 0) {
//         cb([]);
//       } else {
//         const parsedContent = JSON.parse(fileContent);
//         cb(parsedContent);
//       }
//     }
//   });
// };

// module.exports = class Product {
//   constructor(id, title, imageUrl, price, description) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//   }
//   save() {
//     getProductFromFile((products) => {
//       if (this.id) {
//         const exisitingProdIndex = products.findIndex(
//           (prod) => prod.id === this.id
//         );
//         const updateProducts = [...products];
//         updateProducts[exisitingProdIndex] = this;
//         fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
//           console.log(err);
//         });
//       } else {
//         this.id = Math.random().toString();
//         products.push(this);
//         fs.writeFile(p, JSON.stringify(products), (err) => {
//           console.log(err);
//         });
//       }
//     });
//   }

//   static fetchAllProduct(cb) {
//     getProductFromFile(cb);
//   }

//   static getProduct(id, cb) {
//     getProductFromFile((products) => {
//       const product = products.find((item) => item.id === id);

//       cb(product);
//     });
//   }

//   static deletProduct(id) {
//     getProductFromFile((products) => {
//       const product = products.find((prod) => prod.id == id);
//       const updatedProducts = products.filter((prod) => prod.id !== id);

//       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         if (!err) {
//           // here i remove the product from the cart if the deleted item in the cart
//           Cart.deleteById(id, product.price);
//         }

//       });
//     });
//   }
// };
