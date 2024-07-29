const mysql = require('mysql2');


const pool = mysql.createPool({
    host : 'localhost',
    user: 'root', 
    database: 'node-complete',  //this is the db we created in workbench
    password:'123456789'
})

module.exports = pool.promise();