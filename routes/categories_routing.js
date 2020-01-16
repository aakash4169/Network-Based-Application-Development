// export express ,router  and connectionDB to  display all connections 
var express=require('express');
var router=express.Router();
var connectionDb=require('../model/connectionDB.js')

router.get("/",async function(request,response){
   

       var a=await connectionDb.getConnections();

        response.render('connections',{qs:a})
      


})


module.exports=router;



//console.log(a)
