import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export async function insertUser(db, {
    email, password, firstname, lastname
}) {

    try {
        let user = await db.collection('users').insertOne({
            _id: nanoid(24),
            email,
            password,
            firstname,
            lastname
        })
            .then(({ ops }) => ops[0]);
        return user
    } catch (error) {
        console.log("errr--", error);
        return false;
    }

}

export async function findUserBylogin(db, { email, password }) {


    try {
        let user_data = await db.collection('users').findOne({ email })

        if (!user_data) {
            return false;
        }
        if (user_data.role === "admin") {
            return false
        }
        const doMatch = await bcrypt.compare(password, user_data.password)

        if (doMatch) {
            const token = jwt.sign({ userId: user_data._id }, "secretshhh", {
                expiresIn: '24h'
            })
            user_data.token = token
            return user_data

        } else {
            return false
        }

    } catch (error) {
        console.log("error--", error);
        return false;
    }
}

export async function findUser(db, { email }) {
    try {
        let user_data = await db.collection('users').findOne({ email })
        if(user_data){
            return user_data
        }
        else{
            return false
        }
        
    } catch (error) {
        console.log("error--", error);
        return false;
    }
}