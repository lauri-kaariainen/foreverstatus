var app = require('express')();
var http = require('http').Server(app);
const getForeverStatuses = require('./getforeverlogs');



var globalCache = {};
//declare all cached items here
globalCache.statuses = "WARNING, CACHE IN INITIAL STATE";

globalCache.refresh = function(){
	globalCache.statuses = getForeverStatuses();
	setTimeout(globalCache.refresh,3*60*1000);
}
globalCache.refresh();


app.get('/statuses', 
	(req, res)=>{
		res.send(globalCache.statuses);
	}
);


			

http.listen(9009, function(){ 
  console.log('listening on *:9009');
});
