var fs = require('fs');

var text = fs.readFile('file.txt', 'utf-8', function(error, text){
	console.log(text);
});
console.log('After First Read\n');

var text = fs.readFile('file2.txt', 'utf-8', function(error, text){
	console.log(text);
});
console.log('After Second Read\n');
