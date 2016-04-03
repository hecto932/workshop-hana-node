'use strict';
var hdb = require("hdb");
var async = require("async");
var options = {
    host: 'lt5085.wdf.sap.corp',
    port: '31015',
    user: 'DEV162_DEMO',
    password: 'Welcome15'
}

module.exports = {
    callHANA: function(cb) {
        var client = hdb.createClient(options);
        client.connect(function(cb) {
            console.log('Database Connected');
            client.exec('select * from SYS.M_SYSTEM_OVERVIEW', function(err, res, cb) {
                if (err) return ('ERROR: ' + err);
                console.log('Database Call Complete');
                for (var i = 0; i < res.length; i++) {
                    cb.broadcast(res[i].NAME + ": " + res[i].VALUE + "\n");
                }
                client.disconnect(function(cb) {
                        console.log('Database Disconnected');
                    })
                    //cb();
            });
        });
        cb();
    }, //end callHANA

    callHANA1: function(cb) {
        var client = hdb.createClient(options);
        client.connect(function(error, client) {
            if (error) return console.log(error);
            async.waterfall([
                function execute(callback) {
                    console.log('Database Connected #1');
                    client.exec('select * from SYS.M_SYSTEM_OVERVIEW', function(err, res) { callback(null, err, res) });
                },

                function processResults(err, res, callback) {
                    if (err)
                        return ("ERROR: " + err);
                    console.log('Database Call  #1');
                    console.log('--System Overview');
                    for (var i = 0; i < res.length; i++) {
                        console.log(res[i].NAME + ": " + res[i].VALUE);
                    };
                    console.log('\n');
                    client.disconnect(callback);
                },

                function disconnectDone(callback) {
                    console.log('Database Disconnected #1');
                    console.log('End Waterfall #1');
                    cb();
                }

            ], function(err, result) {
                console.log(err || "done");
                console.log('Error Occured disrupting flow of Waterfall for #1');
                cb();
            }); //end Waterfall
        }); //end create connection

    }, //end callHANA1

    callHANA2: function(cb) {
            var client = hdb.createClient(options);
            client.connect(function(error, client) {
                if (error) return console.log(error);
                async.waterfall([

                    function execute(callback) {
                        console.log('Database Connected #2');
                        client.exec('select * from SYS.M_SERVICES', function(err, res) { callback(null, err, res) });

                    },

                    function processResults(err, res, callback) {
                        if (err)
                            return ("ERROR: " + err);
                        console.log('Database Call  #2');
                        console.log('--Services');
                        for (var i = 0; i < res.length; i++) {
                            console.log(res[i].SERVICE_NAME + ": " + res[i].PORT);
                        };
                        console.log('\n');
                        client.disconnect(callback);
                    },

                    function disconnectDone(callback) {
                        console.log('Database Disconnected #2');
                        console.log('End Waterfall #2');
                        cb();
                    }

                ], function(err, result) {
                    console.log(err || "done");
                    console.log('Error Occured disrupting flow of Waterfall for #2');
                    cb();
                }); //end Waterfall
            }); //end create connection

        } //end callHANA2
}
