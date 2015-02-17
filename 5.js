var Hapi = require("hapi");
var Path = require('path');
var server = new Hapi.Server();

server.connection({
	host: "localhost",
	port: Number(process.argv[2] || 8080),
	options: options
});

var options = {
	views: {
		engines: {
			html: require("handlebars")
		},
		path: Path.join(__dirname, "templates")
	}
}

server.route({
	path: "/",
	method: "GET",
	handler: {
		view: "index.html"
	}
});

server.start();
