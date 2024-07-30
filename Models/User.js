const Sequelize = require("sequelize");

const sequelize = require("../util/database");


const User = sequelize.define("user",{
    id:{
        type:Sequelize.NUMBER,
        autoIncrement : true,
        allowNull:false,
        primaryKey : true
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull:false
    }

    
})

module.export = User;