//Create function called user to return object
var user =function (i,f,l,e,c,z){
 var userModel={user_id:i,first_name:f,last_name:l,email:e,city:c,zipcode:z}
 return userModel;
}
//Export user module
 module.exports.user= user ;

//var user_Obj=user(1,'Tejashri','Arote','tarote@uncc.edu','Charlotte',1234)
//console.log(user_Obj);
/*class USer{
  constructor(user_id,first_name){
    this.user_id=user_id;
    this.first_name=first_name;
  }

}

var userobj=new USer(1,"aakash");
console.log(userobj)
*/
