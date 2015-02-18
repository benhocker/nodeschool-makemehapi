var Hapi = require("hapi");
var Path = require("path");
var File = require("fs");
var rot13 = require("rot13-transform");
var server = new Hapi.Server();

server.connection({
  host: "localhost",
  port: Number(process.argv[2] || 8080)
});

var rotHandler = function(request, reply) {
  reply(
    File.createReadStream("./public/8.txt")
      .pipe(rot13())
  );
};

server.route({
  path: "/",
  method: "GET",
  handler: rotHandler
});

server.start();
