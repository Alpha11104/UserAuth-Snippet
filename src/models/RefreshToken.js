import dbConnection from "../util/db.js";
import generateUserId
 from "../util/user-id.js";
import { randomUUID } from 'crypto'
export default class RefreshToken {
    userId;
    token;
    expiresAt;
    constructor(userId, token, expiresAt) {
        this.userId = userId;
        this.token = token;
        this.expiresAt = expiresAt;
    }
    static createRefreshToken(userId) {
        return new RefreshToken(
            userId,
            randomUUID(),
            Date.now() + 1000 * 60 * 60 * 24 * 7
        );
    }
    static async verify(token) {
        try {
            const result = await dbConnection.select('*').from('user_tokens').where({token: token}).first();
            
            if(!result) {
                throw 'Refresh token does not exist in database';
            }

            return result;
        } catch (error) {
            throw error
        }
    }
    async save() {
        try {
            await dbConnection.insert({
                userId: this.userId,
                token: this.token,
                expiresAt: this.expiresAt
            }).into('user_tokens')
            .onConflict('userId')
            .merge()
        } catch (error) {
            throw 'Failed to insert user refresh token.'
        }
    }
    async delete() {
        try {
            await dbConnection.delete().from('user_tokens').where({userId: this.userId})
            .onConflict('userId').merge();
        } catch (error) {
            console.log(error);
            throw 'Failed to insert user refresh token.'
        }
    }
}