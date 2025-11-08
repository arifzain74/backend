import dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';

dotenv.config()

export default function Auth(req,res,next){
    try{
        const key = req.headers.authorization
        if(!key){
            return res.status(400).send("unauthorised access")
        }
        const token = key.split(" ")[1]
        const auth = verify(token,process.env.JWT_TOKEN)
        req.user = auth;
        next()
    }
    catch(error){
        return res.status(500).send(error)
    }
}