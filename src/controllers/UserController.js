import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import jsonwebtoken from 'jsonwebtoken';

export default class UserController {
    static async register(request, reply) {
        const {email, password} = request.body;

        const user = User.create(email, password);

        try {
            await user.save();

            return reply.code(201).send({
                status: 'ok',
                message: 'New account created'
            });
        } catch (error) {
            throw error;
        }

    }
    static async login(request, reply) {
        try {

            const {email, password} = request.body;

            let user = await User.findByEmail(email);

            if(!user) {
                 return reply.code(401).send({ 
                    status: 'error',
                    code: 409,
                    message: 'Email not found!'
                });
            }


            if(!user.verifyPassword(password)) {
                return reply.code(401).send({ 
                    status: 'error',
                    code: 409,
                    message: 'Incorrect password!'
                });
            }

            const token = jsonwebtoken.sign({ 
                exp: Math.floor(Date.now() / 1000) + (5),
                id: user.id,
            }, 'secret');

            const refreshToken = RefreshToken.createRefreshToken(user.id);

            await refreshToken.save();

            
            reply.setCookie('authToken', token, {
                domain: 'localhost',
                path: '/',
            });
        
            reply.setCookie('refreshToken', refreshToken.token, {
                domain: 'localhost',
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // Cookie expires in 1 week
            });

            return reply.send({
                status: 'ok',
                code: 200,
                message: 'Login successful'
            });

        } catch (error) {
            throw error;
        }
    }
}
