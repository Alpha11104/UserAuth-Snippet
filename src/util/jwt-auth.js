import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';

export default fastifyPlugin(async function(fastify, options) {
  fastify.register(fastifyJwt, {
    secret: "imustbemovedtodotenv",
    cookie: {
        cookieName: 'auth-token',
        signed: false
    }
  });

  fastify.decorate("authenticate", async function(request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err)
    }
  });
});