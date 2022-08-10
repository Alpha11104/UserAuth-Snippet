// ESM
import Fastify from 'fastify';
//import jwtAuth from './util/jwt-auth.js';
import fastifyCookie from 'fastify-cookie';
import fastifyStatic from 'fastify-static';
import path from "path";
import dbConnect from './util/db-connection.js';
import jwtAuth from './util/auth.js';
import UserRoute from './routes/UserRoute.js';

const fastify = Fastify({
  logger: true
})

fastify.register(dbConnect);

fastify.register(fastifyCookie, {
  secret: "imustbemovedtodotenv", // for cookies signature
});

fastify.register(fastifyStatic, {
  root: path.resolve('./src/views'),
  prefix: '/', // optional: default '/'
});

fastify.get('/', function (req, reply) {
  return reply.sendFile('landing.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

fastify.get('/login', function (req, reply) {
  return reply.sendFile('login.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

fastify.get('/signup', function (req, reply) {
  return reply.sendFile('signup.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

fastify.register(jwtAuth);

fastify.register(UserRoute, {prefix: '/api/v1'});

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()