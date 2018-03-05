var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var schema=require('./schema.js');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var JSAlert = require("js-alert");
var app=express();
// Middleware
app.use(cookieParser());
app.use(session({
  secret: '---',
  saveUninitialized: true,
  resave: true}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser());
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('public'));
// MongoDb connection
var url='mongodb://mozadmin:admin123@ds255588.mlab.com:55588/registration';
// var url= 'mongodb://localhost:27017/mydb';
mongoose.connect(url, {useMongoClient: true}, function(err){
    if(err) {
        console.log('Some problem with the connection ' +err);
    } else {
        console.log('The Mongoose connection is ready');
    }
})
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection-error'));
db.on('open',function(){
  console.log('Database is connected');
});

// GET requests
app.get('/', function(req,res){
  res.render('home');
})
app.get('/registration', function(req,res){
  res.render('registration');
})
app.get('/admin',function(req,res){
  res.render('admin');
});
app.post('/admin',function(req,res){
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  if(username=='admin'&&password=='moz'){
    req.session.key="login";
    schema.find({}, function(err, data){
      res.render('user',{data: data})
    })
  }
  else{
    res.json({status:500})
    console.log("Worng credentials");
  }
});
// POST requests
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

app.post('/registration',function(req,res){
  console.log(req.body);
  if(req.body.name&&req.body.gender&&req.body.email&&req.body.phone&&req.body.institution){
    var addUser = schema({
      _id : makeid(),
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      institution: req.body.institution,
      refer: req.body.refer,
    })
    addUser.save(function(err,data){
      if(err)
        console.log(err);
      else{
        console.log(data);
        res.json({status:200})
      }
    })
  }
  else{
    res.json({status:500})
  }
});
app.get('/logout',function(req,res){
  req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect('/admin');
        }
    });
})
module.exports = app;
