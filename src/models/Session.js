import dbConnection from '../util/db.js'
import { randomUUID } from 'crypto'

export default class Session {
    constructor(id, token, expiresAt) {
        this.id = id;
        this.token = token;
        this.expiresAt = expiresAt;
    }
    isExpired() {
        return this.expiresAt < Date.now();
    }
    async save() {
        try {
            await dbConnection.insert({
                userId: this.id,
                token: this.token,
                expiresAt: this.expiresAt
            }).into('sessions')
            .onConflict('userId')
            .merge();

        } catch (error) {
            console.log(error);
            throw new Error('Database Error: Failed to insert session');
        }
    }
    async delete() {
        try {
            await dbConnection.delete().from('sessions').where({
                token: this.token
            });

        } catch (error) {
            console.log(error);
            throw new Error('Database Error: Failed to delete session');
        }
    }
    static create(userId) {
        return new Session(
            userId,
            randomUUID(),
            new Date(Date.now() + 1000 * 60 * 60 * 24)
        );
    }
    static async findByToken(token) {
        try {
            const session = await dbConnection.select('*').from('sessions').where({token: token}).first();
            if(!session) {
                return;
            }
            return new Session(session.userId, session.token, session.expiresAt);
        } catch (error) {
            console.log(error);
            throw 'Database error'
        }
    }
}