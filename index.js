var http = require('http');
var fs = require('fs');
var clientJS = fs.readFileSync('client.js');
http.createServer(function(req, res) {
	if(req.url == "/client.js") {
		res.writeHead(200, {"Content-type": "text/javascript"});
		res.write(clientJS);
		res.end();
	}
	else {
		var submitting = false;
		if(req.url.indexOf("/", 1) > -1) {
			submitting = true;
		}
		var filename_base = req.url;
		if(submitting) {
			filename_base = filename_base.substring(0, filename_base.indexOf("/", 1));
		}
		console.log(filename_base);
		var filename = 'data'+filename_base+'.json';
		fs.readFile(filename, function(err, content) {
			if(err) {
				res.writeHead(404, {"Content-type": "text/plain"});
				res.write("that doesn't exist");
				res.end();
			}
			else {
				if(submitting) {
					fs.appendFile('data'+filename_base+'.csv', decodeURIComponent(req.url.substring(req.url.indexOf('/', 1)+1))+"\n", function(err) {
						if(err) {
							res.writeHead(500, {"Content-type": "text/plain"});
							res.write("unable to write to file");
							res.end();
							console.log(err);
						}
						else {
							res.writeHead(200, {"Content-type": "text/plain"});
							res.write("written");
							res.end();
						}
					});
				}
				else {
					res.writeHead(200, {"Content-type": "text/html"});
					res.write("<html><head>");
					res.write('<script type="text/javascript" src="/client.js"></script>');
					res.write('</head><body>');
					res.write('<div id="boxes">');
					var elems = JSON.parse(content);
					for(var i = 0; i < elems.length; i++) {
						var ele = elems[i];
						res.write("<label>" + ele.label + ": ");
						res.write("<input type=\""+ele.type+"\" class=\"input\" />");
						res.write("</label><br />");
					}
					res.write("</div></body></html>");
					res.end();
				}
			}
		});
	}
}).listen(1111);
