import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();
const Secret_key = process.env.SECRET_KEY

export const generateJwtToken = (id, email) => {

    return jwt.sign({
        id: id,
        email: email
    }, Secret_key)
}


export const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    try {
        if (token) {
            const user: any = await jwt.verify(token, Secret_key) as { sqlUID: string }
            req.sqlUID = user?.id;
            next();
        }

        if(!token) {
            res.status(401).send({
                error : "Authorizaton required"
            })
        }

    }
    catch (error) {
        return res.status(401).send({ message: 'Invalid token' });
    }
}

export default generateJwtToken;