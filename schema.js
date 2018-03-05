var mongoose=require('mongoose');
var schema = mongoose.Schema;
var myschema=new schema({
<<<<<<< HEAD
  _id:{unique: true,type: String},
=======
>>>>>>> ac57006e9f822a066802c8b12ab191cdf8746e3b
  name:{unique: false,type: String},
  gender:{unique: false,type: String},
  email:{unique: false,type: String},
  phone:{unique: false,type: String},
  institution:{unique: false,type: String},
  refer:{unique: false,type: String},
});
var data=mongoose.model('registration',myschema);
module.exports=data;
