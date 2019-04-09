const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const db = require('./util/database');

const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

db.execute('SELECT * FROM products')
    .then(result => {
        console.log(result[0], result[1]);
    })
    .catch(err => {
        console.log(err);
    });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRouter);

app.use(errorController.get404);
app.listen(8000);

