const rootDir = require("../util/path");

const path = require("path");
const fs = require("fs");

const Cart = require("./cart");

const p = path.join(rootDir, "data", "product.json");

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      if (!fileContent || fileContent.length === 0) {
        cb([]);
      } else {
        const parsedContent = JSON.parse(fileContent);
        cb(parsedContent);
      }
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const exisitingProdIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updateProducts = [...products];
        updateProducts[exisitingProdIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAllProduct(cb) {
    getProductFromFile(cb);
  }

  static getProduct(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((item) => item.id === id);
      
      cb(product);
    });
  }

  static deletProduct(id) {
    getProductFromFile((products) => {
      const product = products.find((prod) => prod.id == id);
      const updatedProducts = products.filter((prod) => prod.id !== id);

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          // here i remove the product from the cart if the deleted item in the cart
          Cart.deleteById(id, product.price);
        }
      
      });
    });
  }
};
