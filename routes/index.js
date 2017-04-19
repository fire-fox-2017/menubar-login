var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = undefined;
  res.render('index', { title: 'Bro', user: user, message: "" });
});


function checkSignIn(req, res, next){
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
}


router.get('/home', checkSignIn, (req, res, next) => {
  res.render('home', {title: "Home", user: req.session.user})
})



module.exports = router;
