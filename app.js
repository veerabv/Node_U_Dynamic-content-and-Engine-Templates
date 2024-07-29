const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./Routes/admin");
const shopRoutes = require("./Routes/shop");
const errorControler = require("./controllers/not_found");

// db.execute("SELECT * FROM products")   // this is testing code
//     .then(result => console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",result[0],result[1]))
//     .catch(err => console.log(err)); // we execute a query to fetch the data

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorControler.notFound);

//  to create a / all the table from our model definition in the product.js
sequelize
  .sync() // this method creates the table only if it is not there in the db .it will not override
  .then(() => app.listen(8080)) // if this promise resolve then only app will start
  .catch((err) => console.log(err));
