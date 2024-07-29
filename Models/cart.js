const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");
module.exports = class Cart {
  static addToCart(id, price) {
    // Fetch the previous cart                                          //car [{id: , qty : },totalQty]
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
       // Analyze the cart => Find existing product
    const findIdIndex = cart.products.findIndex((prod) => prod.id === id);
    if (findIdIndex !== -1) {
      const exsitingCartItem = { ...cart.products[findIdIndex] };
      exsitingCartItem.qty = exsitingCartItem.qty + 1;
      cart.products[findIdIndex] = exsitingCartItem;
    }
    //Add new product/increae qty
    else {
      cart.products.push({ id, qty: 1 });
    }

    cart.totalPrice = cart.totalPrice + +price;

    fs.writeFile(p, JSON.stringify(cart), (err) => {
      console.log(err);
    });
    });

   
  }

 static deleteById(id,price){
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return;
    }
    const existingCart = {...(JSON.parse(fileContent))}
    const findItem = existingCart.products.find(prod => prod.id === id);
    const itemQty = findItem.qty;
    existingCart.products = existingCart.products.filter(prod => prod.id !== id);
    existingCart.totalPrice = existingCart.totalPrice - itemQty*price;

 fs.writeFile(p, JSON.stringify(existingCart), (err) => {
      console.log(err);
    });
  })
 }

 static getCart(cb) {
  fs.readFile(p, (err, fileContent) => {
    if(err){
      cb(null)
    }
    else{
      cb(JSON.parse(fileContent))
    }
    
  })
 }

  
};
