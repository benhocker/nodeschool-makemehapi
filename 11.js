var Hapi = require("hapi");
var File = require("fs");
var Path = require("path");
var server = new Hapi.Server();

server.connection({
  host: "localhost",
  port: Number(process.argv[2] || 8080)
});

var uploadHandler = function(request, reply) {
  var data = request.payload;
  var fn = data.file.hapi.filename;
  var hdr = data.file.hapi.headers;
  var desc = data.description;
  var body = "";

  data.file.on("data", function(content) {
    body += content;
  });

  request.payload.file.on("end", function() {
    var json = {
      description: desc,
      file: {
        data: body,
        filename: fn,
        headers: hdr
      }
    };
    reply(JSON.stringify(json));
  });
};

server.route({
  path: "/upload",
  method: "POST",
  handler: uploadHandler,
  config: {
    payload: {
      output: "stream",
      parse: true,
      allow: "multipart/form-data"
    }
  }
});

server.start();
