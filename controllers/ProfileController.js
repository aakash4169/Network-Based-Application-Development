// export express ,router  and connectionDB todisplay all connections
var session = require('express-session');
var user=require('../model/userDB.js')
var UserProfile = require('../model/UserProfile.js')
var connection=require('../model/connectionDB.js')
var crypto = require('crypto');

// saveUserProfile creates and stores the data into the session
async function  saveUserProfile(req,res){
    // request.session.userProfile=getUsers.getUsers();

    var SessionUser = req.session.theUser;
    var SessionProfile = req.session.userProfile;

    if(SessionUser!=null && SessionUser!==undefined)
    {
         console.log("session is already present")
    }
    else{
     console.log("session is not present")

     var usr=await user.getUserByEmail(req.body.username);
     console.log(usr);
     
     if(usr.length==0){
         res.redirect("/signIn?action=incorrect")
     }
     else{
        var passwordData=await sha512(req.body.password,usr[0].nSalt)
        if(usr[0].passwordHash===passwordData.passwordHash){
            var obj=await UserProfile.getUserProfile(usr[0].user_id)
            console.log(obj);
            req.session.userProfile= obj
            req.session.theUser=usr[0];
        }
        else{
            res.redirect("/signIn?action=incorrect")
        }
        
     }
    
    /* var usr=await user.getUsers();
     //console.log(usr);
     req.session.theUser=usr[0];
     var obj=await UserProfile.getUserProfile(usr[0].user_id)

     //var obj1=await UserProfile.getUserProfile(obj);
     //console.log("obj1 is")
     console.log(obj);

     req.session.userProfile= obj
   /* var user=getUsers.getUsers();
    req.session.theUser=user;
     var userProfile=getUserProfile.getItems();
     req.session.userProfile=userProfile;*/
    }

    //res.render('signIn');
    res.redirect('/savedConnections')
    //res.end("yes");
}
//This function is called when the user wants to sign out and it destroys the session
var signOut=function(req,res){
    //req.session.session1=false
   // res.render('signIn',{session1:req.session.session1})
    req.session.destroy();
    res.render('index')
}
//validateAction method is called when user wants to interact with the connections
async function validateAction(req,res){

    if(req.session.theUser){
        var item=await connection.getConnectionID(req.query.connection_ID);
        var currentItems=req.session.userProfile;
        var usr=await user.getUserByEmail(req.session.theUser.email);
        var obj=await UserProfile.getUserProfile(usr[0].user_id)
        //var usr=req.session.theUser;
        //console.log(usr)
        //var obj=req.session.userProfile;

        //var obj1=await UserProfile.getUserProfile(obj);
        //console.log("obj1 is")
        //console.log(obj);
   
        //req.session.userProfile= obj
    
        if(req.query.action=="save"){
           var exists=await UserProfile.searchConnections(req.query.connection_ID,usr[0].user_id);
           console.log("in save")
            console.log(exists.length)
            console.log(req.query.rsvp)
            if(req.query.rsvp=="Yes"){
                if(exists.length!=0){
                    
                   await UserProfile.updateRSVP(req.query.connection_ID,usr[0].user_id,"Yes")
                   //req.session.userProfile=await UserProfile.getUserProfile(usr[0].user_id)
                   res.redirect("/savedConnections")
                }
                else{
                   await UserProfile.addRSVP(req.query.connection_ID,usr[0].user_id,"Yes")
                   //req.session.userProfile=await UserProfile.getUserProfile(usr[0].user_id)
                   res.redirect("/savedConnections")
                }
            }
            else if(req.query.rsvp=="No"){
                if(exists){
                    await UserProfile.updateRSVP(req.query.connection_ID,usr[0].user_id,"No")
                    res.redirect("/savedConnections")
                }
                /*else{
                    obj.addConnection(item,"Yes")
                }*/
            }
            else if(req.query.rsvp=="MayBe"){
                if(exists.length!=0){
                    console.log("I am true")
                    await UserProfile.updateRSVP(req.query.connection_ID,usr[0].user_id,"MayBe")
                    res.redirect("/savedConnections")
                }
                else{
                    await UserProfile.addRSVP(req.query.connection_ID,usr[0].user_id,"MayBe")
                    res.redirect("/savedConnections")
                }
            }
           
             
            
        }
        else if(req.query.action=="delete"){
            var item=await connection.getConnectionID(req.query.connection_ID);
           var currentItems=req.session.userProfile;
           var usr=await user.getUserByEmail(req.session.theUser.email);
           var obj=await UserProfile.getUserProfile(usr[0].user_id)
         await UserProfile.removeConnection(req.query.connection_ID,usr[0].user_id)
console.log(currentItems)
           req.session.userProfile=await UserProfile.getUserProfile(usr[0].user_id)
            //console.log("new items")
            

            res.redirect('/savedConnections')
        }
        else if(req.query.action=="updateProfile"){


        }
        else if(req.query.action=="updateRSVP"){

        }
        else if(req.query.action=="signOut"){
            console.log("signOut")
        }
        else{
            res.redirect('/savedConnections')
        }

    }
    else{

    }

}
//This function displays all the connections 
async function displayConnections(req,res){
    console.log("i am in display")
    console.log(req.session.userProfile); 
    //var usr=await user.getUsers();
    req.session.userProfile=await UserProfile.getUserProfile(req.session.theUser.user_id)
    var rsvp=[];
    var ListOfConnections=[];
    for(var i=0;i<req.session.userProfile.length;i++){
            var obj=await connection.getConnectionID(req.session.userProfile[i].connection_ID)
            console.log(obj)
            ListOfConnections.push(obj[0])
            rsvp.push(req.session.userProfile[i].rsvp)
        
    }

    console.log("Above render 1")
    for(var i=0;i<ListOfConnections.length;i++){
       
        console.log(ListOfConnections[i].connection_topic)
      
      
}
//console.log(ListOfConnections)



    console.log("below render")

    res.render('myConnections',{userProfile:ListOfConnections,rsvp:rsvp})
}

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    globalHash=value;
    globalSalt=salt;
    return {
        salt:salt,
        passwordHash:value
    };
};



function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    console.log(typeof(salt))
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
    return passwordData;
}

function createUser(user_id,first_name,last_name,email,city,zipcode,password){
var passwordData=saltHashPassword(password);
user.addUser(user_id,first_name,last_name,email,city,zipcode,password,passwordData.passwordHash,passwordData.salt)
}


module.exports.saveUserProfile=saveUserProfile;
module.exports.validateAction=validateAction;
module.exports.signOut=signOut;
module.exports.displayConnections=displayConnections;
module.exports.saltHashPassword=saltHashPassword;
module.exports.createUser=createUser;
//saltHashPassword("abc123")
//saltHashPassword("xyz123")