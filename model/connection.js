

//Creating connectionModel object and returning  it to connection function
var connection = function (i,n,tp,d,dt,t,imageURL,l){
  var connectionModel={connection_ID:i, connection_name :n, connection_topic: tp, details: d, date:dt,time:t,imageURL:imageURL,location:l}
  return connectionModel;
}
//Exporting the connection module so that it can be used in other files
module.exports.connection= connection ;

