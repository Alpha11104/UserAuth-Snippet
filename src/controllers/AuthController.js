import jsonwebtoken from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
import Session from "../models/Session.js";

export default class AuthController {
    static async login(request, reply) {

        const {email, password} = request.body;

        try {

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

            const session = Session.create(user.id)

            await session.save();

            reply.setCookie('access_token', session.token, {
                httpOnly: true,
                sameSite: true,
                domain: 'localhost',
                path: '/',
                secure: false
            });

            reply.code(200).send({
                status: 'ok',
                message: 'Login Succesful',
            });

        } catch (error) {
            throw error;
        }

    }
    static async logout(request, reply) {

        const token = request.cookies['access_token'];

        if(!token) {
            return reply.code(200).send({
                code: 200,
                message: 'Not logged in'
            })
        }

        try {
            const session = await Session.findByToken(token);

            if(!session) {

                reply.clearCookie('access_token');

                reply.code(401).send({
                    code: 401,
                    message: 'No session in database'
                });
            }

            await session.delete();

            reply.clearCookie('access_token')
            
            reply.code(200).send({
                code: 200,
                message: 'Logout successs'
            });

        } catch (error) {
            throw error;
        }
    }
    static async verifyLogin(request, reply, done) {
        try {
            const token = request.cookies['access_token'];

            if(!token) {
                return reply.code(401).send({
                    code: 401,
                    message: 'Missing session token'
                });
            }
            const session = await Session.findByToken(token);

            if(!session) {

                reply.clearCookie('access_token');

                reply.code(401).send({
                    code: 401,
                    message: 'No session in database'
                });
            }
            if(session.isExpired()) {

                reply.clearCookie('access_token');

                session.delete();

                reply.code(401).send({
                    code: 401,
                    message: 'Session expired'
                });
            }

            request.user = {
                id: session.id
            }

            done();
        } catch (error) {
            throw error;
        }
    }
}