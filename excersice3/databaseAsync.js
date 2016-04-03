var hana = require('./database');

console.log('Before Database Call');
hana.callHANA1(console.log);
hana.callHANA2(console.log);
console.log('After Database Call');