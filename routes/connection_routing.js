// // export express ,router  and connectionDB to  display individual connections
var express=require('express');
var router=express.Router();
var connectionDb=require('../model/connectionDB.js')
var UserProfile=require('../model/UserProfile.js')
const { check, validationResult } =require('express-validator');

router.get("/",async function(request,response){
    if(request.session.theUser){


    var itemId=request.query.connection_ID;
   

    var topic=await connectionDb.getConnectionID(itemId)

    if(topic.length==0){
        var all=await connectionDb.getConnections();
        response.render('connections',{qs:all})
    }
    else{
        console.log(topic)
        response.render('connection',{qs:topic[0]})
    }
}
else{
  // We are redirecting the user to sign in page if session is not set
  response.render('login',{flag:1})
}
})

router.get("/edit",async function(request,response){
//console.log("in edit "+request.query.connection_ID)

var itemId=request.query.connection_ID;

    var topic=await connectionDb.getConnectionID(itemId)
    itemId=topic[0].user_id;
    user_id=request.session.theUser.user_id;
    //console.log(request.session.theUser.user_id)
    //console.log(topic[0].user_id)
    if(itemId==user_id){
        response.render('editConn',{qs:topic[0]})
    }
    else{
        response.end("not authorized")
    }
})

router.post("/edit",[check('id').not().notEmpty().trim().escape().isNumeric().withMessage("Must be a number"),check('name').not().notEmpty().trim().escape().withMessage("must be a string"),check('topic').not().notEmpty().trim().escape().isAlpha().withMessage("must be a string"),check('details').not().notEmpty().trim().escape().withMessage("Details are mandatory"),check('date').not().notEmpty().trim().withMessage("Required"),check('time').not().notEmpty().trim().escape().withMessage("Required"),check('location').not().notEmpty().trim().escape().withMessage("Required")],async function(req,res){
    //console.log("in edit "+request.query.connection_ID)
    var topic1 = req.body.topic;
    var name=req.body.name;
    var id=req.body.id;
    var details=req.body.details
    var date=req.body.date;
    var time=req.body.time;
    var location=req.body.location;
    //var itemId=request.body.connection_ID;
    //console.log(itemId)
    var errors=validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
        var topic=await connectionDb.getConnectionID(id)
        itemId=topic[0].user_id;
        user_id=req.session.theUser.user_id;
        console.log(req.session.theUser.user_id)
        console.log(topic[0].user_id)
        await connectionDb.updateconnection(id,name,topic1,details,date,time,location);
        /*if(itemId==user_id){
            response.render('editConn',{qs:topic[0]})
        }
        else{
            response.end("not authorized")
        }*/
        res.redirect("/connections")
    })

router.get("/delete",async function(request,response){
    console.log("in delete")

    var itemId=request.query.connection_ID;

    var topic=await connectionDb.getConnectionID(itemId)
    itemId=topic[0].user_id;
    user_id=request.session.theUser.user_id;
    //console.log(request.session.theUser.user_id)
    //console.log(topic[0].user_id)
    if(itemId==user_id){
        await connectionDb.deleteconnection(topic[0].connection_ID);
        await UserProfile.removeConnectionById(topic[0].connection_ID);
        response.redirect('/connections')
    }
    else{
        response.end("not authorized")
    }
})


module.exports=router;
