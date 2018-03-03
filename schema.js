var mongoose=require('mongoose');
var schema = mongoose.Schema;
var myschema=new schema({
  name:{unique: false,type: String},
  gender:{unique: false,type: String},
  email:{unique: false,type: String},
  phone:{unique: false,type: String},
  institution:{unique: false,type: String},
  refer:{unique: false,type: String},
});
var data=mongoose.model('registration',myschema);
module.exports=data;
