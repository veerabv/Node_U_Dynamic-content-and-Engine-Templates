 ## http headers reference link


```sh
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
``` 


## Express.js ->frameWork

  - handling the req and the types of files comes form the request

 => aternative for Express: 
         - vanila node.js
         - Adonis.js
         - Koa
         - Sail.js



## Install Express.js

```sh
npm install --save express
```

 -> read the documentation for "use" method from express documentation

 link -> https://expressjs.com/en/4x/api.html#app.use

## Body-parser  -> which is used to parse the body from req , before we do it manually thanks to express

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

// console.log(path.join(__dirname));

router.get("/",(req,res,next) => {
    // 'sendFile' is to send a file as a responss to the req
    // res.sendFile('/views/shop.html')  // if we select the file like this , it will not work because the / will point the root directory of this project so we have to change as follow
     
    res.sendFile(path.join(__dirname,"../" ,"views","shop.html"))   // __dirname will give the root directory path of this file and select the path of this file . ,  the second param is to go one level up  

    res.sendFile(path.join(__dirname,"..","views","add-product.html")) //you can use the .. instead of "../" to work in all os 



})

module.exports = router;


this is helper function
const path = require('path');


module.exports = path.dirname(require.main.filename); // this is used to get the root directory of the project path , __dirname will give the exact path of the file we are working



## Public files 

app.use(express.static(path.join(__dirname, 'public')));  // this line will give the access to the file 

  npm install --save 
## app.set  and render() method:

 - see the link in the official doc of express

  app.set('view engine' , 'ejs');  // we use ejs engine so we give this
  app.set('views','views') // where we have the view files / html file



  ## Adding dynamic Routes 

  routes.get("/path/:dynamicdata" , controller)  // : is ipmortant that the text after colon treat as variable , 

  we can get the data of the variable using req.params.dyanmicdata


## SQL vs NoSql

sql => is so called Tables,
      => fields = col
      => records = rows

sql is used to relate  tables

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
  
##  sample for insert command and explanation

save() {
   return db.execute("INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)",[this.title,this.price,this.description,this.imageUrl])  // this will insert the data into the product table

  //  (title,price,description,imageUrl) should match the column order in the db
  // "INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)",[this.title,this.price,this.description,this.imageUrl]  this is called parameteroized query to avoid sql injection
 
  }

# SEQUELIZE

 - ORM => Object Relational Mapping
 - comand
    => npm install --save sequelize 

    note : we also have to install   npm install --save mysql2 then only sequlize works 


## to create a connection using sequelize 

    - in database.js

    const Sequelize = require('sequelize');  // import sequlize and it is a constructor function so it starts with capitla "S"

const sequelize = new Sequelize('node-complete','root','123456789',{dialect:"mysql",host:"localhost"});  // create a instance from the constructor function


module.exports = sequelize;



# important from chatGpt
### Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
### User.hasMany(Product); 

In Sequelize, the lines Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); and User.hasMany(Product); establish a one-to-many relationship between the User and Product models. Let's break down what each of these lines does and what happens when they are both present versus when only one of them is present.

Explanation of the Code
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });:

This line indicates that each Product belongs to a single User.
It creates a foreign key (userId) in the Product table that references the id column in the User table.
The constraints: true option ensures that foreign key constraints are enforced at the database level.
The onDelete: "CASCADE" option means that if a User is deleted, all related Product records will also be deleted automatically.
User.hasMany(Product);:

This line indicates that a User can have multiple Product records.
It is the inverse relationship to Product.belongsTo(User), making the association bidirectional.
What Happens with Both Lines
When both lines are present, Sequelize sets up a bidirectional one-to-many relationship between User and Product:

The Product table will have a userId foreign key that references the id column in the User table.
The User model will have a getProducts method to fetch all related Product records, and the Product model will have a getUser method to fetch the related User record.
The onDelete: "CASCADE" option ensures that deleting a User will also delete all associated Product records.
What Happens with Only One Line
If you comment out one of the lines, the following will happen:

Only Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });:

The Product table will still have a userId foreign key.
The Product model will have methods like getUser and setUser to handle the association.
The User model will not have methods like getProducts or addProduct since the reverse association (hasMany) is not defined.
Only User.hasMany(Product);:

The Product table will still have a userId foreign key.
The User model will have methods like getProducts and addProduct to handle the association.
The Product model will not have methods like getUser or setUser since the forward association (belongsTo) is not defined.
There will be no onDelete: "CASCADE" constraint unless specified elsewhere.
Why Both Lines are Useful
Bidirectional Access: Having both lines allows bidirectional access to the relationship. You can navigate from a User to their Product records and from a Product to its User.
Cascade Delete: The onDelete: "CASCADE" ensures that associated records are properly cleaned up, maintaining referential integrity.

