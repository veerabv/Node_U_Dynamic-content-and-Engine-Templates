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


