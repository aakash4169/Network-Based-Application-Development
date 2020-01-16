//Export express, bodyParser,router
var express = require('express')
var app= express ()
var bodyParser=require('body-parser')
var urlencodedParser=(bodyParser.urlencoded({extended:true}));
const { check, validationResult } =require('express-validator');
var crypto = require('crypto');
//app.use(validator());   
//app.use(bodyParser.json());
//set view engine and use static files
app.set('view engine' ,'ejs')
app.use('/assets',express.static('assets'))


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
//export profileController controls user profile
var profileController=require('./controllers/ProfileController.js')
// set the routing of the server
var router=express.Router();
var session = require('express-session');
app.get('/',function(req,res){
  res.render('index')
})
//uses session of the user
app.use(session({secret: "tejashri"}));
var categories=require('./routes/categories_routing')
app.use("/connections",categories)


var connectionItem=require('./routes/connection_routing');
app.use("/connection",connectionItem)

app.get('/about',function(req,res){
  res.render('about')
  //console.log("printing session contents")
  //console.log(req.session.userProfile);
})

app.get('/contact',function(req,res){
  res.render('contact')
})


var UserProfile = require('./model/UserProfile.js')
app.post("/addConnection",[check('id').not().notEmpty().trim().escape().isNumeric().withMessage("Must be a number"),check('name').not().notEmpty().trim().escape().withMessage("must be a string"),check('topic').not().notEmpty().trim().escape().isAlpha().withMessage("must be a string"),check('details').not().notEmpty().trim().escape().withMessage("Details are mandatory"),check('date').not().notEmpty().trim().withMessage("Required"),check('time').not().notEmpty().trim().escape().withMessage("Required"),check('location').not().notEmpty().trim().escape().withMessage("Required")],function(req,res){
  console.log("I am here")
  var topic = req.body.topic;
  var name=req.body.name;
  var id=req.body.id;
  var details=req.body.details
  var date=req.body.date;
  var time=req.body.time;
  var location=req.body.location;
  //console.log(studentReqParams)



  var errors=validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
else{
  console.log(req.session.theUser)
  var connectionOBJ={connection_ID:id,connection_name:name,connection_topic:topic,
    details:details,date:date,time:time,imageURL:"../assets/images/default.jpg",location:location,user_id:req.session.theUser.user_id};
    UserProfile.addConnection(connectionOBJ);
    console.log(connectionOBJ);
    res.redirect('/savedConnections')
  }


  //console.log(req.body.topic)
})
app.get('/newConnection',function(req,res){
  if(req.session.theUser)
  res.render('newConnection')
  else{
    res.render('login',{flag:1})
  }
})

app.get('/savedConnections',function(req,res){

  if(req.session.theUser){
    console.log("session is set")
    if(req.query.action==null)
    //res.render('myConnections',{userProfile:req.session.userProfile})
    profileController.displayConnections(req,res);
    else if(req.query.action){
        profileController.validateAction(req,res);
    }
}
else{
  res.render('login',{flag:1})
}
 // res.render('myConnections')
})

app.get('/rsvp',function(req,res){
  if(req.query.action!=null)
  profileController.validateAction(req,res);
  //res.render('feedback')

});

app.get('/signUp',function(req,res){
  res.render('signUp');

});

app.post('/signup',function(req,res){
  var user_id=req.body.user_id;
  var first_name=req.body.first_name;
  var last_name=req.body.last_name;
  var city=req.body.city;
  var zipcode=req.body.zipcode;
  var email=req.body.email;
  var password=req.body.password;
  profileController.createUser(user_id,first_name,last_name,email,city,zipcode,password);
  //var passwordData=profileController.saltHashPassword(password);
  //console.log(passwordData);
  //console.log(password);
  //res.end(password);
})


app.post('/signIn',[check('username').trim().isEmail(),check('password').trim().escape()],function(req,res){
  var user_name=req.body.username;
  var password=req.body.password;
  if(req.query.action=='login'){
    console.log(req.body.username)
      //validate the fields where user enters values and sanitize them as well
      //req.assert('username','Invalid Email').trim().isEmail().normalizeEmail();
    // req.assert(password,'Invalid Password').trim().escape();
      var errors=validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      else
      profileController.saveUserProfile(req,res)
  }
  else 
  console.log("No parameter")
  //console.log("User name = "+user_name+", password is "+password);
  //res.end("yes");
  
})

app.get("/signIn",function(req,res){
  if(req.query.action=="incorrect"){
    res.render("login",{flag:2})
  }
  //res.end("end")
  if(req.query.action==null)
  res.render('login',{flag:1})
  //profileController.saveUserProfile(req,res)
  else{
      console.log("query parameter is present")
      profileController.validateAction(req,res);

  }
 // res.render('signIn')
  //profileController.createSession(req,res);
});

app.get("/signOut",function(req,res){
  console.log("signout")
  profileController.signOut(req,res);

});
app.listen(3000);
console.log('Port is listening')

/*  testing code for userprofile
var UserProfile = require('./model/UserProfile.js')

user=require('./model/user.js')

var user_Obj=new user.user(1,'Tejashri','Arote','tarote@uncc.edu','Charlotte',1234)
//console.log(user_Obj);

var obj=new UserProfile.UserProfile(user_Obj);
//console.log(obj);

ConnectionDb=require('./model/connectionDB.js')
var ListOfConnectionsObj=ConnectionDb.getConnections();
//console.log(ListOfConnectionsObj)
for(var i=0;i<ListOfConnectionsObj.length;i++){
  obj.addConnection(ListOfConnectionsObj[i],true);
}
//console.log(obj.ListOfConnections[3]);
obj.updateConnection(obj.ListOfConnections[3])
console.log(obj.ListOfConnections[3]);
obj.updateConnection(obj.ListOfConnections[3])
//console.log(obj.ListOfConnections[3]);
//console.log(obj.getConnections())
obj.emptyProfile();
//console.log(obj);

*/
