const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./util/database"); // import the db pool as promise.

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./Routes/admin");
const shopRoutes = require("./Routes/shop");
const errorControler = require("./controllers/not_found");

db.execute("SELECT * FROM products")
    .then(result => console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",result[0],result[1]))
    .catch(err => console.log(err)); // we execute a query to fetch the data

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorControler.notFound);

app.listen(8080);
