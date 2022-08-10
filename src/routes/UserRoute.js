import AuthController from '../controllers/AuthController.js';
import UserController from '../controllers/UserController.js';

export default async function routes (fastify, options) {
    fastify.route({
        method: 'POST',
        url: '/login',
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                },
                required : ['email', 'password'],
                additionalProperties: false,
            }
        },
        handler: AuthController.login
    });
    fastify.route({
        method: 'POST',
        url: '/logout',
        handler: AuthController.logout
    });
    fastify.route({
        method: 'POST',
        url: '/register',
        handler: UserController.register
    });
    fastify.route({
        method: 'GET',
        url: '/protected',
        preHandler: AuthController.verifyLogin,
        handler: async function (request, reply) {
            console.log(request.user);
            return 'Success'
        }
    });
}