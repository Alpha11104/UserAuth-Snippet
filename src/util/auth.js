import fastifyPlugin from 'fastify-plugin';
import jwt from 'jsonwebtoken';

export default fastifyPlugin(async function(fastify, options) {

  fastify.decorate("jwtAuth", async function(request, reply) {
    try {
        const {authToken, refreshToken} = request.cookies;

        if(authToken) {
            try {
                const decoded = jwt.verify(authToken, 'secret');
                console.log(decoded);
            } catch(err) {
                console.log('invalid token');
            }
        } else {
            throw 'no auth token found.'
        }
       
    } catch (err) {
      reply.send(err)
    }
  });
});