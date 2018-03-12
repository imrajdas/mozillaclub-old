var mongoose=require('mongoose');
var schema = mongoose.Schema;
var myschema=new schema({
  _id:{unique: true,type: String},
  name: {unique: false,type: String},
  email: {unique: false,type: String},
  phone: {unique: false,type: String},
  roll: {unique: false,type: String},
  year: {unique: false,type: String},
  branch: {unique: false,type: String},
  roll1: {unique: false,type: String},
  roll2: {unique: false,type: String},
  roll3: {unique: false,type: String},
  roll4: {unique: false,type: String},
  fifa: {unique: false,type: String},
  rainbow: {unique: false,type: String},
  hackathon: {unique: false,type: String}
});
var data=mongoose.model('registration',myschema);
module.exports=data;
