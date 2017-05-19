var EJS = require('ejs');
var FS = require('fs');
var Path = require('path');

var target = "./"
if (process.argv.length > 2) {
	target = process.argv[2]
}

var root = "/";
if (process.argv.length > 3) {
	root = process.argv[3];
}

var template = FS.readFileSync("./template.css", 'utf8');
var render = EJS.compile(template);

var files = FS.readdirSync(Path.resolve(__dirname, target)).filter(function(file) {
	return Path.extname(file) === '.png';
}).map(function(file) {
	var parts = file.match(/^glyphicons-\d{1,3}-(.*).png$/i);
	var o = {
		name : parts[1],
		path : Path.join(root, file)
	};

	return o;
});

console.log(render({
	files : files
}));
