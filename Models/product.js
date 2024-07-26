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
        fs.readFile(p ,(err , fileContent) => {
            // console.log(err);
            let product = [];
            if(!err){
              product =   JSON.parse(fileContent)
            }
            product.push(this);
            fs.writeFile(p , JSON.stringify(product),(err)=>{
                console.log(err);
            })
        })



    }

    static fetchAllProduct(){  // the static method will be called directly from the class 
        const p = path.join(rootDir , 'data','product.json');
      fs.readFile(p , (err,fileContent)=>{
        
            if(err){
                return []
            }
            return JSON.stringify(fileContent)
        })
        
    }
}