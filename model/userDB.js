//export the users module
var usersDB = require('./user.js')

//make 2 users to pass to the user function
var John =usersDB.user(1,"John","Banks","john@gmail.com","Charlotte","12345")
var James =usersDB.user(2,"James","Franklin","Cao.james@gmail.com","Virginia","56789")





var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/NBADProject');
var db = mongoose.connection;

var userSchema = new mongoose.Schema({
  user_id:Number,
  first_name:String,
   last_name:String,
   email:String,
    city:String,
    zipcode:String,
    password:String,
    passwordHash:String,
    nSalt:String

});





//getUsers function help to prepare a list of users 
var getUsers= function() {
  var userDB=mongoose.model("User",userSchema)
  //module.exports.connectionDB=connectionDB;
   return userDB
  .find().exec()
}

var addUser=function(user_id,first_name,last_name,email,city,zipcode,password,passwordHash,nSalt){
  var userDB=mongoose.model("User",userSchema);
  var user=userDB({user_id:user_id,first_name:first_name,last_name:last_name,email:email,city:city,zipcode:zipcode,password:password,passwordHash:passwordHash,nSalt:nSalt})
  user.save(function(err,book){
    if (err) return console.error(err);
    console.log(user.email + " saved to users collection.");
  })
  //console.log("User obj is")
 // console.log(user)
}

function getUser(userID){
  var userDB=mongoose.model("User",userSchema)
  //module.exports.connectionDB=connectionDB;
   return userDB
  .find({user_id:userID}).exec()
}


function getUserByEmail(email){
  var userDB=mongoose.model("User",userSchema)
  //module.exports.connectionDB=connectionDB;
   return userDB
  .find({email:email}).exec()
}
//console.log(getUsers(John))

module.exports.getUsers=getUsers;
module.exports.getUser=getUser;
module.exports.getUserByEmail=getUserByEmail;
module.exports.addUser=addUser;