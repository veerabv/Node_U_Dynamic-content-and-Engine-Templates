const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");

const app = express();

const Product = require("./Models/product"); // this two import from the Models to give the relationship
const User = require("./Models/users");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./Routes/admin");
const shopRoutes = require("./Routes/shop");
const errorControler = require("./controllers/not_found");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req,res,next) => {
   User.findByPk(1)
   .then(user => {
      return req.user = user;      // here we will set the user for every req .. we can do req.user a random key and assign value. here we will assign a object from seq so we can use destroy , save like methods by seq
   })
   .catch(err => console.log(err))
   next()
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorControler.notFound);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
//this line define the relation between the two Model or tables , the second one is optional the "constraints" key is used to control the foreign key creation in the db
User.hasMany(Product); // this is the inverse of the above line

// sequelize.sync({force:true})   // this will create the table and start the server when we put the app.listen in the .then
sequelize
  .sync() // force true is used in development to reflect the changes made in production we wont use that
  .then((result) => {
    return User.findByPk(1);  // this is used to create a dummy user for our website
  })
  .then((user) => {
    if (!user) {  // here we will check for user if not create it otherwise return it
      return User.create({ name: "veeera", email: "test@test.com" });
    }
    return user;
  })

  .then((user) => {
    app.listen(8080); //then app will start
  })

  .catch((err) => console.log(err));
