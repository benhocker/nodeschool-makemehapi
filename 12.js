var Hapi = require("hapi");
var server = new Hapi.Server();

server.connection({
  host: "localhost",
  port: Number(process.argv[2] || 8080)
});

server.state("session", {
  path: "/{path*}",
  ttl: 10,
  encoding: "base64json",
  domain: "localhost"
});

var setCookieHandler = function(request, reply) {
  reply("success").state("session", {key: "makemehapi"});
};

var checkCookieHandler = function(request, reply) {
  var result;
  var session = request.state.session;

  if (session) {
    result = {user: "hapi"};
  }
  else {
    result = "unauthorized";
  }
  reply(result);
};

server.route([
  {
    path: "/set-cookie",
    method: "GET",
    handler: setCookieHandler,
    config: {
      state: {
        parse: true,
        failAction: "log"
      }
    }
  },
  {
    path: "/check-cookie",
    method: "GET",
    handler: checkCookieHandler
  }
]);

server.start();
