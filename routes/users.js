var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', (req, res, next) => {
  res.render('new', {title: "Register"});
})

router.post('/new', (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;

  db.User.create({username: username, email: email, password: password, role: role})
  .then ( user => {
    console.log(`created user ${user.username}.`);
    res.render('index', {title: "Bro", user: user, message: ""});
  })
})

router.post('/login', (req, res, next) => {

  db.User.findOne({where: {username: req.body.username, password: req.body.password}})
  .then( user => {

    if (user) {
      console.log(`find user ${user.username}`);
      //set session
      req.session.user = user;
      res.redirect('/home');
    }
    else {
      // res.redirect('/');
      res.render('index', { title: 'Bro', user: undefined, message: 'Invalid Username or Password.' });
    }

  })
})

router.get('/logout', (req, res, next) => {
  req.session.destroy( () => {
    console.log("user logged out.")
  })
  res.redirect('/');
})


module.exports = router;
