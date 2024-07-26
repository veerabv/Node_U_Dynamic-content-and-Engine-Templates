const rootDir = require("../util/path");

const path = require("path");
const fs =require("fs");




const products = []
module.exports = class Product{    //cretae a class to work with datas
    constructor(title){
        this.title =title;
    }
    save(){   // this will be the method of class and will be new to all new instance of the class
        const p = path.join(rootDir , 'data','product.json');
        fs.readFile(p ,(err , fileContent) => {    // this will read thw file and update
            // console.log(err);
            let product = [];
            if(!err){
              product =   JSON.parse(fileContent)
            }
            product.push(this);
            fs.writeFile(p , JSON.stringify(product),(err)=>{  // store the updated data in the file
                console.log(err);
            })
        })



    }

    static fetchAllProduct(cb){  // the static method will be called directly from the class 
        const p = path.join(rootDir , 'data','product.json');
      fs.readFile(p , (err,fileContent)=>{  // get the data form the file , there is a issue in this is the return is only for the inner function . when the fs.readFile executes the function gets over and register the calbback function (err , fileContent)
         
            if(err){
                cb([])   
            }
            cb(JSON.parse(fileContent))
        })
        
    }
}