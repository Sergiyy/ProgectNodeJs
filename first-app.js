const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5cfbe74268e2561d902ea3b0')
      .then(user => {
          req.user = user;
          next();
      })
      .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRouter);
app.use(errorController.get404);

// mongoConnect(() => {
//     app.listen(8000);
// });

mongoose
  .connect(
      'mongodb+srv://sergiymokhurenko:Kp.XaKgGKdt3SZ9@cluster0-hdsn0.mongodb.net/shop?retryWrites=true&w=majority', {useNewUrlParser: true}
  )
  .then(result => {
    User.findOne().then(user => {
      if(!user) {
        const user = new User({
          name: 'Sergiy',
          email: 'sergiy.mohurenko@gmail.com',
          cart: {
              items: []
          }
        });
        user.save();
      }
    })
    app.listen(8000);
  })
  .catch(err => {
      console.log(err)
  });