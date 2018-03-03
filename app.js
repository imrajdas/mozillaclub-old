var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var schema=require('./schema.js');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var app=express();
app.use(cookieParser());
app.use(session({secret: 'mycode'}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser());
app.set('view engine','ejs');
app.set('views','./views');
app.use('/static',express.static('public'));
// MongoDb connection
// var url='mongodb://mozadmin:admin123@ds255588.mlab.com:55588/registration';
var url= 'mongodb://localhost:27017/mydb';
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
  console.log('Database is connected at port 27017');
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
  var username = req.body.username;
  var password = req.body.password;
  console.log(username,password);
  if(username==''&&password==''){
    console.log("successfully logedin");
    schema.find({}, function(err, data){
      console.log(data[0]);
      res.render('user',{data: data})
    })
  }
  else{
    console.log("Worng credentials");
  }
});
// POST requests
app.post('/registration',function(req,res){
  var addUser = schema({
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
      console.log("success");
      console.log(data);
      return data;
    }
  })
});
// server
app.listen(9000,function(err){
  if(err) throw err;
  console.log('server is running');
});
