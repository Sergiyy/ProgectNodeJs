const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const app = express();
const User = require('./models/user');

const MONGODB_URL = 'mongodb+srv://sergiymokhurenko:Kp.XaKgGKdt3SZ9@cluster0-hdsn0.mongodb.net/shop'; //?retryWrites=true&w=majority
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
})

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');
const authRouter = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ 
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
    User.findById(req.session.user._id)
      .then(user => {
          req.user = user;
          next();
      })
      .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRouter);
app.use(authRouter);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URL, {useNewUrlParser: true})
  .then(result => {
    app.listen(8000);
  })
  .catch(err => {
      console.log(err)
  });