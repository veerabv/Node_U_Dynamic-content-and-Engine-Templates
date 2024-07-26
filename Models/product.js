const products = []
module.exports = class Product{    //cretae a class to work with datas
    constructor(title){
        this.title =title;
    }
    save(){   // this will be the method of class and will be new to all new instance of the class
        products.push(this)  
    }

    static fetchAllProduct(){  // the static method will be called directly from the class 
        return products;
    }
}