// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host : 'localhost',
//     user: 'root',
//     database: 'node-complete',  //this is the db we created in workbench
//     password:'123456789'
// })

// module.exports = pool.promise();

//<----------------------------------------------------------------------------------------------------------->

const Sequelize = require("sequelize"); // here we import which is a constructor function
// const sequelize = new Sequelize("db_name","user","password",{dialect:"mysql",host:"localhost"}(optional object refer link in readme))
const sequelize = new Sequelize("node-complete", "root", "Vj @150894", {
  dialect: "mysql",
  host: "localhost",
}); // here we create an instance
// same as connectionPoll the above line create a connection to the db

module.exports = sequelize;
