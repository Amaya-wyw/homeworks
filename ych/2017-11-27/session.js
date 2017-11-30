var http = require('http');
var uuid = require('uuid/v4');
// var _ = require('lodash');
var session = {};

http.createServer(function (req, res) {
	var cookie = req.headers['cookie'];
	var user;
	var index = -1;
	var sid;
	if (cookie) {
		//console.log("cookie"+cookies);
		var cookies = cookie.split("; ");
		console.log("cookie:::"+cookie);
		console.log("cookies:::"+cookies);
		if (cookies) {
			for (var i = 0; i < cookies.length; i++) {
				if (cookies[i].indexOf("sid") === 0) {
					sid = cookies[i].split("=")[1];
					console.log(sid);
					index = i;
					break;
				}
			}
			console.log('index =' + index);
			if (index !== -1) {
				user = session[sid];
			}
		}
	}

	if (!user) {
		var user = {
			id: uuid(),
			username: "user-" + new Date().getTime(),
			password: 'passord'
		};
		var sid = uuid();
		session[sid] = user;
		res.writeHead(200, {
			'Set-Cookie': 'sid=' + sid,
			'Content-Type': 'text/plain'
		});
	}
	res.write("your name is " + user.username);
	res.write('Hello World!');
	res.end();
}).listen(8080);