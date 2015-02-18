var Hapi = require("hapi");
var Joi = require("joi");
var Path = require("path");
var server = new Hapi.Server();

server.connection({
  host: "localhost",
  port: Number(process.argv[2] || 8080)
});

var loginHandler = function(request, reply) {
  reply("login successful");
};

var schema = Joi.object({
  isGuest: Joi.boolean(),
  username: Joi.string(), //username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
  accessToken: Joi.string().alphanum(),
  password: Joi.string().alphanum()
})
.options({allowUnknown: true})
.with("isGuest", "username")
.without("password", "accessToken");

server.route({
  path: "/login",
  method: "POST",
  handler: loginHandler,
  config: {
    validate: {
      payload: schema
    }
  }
});

server.start();
