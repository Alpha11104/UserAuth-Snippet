import dbConnection from "../util/db.js";
import generateUserId from "../util/user-id.js";
import bcryptjs from "bcryptjs";

export default class User {
    
    id;
    email;
    password;

    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
    static async findByEmail(email) {
        try {
            const user = await dbConnection.select('*').from('users').where({email: email}).first();
            
            if(!user) {
                return;
            }
            
            return new User(
                user.id,
                user.email,
                user.password
            );

        } catch (error) {
            console.log(error);
            throw new Error('Database Error: Failed to find user')
        }
    }
    verifyPassword(password) {
        if(bcryptjs.compareSync(password, this.password)) {
            return true;
        }

        return false;
    }
    
    static create(email, password) {

        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password, salt);

        return new User(
            generateUserId(8),
            email,
            hashedPassword,
        );
    }
    async save() {
        try {
            await dbConnection.insert({
                id: this.id,
                email: this.email,
                password: this.password
            }).into('users')
        } catch (error) {
            console.log(error);
            throw new Error('Database Error: Failed to insert new user.');
        }
    }
}