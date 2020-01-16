//Creating objects to pass to the views dynamically
var connection=require('./connection.js')
var study_ssdi=connection.connection('1',"ITCS 6112 SSDI","Study","SSDI meetup is a power packed session about creating dashboards by analysing datasets","Monday ,August 01 2019","10 a.m to 11 a.m","../assets/images/SSDI.jpg","Rec Field")

//db.connections.insert({connection_ID:1,connection_name:"ITCS 6112 SSDI",connection_topic:"Study",details:"SSDI meetup is a power packed session about creating dashboards by analysing datasets",date:"Monday ,August 01 2019",time:"10:00 AM to 11 AM",imageURL:"../assets/images/SSDI.jpg",location:"rec Field",user_id:1})


var study_spl=connection.connection('2',"ITCS 5102 SPL","Study","SPL meetup is a brainstorming  session about creating websites in any backend and frontend technology of ones choice","Tuesday ,August 02 2019","10 a.m to 11 a.m","../assets/images/SPL.jpg","Career Centre")
  /*connection_ID:2,
  connection_name:"ITCS 5102 SPL",
  connection_topic:"Study",
  details:"SPL meetup is a brainstorming  session about creating websites in any backend and frontend technology of ones choice ",
  date: 'Tuesday ,August 02 2019',
  time: '10 a.m to 11 a.m',
}*/
var study_nbad=connection.connection('3',"ITCS 5166 NBAD","Study","NBAD meetup is an overview  session about creating network based applications in javascript using nodeJS","Wednesday ,August 03 2019","10 a.m to 11 a.m","../assets/images/NBAD.jpg","SAC")
/*{
  connection_ID:3,
  connection_name:"ITCS 5166 NBAD",
  connection_topic:"Study",
  details:"NBAD meetup is an overview  session about creating network based applications in javascript using nodeJS ",
  date: 'Wednesday ,August 03 2019',
  time: '10 a.m to 11 a.m',
}*/


//db.connections.insert({connection_ID:3,connection_name:"ITCS 5166 NBAD",connection_topic:"Study",details:"NBAD meetup is an overview  session about creating network based applications in javascript using nodeJS",date:"Wednesday ,August 03 2019",time:"10:00 AM to 11 AM",imageURL:"../assets/images/NBAD.jpg",location:"SAC",user_id:1})
var animals_adoption=connection.connection('4',"Pet Adoption MeetUp","Animals","Learn More about pet adoption and why it is beneficial rather than spending money in petshop","Thursday ,August 29 2019","10 a.m to 11 a.m","../assets/images/PetAdoption.jpg","Student Union")
/*{
  connection_ID:4,
  connection_name:"Pet Adoption MeetUp",
  connection_topic:"Animals",
  details:"Learn More about pet adoption and why it is beneficial rather than spending money in petshop ",
  date: 'Thursday ,August 29 2019',
  time: '9:00 am to 11:00 am',
}*/
//db.connections.insert({connection_ID:4,connection_name:"Pet Adoption Meetup",connection_topic:"Animals",details:"Learn More about pet adoption and why it is beneficial rather than spending money in petshop",date:"Thursday ,August 29 2019",time:"10:00 AM to 11 AM",imageURL:"../assets/images/PetAdoption.jpg",location:"Student Union",user_id:1})
var animals_feed=connection.connection('5',"Feed The Cats","Animals","Training session for feeding  cats the appropriate diet in a scientific manner","Thursday ,August 29 2019","10 a.m to 11 a.m","../assets/images/Feed_cats.jpg","Woodward")
/*{
  connection_ID:5,
  connection_name:"Feed The Cats",
  connection_topic:"Animals",
  details:"Training session for feeding  cats the appropriate diet in a scientific manner ",
  date: 'Friday ,August 30 2019',
  time: '9:00 am to 11:00 am',
}*/

//db.connections.insert({connection_ID:5,connection_name:"Feed the cats",connection_topic:"Animals",details:"Training session for feeding  cats the appropriate diet in a scientific manner",date:"Thursday ,August 29 2019",time:"10:00 AM to 11 AM",imageURL:"../assets/images/Feed_cats.jpg",location:"Woodward",user_id:1})

var animals_therapy=connection.connection('6',"Dog Therapy","Animals","Training session for using dog therapy to cure  various terminal and mental illness","Saturday ,August 31 2019","10 a.m to 11 a.m","../assets/images/therapy_dog.jpg","Colvard")
/*{
  connection_ID:6,
  connection_name:"Dog Therapy",
  connection_topic:"Animals",
  details:"Training session for using dog therapy to cure  various terminal and mental illness ",
  date: 'Saturday ,August 31 2019',
  time: '9:00 am to 11:00 am',

}*/
//getConnections returns a list of connections present in categories Study and Animals
//db.connections.insert({connection_ID:6,connection_name:"Dog Therapy",connection_topic:"Animals",details:"Training session for using dog therapy to cure  various terminal and mental illness",date:"Thursday ,August 31 2019",time:"10:00 AM to 11 AM",imageURL:"../assets/images/therapy_dog.jpg",location:"Colvard",user_id:1})
//db.usersconnections.insert({connection_ID:4,user_id:1,rsvp:"Yes"})
 //db.usersconnections.insert({connection_ID:3,user_id:1,rsvp:"MayBe"})


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/NBADProject');
var db = mongoose.connection;

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



module.exports.connectionDB=mongoose.model("Connection",connectionSchema)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

 // console.log("in itemdb.js connected")
 

   
});

var connections_database=[]
var getConnections= function(){
  

  
  
  var connectionDB=mongoose.model("Connection",connectionSchema)
  //module.exports.connectionDB=connectionDB;
   return connectionDB
  .find().exec()






  

  /*connectionDB
  .find()
  .then(doc => {
      connections_database.push(doc)
    //module.exports.itemList=itemList
  })
  .catch(err => {
    console.error(err)
  })
  */
 // return connections_database;
};
//getConnectionID returns the object from the database that matches the connectionID
var getconnectionID=  function(ID){
  var a='';
  /*var list_of_connections= getConnections();
  for(var i=0;i<list_of_connections.length;i++){
    if(ID==list_of_connections[i].connection_ID)
    {
      a=list_of_connections[i]
    break;}
    else{
      //console.log("not fooud")
      a=-1;
    }
  }

return a;*/




  //console.log("Id is")
  //console.log(ID);
var connectionDB=mongoose.model("Connection",connectionSchema)
//module.exports.connectionDB=connectionDB;
 return connectionDB
.find({connection_ID:ID}).exec()
  
  
    
  
    



}



var updateconnection=  async function(connection_ID,connection_name,connection_topic,details,date,time,location){
  var a='';
  /*var list_of_connections= getConnections();
  for(var i=0;i<list_of_connections.length;i++){
    if(ID==list_of_connections[i].connection_ID)
    {
      a=list_of_connections[i]
    break;}
    else{
      //console.log("not fooud")
      a=-1;
    }
  }

return a;*/


const filter = { connection_ID:connection_ID };
//const update = { age: 59 };

// `doc` is the document _before_ `update` was applied


  //console.log("Id is")
  //console.log(ID);
var connectionDB=mongoose.model("Connection",connectionSchema)
//module.exports.connectionDB=connectionDB;

const update={connection_name:connection_name,connection_topic:connection_topic,details:details,date:date,time:time,location:location}
 return connectionDB
.findOneAndUpdate(filter,update)
  
  
    
  
    



}



var deleteconnection=  async function(connection_ID){
  var a='';
  /*var list_of_connections= getConnections();
  for(var i=0;i<list_of_connections.length;i++){
    if(ID==list_of_connections[i].connection_ID)
    {
      a=list_of_connections[i]
    break;}
    else{
      //console.log("not fooud")
      a=-1;
    }
  }

return a;*/


const filter = { connection_ID:connection_ID };
//const update = { age: 59 };

// `doc` is the document _before_ `update` was applied


  //console.log("Id is")
  //console.log(ID);
var connectionDB=mongoose.model("Connection",connectionSchema)
//module.exports.connectionDB=connectionDB;

console.log("above delete")
console.log(filter)
return connectionDB.findOneAndDelete(filter)
  
  
    
  
    



}


var a=getconnectionID(5);





//b.then(function(result){
  //console.log(result);
//})

var a= getConnections();

console.log(a);
module.exports.getConnections= getConnections
module.exports.getConnectionID= getconnectionID
module.exports.updateconnection=updateconnection;
module.exports.deleteconnection=deleteconnection;



var getConnectionsPromise= function(){
  var connectionDB=mongoose.model("Connection",connectionSchema)
  //module.exports.connectionDB=connectionDB;
   return connectionDB
  .find().exec()
  
}

var testGetConn=async function(){
  var a=await getconnectionID(2);
  console.log(a);
}

//testGetConn();