var Hapi = require("hapi");
var Joi = require("joi");
var Path = require("path");
var server = new Hapi.Server();

server.connection({
  host: "localhost",
  port: Number(process.argv[2] || 8080)
});

var validateHandler = function(request, reply) {
  reply("You asked for the chicken breed of " + request.params.breed);
};

server.route({
  path: "/chickens/{breed}",
  method: "GET",
  handler: validateHandler,
  config: {
    validate: {
      params: {
        breed: Joi.string().required()
      }
    }
  }
});

server.start();
