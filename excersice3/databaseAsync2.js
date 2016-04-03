var hana = require('./database');
var async = require("async");

async.parallel([
    function(cb) { console.log('Before Database Call'); cb() },
    function(cb) { hana.callHANA1(cb, console.log); },
    function(cb) { hana.callHANA2(cb, console.log); },
    function(cb) { console.log("After Database Call"); cb(); }
], function(err) {
	setTimeout(function(){
    	console.log("---Everything's Really Done Now. Go Home!---");
    	process.exit();
	}, 100);
});
