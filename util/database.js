const Sequelize = require('sequelize');  // import sequlize and it is a constructor function so it starts with capitla "S"

const sequelize = new Sequelize('node-complete','root','123456789',{dialect:"mysql",host:"localhost"});  // create a instance from the constructor function


module.exports = sequelize;













// <------------------------SQL CODE (RAW QUERY) ---------------------------------/>
// const mysql = require('mysql2');


// const pool = mysql.createPool({
//     host : 'localhost',
//     user: 'root', 
//     database: 'node-complete',  //this is the db we created in workbench
//     password:'123456789'
// })

// module.exports = pool.promise();