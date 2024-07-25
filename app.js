const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine' , 'ejs');  // we use ejs engine so we give this
app.set('views','views') // where we have the view files / html file

const adminProducts = require('./Routes/admin');
const shopRoutes = require('./Routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));  // this line will give the access to the file  see in network

app.use('/admin', adminProducts.router);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404' , {pageTitle : 'Page Not Found',path:req.url}) 
    //render => 1st parameter 404 is the filename and the object is title
});

app.listen(8080);
