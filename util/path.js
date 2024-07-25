const path = require('path');


module.exports = path.dirname(require.main.filename); // this is used to get the root directory of the project path , __dirname will give the exact path of the file we are working