var http = require('http');

console.log('Before HTTP Call\n');

http.get({
        path: "http://www.loc.gov/pictures/search/?fo=json&q=SAP",
        host: "www.loc.gov",
        port: "80",
        headers: {
            host: "www.loc.gov"
        }
    },
    function(res) {
        res.setEncoding('utf-8');
        res.on('data', function(data) {
            console.log(data.substring(0, 100));
        });
        res.on('error', (err) => {
            console.log(`Got error: ${err.message}`);
        })
    }
);

console.log('After HTTP Call\n')
