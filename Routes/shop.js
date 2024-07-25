const path = require('path'); // this the global module to work with path
const express = require('express');
const router = express.Router();
const rootdir = require('../util/path');


router.get("/",(req,res,next) => {
    // 'sendFile' is to send a file as a responss to the req
    // res.sendFile('/views/shop.html')  // if we select the file like this , it will not work because the / will point the root directory of this project so we have to change as follow
     
    res.sendFile(path.join(rootdir,"views","shop.html"))   // __dirname will give the root directory path of this file and select the path of this file . ,  the second param is to go one level up  



})

module.exports = router;