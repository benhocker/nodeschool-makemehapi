var Hapi = require("hapi");
var server = new Hapi.Server();

function one(request, reply) {
  reply("Hello Hapi");
}

function two(request, reply) {
	reply("Hello " + request.params.name);
}

server.connection({
	host: "localhost",
	port: Number(process.argv[2] || 8080)
});

server.route({
	path: "/{name}",
	method: "GET",
	handler: two
});

server.start();
