## http headers reference link

```sh
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
```

## Express.js ->frameWork

- handling the req and the types of files comes form the request

=> aternative for Express: - vanila node.js - Adonis.js - Koa - Sail.js

## Install Express.js

```sh
npm install --save express
```

-> read the documentation for "use" method from express documentation

link -> https://expressjs.com/en/4x/api.html#app.use

## Body-parser -> which is used to parse the body from req , before we do it manually thanks to express

```sh
npm install --save body-parse
```

## How to restrict to a particular method (GET , POST ,PUT , DELETE , PATCH)

- generally app.use() -> for all method

- app.get() -> only get method

## how to work with paths

const path = require('path'); // this the global module to work with path
const express = require('express');
const router = express.Router();

// console.log(path.join(\_\_dirname));

router.get("/",(req,res,next) => {
// 'sendFile' is to send a file as a responss to the req
// res.sendFile('/views/shop.html') // if we select the file like this , it will not work because the / will point the root directory of this project so we have to change as follow

    res.sendFile(path.join(__dirname,"../" ,"views","shop.html"))   // __dirname will give the root directory path of this file and select the path of this file . ,  the second param is to go one level up

    res.sendFile(path.join(__dirname,"..","views","add-product.html")) //you can use the .. instead of "../" to work in all os

})

module.exports = router;

this is helper function
const path = require('path');

module.exports = path.dirname(require.main.filename); // this is used to get the root directory of the project path , \_\_dirname will give the exact path of the file we are working

## Public files

app.use(express.static(path.join(\_\_dirname, 'public'))); // this line will give the access to the file

npm install --save

## app.set and render() method:

- see the link in the official doc of express

app.set('view engine' , 'ejs'); // we use ejs engine so we give this
app.set('views','views') // where we have the view files / html file

## Adding dynamic Routes

routes.get("/path/:dynamicdata" , controller) // : is ipmortant that the text after colon treat as variable ,

we can get the data of the variable using req.params.dyanmicdata

## SQL vs NoSql

sql => is so called Tables,
=> fields = col
=> records = rows

sql is used to relate tables

### core SQL Database Characteristics

- Data schema
- Data Relations
  - one to one => one record matches on one record
  - one to many =>
  - many to many

sql => structured query language

## NoSql

here we have collections
in collections we have documents . object like structure

## command to install a package used to connect sql database in node

- npm install --save mysql2

## sample for insert command and explanation

save() {
return db.execute("INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)",[this.title,this.price,this.description,this.imageUrl]) // this will insert the data into the product table

// (title,price,description,imageUrl) should match the column order in the db
// "INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)",[this.title,this.price,this.description,this.imageUrl] this is called parameteroized query to avoid sql injection

}

# SEQUELIZE

const Sequelize = require("sequelize"); // here we import which is a constructor function
// const sequelize = new Sequelize("db_name","user","password",{dialect:"mysql",host:"localhost"}(optional object refer link in readme))
const sequelize = new Sequelize("node-complete", "root", "Vj @150894", {
dialect: "mysql",
host: "localhost",
}); // here we create an instance
// same as connectionPoll the above line create a connection to the db

module.exports = sequelize;

## Define a model in a sequelize

const Sequelize = require("sequelize"); //import sequelize

const sequelize = require("../util/database"); // import the connection we created using sequelize

// define () => used to create a table or model
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

## create the table from the sequelize

in app.js

// to create a / all the table from our model definition in the product.js
sequelize // import this from the instance we created
.sync() // this method creates the table only if it is not there in the db .it will not override
.then(() => app.listen(8080)) // if this promise resolve then only app will start
.catch((err) => console.log(err));

## created a new row or row of data

Product.create({ // created a new product using create method
title: title,
price: price,
imageUrl: imageUrl,
description: description,
})
.then((res) => console.log(res))
.catch((err) => console.log(err)
