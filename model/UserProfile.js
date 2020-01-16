var UserConnection = require('./userConnection.js')
var ConnectionDb=require('./connectionDB.js')


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/NBADProject');
var db = mongoose.connection;

var userconnectionSchema = new mongoose.Schema({
  connection_ID:Number,
  user_id:Number,
  rsvp:String
  

});

var connectionSchema = new mongoose.Schema({
  connection_ID:Number,
  connection_name:String,
   connection_topic:String,
   details:String,
    date:String,
    time:String,
imageURL:String,
location:String,
user_id:Number
});

function getUserProfile(user_id){
 

  

  var userConnectionDB=mongoose.model("usersconnection",userconnectionSchema)
  return userConnectionDB
  .find({'user_id':user_id}).exec()
}



async function test(){
  console.log("calling getuserprofile")
  var a= await getUserProfile(2);
  console.log("called finsihed")
  console.log(a);
}

module.exports.getUserProfile=getUserProfile;
async function addRSVP(connection_ID,user_id,rsvp){
  console.log("in add rsvp")
  var userConnectionDB=mongoose.model("usersconnection",userconnectionSchema)
  var doc=new userConnectionDB({'connection_ID':connection_ID,'user_id':user_id,'rsvp':rsvp})
  await doc.save(function(err,doc){
    if (err) return console.error(err);
      console.log(doc.user_id + " saved to bookstore collection.");
  })
 
}





module.exports.addRSVP=addRSVP;

async function updateRSVP(connection_ID,user_id,rsvp){
  var userConnectionDB=mongoose.model("usersconnection",userconnectionSchema)
 // var doc=new userConnectionDB({connection_ID:connection_ID,user_id:user_id,rsvp:rsvp})
  await userConnectionDB.findOneAndUpdate({connection_ID:connection_ID,user_id:user_id}, {rsvp:rsvp});
 // await doc.updateOne({connection_ID:connection_ID,user_id:user_id},)
 /* doc.save(function(err,doc){
    if (err) return console.error(err);
      console.log(doc.user_id + " saved to bookstore collection.");
  })*/
}
module.exports.updateRSVP=updateRSVP;
var con={
  connection_ID: 2,
  connection_name: 'ITCS 5102 SPL',
  connection_topic: 'Study',
  details:
   'SPL Meetup is a brainstorming session about creating websites in any backend and frontend technology',
  date: 'Tuesday, August 02 2019',
  time: '10:00 AM to 11 AM',
  imageURL: '../assets/images/SPL.jpg',
  location: 'Career Centre',
  user_id: 2 }


function addConnection(Connection){
  var ConnectionDB=mongoose.model("connection",connectionSchema)


  var doc=new ConnectionDB({connection_ID:Connection.connection_ID,connection_name:Connection.connection_name,connection_topic:Connection.connection_topic,details:Connection.details,
  date:Connection.date,time:Connection.time,imageURL:Connection.imageURL,location:Connection.location,user_id:Connection.user_id
  })
  doc.save(function(err,doc){
    if (err) return console.error(err);
      
  })
}


 async function removeConnection(connection_ID,user_id){
  //var ConnectionDB=mongoose.model("connection",connectionSchema)
 
  var userConnectionDB=mongoose.model("usersconnection",userconnectionSchema)
    await userConnectionDB.remove({'connection_ID':connection_ID,'user_id':user_id});
    console.log("deleted")

}

async function removeConnectionById(connection_ID){
  var userConnectionDB=mongoose.model("usersconnection",userconnectionSchema)
    await userConnectionDB.remove({'connection_ID':connection_ID});
    console.log("deleted")
}

/*
async function  updateConnection(connection_ID,user_id,rsvp){
  console.log(connection_ID)
  console.log(user_id)
  console.log(rsvp)
  var userConnectionDB=mongoose.model("userconnection",userconnectionSchema)
   await userConnectionDB.updateOne({'connection_ID':connection_ID,'user_id':user_id},{rsvp:rsvp});
    
}

module.exports.updateConnection=updateConnection;*/

 function searchConnections(connection_ID,user_id){
  var userConnectionDB=mongoose.model("usersconnection",userconnectionSchema)
  return userConnectionDB
  .find({connection_ID:connection_ID,user_id:user_id}).exec()
}
module.exports.searchConnections=searchConnections;
module.exports.removeConnection=removeConnection;
module.exports.removeConnectionById=removeConnectionById;
//removeConnection(1,1);

module.exports.addConnection=addConnection;
//updateRSVP(1,1,"YES")
//addRSVP(1,1,"No");
//addConnection(con);

  /*var ConnectionDb=require('./connectionDB.js')
var ListOfConnectionsObj=await ConnectionDb.getConnections();
var userConnectionobj1= UserConnection.UserConnection(ListOfConnectionsObj[0], "Yes")

*/

//var userConnectionobj2= UserConnection.UserConnection(ListOfConnectionsObj[4], "MayBe")
//this.ListOfConnections.push(userConnectionobj1);
/*this.ListOfConnections.push(userConnectionobj2);*/



//Adds a UserConnection for this connection
//var ListOfConnections=[];
/*addConnection (Connection, rsvp){
 var userConnectionobj= UserConnection.UserConnection(Connection, rsvp)
 for(var i=0;i<this.ListOfConnections.length;i++) {
   //remeber to write the cod
   var a=this.ListOfConnections[i];
   if(a.Connection.connection_ID==Connection.Connection_ID){
     return true;
   }
 }
 this.ListOfConnections.push(userConnectionobj);
}


searchConnections(Connection){
  for(var i=0;i<this.ListOfConnections.length;i++) {
    //remeber to write the cod
    var a=this.ListOfConnections[i];
    if(a.Connection.connection_ID==Connection.connection_ID){
  
      console.log("found")
      return true;
    }
  }
  return false;
}
//removes the UserConnection associated with the given connection.
 removeConnection(Connection){
 
this.ListOfConnections = this.ListOfConnections.filter(userConnection=>userConnection.Connection.connection_ID!=Connection.connection_ID);

}
//updates a UserConnection data (rsvp)
 updateConnection(connectionUser,rsvp){
  console.log(connectionUser)
  for(var i=0;i<this.ListOfConnections.length;i++)
  {
      if(this.ListOfConnections[i].Connection.connection_ID==connectionUser.connection_ID){
       
          this.ListOfConnections[i].rsvp=rsvp;
        
        
        return true;
      }
  }

}
//returns a List / Collection of UserConnection from the user profile
 getConnections() {
return this.ListOfConnections;
  }
//clears the entire profile contents
 emptyProfile (){
  this.ListOfConnections=[];
}

}

/*
user=require('./user.js')

var user_Obj=new user.user(1,'Tejashri','Arote','tarote@uncc.edu','Charlotte',1234)
//console.log(user_Obj);

var obj=new UserProfile(user_Obj);
//console.log(obj);

var ConnectionDb=require('./connectionDB.js')
var ListOfConnectionsObj=ConnectionDb.getConnections();
//console.log(ListOfConnectionsObj)
for(var i=0;i<ListOfConnectionsObj.length;i++){
  obj.addConnection(ListOfConnectionsObj[i],true);
}
//console.log(obj.ListOfConnections[3]);
obj.updateConnection(obj.ListOfConnections[3])
//console.log(obj.ListOfConnections[3]);
obj.updateConnection(obj.ListOfConnections[3])
//console.log(obj.ListOfConnections[3]);
console.log(obj.getConnections())
obj.emptyProfile();
//console.log(obj);

*/

//module.exports.UserProfile=UserProfile;
