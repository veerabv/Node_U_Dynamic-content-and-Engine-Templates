const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.set('view engine' , 'ejs');  // we use ejs engine so we give this
app.set('views','views') // where we have the view files / html file

const adminRoutes = require('./Routes/admin');
const shopRoutes = require('./Routes/shop');
const errorControler = require('./controllers/not_found')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));  // this line will give the access to the file  see in network

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorControler.notFound);

app.listen(8080);
